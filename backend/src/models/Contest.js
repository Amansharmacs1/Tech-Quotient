import mongoose from 'mongoose';

const leaderboardRowSchema = new mongoose.Schema({
  rank: Number,
  name: String,
  score: Number,
  solved: Number,
  penalty: String
});

const contestSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  status: { type: String, enum: ['Live', 'Upcoming', 'Completed'], default: 'Upcoming' },
  participants: { type: Number, default: 0 },
  duration: { type: String, default: '2 Hours' },
  questionsCount: { type: Number, default: 4 },
  startTime: { type: String },
  userRank: { type: Number },
  score: { type: Number },
  leaderboard: [leaderboardRowSchema]
}, { timestamps: true });

export default mongoose.models.Contest || mongoose.model('Contest', contestSchema);
