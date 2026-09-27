import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  otpHash: { type: String, required: true },
  purpose: { type: String, enum: ['signup', 'password_reset'], required: true },
  attempts: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // TTL index automatically deletes doc after 300s
});

export default mongoose.models.OTP || mongoose.model('OTP', otpSchema);
