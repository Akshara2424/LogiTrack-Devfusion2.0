import mongoose from 'mongoose';

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: CachedConnection = (global as any).mongoose ?? { conn: null, promise: null };

if (!cached || !cached.conn) {
  (global as any).mongoose = cached;
}

async function connectDB(options: mongoose.ConnectOptions = {}) {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in .env.local');
  }
  
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      console.log('MongoDB Connected');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
