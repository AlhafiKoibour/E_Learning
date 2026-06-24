import { useMemo, useState } from "react";
import "./LessonPage.css";

const initialLessons = [
  { id: 1, title: "Introduction à HTML", module: "Développement Web", duration: "15min", status: "published", difficulty: "Débutant", videoUrl: "https://example.com/video1.mp4", createdAt: "2026-01-12" },
  { id: 2, title: "Flexbox en CSS", module: "Développement Web", duration: "25min", status: "draft", difficulty: "Intermédiaire", videoUrl: "", createdAt: "2026-01-15" },
  { id: 3, title: "Composants React", module: "React JS", duration: "35min", status: "published", difficulty: "Avancé", videoUrl: "https://example.com/video3.mp4", createdAt: "2026-02-01" },
  { id: 4, title: "Hooks personnalisés", module: "React JS", duration: "20min", status: "archived", difficulty: "Avancé", videoUrl: "", createdAt: "2026-02-10" },
];

const modules = ["Développement Web", "React JS", "Node.js", "Design UI/UX", "Marketing Digital", "Data Analysis"];
const difficulties = ["Débutant", "Intermédiaire", "Avancé"];
const emptyForm = { title: "", module: modules[0], duration: "", difficulty: difficulties[0], status: "draft", videoUrl: "" };

