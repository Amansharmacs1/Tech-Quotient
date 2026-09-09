import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  code: { type: String, required: true },
  title: { type: String, required: true },
  dueDate: { type: String, required: true },
  maxScore: { type: Number, default: 100 },
  status: { type: String, enum: ['Pending', 'In Progress', 'Submitted'], default: 'Pending' },
  score: { type: Number },
  submissionCount: { type: Number, default: 0 },
  problemStatement: { type: String },
  submissionGuidelines: [String]
}, { timestamps: true });

export default mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema);
