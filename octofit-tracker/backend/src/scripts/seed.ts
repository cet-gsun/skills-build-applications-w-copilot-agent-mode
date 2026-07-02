import mongoose from 'mongoose'
import Activity from '../models/activity.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)

    console.log('Connected to octofit_db')

    const sampleActivity = {
      userId: 'user-123',
      type: 'Cycling',
      durationMinutes: 45,
      caloriesBurned: 520,
      notes: 'Morning endurance ride',
      performedAt: new Date(),
    }

    const existing = await Activity.findOne(sampleActivity)
    if (!existing) {
      const activity = new Activity(sampleActivity)
      await activity.save()
      console.log('Seeded sample activity:', activity.toObject())
    } else {
      console.log('Sample activity already exists, skipping seed.')
    }

    console.log('Database seeding complete')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
