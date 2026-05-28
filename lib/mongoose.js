import mongoose from "mongoose";

const MONGODB_URI_ATLAS = process.env.MONGODB_URI_ATLAS;

//Guard rail to prevent accidental connection to production database during development. It checks if the MONGODB_URI environment variable is defined, and if not, it throws an error with a message prompting the developer to define it in the .env.local file. This ensures that the application has the necessary configuration to connect to the MongoDB database before attempting to establish a connection.
if (!MONGODB_URI_ATLAS) {
  throw new Error("Please define the MONGODB_URI_ATLAS environment variable in .env.local");
}

// Cache the connection across hot reloads in development
let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI_ATLAS).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}