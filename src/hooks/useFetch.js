import { useEffect, useState } from 'react'

export const useFetch = (url, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(url, {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        })
        if (!response.ok) throw new Error('Erreur lors du chargement')
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (url) {
      fetchData()
    }
  }, [url, ...dependencies])

  return { data, loading, error, refetch: () => fetchData() }
}
