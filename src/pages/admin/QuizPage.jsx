import { useMemo, useState } from "react";
import "./quizPage.css";

const initialQuizzes = [
  {
    id: 1,
    title: "Quiz HTML/CSS",
    module: "Développement Web",
    questions: 15,
    duration: "20min",
    status: "published",
    difficulty: "Débutant",
    participants: 124,
    avgScore: 78,
    createdAt: "2026-01-12",
  },
  {
    id: 2,
    title: "React Hooks",
    module: "React JS",
    questions: 12,
    duration: "25min",
    status: "draft",
    difficulty: "Avancé",
    participants: 0,
    avgScore: 0,
    createdAt: "2026-02-01",
  },
  {
    id: 3,
    title: "JavaScript ES6+",
    module: "Développement Web",
    questions: 20,
    duration: "30min",
    status: "published",
    difficulty: "Intermédiaire",
    participants: 89,
    avgScore: 85,
    createdAt: "2026-02-15",
  },
  {
    id: 4,
    title: "Algorithmes de base",
    module: "Data Structures",
    questions: 10,
    duration: "15min",
    status: "archived",
    difficulty: "Intermédiaire",
    participants: 45,
    avgScore: 72,
    createdAt: "2026-03-01",
  },
];

const modules = [
  "Développement Web",
  "React JS",
  "Node.js",
  "Data Structures",
  "Design UI/UX",
  "Marketing Digital",
];

const difficulties = ["Débutant", "Intermédiaire", "Avancé"];

export const QuizPage = () => {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [search, setSearch] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    module: modules[0],
    questions: "",
    duration: "",
    difficulty: difficulties[0],
    status: "draft",
  });

  const stats = useMemo(() => {
    return {
      total: quizzes.length,
      published: quizzes.filter((q) => q.status === "published").length,
      draft: quizzes.filter((q) => q.status === "draft").length,
      totalQuestions: quizzes.reduce((acc, q) => acc + q.questions, 0),
      totalParticipants: quizzes.reduce((acc, q) => acc + q.participants, 0),
      avgScore: Math.round(quizzes.reduce((acc, q) => acc + q.avgScore * q.participants, 0) / Math.max(1, quizzes.reduce((acc, q) => acc + q.participants, 0))),
    };
  }, [quizzes]);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const q = search.toLowerCase();
    return (
      quiz.title.toLowerCase().includes(q) ||
      quiz.module.toLowerCase().includes(q) ||
      quiz.difficulty.toLowerCase().includes(q)
    );
  });

  const updateQuiz = (id, patch) => {
    setQuizzes((prev) =>
      prev.map((quiz) => (quiz.id === id ? { ...quiz, ...patch } : quiz))
    );
  };

  const deleteQuiz = (id) => {
    if (window.confirm("Supprimer ce quiz ?")) {
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    }
  };

  const addQuiz = (e) => {
    e.preventDefault();
    if (!newQuiz.title.trim()) return;

    const quizToAdd = {
      id: Date.now(),
      title: newQuiz.title,
      module: newQuiz.module,
      questions: Number(newQuiz.questions || 0),
      duration: newQuiz.duration,
      status: newQuiz.status,
      difficulty: newQuiz.difficulty,
      participants: 0,
      avgScore: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setQuizzes((prev) => [quizToAdd, ...prev]);
    setNewQuiz({
      title: "",
      module: modules[0],
      questions: "",
      duration: "",
      difficulty: difficulties[0],
      status: "draft",
    });
  };

  return (
    <div className="quizPage">
      <div className="quizPage__header">
        <div>
          <h2>Gestion des quiz</h2>
          <p>Créer, éditer, publier et analyser les performances des quiz.</p>
        </div>

        <input
          className="quizPage__search"
          type="text"
          placeholder="Rechercher un quiz..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
            className="btn btn--success"
                onClick={() => {
                    const questions = prompt("Ajouter des questions ?", "0");
                        if (questions) {
                          updateQuiz(quiz.id, { questions: quiz.questions + Number(questions) });
                        }
                }}
        >
            Ajouter un Quiz
        </button>


      </div>

      <div className="quizStats">
        <div className="quizStatCard">
          <span>Total quiz</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="quizStatCard">
          <span>Publiés</span>
          <strong>{stats.published}</strong>
        </div>
        <div className="quizStatCard">
          <span>Brouillons</span>
          <strong>{stats.draft}</strong>
        </div>
        <div className="quizStatCard">
          <span>Questions total</span>
          <strong>{stats.totalQuestions}</strong>
        </div>
        <div className="quizStatCard">
          <span>Participants</span>
          <strong>{stats.totalParticipants}</strong>
        </div>
      </div>

      <div className="quizPage__mainCard">
        <div className="cardHeader">
          <h3>Liste des quiz</h3>
          <span>{filteredQuizzes.length} résultat(s)</span>
        </div>

        <table className="quizzesTable">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Module</th>
              <th>Questions</th>
              <th>Durée</th>
              <th>Difficulté</th>
              <th>Participants</th>
              <th>Score moyen</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredQuizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td>
                  <div className="quizCell">
                    <div className="quizAvatar">Q</div>
                    <div>
                      <strong>{quiz.title}</strong>
                      <p>Créé le {quiz.createdAt}</p>
                    </div>
                  </div>
                </td>

                <td>{quiz.module}</td>

                <td>
                  <span className="countBadge">{quiz.questions}</span>
                </td>

                <td>
                  <span className="durationBadge">{quiz.duration}</span>
                </td>

                <td>
                  <span className={`difficultyBadge difficulty--${quiz.difficulty.toLowerCase()}`}>
                    {quiz.difficulty}
                  </span>
                </td>

                <td>
                  <span className="participantBadge">{quiz.participants}</span>
                </td>

                <td>
                  <span className="scoreBadge">{quiz.avgScore}%</span>
                </td>

                <td>
                  <select
                    className={`statusSelect statusSelect--${quiz.status}`}
                    value={quiz.status}
                    onChange={(e) =>
                      updateQuiz(quiz.id, { status: e.target.value })
                    }
                  >
                    <option value="published">Publié</option>
                    <option value="draft">Brouillon</option>
                    <option value="archived">Archivé</option>
                  </select>
                </td>

                <td>
                  <div className="actionButtons">
                    <button
                      className="btn btn--info"
                      onClick={() => {
                        const title = prompt("Titre du quiz ?", quiz.title);
                        const questions = prompt("Nombre de questions ?", quiz.questions);
                        if (title && questions) {
                          updateQuiz(quiz.id, { title, questions: Number(questions) });
                        }
                      }}
                    >
                      Éditer
                    </button>

                    <button
                      className="btn btn--success"
                      onClick={() => {
                        const questions = prompt("Ajouter des questions ?", "0");
                        if (questions) {
                          updateQuiz(quiz.id, { questions: quiz.questions + Number(questions) });
                        }
                      }}
                    >
                      + Questions
                    </button>

                    <button
                      className="btn btn--danger"
                      onClick={() => deleteQuiz(quiz.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};