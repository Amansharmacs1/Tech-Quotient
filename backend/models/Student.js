import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String, // Ref to external auth system
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
    type: String
  },
  department: {
    type: String
  },
  semester: {
    type: String
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  performance: {
    type: Number,
    default: 0
  },
  completedAssignments: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
