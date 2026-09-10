import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'faculty', 'admin'], default: 'student' },
  
  // Student Specific Profile Fields
  studentId: { type: String },
  rollNumber: { type: String, default: '2411981092' },
  rollNo: { type: String, default: '2411981092' },
  department: { type: String, default: 'Computer Science & Engineering' },
  institution: { type: String, default: 'Chitkara University' },
  semester: { type: String, default: 'Fall 2026' },
  batch: { type: String, default: '2024' },
  problemsSolved: { type: Number, default: 142 },
  totalProblems: { type: Number, default: 250 },
  accuracy: { type: String, default: '88.5%' },
  performance: { type: Number, default: 88.5 },
  completedAssignments: { type: Number, default: 3 },
  streak: { type: Number, default: 14 },
  activeAssignmentsCount: { type: Number, default: 3 },
  enrolledCoursesCount: { type: Number, default: 3 },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  globalRank: { type: Number, default: 12 },
  avatar: { 
    type: String, 
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' 
  },
  badges: [{
    title: String,
    icon: String,
    desc: String,
    date: String
  }],

  // Faculty Specific Profile Fields
  title: { type: String, default: 'Professor & Head of CSE Dept' },
  totalStudents: { type: Number, default: 250 },
  activeAssignments: { type: Number, default: 32 },
  problemsCreated: { type: Number, default: 150 },
  averageScore: { type: String, default: '82%' }
}, { timestamps: true });

// Pre-save password hashing
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);
