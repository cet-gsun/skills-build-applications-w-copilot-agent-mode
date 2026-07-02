import { useEffect, useState } from 'react'
import { fetchTeams, GenericItem } from '../services/api'

function Teams() {
  const [teams, setTeams] = useState<GenericItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTeams()
      .then(setTeams)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load teams'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1>Teams</h1>
      <p className="text-muted">Team data is displayed from the backend API using a paginated/array-compatible parser.</p>

      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !teams.length && <p>No teams found.</p>}

      <div className="list-group">
        {teams.map((team, index) => (
          <div key={index} className="list-group-item">
            <strong>{team.name || 'Unnamed team'}</strong>
            <div>{team.description || 'No description available.'}</div>
            <div className="text-muted small">Members: {Array.isArray(team.memberIds) ? team.memberIds.length : 'unknown'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Teams
