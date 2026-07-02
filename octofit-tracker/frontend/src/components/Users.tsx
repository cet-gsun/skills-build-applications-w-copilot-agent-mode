import { useEffect, useState } from 'react'
import { fetchUsers, GenericItem } from '../services/api'

function Users() {
  const [users, setUsers] = useState<GenericItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load users'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <p className="text-muted">Loaded from the backend and rendered from a flexible API response.</p>

      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !users.length && <p>No users found.</p>}

      <div className="row">
        {users.map((user, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name || 'Unnamed'}</h5>
                <p className="card-text">{user.email || 'No email provided'}</p>
                <p className="text-muted">Role: {user.role || 'member'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users
