import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  customId: { type: Number, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['assignment', 'ai', 'contest', 'system', 'general'], default: 'general' },
  time: { type: String, default: 'Just now' },
  unread: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
