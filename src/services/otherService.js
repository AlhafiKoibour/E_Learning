import apiClient from './apiClient'

export const messageService = {
  getConversations: () => apiClient.get('/messages/conversations'),
  getMessages: (conversationId) =>
    apiClient.get(`/messages/conversations/${conversationId}`),
  sendMessage: (conversationId, content) =>
    apiClient.post(`/messages/conversations/${conversationId}`, { content }),
  startConversation: (userId) =>
    apiClient.post('/messages/conversations', { userId }),
}

export const certificateService = {
  getMyCertificates: () => apiClient.get('/certificates'),
  getCertificate: (id) => apiClient.get(`/certificates/${id}`),
  downloadCertificate: (id) =>
    apiClient.get(`/certificates/${id}/download`, { responseType: 'blob' }),
}

export const jobService = {
  getJobs: (params) => apiClient.get('/jobs', { params }),
  getJobById: (id) => apiClient.get(`/jobs/${id}`),
  applyJob: (jobId, applicationData) =>
    apiClient.post(`/jobs/${jobId}/apply`, applicationData),
  getMyApplications: () => apiClient.get('/jobs/applications'),
}

export const mentorshipService = {
  getMentors: () => apiClient.get('/mentors'),
  getMentor: (id) => apiClient.get(`/mentors/${id}`),
  bookSession: (mentorId, data) =>
    apiClient.post(`/mentors/${mentorId}/book`, data),
  getMyMentorSessions: () => apiClient.get('/mentorship/sessions'),
  cancelSession: (sessionId) =>
    apiClient.delete(`/mentorship/sessions/${sessionId}`),
}

export const dashboardService = {
  getAnalytics: () => apiClient.get('/dashboard/analytics'),
  getLearnerStats: () => apiClient.get('/dashboard/learner-stats'),
  getAdminStats: () => apiClient.get('/dashboard/admin-stats'),
}
