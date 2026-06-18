import { useEffect, useState } from 'react'

const buildApiUrl = (endpoint) => {
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  const prefix = codespace
    ? `https://${codespace}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  return `${prefix}/${endpoint}/`
}

const Leaderboard = () => {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = buildApiUrl('leaderboard')

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setEntries(Array.isArray(data.leaderboard) ? data.leaderboard : data)
      })
      .catch((fetchError) => {
        setError(fetchError.message)
      })
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="error">Error: {error}</p>}
      <ol>
        {entries.map((entry) => (
          <li key={entry._id || entry.id}>
            {entry.user?.username || 'Unknown'} — {entry.points} pts
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Leaderboard
