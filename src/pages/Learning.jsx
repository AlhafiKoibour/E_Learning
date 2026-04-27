import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loading } from '../components'
import { moduleService, lessonService } from '../services/formationService'
import { FaVideo, FaFile, FaClock, FaCheckCircle } from 'react-icons/fa'

export const Learning = () => {
  const { formationId } = useParams()
  const [modules, setModules] = useState([])
  const [selectedModule, setSelectedModule] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchModules()
  }, [formationId])

  const fetchModules = async () => {
    setLoading(true)
    try {
      const response = await moduleService.getByFormation(formationId)
      setModules(response.data)
      if (response.data.length > 0) {
        setSelectedModule(response.data[0])
        fetchLessons(response.data[0].id)
      }
    } catch (error) {
      console.error('Erreur', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchLessons = async (moduleId) => {
    try {
      const response = await lessonService.getByModule(moduleId)
      setLessons(response.data)
      if (response.data.length > 0) {
        setSelectedLesson(response.data[0])
      }
    } catch (error) {
      console.error('Erreur', error)
    }
  }

  const handleModuleSelect = (module) => {
    setSelectedModule(module)
    fetchLessons(module.id)
  }

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto p-6">
        {/* Sidebar - Modules */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold text-lg">Modules</h2>
          </div>
          <div className="divide-y">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleSelect(module)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition ${
                  selectedModule?.id === module.id ? 'bg-blue-50 border-l-4 border-primary' : ''
                }`}
              >
                <h3 className="font-semibold text-sm mb-1">{module.title}</h3>
                <p className="text-xs text-gray-500">
                  {module.lessonsCount} leçons
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow">
          {selectedLesson ? (
            <>
              {/* Video Player */}
              <div className="bg-black h-96 flex items-center justify-center">
                {selectedLesson.videoUrl ? (
                  <video
                    src={selectedLesson.videoUrl}
                    controls
                    className="w-full h-full"
                  />
                ) : (
                  <div className="text-white text-center">
                    <FaVideo size={64} className="mx-auto mb-4 opacity-50" />
                    <p>Vidéo non disponible</p>
                  </div>
                )}
              </div>

              {/* Lesson Info */}
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">{selectedLesson.title}</h1>
                
                <div className="flex gap-4 mb-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaClock size={16} />
                    <span>{selectedLesson.duration} min</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {selectedLesson.description}
                </p>

                {/* Resources */}
                {selectedLesson.resources?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-4">Ressources</h3>
                    <div className="space-y-2">
                      {selectedLesson.resources.map((resource, i) => (
                        <a
                          key={i}
                          href={resource.url}
                          className="flex items-center gap-2 p-3 border border-gray-200 rounded hover:bg-gray-50"
                        >
                          <FaFile />
                          <span>{resource.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-primary text-white rounded hover:bg-blue-700">
                    Marquer comme complétée
                  </button>
                  <button className="px-6 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white">
                    Suivante
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-600">Aucune leçon disponible</p>
            </div>
          )}
        </div>
      </div>

      {/* Lessons List */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Leçons du module</h2>
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson)}
                className={`w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition flex items-center gap-4 ${
                  selectedLesson?.id === lesson.id ? 'border-primary bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <p className="text-sm text-gray-600">{lesson.duration} min</p>
                </div>
                {lesson.completed && <FaCheckCircle className="text-green-500" size={20} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
