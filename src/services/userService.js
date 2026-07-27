import apiClient from './apiClient'

export const authService = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  register: (userData) => apiClient.post('/auth/register', userData),
  logout: () => apiClient.post('/auth/logout'),
  getCurrentUser: () => apiClient.get('/auth/me'),
  refreshToken: () => apiClient.post('/auth/refresh'),
  resetPassword: (email) => apiClient.post('/auth/reset-password', { email }),
  confirmResetPassword: (token, newPassword) =>
    apiClient.post('/auth/confirm-reset-password', { token, newPassword }),
}

export const userService = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.put('/users/profile', data),
  changePassword: (oldPassword, newPassword) =>
    apiClient.post('/users/change-password', { oldPassword, newPassword }),
  getMyFormations: () => apiClient.get('/users/formations'),
  getProgress: (formationId) =>
    apiClient.get(`/users/progress/${formationId}`),
  getStats: () => apiClient.get('/users/stats'),
}

export const enrollmentService = {
  enroll: (formationId) => apiClient.post(`/formations/${formationId}/enroll`),
  getEnrollments: () => apiClient.get('/enrollments'),
  cancelEnrollment: (enrollmentId) =>
    apiClient.delete(`/enrollments/${enrollmentId}`),
  getCohorte: (enrollmentId) =>
    apiClient.get(`/enrollments/${enrollmentId}/cohorte`),
  updateProgress: (enrollmentId, progress) =>
    apiClient.put(`/enrollments/${enrollmentId}/progress`, null, { params: { progress } }),
}

export const paymentService = {
  initializePayment: (enrollmentId) =>
    apiClient.post(`/payments/initialize/${enrollmentId}`),
  confirmPayment: (orderId, data) =>
    apiClient.post(`/payments/confirm/${orderId}`, data),
  getPaymentHistory: () => apiClient.get('/payments/history'),
}
