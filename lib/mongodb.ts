/**
 * MongoDB connection with serverless-safe caching.
 *
 * Why this pattern: each Vercel function invocation may run on a "cold" Lambda.
 * Without caching, every cold start opens a new Mongo connection and Atlas
 * connection limits exhaust within hours of real traffic. This caches a single
 * promise across hot invocations of the same Lambda.
 *
 * Do NOT replace with a simple `mongoose.connect()` call.
 */
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use a global so the cache survives module re-evaluation in dev (HMR)
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
if (!global._mongooseCache) global._mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI!, {
      bufferCommands: false,           // fail fast on cold start instead of queueing
      serverSelectionTimeoutMS: 5000,  // 5s to find a server, then error
      maxPoolSize: 10,                 // per-Lambda pool cap (Atlas free = 500 total)
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;             // allow retry on next call
    throw err;
  }

  return cached.conn;
}
