import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
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
  description: {
    type: String
  },
  problemIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }],
  deadline: {
    type: Date,
    index: true
  },
  duration: {
    type: Number, // in minutes
  },
  maximumMarks: {
    type: Number
  },
  attemptsAllowed: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Closed'],
    default: 'Published'
  }
}, { timestamps: true });

export default mongoose.model('Assignment', assignmentSchema);
