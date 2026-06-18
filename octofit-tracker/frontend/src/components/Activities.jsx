import { useEffect, useState } from 'react'

const buildApiUrl = (endpoint) => {
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/${endpoint}`
  }

  return `http://localhost:8000/api/${endpoint}`
}

const Activities = () => {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = buildApiUrl('activities')

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setActivities(Array.isArray(data.activities) ? data.activities : data)
      })
      .catch((fetchError) => {
        setError(fetchError.message)
      })
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id || activity.id}>
            {activity.type} - {activity.distance || 0} km - {activity.duration} min
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Activities
