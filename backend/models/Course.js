import mongoose from 'mongoose';

const moduleTopicSchema = new mongoose.Schema({
  num: Number,
  tag: String,
  title: String,
  done: { type: Boolean, default: false }
});

const courseModuleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  status: String,
  commentsCount: { type: Number, default: 0 },
  docsCount: { type: Number, default: 0 },
  name: String,
  completed: { type: Boolean, default: false },
  current: { type: Boolean, default: false },
  topics: [moduleTopicSchema]
});

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true, index: true },
  code: { type: String },
  courseName: { type: String, required: true },
  title: { type: String },
  description: { type: String, default: '' },
  instructor: { type: String, default: 'Dr. Sandeep Rana' },
  facultyId: { type: String, default: 'faculty-123', index: true },
  department: { type: String, default: 'Computer Science & Engineering' },
  semester: { type: String, default: 'Fall 2026' },
  academicYear: { type: String, default: '2025-2026' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  progress: { type: Number, default: 0 },
  sections: { type: Number, default: 10 },
  studentsCount: { type: Number, default: 45 },
  studentsEnrolled: { type: Number, default: 45 },
  modules: [courseModuleSchema]
}, { timestamps: true });

// Pre-save to synchronize aliases
courseSchema.pre('save', function(next) {
  if (this.courseCode && !this.code) this.code = this.courseCode;
  if (this.code && !this.courseCode) this.courseCode = this.code;
  if (this.courseName && !this.title) this.title = this.courseName;
  if (this.title && !this.courseName) this.courseName = this.title;
  if (this.studentsCount && !this.studentsEnrolled) this.studentsEnrolled = this.studentsCount;
  if (this.studentsEnrolled && !this.studentsCount) this.studentsCount = this.studentsEnrolled;
  next();
});

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
