import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    index: true
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
    index: true
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true,
    index: true
  },
  language: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  score: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Submitted', 'Evaluated', 'Pending', 'Failed'],
    default: 'Submitted'
  },
  testCaseResults: [{
    passed: Boolean,
    executionTime: Number,
    memoryUsed: Number,
    error: String
  }],
  facultyFeedback: {
    remarks: String,
    strengths: String,
    areasForImprovement: String
  }
}, { timestamps: true });

export default mongoose.model('Submission', submissionSchema);
