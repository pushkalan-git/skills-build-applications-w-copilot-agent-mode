import { useEffect, useState } from 'react'

// VITE_CODESPACE_NAME=your-codespace-name (set in .env.local when using Codespaces)
const codespace = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = codespace
  ? `https://${codespace}-8000.app.github.dev`
  : 'http://localhost:8000'

const Activities = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_BASE_URL}/api/activities/`)
        const data = await response.json()
        const items = Array.isArray(data) ? data : data.results || []
        setActivities(items)
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
      <h2>Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id || activity.id}>
              {activity.type} - {activity.distance || 0} km - {activity.duration} min
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Activities
