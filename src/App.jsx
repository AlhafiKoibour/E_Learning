import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Navbar, Footer, ProtectedRoute } from './components'
import {
  Home,
  Formations,
  FormationDetail,
  Login,
  Register,
  Dashboard,
  Contact,
  Learning,
} from './pages'
import { DashboardLayout }    from './pages/admin/DashboardLayout'
import { HomePage }           from './pages/admin/HomePage'
import { ComptePage }         from './pages/admin/ComptePage'
import { LessonPage }         from './pages/admin/LessonPage'
import { ModulePage }         from './pages/admin/ModulePage'
import { QuizPage }           from './pages/admin/QuizPage'
import { SessionPage }        from './pages/admin/SessionPage'
import { MentorshipPage }     from './pages/admin/MentorshipPage'
import { CertificatePage }    from './pages/admin/CertificatePage'
import { ProfilePage }        from './pages/admin/ProfilePage'
import { ResetPasswordPage }  from './pages/admin/ResetPasswordPage'

import { Toaster } from 'react-hot-toast'
import './styles/globals.css'

/* Wrapper qui cache la Navbar/Footer publics sur les routes admin */
function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/formations"      element={<Formations />} />
          <Route path="/formations/:id"  element={<FormationDetail />} />
          <Route path="/login"           element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="/learning"        element={<Learning />} />

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
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Admin Dashboard — sans Navbar ni Footer publics */}
          <Route path="/dashboardLayout/*" element={<AdminLayout />} />

          {/* Tout le reste — avec Navbar + Footer publics */}
          <Route path="/*" element={<PublicLayout />} />
        </Routes>

        <Toaster position="bottom-right" />
      </div>
    </Router>
  )
}

function AdminLayout() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index                   element={<HomePage />} />
        <Route path="accounts"         element={<ComptePage />} />
        <Route path="lessons"          element={<LessonPage />} />
        <Route path="module"           element={<ModulePage />} />
        <Route path="quiz"             element={<QuizPage />} />
        <Route path="sessions"         element={<SessionPage />} />
        <Route path="mentorship"       element={<MentorshipPage />} />
        <Route path="certificates"     element={<CertificatePage />} />
        <Route path="profile"          element={<ProfilePage />} />
        <Route path="reset-password"   element={<ResetPasswordPage />} />
        <Route path="*"                element={<Navigate to="/dashboardLayout" />} />
      </Route>
    </Routes>
  )
}

export default App
