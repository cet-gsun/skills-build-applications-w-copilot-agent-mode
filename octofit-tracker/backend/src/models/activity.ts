import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    notes: { type: String, default: '' },
    performedAt: { type: Date, required: true, default: () => new Date() }
  },
  {
    timestamps: true,
  }
)

const Activity = mongoose.model('Activity', activitySchema)

export default Activity
