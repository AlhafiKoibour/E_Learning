import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components'
import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/userService'
import toast from 'react-hot-toast'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { getApiErrorMessage } from '../utils/errorHelper'

export const Login = () => {
  const navigate = useNavigate()
  const { setUser, setToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email requis'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email invalide'
    if (!formData.password) newErrors.password = 'Mot de passe requis'
    else if (formData.password.length < 6)
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
      const response = await authService.login(formData.email, formData.password)
      const user = response.data?.user
      setToken(response.data.token)
      setUser(user)
      toast.success('Connexion réussie!')
      
      if (user?.role === 'ADMIN') {
        navigate('/dashboardLayout')
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Erreur connexion:', error)
      toast.error(getApiErrorMessage(error) || 'Erreur de connexion')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">ToumaiHub</h1>
          <p className="text-center text-gray-600 mb-8">Connexion à votre compte</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 outline-none"
                  placeholder="votre@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Mot de passe</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="flex-1 outline-none"
                  placeholder="••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Se souvenir de moi</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            <Button fullWidth size="lg" disabled={isLoading}>
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              S'inscrire maintenant
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
