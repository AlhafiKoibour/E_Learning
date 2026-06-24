import { useState, useEffect } from 'react'
import { FormationCard, Loading } from '../components'
import { formationService } from '../services/formationService'
import { FaSearch, FaFilter } from 'react-icons/fa'

export const Formations = () => {
  const [formations, setFormations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    domain: '',
    level: '',
    mode: '',
  })

  useEffect(() => {
    fetchFormations()
  }, [filters])

  const fetchFormations = async () => {
    setLoading(true)
    try {
      const params = {
        ...filters,
        search: searchTerm,
      }
      const response = await formationService.getAll(params)
      setFormations(response.data)
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement des formations')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
  }

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Catalogue de Formations</h1>
          <p className="text-blue-100 text-lg">Trouvez la formation qui vous correspond</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une formation..."
                value={searchTerm}
                onChange={handleSearch}
                className="flex-1 outline-none"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Domaine</label>
              <select
                value={filters.domain}
                onChange={(e) => handleFilterChange('domain', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Tous les domaines</option>
                <option value="dev">Développement</option>
                <option value="design">Design</option>
                <option value="data">Data</option>
                <option value="marketing">Marketing</option>
                <option value="ia">Intelligence Artificielle</option>
                <option value="bureautique">Bureautique</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Niveau</label>
              <select
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Tous les niveaux</option>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Mode</label>
              <select
                value={filters.mode}
                onChange={(e) => handleFilterChange('mode', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Tous les modes</option>
                <option value="online">En ligne</option>
                <option value="hybrid">Hybride</option>
                <option value="onsite">Sur site</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilters({ domain: '', level: '', mode: '' })
                  setSearchTerm('')
                }}
                className="w-full border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white font-semibold"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-8">
            {error}
          </div>
        )}

        {formations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Aucune formation trouvée</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation) => (
              <FormationCard
                key={formation.id}
                id={formation.id}
                title={formation.title}
                description={formation.description}
                image={formation.image || 'https://via.placeholder.com/300x200'}
                level={formation.level}
                duration={formation.duration}
                participants={formation.participants || 0}
                rating={formation.rating || 0}
                price={formation.price || 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
