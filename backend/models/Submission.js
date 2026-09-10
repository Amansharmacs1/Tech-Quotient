import mongoose from 'mongoose';

const testCaseResultSchema = new mongoose.Schema({
  passed: { type: Boolean, default: false },
  executionTime: { type: Number, default: 0 },
  memoryUsed: { type: Number, default: 0 },
  error: { type: String }
});

const submissionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  userEmail: { type: String, index: true },
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', index: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', index: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  score: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['ACCEPTED', 'WRONG_ANSWER', 'COMPILE_ERROR', 'TIME_LIMIT_EXCEEDED', 'Submitted', 'Evaluated', 'Pending', 'Failed'], 
    default: 'Submitted' 
  },
  runtimeMs: { type: Number, default: 12 },
  memoryMb: { type: Number, default: 4.2 },
  testCasesPassed: { type: Number, default: 0 },
  totalTestCases: { type: Number, default: 0 },
  outputDetails: { type: String, default: '' },
  aiFeedback: { type: String, default: '' },
  testCaseResults: [testCaseResultSchema],
  facultyFeedback: {
    remarks: String,
    strengths: String,
    areasForImprovement: String
  }
}, { timestamps: true });

export default mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
