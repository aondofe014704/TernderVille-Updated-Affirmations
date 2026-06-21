#!/usr/bin/env tsx
/**
 * One-shot backfill for legacy News documents.
 *
 * Sets publishAt = createdAt on every news doc where publishAt is missing.
 * Safe to run multiple times — only touches docs missing the field.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/backfill-publishat.ts
 *
 * Make sure .env.local has the PRODUCTION MONGO_URI when running this
 * (so it fixes the live database). After running, swap back to local URI.
 */
import mongoose from "mongoose";
import News from "../models/News";

async function main() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("✗ MONGO_URI must be set in .env.local");
    process.exit(1);
  }

  console.log("→ Connecting to MongoDB...");
  console.log("  URI:", mongoUri.replace(/:\/\/.*@/, "://***:***@"));
  await mongoose.connect(mongoUri);
  console.log("✓ Connected");

  const missing = await News.countDocuments({ publishAt: { $exists: false } });
  console.log(`→ Found ${missing} news posts without publishAt`);

  if (missing === 0) {
    console.log("✓ Nothing to do.");
    await mongoose.disconnect();
    return;
  }

  // For each missing doc, set publishAt = createdAt
  // Use raw collection update so we bypass any Mongoose schema validation surprises
  const collection = mongoose.connection.collection("news");

  // Mongo aggregation pipeline update: set publishAt = createdAt where missing
  const result = await collection.updateMany(
    { publishAt: { $exists: false } },
    [{ $set: { publishAt: "$createdAt" } }]
  );

  console.log(`✓ Updated ${result.modifiedCount} documents`);
  console.log("  Their publishAt now equals their createdAt");

  await mongoose.disconnect();
  console.log("✓ Done.");
}

main().catch((err) => {
  console.error("✗ Error:", err);
  process.exit(1);
});
