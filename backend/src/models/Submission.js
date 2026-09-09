import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  problemId: { type: String },
  assignmentId: { type: String },
  language: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: String, required: true }, // ACCEPTED, WRONG_ANSWER, COMPILE_ERROR, TIME_LIMIT_EXCEEDED
  runtimeMs: { type: Number, default: 12 },
  memoryMb: { type: Number, default: 4.2 },
  score: { type: Number, default: 0 },
  testCasesPassed: { type: Number, default: 10 },
  totalTestCases: { type: Number, default: 10 },
  outputDetails: { type: String },
  aiFeedback: { type: String }
}, { timestamps: true });

export default mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
