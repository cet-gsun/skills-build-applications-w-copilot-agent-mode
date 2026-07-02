import { useEffect, useState } from 'react'
import { fetchActivities, createActivity, ActivityPayload, ActivityWithId } from '../services/api'

function Activities() {
  const [activities, setActivities] = useState<ActivityWithId[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchActivities()
      .then(setActivities)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load activities'))
      .finally(() => setLoading(false))
  }, [])

  const handleAddSample = async () => {
    setError(null)

    const sample: ActivityPayload = {
      userId: 'user-123',
      type: 'Cycling',
      durationMinutes: 45,
      caloriesBurned: 420,
      notes: 'Sample activity',
      performedAt: new Date().toISOString(),
    }

    try {
      const created = await createActivity(sample)
      setActivities((current) => [created, ...current])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1>Activities</h1>
          <p className="text-muted">Fetches activities from the backend and supports array or paginated responses.</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={handleAddSample}>
          Add Sample Activity
        </button>
      </div>

      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !activities.length && <p>No activities found yet.</p>}

      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity._id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <strong>{activity.type}</strong>
              <span>{activity.durationMinutes} min</span>
            </div>
            <div>{activity.caloriesBurned} calories</div>
            <div className="text-muted small">{activity.notes || 'No notes'}</div>
            <div className="text-muted small">{activity.performedAt ? new Date(activity.performedAt).toLocaleString() : 'No date'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Activities
