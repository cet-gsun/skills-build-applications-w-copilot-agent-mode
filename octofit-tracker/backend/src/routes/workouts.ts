import { Router } from 'express'
import Workout from '../models/workout.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ name: 1 }).limit(50)
    res.json({ data: workouts })
  } catch (error) {
    console.error('Workout load error:', error)
    res.status(500).json({ error: 'Unable to load workouts' })
  }
})

export default router
