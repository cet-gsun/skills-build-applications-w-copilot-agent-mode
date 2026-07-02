import { Router } from 'express'
import userRoutes from './users.js'
import teamRoutes from './teams.js'
import activityRoutes from './activities.js'
import leaderboardRoutes from './leaderboard.js'
import workoutRoutes from './workouts.js'

const router = Router()

router.use('/users', userRoutes)
router.use('/teams', teamRoutes)
router.use('/activities', activityRoutes)
router.use('/leaderboard', leaderboardRoutes)
router.use('/workouts', workoutRoutes)

export default router
