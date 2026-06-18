import { Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

import App from './App.jsx'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/users" replace />} />
      <Route path="users" element={<Users />} />
      <Route path="activities" element={<Activities />} />
      <Route path="teams" element={<Teams />} />
      <Route path="leaderboard" element={<Leaderboard />} />
      <Route path="workouts" element={<Workouts />} />
    </Route>
  </Routes>
)

export default AppRoutes
