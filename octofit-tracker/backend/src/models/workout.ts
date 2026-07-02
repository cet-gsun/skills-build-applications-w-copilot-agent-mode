import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, required: true, enum: ['low', 'medium', 'high'], default: 'medium' },
    exercises: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
)

const Workout = mongoose.model('Workout', workoutSchema)

export default Workout
