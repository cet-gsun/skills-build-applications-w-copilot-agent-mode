import express from 'express'
import { connectDB } from './config/database.js'
import activityRoutes from './routes/activities.js'

const app = express()

app.use(express.json())
app.use('/api/activities', activityRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend running' })
})

app.get('/api', (_req, res) => {
  res.json({ message: 'Welcome to OctoFit Tracker API' })
})

const port = Number(process.env.PORT) || 8000

connectDB.then(() => {
  app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`)
  })
})

export default app
