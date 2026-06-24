import { useMemo, useState } from "react";
import "./quizPage.css";

const initialQuizzes = [
  { id: 1, title: "Quiz HTML/CSS", module: "Développement Web", questions: 15, duration: "20min", status: "published", difficulty: "Débutant", participants: 124, avgScore: 78, createdAt: "2026-01-12" },
  { id: 2, title: "React Hooks", module: "React JS", questions: 12, duration: "25min", status: "draft", difficulty: "Avancé", participants: 0, avgScore: 0, createdAt: "2026-02-01" },
  { id: 3, title: "JavaScript ES6+", module: "Développement Web", questions: 20, duration: "30min", status: "published", difficulty: "Intermédiaire", participants: 89, avgScore: 85, createdAt: "2026-02-15" },
  { id: 4, title: "Algorithmes de base", module: "Data Structures", questions: 10, duration: "15min", status: "archived", difficulty: "Intermédiaire", participants: 45, avgScore: 72, createdAt: "2026-03-01" },
];

const modules = ["Développement Web", "React JS", "Node.js", "Data Structures", "Design UI/UX", "Marketing Digital"];
const difficulties = ["Débutant", "Intermédiaire", "Avancé"];
const emptyForm = { title: "", module: modules[0], questions: "", duration: "", difficulty: difficulties[0], status: "draft" };

