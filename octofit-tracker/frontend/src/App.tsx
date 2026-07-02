import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchActivities, createActivity, ActivityPayload } from './services/api'

function Home() {
  const [activities, setActivities] = useState<Array<ActivityPayload & { _id: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchActivities()
      .then((result) => {
        setActivities(result.data)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleAddExample = async () => {
    setError(null)

    const newActivity: ActivityPayload = {
      userId: 'user-123',
      type: 'Running',
      durationMinutes: 30,
      caloriesBurned: 280,
      notes: 'Morning run',
      performedAt: new Date().toISOString(),
    }

    try {
      const result = await createActivity(newActivity)
      setActivities((current) => [result.data, ...current])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    }
  }

  return (
    <div className="container py-5">
      <div className="p-5 mb-4 bg-light rounded-3">
        <h1 className="display-6">OctoFit Tracker</h1>
        <p className="lead">A modern multi-tier fitness tracker with React, Express, and MongoDB.</p>
        <button className="btn btn-primary" type="button" onClick={handleAddExample}>
          Add Example Activity
        </button>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Recent Activities</h2>
              {loading && <p>Loading activities...</p>}
              {error && <div className="alert alert-danger">{error}</div>}
              {!loading && !activities.length && <p>No activities found.</p>}
              <ul className="list-group">
                {activities.map((activity) => (
                  <li key={activity._id} className="list-group-item">
                    <strong>{activity.type}</strong> — {activity.durationMinutes} min, {activity.caloriesBurned} cal
                    <div className="text-muted small">{new Date(activity.performedAt).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">App Summary</h2>
              <p>React client communicates with the Express backend via Vite proxy to port 8000.</p>
              <p>Use the button above to post a sample activity and refresh the activity list.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
