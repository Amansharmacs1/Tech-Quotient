import mongoose from 'mongoose';

const moduleTopicSchema = new mongoose.Schema({
  num: Number,
  tag: String,
  title: String,
  done: Boolean
});

const courseModuleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  status: String,
  commentsCount: Number,
  docsCount: Number,
  name: String,
  completed: Boolean,
  current: Boolean,
  topics: [moduleTopicSchema]
});

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  progress: { type: Number, default: 0 },
  sections: { type: Number, default: 10 },
  studentsCount: { type: Number, default: 100 },
  modules: [courseModuleSchema]
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
