import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  facultyId: {
    type: String,
    required: true,
    default: 'faculty-123'
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    index: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
    index: true
  },
  problemType: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  inputFormat: {
    type: String
  },
  outputFormat: {
    type: String
  },
  constraints: [{ type: String }],
  sampleTestCases: [{
    input: String,
    output: String,
    explanation: String
  }],
  hiddenTestCases: [{
    input: String,
    output: String
  }],
  supportedLanguages: [{ type: String, default: ['JavaScript', 'Python', 'Java', 'C++'] }],
  hints: [{ type: String }],
  tags: [{ type: String }],
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Archived'],
    default: 'Published'
  }
}, { timestamps: true });

export default mongoose.model('Problem', problemSchema);
