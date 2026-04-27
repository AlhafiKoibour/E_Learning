import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            FormationHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-primary">
              Accueil
            </Link>
            <Link to="/formations" className="text-gray-700 hover:text-primary">
              Formations
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary">
              À propos
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary">
              Contact
            </Link>

            {isAuthenticated ? (
              <div className="flex gap-3 items-center">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary"
                >
                  Tableau de bord
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="text-primary border border-primary px-4 py-2 rounded hover:bg-primary hover:text-white"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 pb-4">
            <Link to="/" className="text-gray-700 hover:text-primary">
              Accueil
            </Link>
            <Link to="/formations" className="text-gray-700 hover:text-primary">
              Formations
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary">
              À propos
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary">
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary"
                >
                  Tableau de bord
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-primary border border-primary px-4 py-2 rounded text-center"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded text-center"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
