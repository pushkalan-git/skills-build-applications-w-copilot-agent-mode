import { useEffect, useState } from 'react'

// VITE_CODESPACE_NAME=your-codespace-name
const codespace = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = codespace
  ? `https://${codespace}-8000.app.github.dev`
  : 'http://localhost:8000'

const Workouts = () => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_BASE_URL}/api/workouts/`)
        const data = await response.json()
        const items = Array.isArray(data) ? data : data.results || []
        setWorkouts(items)
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
      <h2>Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id || workout.id}>
              {workout.title} — {workout.type} ({workout.difficulty})
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Workouts
