import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
import  { DashboardLayout }  from './pages/admin/DashboardLayout'

import  { HomePage }  from './pages/admin/HomePage'

import  { ComptePage }  from './pages/admin/ComptePage'
import  { LessonPage }  from './pages/admin/LessonPage'
import  { ModulePage }  from './pages/admin/ModulePage'

import  { QuizPage }  from './pages/admin/QuizPage'

import { Toaster } from 'react-hot-toast'
import './styles/globals.css'
import Topbar from './pages/admin/Topbar'

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
          
            <Route path="/dashboardLayout" element={<DashboardLayout />}>
              <Route index element={<HomePage />} />
              <Route path="accounts" element={<ComptePage />} />
               <Route path="lessons" element={<LessonPage />} />
              <Route path="module" element={<ModulePage />} />
              <Route path="quiz" element={<QuizPage />} />
            </Route>

            <Route path="/module" element={<ModulePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/learning" element={<Learning />} />


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
