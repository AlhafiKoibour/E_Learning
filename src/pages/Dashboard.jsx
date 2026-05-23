import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Loading } from '../components'
import { userService } from '../services/userService'
import { useAuth } from '../hooks/useAuth'
import { FaBook, FaTrophy, FaClock, FaCheckCircle, FaArrowRight } from 'react-icons/fa'

export const Dashboard = () => {
  const { user } = useAuth()
  const [formations, setFormations] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [formationsRes, statsRes] = await Promise.all([
        userService.getMyFormations(),
        userService.getStats(),
      ])
      setFormations(formationsRes.data)
      setStats(statsRes.data)
    } catch (error) {
      console.error('Erreur lors du chargement des données', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">
            Bienvenue, {user?.firstName}!
          </h1>
          <p className="text-blue-100">Continuez votre parcours d'apprentissage</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Formations Suivies</p>
                  <p className="text-3xl font-bold mt-2">{stats.enrollmentCount}</p>
                </div>
                <FaBook className="text-4xl text-blue-200" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Heures Complétées</p>
                  <p className="text-3xl font-bold mt-2">{stats.hoursCompleted}</p>
                </div>
                <FaClock className="text-4xl text-green-200" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Certificats</p>
                  <p className="text-3xl font-bold mt-2">{stats.certificateCount}</p>
                </div>
                <FaTrophy className="text-4xl text-yellow-200" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Progression Moyenne</p>
                  <p className="text-3xl font-bold mt-2">{stats.averageProgress}%</p>
                </div>
                <FaCheckCircle className="text-4xl text-purple-200" />
              </div>
            </div>
          </div>
        )}

        {/* Current Formations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Mes Formations</h2>
          {formations.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">
                Vous ne suivez pas encore de formations
              </p>
              <Link
                to="/formations"
                className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Découvrir les formations
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formations.map((formation) => (
                <div
                  key={formation.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-40 bg-gradient-to-r from-primary to-blue-700"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{formation.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {formation.description?.substring(0, 80)}...
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">Progression</span>
                        <span className="text-sm font-bold text-primary">
                          {formation.progress || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${formation.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <Link
                      to={`/learner/formation/${formation.id}`}
                      className="text-primary font-semibold hover:text-blue-700 flex items-center gap-2"
                    >
                      Continuer <FaArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/messages">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">📧 Mes Messages</h3>
              <p className="text-gray-600">
                Communiquez avec vos formateurs et mentors
              </p>
            </div>
          </Link>

          <Link to="/certificates">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">🏆 Mes Certificats</h3>
              <p className="text-gray-600">
                Consultez et téléchargez vos certificats
              </p>
            </div>
          </Link>

          <Link to="/mentorship">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">👨‍🏫 Mentorat</h3>
              <p className="text-gray-600">
                Réservez une session avec votre mentor
              </p>
            </div>
          </Link>

          <Link to="/jobs">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">💼 Offres d'Emploi</h3>
              <p className="text-gray-600">
                Explorez les opportunités carrière
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
