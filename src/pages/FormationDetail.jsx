import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Loading, Modal } from '../components'
import { formationService } from '../services/formationService'
import { enrollmentService } from '../services/userService'
import { useAuth } from '../hooks/useAuth'
import { FaStar, FaUsers, FaClock, FaCheckCircle, FaFile } from 'react-icons/fa'
import toast from 'react-hot-toast'

export const FormationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [formation, setFormation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [showEnrollModal, setShowEnrollModal] = useState(false)

  useEffect(() => {
    fetchFormation()
  }, [id])

  const fetchFormation = async () => {
    setLoading(true)
    try {
      const response = await formationService.getById(id)
      setFormation(response.data)
    } catch (error) {
      toast.error('Erreur lors du chargement de la formation')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setIsEnrolling(true)
    try {
      await enrollmentService.enroll(id)
      toast.success('Inscription réussie!')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Erreur lors de l\'inscription')
      console.error(error)
    } finally {
      setIsEnrolling(false)
    }
  }

  if (loading) return <Loading />

  if (!formation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Formation non trouvée</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="h-96 bg-gradient-to-r from-primary to-blue-700 flex items-center justify-center text-white">
        <img
          src={formation.image || 'https://via.placeholder.com/1000x400'}
          alt={formation.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{formation.title}</h1>
            
            {/* Meta */}
            <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span>{formation.rating} ({formation.reviews} avis)</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers />
                <span>{formation.participants} apprenants</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{formation.duration} semaines</span>
              </div>
            </div>

            <p className="text-xl text-gray-700 mb-8">{formation.description}</p>

            {/* Tabs */}
            <div className="mt-8">
              <div className="border-b border-gray-200">
                <nav className="flex gap-8">
                  <button className="py-4 border-b-2 border-primary font-semibold">
                    Aperçu
                  </button>
                  <button className="py-4 text-gray-600">Modules</button>
                  <button className="py-4 text-gray-600">Avis</button>
                </nav>
              </div>

              <div className="py-8">
                {/* Learning Objectives */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">Objectifs d'apprentissage</h2>
                  <ul className="space-y-3">
                    {formation.objectives?.map((objective, i) => (
                      <li key={i} className="flex gap-3">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prerequisites */}
                {formation.prerequisites && (
                  <div className="mb-12 bg-blue-50 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Prérequis</h2>
                    <ul className="space-y-2">
                      {formation.prerequisites.map((pre, i) => (
                        <li key={i} className="flex gap-2">
                          <span>•</span>
                          <span>{pre}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* What's Included */}
                {formation.includes && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Inclus dans le programme</h2>
                    <ul className="space-y-3">
                      {formation.includes.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Modules */}
                {formation.modules && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Modules du programme</h2>
                    <div className="space-y-4">
                      {formation.modules.map((module, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4">
                          <h3 className="font-semibold text-lg mb-2">Module {i + 1}: {module.title}</h3>
                          <p className="text-gray-600 mb-3">{module.description}</p>
                          <div className="text-sm text-gray-500">
                            {module.lessons?.length || 0} leçons • {module.durationHours || 0} heures
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-3xl font-bold text-primary mb-2">
                {formation.price === 0 ? (
                  <span className="text-green-600 font-bold">
                    Gratuit 🎉
                  </span>
                ) : (
                  `${formation.price?.toLocaleString()} FCFA`
                )}
              </h2>
              <p className="text-gray-600 mb-6">
                {formation.price === 0 ? 'Accès gratuit & illimité' : 'Paiement unique'}
              </p>

              <Button
                fullWidth
                size="lg"
                onClick={handleEnroll}
                disabled={isEnrolling}
                className="mb-4"
              >
                {isEnrolling ? 'Inscription en cours...' : 'S\'inscrire maintenant'}
              </Button>

              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowEnrollModal(true)}
              >
                Demander un devis
              </Button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-4">Cette formation inclut :</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span>🎥</span>
                    <span>Accès illimité aux vidéos</span>
                  </li>
                  <li className="flex gap-2">
                    <span>📚</span>
                    <span>Ressources et exercices</span>
                  </li>
                  <li className="flex gap-2">
                    <span>👨‍🏫</span>
                    <span>Mentorat personnalisé</span>
                  </li>
                  <li className="flex gap-2">
                    <span>🏆</span>
                    <span>Certificat reconnu</span>
                  </li>
                  <li className="flex gap-2">
                    <span>💼</span>
                    <span>Aide à l\'insertion professionnelle</span>
                  </li>
                </ul>
              </div>

              {/* FAQ Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-4">Questions fréquentes</h3>
                <p className="text-sm text-gray-600">
                  <a href="/faq" className="text-primary hover:underline">
                    Consulter la FAQ
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        title="Demander un devis"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nom complet</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Téléphone</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="+213..."
            />
          </div>
          <Button fullWidth>Envoyer la demande</Button>
        </form>
      </Modal>
    </div>
  )
}
