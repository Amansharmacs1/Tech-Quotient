import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    default: '2411981092'
  },
  department: {
    type: String,
    default: 'Computer Science & Engineering'
  },
  semester: {
    type: String,
    default: 'Fall 2026'
  },
  institution: {
    type: String,
    default: 'Chitkara University'
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  performance: {
    type: Number,
    default: 88.5
  },
  completedAssignments: {
    type: Number,
    default: 2
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', studentSchema);
