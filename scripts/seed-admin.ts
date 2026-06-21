#!/usr/bin/env tsx
/**
 * Seed the initial admin user. Run once after Mongo is set up.
 *
 *   npx tsx --env-file=.env.local scripts/seed-admin.ts
 *
 * Reads ADMIN_EMAIL and ADMIN_PASSWORD from .env.local via Node's built-in
 * --env-file flag (Node 20.6+).
 *
 * Idempotent: if a user with the email already exists, exits without changes.
 * Replaces the buggy initializeSuperAdmin() that ran on every Express boot.
 */
import mongoose from "mongoose";
import User from "../models/User";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const mongoUri = process.env.MONGO_URI;

  if (!email || !password) {
    console.error("\u2717 ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.local");
    console.error("  Run: npx tsx --env-file=.env.local scripts/seed-admin.ts");
    process.exit(1);
  }
  if (!mongoUri) {
    console.error("\u2717 MONGO_URI must be set in .env.local");
    process.exit(1);
  }

  console.log("\u2192 Connecting to MongoDB...");
  await mongoose.connect(mongoUri);
  console.log("\u2713 Connected");

  const existing = await User.findOne({ email });
  if (existing) {
    if (existing.role === "admin") {
      console.log(`\u2713 Admin user already exists: ${email} (no changes)`);
    } else {
      existing.role = "admin";
      existing.isActive = true;
      await existing.save();
      console.log(`\u2713 Promoted existing user to admin: ${email}`);
    }
  } else {
    await User.create({
      email,
      password,         // bcrypt hashed by pre-save hook
      name: "Admin",
      phone: "",
      role: "admin",
      isActive: true,
    });
    console.log(`\u2713 Created admin user: ${email}`);
  }

  await mongoose.disconnect();
  console.log("\u2713 Done. You can now sign in at /admin/login");
}

main().catch((err) => {
  console.error("\u2717 Error:", err);
  process.exit(1);
});
