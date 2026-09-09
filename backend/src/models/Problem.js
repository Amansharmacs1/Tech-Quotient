import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  category: { type: String, default: 'General' },
  points: { type: Number, default: 20 },
  solvedCount: { type: Number, default: 0 },
  accuracy: { type: String, default: '80%' },
  description: { type: String, required: true },
  inputFormat: { type: String },
  outputFormat: { type: String },
  starterCode: {
    java: String,
    cpp: String,
    python: String,
    javascript: String
  },
  sampleTestCases: [{
    input: String,
    expectedOutput: String
  }]
}, { timestamps: true });

export default mongoose.models.Problem || mongoose.model('Problem', problemSchema);
