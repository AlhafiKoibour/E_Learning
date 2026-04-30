export const getApiErrorMessage = (error) => {
  if (!error) return 'Erreur inconnue.'

  if (error.response) {
    const { status, statusText, data } = error.response

    if (data) {
      if (typeof data.message === 'string' && data.message.trim()) {
        return data.message
      }
      if (typeof data.error === 'string' && data.error.trim()) {
        return data.error
      }
      if (typeof data.errors === 'string' && data.errors.trim()) {
        return data.errors
      }
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        return data.errors.join(', ')
      }
      if (typeof data === 'string' && data.trim()) {
        return data
      }
    }

    if (status && statusText) {
      return `Erreur ${status} ${statusText}`
    }
    if (status) {
      return `Erreur ${status}`
    }
  }

  return error.message || 'Erreur inconnue.'
}
