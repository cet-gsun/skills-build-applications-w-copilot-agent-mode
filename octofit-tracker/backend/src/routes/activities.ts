import { Router } from 'express'
import Activity from '../models/activity.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().sort({ performedAt: -1 }).limit(50)
    res.json(activities)
  } catch (error) {
    console.error('Activity load error:', error)
    const message = error instanceof Error ? error.message : 'Unable to load activities'
    res.status(500).json({ error: 'Unable to load activities', details: message })
  }
})

router.post('/', async (req, res) => {
  try {
    const activity = new Activity(req.body)
    const saved = await activity.save()
    res.status(201).json({ data: saved })
  } catch (error) {
    res.status(400).json({ error: 'Unable to save activity', details: error })
  }
})

export default router
