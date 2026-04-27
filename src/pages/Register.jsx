import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/userService'
import toast from 'react-hot-toast'
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa'

export const Register = () => {
  const navigate = useNavigate()
  const { setUser, setToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis'
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis'
    if (!formData.email) newErrors.email = 'Email requis'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email invalide'
    if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis'
    if (!formData.password) newErrors.password = 'Mot de passe requis'
    else if (formData.password.length < 6)
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères'
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    if (!formData.agreeTerms)
      newErrors.agreeTerms = 'Vous devez accepter les conditions'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    try {
      const response = await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })
      setToken(response.data.token)
      setUser(response.data.user)
      toast.success('Inscription réussie!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'inscription')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">FormationHub</h1>
          <p className="text-center text-gray-600 mb-8">Créez votre compte</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Prénom</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <FaUser className="text-gray-400 mr-2" size={14} />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="flex-1 outline-none text-sm"
                    placeholder="Jean"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Nom</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <FaUser className="text-gray-400 mr-2" size={14} />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="flex-1 outline-none text-sm"
                    placeholder="Dupont"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <FaEnvelope className="text-gray-400 mr-2" size={14} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                  placeholder="votre@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Téléphone</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <FaPhone className="text-gray-400 mr-2" size={14} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                  placeholder="+213..."
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Mot de passe</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <FaLock className="text-gray-400 mr-2" size={14} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                  placeholder="••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Confirmer le mot de passe
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <FaLock className="text-gray-400 mr-2" size={14} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="flex-1 outline-none text-sm"
                  placeholder="••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">
                J'accepte les{' '}
                <a href="/terms" className="text-primary hover:underline">
                  conditions d'utilisation
                </a>{' '}
                et la{' '}
                <a href="/privacy" className="text-primary hover:underline">
                  politique de confidentialité
                </a>
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>
            )}

            <Button fullWidth size="lg" disabled={isLoading}>
              {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
            </Button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Déjà inscrit ?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