export const QuizPage = () => {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [addQuestions, setAddQuestions] = useState("");

  const stats = useMemo(() => ({
    total: quizzes.length,
    published: quizzes.filter((q) => q.status === "published").length,
    draft: quizzes.filter((q) => q.status === "draft").length,
    totalQuestions: quizzes.reduce((acc, q) => acc + q.questions, 0),
    totalParticipants: quizzes.reduce((acc, q) => acc + q.participants, 0),
    avgScore: Math.round(
      quizzes.reduce((acc, q) => acc + q.avgScore * q.participants, 0) /
      Math.max(1, quizzes.reduce((acc, q) => acc + q.participants, 0))
    ),
  }), [quizzes]);

  const filtered = quizzes.filter((q) => {
    const s = search.toLowerCase();
    return q.title.toLowerCase().includes(s) || q.module.toLowerCase().includes(s) || q.difficulty.toLowerCase().includes(s);
  });

  const updateQuiz = (id, patch) =>
    setQuizzes((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)));

  /* ---- ADD ---- */
  const openAdd = () => { setFormData(emptyForm); setShowAddModal(true); };
  const confirmAdd = () => {
    if (!formData.title.trim()) return;
    setQuizzes((prev) => [{
      id: Date.now(), ...formData,
      questions: Number(formData.questions || 0),
      participants: 0, avgScore: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    }, ...prev]);
    setShowAddModal(false);
  };

  /* ---- EDIT ---- */
  const openEdit = (quiz) => {
    setActiveQuiz(quiz);
    setFormData({ title: quiz.title, module: quiz.module, questions: quiz.questions, duration: quiz.duration, difficulty: quiz.difficulty, status: quiz.status });
    setShowEditModal(true);
  };
  const confirmEdit = () => { updateQuiz(activeQuiz.id, { ...formData, questions: Number(formData.questions || 0) }); setShowEditModal(false); };

  /* ---- DELETE ---- */
  const openDelete = (quiz) => { setActiveQuiz(quiz); setShowDeleteModal(true); };
  const confirmDelete = () => { setQuizzes((prev) => prev.filter((q) => q.id !== activeQuiz.id)); setShowDeleteModal(false); };

  /* ---- QUESTIONS ---- */
  const openQuestions = (quiz) => { setActiveQuiz(quiz); setAddQuestions(""); setShowQuestionsModal(true); };
  const confirmQuestions = () => {
    const n = Number(addQuestions);
    if (!n || n < 1) return;
    updateQuiz(activeQuiz.id, { questions: activeQuiz.questions + n });
    setShowQuestionsModal(false);
  };

  const QuizForm = ({ title, onClose, onConfirm, confirmLabel = "Enregistrer" }) => (
    <div className="modalBackDrop" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h3>{title}</h3>
          <button className="closeBtn" onClick={onClose}>×</button>
        </div>
        <div className="modalBody">
          <label>Titre du quiz *</label>
          <input className="modalInput" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Ex: Quiz JavaScript" />
          <label>Module</label>
          <select className="modalInput" value={formData.module} onChange={(e) => setFormData({ ...formData, module: e.target.value })}>
            {modules.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <label>Nombre de questions</label>
          <input className="modalInput" type="number" min="1" value={formData.questions} onChange={(e) => setFormData({ ...formData, questions: e.target.value })} placeholder="10" />
          <label>Durée (ex: 20min)</label>
          <input className="modalInput" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="20min" />
          <label>Difficulté</label>
          <select className="modalInput" value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}>
            {difficulties.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <label>Statut</label>
          <select className="modalInput" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
        <div className="modalActions">
          <button className="btn btn--secondary" onClick={onClose}>Annuler</button>
          <button className="btn btn--primary" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="quizPage">
      <div className="quizPage__header">
        <div>
          <h2>Gestion des quiz</h2>
          <p>Créer, éditer, publier et analyser les performances des quiz.</p>
        </div>
        <div className="quizPage__headerActions">
          <input className="quizPage__search" type="text" placeholder="Rechercher un quiz..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn--primary" onClick={openAdd}>+ Nouveau quiz</button>
        </div>
      </div>

      <div className="quizStats">
        {[
          { label: "Total quiz", val: stats.total, color: "blue" },
          { label: "Publiés", val: stats.published, color: "green" },
          { label: "Brouillons", val: stats.draft, color: "orange" },
          { label: "Questions", val: stats.totalQuestions, color: "purple" },
          { label: "Participants", val: stats.totalParticipants, color: "teal" },
          { label: "Score moyen", val: `${stats.avgScore}%`, color: "gold" },
        ].map(({ label, val, color }) => (
          <div key={label} className={`quizStatCard quizStatCard--${color}`}>
            <span>{label}</span>
            <strong>{val}</strong>
          </div>
        ))}
      </div>

      <div className="quizPage__mainCard">
        <div className="cardHeader">
          <h3>Liste des quiz</h3>
          <span>{filtered.length} résultat(s)</span>
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
              <th>Score moy.</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((quiz) => (
              <tr key={quiz.id}>
                <td>
                  <div className="quizCell">
                    <div className="quizAvatar">{quiz.title.charAt(0)}</div>
                    <div>
                      <strong>{quiz.title}</strong>
                      <p>Créé le {quiz.createdAt}</p>
                    </div>
                  </div>
                </td>
                <td>{quiz.module}</td>
                <td><span className="countBadge">{quiz.questions}</span></td>
                <td><span className="durationBadge">{quiz.duration}</span></td>
                <td>
                  <span className={`difficultyBadge difficulty--${quiz.difficulty.toLowerCase().replace("é", "e").replace("è", "e")}`}>
                    {quiz.difficulty}
                  </span>
                </td>
                <td><span className="participantBadge">{quiz.participants}</span></td>
                <td>
                  <span className={`scoreBadge ${quiz.avgScore >= 70 ? "score--good" : quiz.avgScore >= 50 ? "score--mid" : "score--low"}`}>
                    {quiz.avgScore}%
                  </span>
                </td>
                <td>
                  <select
                    className={`statusSelect statusSelect--${quiz.status}`}
                    value={quiz.status}
                    onChange={(e) => updateQuiz(quiz.id, { status: e.target.value })}
                  >
                    <option value="published">Publié</option>
                    <option value="draft">Brouillon</option>
                    <option value="archived">Archivé</option>
                  </select>
                </td>
                <td>
                  <div className="actionButtons">
                    <button className="btn btn--info" onClick={() => openEdit(quiz)}>Éditer</button>
                    <button className="btn btn--success" onClick={() => openQuestions(quiz)}>+ Questions</button>
                    <button className="btn btn--danger" onClick={() => openDelete(quiz)}>Supprimer</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && <QuizForm title="Nouveau quiz" onClose={() => setShowAddModal(false)} onConfirm={confirmAdd} confirmLabel="Créer" />}
      {showEditModal && activeQuiz && <QuizForm title="Modifier le quiz" onClose={() => setShowEditModal(false)} onConfirm={confirmEdit} />}

      {showDeleteModal && activeQuiz && (
        <div className="modalBackDrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Confirmer la suppression</h3>
              <button className="closeBtn" onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <p>Supprimer le quiz <strong>"{activeQuiz.title}"</strong> ? Cette action est irréversible.</p>
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowDeleteModal(false)}>Annuler</button>
              <button className="btn btn--danger" onClick={confirmDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {showQuestionsModal && activeQuiz && (
        <div className="modalBackDrop" onClick={() => setShowQuestionsModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Ajouter des questions</h3>
              <button className="closeBtn" onClick={() => setShowQuestionsModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <p>Quiz : <strong>"{activeQuiz.title}"</strong> — actuellement {activeQuiz.questions} question(s)</p>
              <label>Nombre de questions à ajouter</label>
              <input className="modalInput" type="number" min="1" value={addQuestions} onChange={(e) => setAddQuestions(e.target.value)} placeholder="Ex: 5" />
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowQuestionsModal(false)}>Annuler</button>
              <button className="btn btn--success" onClick={confirmQuestions}>Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};