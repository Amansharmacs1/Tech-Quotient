import mongoose from 'mongoose';

const sampleTestCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String },
  expectedOutput: { type: String },
  explanation: { type: String }
});

const hiddenTestCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true }
});

const problemSchema = new mongoose.Schema({
  facultyId: { type: String, default: 'faculty-123', index: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  customId: { type: String, index: true },
  title: { type: String, required: true },
  topic: { type: String, default: 'Arrays' },
  category: { type: String, default: 'Arrays & Hashing' },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy', index: true },
  problemType: { type: String, default: 'Coding' },
  points: { type: Number, default: 20 },
  solvedCount: { type: Number, default: 0 },
  accuracy: { type: String, default: '80%' },
  description: { type: String, required: true },
  inputFormat: { type: String, default: '' },
  outputFormat: { type: String, default: '' },
  constraints: [{ type: String }],
  sampleTestCases: [sampleTestCaseSchema],
  hiddenTestCases: [hiddenTestCaseSchema],
  starterCode: {
    java: { type: String, default: '' },
    cpp: { type: String, default: '' },
    python: { type: String, default: '' },
    javascript: { type: String, default: '' }
  },
  supportedLanguages: [{ 
    type: String, 
    default: ['JavaScript', 'Python', 'Java', 'C++'] 
  }],
  hints: [{ type: String }],
  tags: [{ type: String }],
  status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Published' }
}, { timestamps: true });

// Pre-save to synchronize aliases
problemSchema.pre('save', function(next) {
  if (this.topic && !this.category) this.category = this.topic;
  if (this.category && !this.topic) this.topic = this.category;
  if (!this.customId && this._id) this.customId = `prob-${this._id}`;
  if (this.sampleTestCases) {
    this.sampleTestCases.forEach(tc => {
      if (tc.output && !tc.expectedOutput) tc.expectedOutput = tc.output;
      if (tc.expectedOutput && !tc.output) tc.output = tc.expectedOutput;
    });
  }
  next();
});

export default mongoose.models.Problem || mongoose.model('Problem', problemSchema);
