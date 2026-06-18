import { useEffect, useState } from 'react'

// VITE_CODESPACE_NAME=your-codespace-name
const codespace = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = codespace
  ? `https://${codespace}-8000.app.github.dev`
  : 'http://localhost:8000'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/`)
        const data = await response.json()
        const items = Array.isArray(data) ? data : data.results || []
        setUsers(items)
      } catch (err) {
        setError(err?.message || String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <section>
      <h2>Users</h2>
      <p>
        Use <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to point the
        frontend to the Codespaces backend URL.
      </p>
      {loading && <p>Loading users…</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user._id || user.id}>{user.username || user.email}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Users