export const LessonPage = () => {
  const [lessons, setLessons] = useState(initialLessons);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const [activeLesson, setActiveLesson] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [videoUrl, setVideoUrl] = useState("");

  const stats = useMemo(() => ({
    total: lessons.length,
    published: lessons.filter((l) => l.status === "published").length,
    draft: lessons.filter((l) => l.status === "draft").length,
    archived: lessons.filter((l) => l.status === "archived").length,
    totalDuration: lessons.reduce((acc, l) => acc + (parseInt(l.duration) || 0), 0),
  }), [lessons]);

  const filtered = lessons.filter((l) => {
    const q = search.toLowerCase();
    return l.title.toLowerCase().includes(q) || l.module.toLowerCase().includes(q) || l.difficulty.toLowerCase().includes(q);
  });

  const updateLesson = (id, patch) =>
    setLessons((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  /* ---- ADD ---- */
  const openAdd = () => { setFormData(emptyForm); setShowAddModal(true); };
  const confirmAdd = () => {
    if (!formData.title.trim()) return;
    setLessons((prev) => [{ id: Date.now(), ...formData, createdAt: new Date().toISOString().slice(0, 10) }, ...prev]);
    setShowAddModal(false);
  };

  /* ---- EDIT ---- */
  const openEdit = (lesson) => {
    setActiveLesson(lesson);
    setFormData({ title: lesson.title, module: lesson.module, duration: lesson.duration, difficulty: lesson.difficulty, status: lesson.status, videoUrl: lesson.videoUrl });
    setShowEditModal(true);
  };
  const confirmEdit = () => { updateLesson(activeLesson.id, formData); setShowEditModal(false); };

  /* ---- DELETE ---- */
  const openDelete = (lesson) => { setActiveLesson(lesson); setShowDeleteModal(true); };
  const confirmDelete = () => { setLessons((prev) => prev.filter((l) => l.id !== activeLesson.id)); setShowDeleteModal(false); };

  /* ---- VIDEO ---- */
  const openVideo = (lesson) => { setActiveLesson(lesson); setVideoUrl(lesson.videoUrl); setShowVideoModal(true); };
  const confirmVideo = () => { updateLesson(activeLesson.id, { videoUrl }); setShowVideoModal(false); };

  const ModalForm = ({ title, onClose, onConfirm, confirmLabel = "Enregistrer" }) => (
    <div className="modalBackDrop" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h3>{title}</h3>
          <button className="closeBtn" onClick={onClose}>×</button>
        </div>
        <div className="modalBody">
          <label>Titre de la leçon *</label>
          <input className="modalInput" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Ex: Introduction à HTML" />
          <label>Module</label>
          <select className="modalInput" value={formData.module} onChange={(e) => setFormData({ ...formData, module: e.target.value })}>
            {modules.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <label>Durée (ex: 20min)</label>
          <input className="modalInput" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="20min" />
          <label>Difficulté</label>
          <select className="modalInput" value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}>
            {difficulties.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <label>URL Vidéo</label>
          <input className="modalInput" value={formData.videoUrl} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} placeholder="https://..." />
          <label>Statut</label>
          <select className="modalInput" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
            <option value="draft">Brouillon</option>
            <option value="published">Publiée</option>
            <option value="archived">Archivée</option>
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
    <div className="lessonsPage">
      <div className="lessonsPage__header">
        <div>
          <h2>Gestion des leçons</h2>
          <p>Créer, éditer, publier et organiser les leçons des modules.</p>
        </div>
        <div className="lessonsPage__headerActions">
          <input className="lessonsPage__search" type="text" placeholder="Rechercher une leçon..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn--primary" onClick={openAdd}>+ Nouvelle leçon</button>
        </div>
      </div>

      <div className="lessonsStats">
        {[
          { label: "Total leçons", val: stats.total, color: "blue" },
          { label: "Publiées", val: stats.published, color: "green" },
          { label: "Brouillons", val: stats.draft, color: "orange" },
          { label: "Archivées", val: stats.archived, color: "gray" },
          { label: "Durée totale", val: `${stats.totalDuration}min`, color: "purple" },
        ].map(({ label, val, color }) => (
          <div key={label} className={`lessonStatCard lessonStatCard--${color}`}>
            <span>{label}</span>
            <strong>{val}</strong>
          </div>
        ))}
      </div>

      <div className="lessonsPage__mainCard">
        <div className="cardHeader">
          <h3>Liste des leçons</h3>
          <span>{filtered.length} résultat(s)</span>
        </div>

        <table className="lessonsTable">
          <thead>
            <tr>
              <th>Leçon</th>
              <th>Module</th>
              <th>Durée</th>
              <th>Difficulté</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lesson) => (
              <tr key={lesson.id}>
                <td>
                  <div className="lessonCell">
                    <div className="lessonAvatar">{lesson.title.charAt(0)}</div>
                    <div>
                      <strong>{lesson.title}</strong>
                      <p>Créée le {lesson.createdAt}</p>
                    </div>
                  </div>
                </td>
                <td>{lesson.module}</td>
                <td><span className="durationBadge">{lesson.duration}</span></td>
                <td>
                  <span className={`difficultyBadge difficulty--${lesson.difficulty.toLowerCase().replace("é", "e").replace("è", "e")}`}>
                    {lesson.difficulty}
                  </span>
                </td>
                <td>
                  <select
                    className={`statusSelect statusSelect--${lesson.status}`}
                    value={lesson.status}
                    onChange={(e) => updateLesson(lesson.id, { status: e.target.value })}
                  >
                    <option value="published">Publiée</option>
                    <option value="draft">Brouillon</option>
                    <option value="archived">Archivée</option>
                  </select>
                </td>
                <td>
                  <div className="actionButtons">
                    <button className="btn btn--info" onClick={() => openEdit(lesson)}>Éditer</button>
                    <button className="btn btn--success" onClick={() => openVideo(lesson)}>
                      {lesson.videoUrl ? "📹 Vidéo" : "📎 Ajouter vidéo"}
                    </button>
                    <button className="btn btn--danger" onClick={() => openDelete(lesson)}>Supprimer</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && <ModalForm title="Nouvelle leçon" onClose={() => setShowAddModal(false)} onConfirm={confirmAdd} confirmLabel="Créer" />}
      {showEditModal && activeLesson && <ModalForm title="Modifier la leçon" onClose={() => setShowEditModal(false)} onConfirm={confirmEdit} />}

      {showDeleteModal && activeLesson && (
        <div className="modalBackDrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Confirmer la suppression</h3>
              <button className="closeBtn" onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <p>Supprimer la leçon <strong>"{activeLesson.title}"</strong> ? Cette action est irréversible.</p>
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowDeleteModal(false)}>Annuler</button>
              <button className="btn btn--danger" onClick={confirmDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {showVideoModal && activeLesson && (
        <div className="modalBackDrop" onClick={() => setShowVideoModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>URL de la vidéo</h3>
              <button className="closeBtn" onClick={() => setShowVideoModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <p>Leçon : <strong>"{activeLesson.title}"</strong></p>
              <label>URL vidéo</label>
              <input className="modalInput" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/..." />
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowVideoModal(false)}>Annuler</button>
              <button className="btn btn--success" onClick={confirmVideo}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};