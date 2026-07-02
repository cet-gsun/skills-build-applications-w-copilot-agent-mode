import { Router } from 'express'
import Team from '../models/team.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().sort({ name: 1 }).limit(50)
    res.json(teams)
  } catch (error) {
    console.error('Team load error:', error)
    res.status(500).json({ error: 'Unable to load teams' })
  }
})

export default router
