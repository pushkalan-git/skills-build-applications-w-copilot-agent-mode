import { useEffect, useState } from 'react'

const buildApiUrl = (endpoint) => {
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  const prefix = codespace
    ? `https://${codespace}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  return `${prefix}/${endpoint}/`
}

const Teams = () => {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = buildApiUrl('teams')

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTeams(Array.isArray(data.teams) ? data.teams : data)
      })
      .catch((fetchError) => {
        setError(fetchError.message)
      })
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {teams.map((team) => (
          <li key={team._id || team.id}>{team.name}</li>
        ))}
      </ul>
    </section>
  )
}

export default Teams
