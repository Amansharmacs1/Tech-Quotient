import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  facultyId: {
    type: String, // Future auth string or ObjectId
    required: true,
    default: 'faculty-123',
    index: true
  },
  courseName: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String
  },
  department: {
    type: String
  },
  semester: {
    type: String
  },
  academicYear: {
    type: String
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
