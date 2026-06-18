import { useEffect, useState } from 'react'

// VITE_CODESPACE_NAME=your-codespace-name
const codespace = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = codespace
  ? `https://${codespace}-8000.app.github.dev`
  : 'http://localhost:8000'

const Leaderboard = () => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_BASE_URL}/api/leaderboard/`)
        const data = await response.json()
        const items = Array.isArray(data) ? data : data.results || []
        setEntries(items)
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
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <ol>
          {entries.map((entry) => (
            <li key={entry._id || entry.id}>
              {entry.user?.username || 'Unknown'} — {entry.points} pts
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default Leaderboard
