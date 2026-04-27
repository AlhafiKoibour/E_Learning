import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Loading } from './Loading'

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && (!user || !user.roles?.includes(requiredRole))) {
    return <Navigate to="/" replace />
  }

  return children
}
