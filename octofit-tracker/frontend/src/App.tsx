import { Link, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function Home() {
  return (
    <div className="container py-5">
      <div className="p-5 mb-4 bg-light rounded-3">
        <h1 className="display-6">OctoFit Tracker</h1>
        <p className="lead">A modern multi-tier fitness tracker with React, Express, and MongoDB.</p>
        <p>
          The frontend uses Vite environment variables and react-router-dom for navigation. If you are running in GitHub Codespaces,
          set <code>VITE_CODESPACE_NAME</code> so the app can target the Codespaces backend URL.
        </p>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Pages</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Link to="/activities">Activities</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/users">Users</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/teams">Teams</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/workouts">Workouts</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/leaderboard">Leaderboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Environment</h2>
              <p>
                The client resolves API calls using the Codespaces URL when <code>VITE_CODESPACE_NAME</code> is available.
                Otherwise it falls back to the local Vite proxy or localhost backend for safe development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">Workouts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
