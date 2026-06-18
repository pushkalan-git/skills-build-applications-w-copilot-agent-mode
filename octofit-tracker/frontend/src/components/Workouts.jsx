import { useEffect, useState } from 'react'

const buildApiUrl = (endpoint) => {
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  const prefix = codespace
    ? `https://${codespace}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  return `${prefix}/${endpoint}/`
}

const Workouts = () => {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = buildApiUrl('workouts')

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(Array.isArray(data.workouts) ? data.workouts : data)
      })
      .catch((fetchError) => {
        setError(fetchError.message)
      })
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id || workout.id}>
            {workout.title} — {workout.type} ({workout.difficulty})
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Workouts
