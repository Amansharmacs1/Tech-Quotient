import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI || mongoURI.trim() === '') {
    console.log('⚠️ [Database Notice]: MONGODB_URI is blank in environment variables.');
    console.log('💡 [Database Notice]: Backend models & connection layer are ready for Mongoose.');
    console.log('💡 [Database Notice]: Serving APIs via fully populated in-memory repository store until MONGODB_URI is configured.');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ [Database]: MongoDB Connected to host ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ [Database Error]: MongoDB Connection failed: ${error.message}`);
    console.log('💡 [Database Notice]: Falling back to in-memory repository store.');
    return false;
  }
};
