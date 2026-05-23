import apiClient from './apiClient'

const normalizePageResponse = (response) => {
  return {
    data: Array.isArray(response.data?.content)
      ? response.data.content
      : [],
  }
}

export const formationService = {
  getAll: async (params) => {
    const response = await apiClient.get('/formations', { params })
    return normalizePageResponse(response)
  },
  getById: (id) => apiClient.get(`/formations/${id}`),
  create: (data) => apiClient.post('/formations', data),
  update: (id, data) => apiClient.put(`/formations/${id}`, data),
  delete: (id) => apiClient.delete(`/formations/${id}`),
  search: async (query) => {
    const response = await apiClient.get('/formations/search', {
      params: { q: query },
    })
    return normalizePageResponse(response)
  },
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
