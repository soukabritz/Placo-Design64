import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGODB_URL ||
  process.env.DATABASE_URL ||
  process.env.DB_CONNECTION_STRING ||
  process.env.DB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  const start = Date.now();
  console.log(
    `[MongoDB] Connection attempt started at ${new Date().toISOString()}`,
  );

  if (!MONGODB_URI) {
    console.error("[MongoDB] MONGODB_URI is missing", {
      availableEnvVars: Object.keys(process.env).filter(
        (key) =>
          key.toLowerCase().includes("mongo") ||
          key.toLowerCase().includes("db") ||
          key.toLowerCase().includes("database"),
      ),
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env",
    );
  }

  if (cached.conn) {
    console.log("[MongoDB] Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of default 30s
      connectTimeoutMS: 10000,
    };

    console.log("[MongoDB] Initializing new connection promise...");
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log(
          `[MongoDB] Connected successfully in ${Date.now() - start}ms`,
        );
        return mongoose;
      })
      .catch((err) => {
        console.error(
          `[MongoDB] Connection error after ${Date.now() - start}ms:`,
          err.message,
        );
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error(`[MongoDB] Await connection failed: ${e.message}`);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
