import { useEffect, useState } from 'react'
import { fetchLeaderboard, GenericItem } from '../services/api'

function Leaderboard() {
  const [entries, setEntries] = useState<GenericItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLeaderboard()
      .then(setEntries)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load leaderboard'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1>Leaderboard</h1>
      <p className="text-muted">Rankings are loaded from the backend with support for both arrays and paginated responses.</p>

      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !entries.length && <p>No leaderboard entries found.</p>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.rank ?? index + 1}</td>
                <td>{entry.name || 'Unknown'}</td>
                <td>{entry.score ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
