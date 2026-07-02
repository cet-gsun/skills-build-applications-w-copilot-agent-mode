import { useEffect, useState } from 'react'
import { fetchWorkouts, GenericItem } from '../services/api'

function Workouts() {
  const [workouts, setWorkouts] = useState<GenericItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchWorkouts()
      .then(setWorkouts)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load workouts'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1>Workouts</h1>
      <p className="text-muted">Workout metadata is fetched from the backend and rendered dynamically.</p>

      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !workouts.length && <p>No workouts available.</p>}

      <div className="row">
        {workouts.map((workout, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.name || 'Unnamed workout'}</h5>
                <p className="card-text">{workout.description || 'No description'}</p>
                <p className="text-muted">Category: {workout.category || 'General'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Workouts
