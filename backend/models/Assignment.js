import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  facultyId: { type: String, default: 'faculty-123', index: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', index: true },
  customId: { type: String, index: true },
  course: { type: String, default: 'Data Structures & Algorithms' },
  code: { type: String, default: 'CSE201' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  problemStatement: { type: String, default: '' },
  problemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  deadline: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  dueDate: { type: String, default: 'Jul 28, 2026, 11:59 PM' },
  duration: { type: Number, default: 120 }, // in minutes
  maximumMarks: { type: Number, default: 100 },
  maxScore: { type: Number, default: 100 },
  attemptsAllowed: { type: Number, default: 1 },
  status: { 
    type: String, 
    enum: ['Draft', 'Published', 'Closed', 'Pending', 'In Progress', 'Submitted'], 
    default: 'Published' 
  },
  score: { type: Number },
  submissionCount: { type: Number, default: 0 },
  submissionGuidelines: [{ type: String }]
}, { timestamps: true });

// Pre-save to synchronize aliases
assignmentSchema.pre('save', function(next) {
  if (this.problemStatement && !this.description) this.description = this.problemStatement;
  if (this.description && !this.problemStatement) this.problemStatement = this.description;
  if (this.maximumMarks && !this.maxScore) this.maxScore = this.maximumMarks;
  if (this.maxScore && !this.maximumMarks) this.maximumMarks = this.maxScore;
  if (this.problemIds?.length && !this.problems?.length) this.problems = this.problemIds;
  if (this.problems?.length && !this.problemIds?.length) this.problemIds = this.problems;
  if (!this.customId && this._id) this.customId = `asg-${this._id}`;
  next();
});

export default mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema);
