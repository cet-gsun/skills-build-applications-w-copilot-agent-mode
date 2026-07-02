import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
)

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)

export default Leaderboard
