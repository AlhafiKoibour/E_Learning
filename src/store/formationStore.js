import { create } from 'zustand'

export const useFormationStore = create((set, get) => ({
  formations: [],
  selectedFormation: null,
  isLoading: false,
  error: null,

  setFormations: (formations) => set({ formations }),
  setSelectedFormation: (formation) => set({ selectedFormation: formation }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchFormations: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/formations')
      const data = await response.json()
      set({ formations: data, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  fetchFormationById: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/formations/${id}`)
      const data = await response.json()
      set({ selectedFormation: data, isLoading: false })
      return data
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  filterFormations: (filters) => {
    const { formations } = get()
    return formations.filter((formation) => {
      if (filters.domain && formation.domain !== filters.domain) return false
      if (filters.level && formation.level !== filters.level) return false
      if (filters.duration && formation.duration > filters.duration) return false
      if (filters.mode && !formation.modes.includes(filters.mode)) return false
      return true
    })
  },
}))
