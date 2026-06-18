import { useEffect, useState } from 'react'

const buildApiUrl = (endpoint) => {
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/${endpoint}`
  }

  return `http://localhost:8000/api/${endpoint}`
}

const Users = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = buildApiUrl('users')

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUsers(Array.isArray(data.users) ? data.users : data)
      })
      .catch((fetchError) => {
        setError(fetchError.message)
      })
  }, [])

  return (
    <section>
      <h2>Users</h2>
      <p>
        Use <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to point the
        frontend to the Codespaces backend URL.
      </p>
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id || user.id}>{user.username || user.email}</li>
        ))}
      </ul>
    </section>
  )
}

export default Users
