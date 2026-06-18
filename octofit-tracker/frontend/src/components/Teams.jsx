import { useEffect, useState } from 'react'

// VITE_CODESPACE_NAME=your-codespace-name
const codespace = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = codespace
  ? `https://${codespace}-8000.app.github.dev`
  : 'http://localhost:8000'

const Teams = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_BASE_URL}/api/teams/`)
        const data = await response.json()
        const items = Array.isArray(data) ? data : data.results || []
        setTeams(items)
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
      <h2>Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {teams.map((team) => (
            <li key={team._id || team.id}>{team.name}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Teams
