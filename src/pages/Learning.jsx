import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loading } from '../components'
import { moduleService, lessonService } from '../services/formationService'
import { enrollmentService } from '../services/userService'
import { useAuth } from '../hooks/useAuth'
import { getQuizForModule } from '../data/quizzes'
import toast from 'react-hot-toast'
import { 
  FaVideo, 
  FaFile, 
  FaFilePdf, 
  FaClock, 
  FaCheckCircle, 
  FaDownload, 
  FaChevronLeft, 
  FaChevronRight, 
  FaAward, 
  FaUndo, 
  FaCheck, 
  FaTimes, 
  FaBookOpen, 
  FaPlayCircle 
} from 'react-icons/fa'

const getEmbedVideo = (url) => {
  if (!url) return null
  const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(youtubeRegExp)
  if (match && match[2].length === 11) {
    return {
      type: 'youtube',
      src: `https://www.youtube.com/embed/${match[2]}`
    }
  }
  return {
    type: 'video',
    src: url
  }
}

export const Learning = () => {
  const { formationId } = useParams()
  const { user } = useAuth()
  
  const [modules, setModules] = useState([])
  const [selectedModule, setSelectedModule] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Progression state
  const [enrollment, setEnrollment] = useState(null)
  const [completedLessons, setCompletedLessons] = useState([])
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false)

  // Quiz session state
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState({}) // { questionId: selectedIndex }
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    fetchModules()
  }, [formationId])

  useEffect(() => {
    if (user && formationId) {
      const saved = localStorage.getItem(`completed_lessons_${user.id}_${formationId}`)
      if (saved) {
        setCompletedLessons(JSON.parse(saved))
      } else {
        setCompletedLessons([])
      }
    }
  }, [user, formationId])

  const fetchModules = async () => {
    setLoading(true)
    try {
      const response = await moduleService.getByFormation(formationId)
      const fetchedModules = response.data || []
      setModules(fetchedModules)

      // Récupérer l'inscription correspondante pour cette formation
      try {
        const enrollmentsRes = await enrollmentService.getEnrollments()
        const foundEnrollment = enrollmentsRes.data?.find(
          (e) => String(e.formationId) === String(formationId)
        )
        if (foundEnrollment) {
          setEnrollment(foundEnrollment)
        }
      } catch (err) {
        console.error("Erreur chargement des inscriptions", err)
      }

      if (fetchedModules.length > 0) {
        setSelectedModule(fetchedModules[0])
        fetchLessons(fetchedModules[0].id)
      }
    } catch (error) {
      console.error('Erreur chargement des modules', error)
      toast.error("Erreur lors de la récupération des modules de la formation.")
    } finally {
      setLoading(false)
    }
  }

  const fetchLessons = async (moduleId) => {
    try {
      const response = await lessonService.getByModule(moduleId)
      setLessons(response.data || [])
      if (response.data?.length > 0) {
        setSelectedLesson(response.data[0])
      } else {
        setSelectedLesson(null)
      }
    } catch (error) {
      console.error('Erreur chargement des leçons', error)
    }
  }

  const handleModuleSelect = (module) => {
    setActiveQuiz(null)
    setSelectedModule(module)
    fetchLessons(module.id)
  }

  const handleLessonSelect = (lesson) => {
    setActiveQuiz(null)
    setSelectedLesson(lesson)
  }

  const toggleLessonCompleted = async (lessonId) => {
    if (!user || !formationId) return

    let updated
    if (completedLessons.includes(lessonId)) {
      updated = completedLessons.filter(id => id !== lessonId)
    } else {
      updated = [...completedLessons, lessonId]
    }

    setCompletedLessons(updated)
    localStorage.setItem(`completed_lessons_${user.id}_${formationId}`, JSON.stringify(updated))

    // Recalculer le pourcentage de progression
    const allFormationLessonIds = modules.flatMap(mod => mod.lessons?.map(l => l.id) || [])
    const totalLessonsCount = allFormationLessonIds.length
    
    if (totalLessonsCount > 0 && enrollment) {
      const completedInFormation = updated.filter(id => allFormationLessonIds.includes(id)).length
      const newProgressPct = Math.min(100, Math.round((completedInFormation / totalLessonsCount) * 100))
      
      try {
        setIsUpdatingProgress(true)
        await enrollmentService.updateProgress(enrollment.id, newProgressPct)
        setEnrollment(prev => prev ? { ...prev, progressPercentage: newProgressPct } : null)
        toast.success(completedLessons.includes(lessonId) ? "Leçon marquée comme non lue" : "Leçon validée !")
      } catch (error) {
        console.error("Erreur mise a jour progression", error)
        toast.error("Erreur de mise à jour de la progression sur le serveur")
      } finally {
        setIsUpdatingProgress(false)
      }
    } else {
      toast.success(completedLessons.includes(lessonId) ? "Leçon marquée comme non lue" : "Leçon validée !")
    }
  }

  // Navigation handlers
  const currentLessonIndex = lessons.findIndex(l => l.id === selectedLesson?.id)
  const isLastLesson = currentLessonIndex === lessons.length - 1

  const handleNext = () => {
    if (isLastLesson) {
      handleStartQuiz()
    } else if (currentLessonIndex !== -1) {
      handleLessonSelect(lessons[currentLessonIndex + 1])
    }
  }

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      handleLessonSelect(lessons[currentLessonIndex - 1])
    }
  }

  // Quiz actions
  const handleStartQuiz = () => {
    if (!selectedModule) return
    const quiz = getQuizForModule(selectedModule.title)
    setActiveQuiz(quiz)
    setQuizStarted(false)
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
    setQuizPassed(false)
    setShowExplanation(false)
  }

  const handleOptionSelect = (optionIndex) => {
    if (showExplanation) return
    setSelectedOption(optionIndex)
  }

  const handleValidateAnswer = () => {
    if (selectedOption === null) return
    
    const currentQuestion = activeQuiz.questions[currentQuestionIndex]
    setQuizAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedOption
    }))
    
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    setShowExplanation(false)
    setSelectedOption(null)
    
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // Calcul du score final
      let correctCount = 0
      activeQuiz.questions.forEach(q => {
        const ans = q.id === activeQuiz.questions[currentQuestionIndex].id ? selectedOption : quizAnswers[q.id];
        if (ans === q.correct) {
          correctCount++
        }
      })
      
      const scorePct = Math.round((correctCount / activeQuiz.questions.length) * 100)
      setQuizScore(scorePct)
      const passed = scorePct >= activeQuiz.passingScore
      setQuizPassed(passed)
      setQuizSubmitted(true)
    }
  }

  const handleFinishQuiz = async () => {
    if (!selectedModule) return

    // 1. Marquer toutes les leçons du module actuel comme complétées
    const moduleLessonIds = selectedModule.lessons?.map(l => l.id) || []
    const updatedCompleted = Array.from(new Set([...completedLessons, ...moduleLessonIds]))
    
    setCompletedLessons(updatedCompleted)
    if (user) {
      localStorage.setItem(`completed_lessons_${user.id}_${formationId}`, JSON.stringify(updatedCompleted))
    }

    // 2. Mettre à jour la progression globale
    const allFormationLessonIds = modules.flatMap(mod => mod.lessons?.map(l => l.id) || [])
    const totalLessonsCount = allFormationLessonIds.length
    
    let nextModIndex = modules.findIndex(m => m.id === selectedModule.id) + 1
    
    if (totalLessonsCount > 0 && enrollment) {
      const completedInFormation = updatedCompleted.filter(id => allFormationLessonIds.includes(id)).length
      const newProgressPct = Math.min(100, Math.round((completedInFormation / totalLessonsCount) * 100))
      
      try {
        await enrollmentService.updateProgress(enrollment.id, newProgressPct)
        setEnrollment(prev => prev ? { ...prev, progressPercentage: newProgressPct } : null)
      } catch (err) {
        console.error(err)
      }
    }

    setActiveQuiz(null)
    toast.success("Félicitations ! Module validé avec succès.")

    // Naviguer vers le module suivant s'il existe
    if (nextModIndex < modules.length) {
      const nextMod = modules[nextModIndex]
      setSelectedModule(nextMod)
      fetchLessons(nextMod.id)
    }
  }

  if (loading) return <Loading />

  const videoInfo = getEmbedVideo(selectedLesson?.videoUrl)

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Progress Header */}
      {enrollment && (
        <div className="bg-white border-b border-gray-200 py-4 px-6 mb-6 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Votre progression</span>
              <h2 className="text-xl font-bold text-gray-800">
                Classe virtuelle ToumaiHub
              </h2>
            </div>
            <div className="flex items-center gap-4 flex-grow md:max-w-md">
              <div className="w-full bg-gray-200 rounded-full h-3.5 dark:bg-gray-700 overflow-hidden">
                <div
                  className="bg-primary h-3.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${enrollment.progressPercentage || 0}%` }}
                />
              </div>
              <span className="font-bold text-primary whitespace-nowrap">{enrollment.progressPercentage || 0}%</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto p-6">
        {/* Sidebar - Modules */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow h-fit">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <FaBookOpen className="text-primary" /> Modules
            </h2>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-bold">
              {modules.length}
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {modules.map((module) => {
              const isSelected = selectedModule?.id === module.id;
              const moduleLessons = module.lessons || [];
              const completedCount = moduleLessons.filter(l => completedLessons.includes(l.id)).length;
              const isModuleCompleted = moduleLessons.length > 0 && completedCount === moduleLessons.length;
              
              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleSelect(module)}
                  className={`w-full text-left p-4 hover:bg-gray-50/50 transition flex items-start justify-between gap-3 ${
                    isSelected ? 'bg-blue-50/60 border-l-4 border-primary' : 'border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm truncate ${isSelected ? 'text-primary' : 'text-gray-700'}`}>
                      {module.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {completedCount}/{moduleLessons.length} leçons terminées
                    </p>
                  </div>
                  {isModuleCompleted && (
                    <FaCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow overflow-hidden">
          {activeQuiz ? (
            <div className="p-6">
              {/* Quiz Header */}
              <div className="border-b border-gray-200 pb-4 mb-6 flex justify-between items-center bg-purple-50 -mx-6 -mt-6 p-6">
                <div>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">
                    Quiz de validation
                  </span>
                  <h1 className="text-xl font-bold mt-1 text-purple-950">{activeQuiz.title}</h1>
                </div>
                <button 
                  onClick={() => setActiveQuiz(null)}
                  className="text-purple-700 hover:text-purple-900 font-semibold text-sm transition"
                >
                  Retour au cours
                </button>
              </div>

              {!quizStarted ? (
                /* Écran de bienvenue du Quiz */
                <div className="py-8 text-center max-w-xl mx-auto">
                  <FaAward className="mx-auto text-purple-600 mb-4 animate-bounce" size={80} />
                  <h2 className="text-xl font-bold mb-2">Prêt à valider vos compétences ?</h2>
                  <p className="text-gray-600 mb-6 text-sm">
                    {activeQuiz.description}
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-left mb-6">
                    <h4 className="font-bold text-sm mb-2 text-gray-800">Détails de l'évaluation :</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Nombre de questions : <strong>{activeQuiz.questions.length}</strong></li>
                      <li>• Seuil de réussite : <strong>{activeQuiz.passingScore}%</strong></li>
                      <li>• Impact : Valider ce quiz marquera automatiquement toutes les leçons de ce module comme terminées.</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setQuizStarted(true)}
                    className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 shadow-md transition duration-200"
                  >
                    Commencer le quiz
                  </button>
                </div>
              ) : quizSubmitted ? (
                /* Écran des résultats du Quiz */
                <div className="py-4">
                  <div className="text-center max-w-xl mx-auto mb-8">
                    {quizPassed ? (
                      <>
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-4 shadow-inner">
                          <span className="text-3xl font-extrabold">{quizScore}%</span>
                        </div>
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Félicitations, vous avez réussi ! 🎉</h2>
                        <p className="text-gray-600">
                          Vous avez obtenu un score de {quizScore}%. Vous maîtrisez les notions clés de ce module.
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 text-red-600 mb-4 shadow-inner">
                          <span className="text-3xl font-extrabold">{quizScore}%</span>
                        </div>
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Score insuffisant ({quizScore}%) 😟</h2>
                        <p className="text-gray-600 mb-4">
                          Le score minimum requis pour valider ce module est de {activeQuiz.passingScore}%.
                        </p>
                        <p className="text-sm text-gray-500">
                          Prenez le temps de revoir les leçons de ce module et retentez votre chance !
                        </p>
                      </>
                    )}
                  </div>

                  {/* Correction détaillée */}
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Correction détaillée :</h3>
                    <div className="space-y-6">
                      {activeQuiz.questions.map((q, idx) => {
                        const userAnswer = quizAnswers[q.id];
                        const isCorrect = userAnswer === q.correct;
                        return (
                          <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
                            <div className="flex gap-2 items-start">
                              <span className="font-bold text-gray-700">{idx + 1}.</span>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-800 mb-2">{q.question}</h4>
                                <div className="space-y-1 text-sm">
                                  {q.options.map((opt, oIdx) => {
                                    let optStyle = "text-gray-700";
                                    let icon = null;
                                    if (oIdx === q.correct) {
                                      optStyle = "text-green-700 font-bold";
                                      icon = <FaCheck className="text-green-600 inline mr-2 animate-pulse" />;
                                    } else if (oIdx === userAnswer && !isCorrect) {
                                      optStyle = "text-red-700 font-bold";
                                      icon = <FaTimes className="text-red-600 inline mr-2" />;
                                    }
                                    return (
                                      <div key={oIdx} className={`p-1.5 rounded ${oIdx === q.correct ? 'bg-green-100/50' : oIdx === userAnswer ? 'bg-red-100/50' : ''}`}>
                                        {icon}
                                        <span className={optStyle}>{opt}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="mt-3 text-xs text-gray-600 bg-white p-3 rounded border border-gray-100 leading-relaxed">
                                  <strong className="text-gray-800">Explication :</strong> {q.explanation}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions post quiz */}
                  <div className="mt-8 flex justify-end gap-4 border-t border-gray-200 pt-6">
                    <button
                      onClick={() => setActiveQuiz(null)}
                      className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold"
                    >
                      Retour au cours
                    </button>
                    {!quizPassed ? (
                      <button
                        onClick={handleStartQuiz}
                        className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow font-semibold transition"
                      >
                        Recommencer le quiz
                      </button>
                    ) : (
                      <button
                        onClick={handleFinishQuiz}
                        className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow font-semibold transition"
                      >
                        Valider le module & Continuer
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* En cours de passage du Quiz */
                <div>
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-2">
                      <span>Question {currentQuestionIndex + 1} sur {totalQuestions}</span>
                      <span>{Math.round(((currentQuestionIndex) / totalQuestions) * 100)}% complété</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex) / totalQuestions) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                      {activeQuiz.questions[currentQuestionIndex].question}
                    </h2>

                    <div className="grid grid-cols-1 gap-3">
                      {activeQuiz.questions[currentQuestionIndex].options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            disabled={showExplanation}
                            className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between ${
                              isSelected
                                ? 'border-purple-600 bg-purple-50/50 shadow-sm font-semibold'
                                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50/50'
                            }`}
                          >
                            <span className={isSelected ? "text-purple-950" : "text-gray-700"}>{option}</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-purple-600 bg-purple-600 text-white' : 'border-gray-300'}`}>
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Explanation Block */}
                  {showExplanation && (
                    <div className={`p-4 rounded-lg border mb-6 ${
                      selectedOption === activeQuiz.questions[currentQuestionIndex].correct 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                      <h4 className="font-bold flex items-center gap-2 mb-1">
                        {selectedOption === activeQuiz.questions[currentQuestionIndex].correct 
                          ? <><FaCheckCircle /> Bonne réponse !</> 
                          : <><FaTimes /> Mauvaise réponse.</>}
                      </h4>
                      <p className="text-sm">
                        {activeQuiz.questions[currentQuestionIndex].explanation}
                      </p>
                    </div>
                  )}

                  {/* Quiz action footer */}
                  <div className="flex justify-end gap-3 border-t border-gray-200 pt-4 mt-6">
                    {!showExplanation ? (
                      <button
                        onClick={handleValidateAnswer}
                        disabled={selectedOption === null}
                        className={`px-6 py-2 rounded-lg font-bold transition shadow ${
                          selectedOption === null 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        Valider la réponse
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold transition shadow"
                      >
                        {currentQuestionIndex < totalQuestions - 1 ? "Question suivante" : "Voir les résultats"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : selectedLesson ? (
            <>
              {/* Video Player */}
              <div className="bg-black h-96 flex items-center justify-center overflow-hidden rounded-t-lg relative group">
                {videoInfo ? (
                  videoInfo.type === 'youtube' ? (
                    <iframe
                      src={videoInfo.src}
                      title={selectedLesson.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={videoInfo.src}
                      controls
                      className="w-full h-full"
                    />
                  )
                ) : (
                  <div className="text-white text-center">
                    <FaVideo size={64} className="mx-auto mb-4 opacity-50" />
                    <p>Vidéo non disponible</p>
                  </div>
                )}
              </div>

              {/* Lesson Details */}
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">{selectedLesson.title}</h1>
                
                <div className="flex gap-4 mb-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaClock size={16} />
                    <span>{selectedLesson.duration || selectedLesson.durationMinutes || 0} min</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {selectedLesson.description}
                </p>

                {/* Resources / PDF Documents */}
                {(selectedLesson.documentUrl || (selectedLesson.resources && selectedLesson.resources.length > 0)) && (
                  <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <FaFilePdf className="text-red-500" /> Supports de cours & PDF
                    </h3>
                    <div className="space-y-2">
                      {selectedLesson.documentUrl && (
                        <a
                          href={selectedLesson.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition text-gray-800 font-medium"
                        >
                          <div className="flex items-center gap-3">
                            <FaFilePdf className="text-red-500 text-xl" />
                            <span>Cours / Document PDF de la leçon</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-primary font-semibold">
                            <FaDownload size={14} /> Ouvrir / Télécharger
                          </div>
                        </a>
                      )}

                      {selectedLesson.resources?.map((resource, i) => (
                        <a
                          key={i}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition text-gray-800 font-medium"
                        >
                          <div className="flex items-center gap-3">
                            <FaFile className="text-blue-500 text-xl" />
                            <span>{resource.name}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-primary font-semibold">
                            <FaDownload size={14} /> Télécharger
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation and Completion controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 pt-6 mt-6">
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrevious}
                      disabled={currentLessonIndex <= 0}
                      className={`px-4 py-2 border rounded flex items-center gap-2 font-semibold transition ${
                        currentLessonIndex <= 0 
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50' 
                          : 'border-primary text-primary hover:bg-blue-50'
                      }`}
                    >
                      <FaChevronLeft size={14} /> Précédente
                    </button>
                    
                    <button 
                      onClick={handleNext}
                      disabled={currentLessonIndex === -1}
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 flex items-center gap-2 font-semibold transition"
                    >
                      {isLastLesson ? (
                        <>Passer au Quiz <FaAward size={14} /></>
                      ) : (
                        <>Suivante <FaChevronRight size={14} /></>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => toggleLessonCompleted(selectedLesson.id)}
                    disabled={isUpdatingProgress}
                    className={`px-6 py-2 rounded font-bold shadow-sm transition flex items-center justify-center gap-2 ${
                      completedLessons.includes(selectedLesson.id)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {completedLessons.includes(selectedLesson.id) ? (
                      <>
                        <FaCheckCircle className="text-green-700" size={16} /> Leçon validée ✓
                      </>
                    ) : (
                      <>Marquer comme complétée</>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-gray-500">
              <p>Aucune leçon disponible pour ce module.</p>
            </div>
          )}
        </div>
      </div>

      {/* Program / Lessons List at bottom */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Programme de ce module</h2>
          
          <div className="space-y-3">
            {lessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isSelected = selectedLesson?.id === lesson.id && !activeQuiz;
              return (
                <button
                  key={lesson.id}
                  onClick={() => handleLessonSelect(lesson)}
                  className={`w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition flex items-center gap-4 ${
                    isSelected ? 'border-primary bg-blue-50/50 shadow-sm' : 'border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {isCompleted ? "✓" : (lessons.indexOf(lesson) + 1)}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${isSelected ? 'text-primary' : 'text-gray-800'}`}>{lesson.title}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <FaClock size={12} /> {lesson.duration || lesson.durationMinutes || 0} min
                    </p>
                  </div>
                  {isCompleted && <FaCheckCircle className="text-green-500" size={20} />}
                </button>
              );
            })}
          </div>

          {/* Module Quiz Card */}
          {selectedModule && (
            <div className="mt-6 border-t border-dashed border-gray-200 pt-6">
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                    <FaAward size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-950">Quiz : {selectedModule.title}</h4>
                    <p className="text-xs text-purple-800 mt-0.5">
                      Testez et validez vos compétences pour obtenir vos points de ce module.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleStartQuiz}
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-sm font-semibold transition text-sm whitespace-nowrap self-stretch md:self-auto text-center"
                >
                  Passer le Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
