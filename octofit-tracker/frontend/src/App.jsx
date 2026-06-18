import { NavLink, Outlet } from 'react-router-dom'
import './App.css'

const getBackendBaseUrl = () => {
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  if (codespace && typeof codespace === 'string') {
    return `https://${codespace}-8000.app.github.dev/api`
  }

  return 'http://localhost:8000/api'
}

const App = () => {
  const backendUrl = getBackendBaseUrl()

  return (
    <div className="app-shell">
      <header>
        <h1>OctoFit Tracker</h1>
        <p>
          Frontend is configured to use <code>VITE_CODESPACE_NAME</code> in{' '}
          <code>.env.local</code> for Codespaces.
        </p>
        <p>Backend base URL: <code>{backendUrl}</code></p>
      </header>

      <nav>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
