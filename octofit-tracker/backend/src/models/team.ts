import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    memberIds: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
)

const Team = mongoose.model('Team', teamSchema)

export default Team
