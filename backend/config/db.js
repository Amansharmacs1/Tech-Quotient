import mongoose from 'mongoose';

// Disable query buffering so disconnected queries fail fast to in-memory store
mongoose.set('bufferCommands', false);

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.log('ℹ️  [Database]: MONGODB_URI is not set. Operating in resilient in-memory data store mode.');
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`✅ [Database]: MongoDB Connected successfully to ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️  [Database]: MongoDB Connection error: ${error.message}. Running in fallback store mode.`);
    return null;
  }
};

export default connectDB;
