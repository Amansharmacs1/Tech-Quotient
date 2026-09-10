import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  customId: { type: Number },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['assignment', 'ai', 'contest', 'system', 'announcement', 'general'], default: 'general' },
  targetRole: { type: String, enum: ['student', 'faculty', 'all'], default: 'all' },
  targetCourse: { type: String, default: 'All Courses' },
  time: { type: String, default: 'Just now' },
  unread: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
