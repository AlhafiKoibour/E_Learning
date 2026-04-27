import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar, Footer, ProtectedRoute } from './components'
import {
  Home,
  Formations,
  FormationDetail,
  Login,
  Register,
  Dashboard,
  Learning,
} from './pages'
import { Toaster } from 'react-hot-toast'
import './styles/globals.css'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/formations/:id" element={<FormationDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learner/formation/:formationId"
              element={
                <ProtectedRoute>
                  <Learning />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  )
}

export default App
