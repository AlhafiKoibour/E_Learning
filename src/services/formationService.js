import apiClient from './apiClient'
import axios from 'axios'

const postgrestClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour ajouter le token
postgrestClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Intercepteur pour gérer les erreurs
postgrestClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const formationService = {
  getAll: (params) => postgrestClient.get('/formations', { params }),
  getById: async (id) => {
    const response = await postgrestClient.get(`/formations?id=eq.${id}`)
    return { data: response.data[0] }
  },
  create: (data) => apiClient.post('/formations', data),
  update: (id, data) => apiClient.put(`/formations/${id}`, data),
  delete: (id) => apiClient.delete(`/formations/${id}`),
  search: (query) => apiClient.get('/formations/search', { params: { q: query } }),
}

export const moduleService = {
  getByFormation: (formationId) =>
    apiClient.get(`/formations/${formationId}/modules`),
  getById: (id) => apiClient.get(`/modules/${id}`),
  create: (data) => apiClient.post('/modules', data),
  update: (id, data) => apiClient.put(`/modules/${id}`, data),
  delete: (id) => apiClient.delete(`/modules/${id}`),
}

export const lessonService = {
  getByModule: (moduleId) => apiClient.get(`/modules/${moduleId}/lessons`),
  getById: (id) => apiClient.get(`/lessons/${id}`),
  create: (data) => apiClient.post('/lessons', data),
  update: (id, data) => apiClient.put(`/lessons/${id}`, data),
  delete: (id) => apiClient.delete(`/lessons/${id}`),
}

export const projectService = {
  getByModule: (moduleId) => apiClient.get(`/modules/${moduleId}/projects`),
  getById: (id) => apiClient.get(`/projects/${id}`),
  submitProject: (projectId, data) =>
    apiClient.post(`/projects/${projectId}/submit`, data),
  getSubmissions: (projectId) =>
    apiClient.get(`/projects/${projectId}/submissions`),
}

export const quizService = {
  getByModule: (moduleId) => apiClient.get(`/modules/${moduleId}/quizzes`),
  getById: (id) => apiClient.get(`/quizzes/${id}`),
  submitQuiz: (quizId, answers) =>
    apiClient.post(`/quizzes/${quizId}/submit`, { answers }),
}
