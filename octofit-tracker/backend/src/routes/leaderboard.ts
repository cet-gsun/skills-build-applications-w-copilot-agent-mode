import { Router } from 'express'
import Leaderboard from '../models/leaderboard.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const standings = await Leaderboard.find().sort({ rank: 1 }).limit(50)
    res.json({ data: standings })
  } catch (error) {
    console.error('Leaderboard load error:', error)
    res.status(500).json({ error: 'Unable to load leaderboard' })
  }
})

export default router
