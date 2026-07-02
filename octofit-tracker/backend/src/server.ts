import express from 'express'
import { connectDB } from './config/database.js'
import apiRouter from './routes/index.js'

const app = express()

app.use(express.json())
app.use('/api', apiRouter)

const port = Number(process.env.PORT) || 8000
const codespaceName = process.env.CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.githubpreview.dev`
  : `http://localhost:${port}`

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend running', apiUrl })
})

app.get('/api', (_req, res) => {
  res.json({ message: 'Welcome to OctoFit Tracker API', apiUrl })
})

connectDB.then(() => {
  app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`)
    if (codespaceName) {
      console.log(`Codespaces API URL: ${apiUrl}`)
    }
  })
})

export default app
