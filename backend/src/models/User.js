import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'faculty'], default: 'student' },
  rollNo: { type: String, default: '2411981092' },
  department: { type: String, default: 'Computer Science & Engineering' },
  institution: { type: String, default: 'Chitkara University' },
  batch: { type: String, default: '2024' },
  problemsSolved: { type: Number, default: 142 },
  totalProblems: { type: Number, default: 250 },
  accuracy: { type: String, default: '88.5%' },
  streak: { type: Number, default: 14 },
  activeAssignmentsCount: { type: Number, default: 3 },
  enrolledCoursesCount: { type: Number, default: 3 },
  globalRank: { type: Number, default: 12 },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  badges: [{
    title: String,
    icon: String,
    desc: String,
    date: String
  }]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
