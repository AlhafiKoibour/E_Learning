import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'

export const useAuth = () => {
  const { user, isAuthenticated, token, login, logout, setUser, setToken } =
    useAuthStore()

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié au chargement
    if (token && !user) {
      const fetchUser = async () => {
        try {
          const response = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          })
          const data = await response.json()
          if (response.ok) {
            setUser(data)
          } else {
            setToken(null)
          }
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'utilisateur', error)
          setToken(null)
        }
      }
      fetchUser()
    }
  }, [token, user, setUser, setToken])

  return {
    user,
    isAuthenticated,
    login,
    logout,
    token,
    setUser,
    setToken
  }
}
