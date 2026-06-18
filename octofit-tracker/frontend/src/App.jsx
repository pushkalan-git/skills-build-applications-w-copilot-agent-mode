import { Link, Outlet } from 'react-router-dom'
import './App.css'

const App = () => {
  // VITE_CODESPACE_NAME=your-codespace-name
  // Use Codespaces name to build backend URL in components.

  return (
    <div className="app-shell">
      <header>
        <h1>OctoFit Tracker</h1>
        <p>
          Frontend uses <code>VITE_CODESPACE_NAME</code> to target a Codespaces
          backend when available.
        </p>
      </header>

      <nav>
        <Link to="/users">Users</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/workouts">Workouts</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
