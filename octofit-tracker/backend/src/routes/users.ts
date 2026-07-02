import { Router } from 'express'
import User from '../models/user.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const users = await User.find().sort({ name: 1 }).limit(50)
    res.json(users)
  } catch (error) {
    console.error('User load error:', error)
    res.status(500).json({ error: 'Unable to load users' })
  }
})

export default router
