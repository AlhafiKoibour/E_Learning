import { useMemo, useState } from "react";
import "./LessonPage.css";

const initialLessons = [
  {
    id: 1,
    title: "Introduction à HTML",
    module: "Développement Web",
    duration: "15min",
    status: "published",
    difficulty: "Débutant",
    videoUrl: "https://example.com/video1.mp4",
    createdAt: "2026-01-12",
  },
  {
    id: 2,
    title: "Flexbox en CSS",
    module: "Développement Web",
    duration: "25min",
    status: "draft",
    difficulty: "Intermédiaire",
    videoUrl: "",
    createdAt: "2026-01-15",
  },
  {
    id: 3,
    title: "Composants React",
    module: "React JS",
    duration: "35min",
    status: "published",
    difficulty: "Avancé",
    videoUrl: "https://example.com/video3.mp4",
    createdAt: "2026-02-01",
  },
  {
    id: 4,
    title: "Hooks personnalisés",
    module: "React JS",
    duration: "20min",
    status: "archived",
    difficulty: "Avancé",
    videoUrl: "",
    createdAt: "2026-02-10",
  },
];

const modules = [
  "Développement Web",
  "React JS",
  "Node.js",
  "Design UI/UX",
  "Marketing Digital",
  "Data Analysis",
];

const difficulties = ["Débutant", "Intermédiaire", "Avancé"];

export const LessonPage = () => {
  const [lessons, setLessons] = useState(initialLessons);
  const [search, setSearch] = useState("");
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [newLesson, setNewLesson] = useState({
    title: "",
    module: modules[0],
    duration: "",
    difficulty: difficulties[0],
    status: "draft",
    videoUrl: "",
  });

  const stats = useMemo(() => {
    return {
      total: lessons.length,
      published: lessons.filter((l) => l.status === "published").length,
      draft: lessons.filter((l) => l.status === "draft").length,
      archived: lessons.filter((l) => l.status === "archived").length,
      totalDuration: lessons.reduce((acc, l) => acc + parseInt(l.duration), 0),
    };
  }, [lessons]);

  const filteredLessons = lessons.filter((lesson) => {
    const q = search.toLowerCase();
    return (
      lesson.title.toLowerCase().includes(q) ||
      lesson.module.toLowerCase().includes(q) ||
      lesson.difficulty.toLowerCase().includes(q)
    );
  });

  const updateLesson = (id, patch) => {
    setLessons((prev) =>
      prev.map((lesson) => (lesson.id === id ? { ...lesson, ...patch } : lesson))
    );
  };

  const deleteLesson = (id) => {
    if (window.confirm("Supprimer cette leçon ?")) {
      setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
    }
  };

  const addLesson = (e) => {
    e.preventDefault();
    if (!newLesson.title.trim()) return;

    const lessonToAdd = {
      id: Date.now(),
      title: newLesson.title,
      module: newLesson.module,
      duration: newLesson.duration,
      status: newLesson.status,
      difficulty: newLesson.difficulty,
      videoUrl: newLesson.videoUrl,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setLessons((prev) => [lessonToAdd, ...prev]);
    setNewLesson({
      title: "",
      module: modules[0],
      duration: "",
      difficulty: difficulties[0],
      status: "draft",
      videoUrl: "",
    });
  };

  return (
    <div className="lessonsPage">
      <div className="lessonsPage__header">
        <div>
          <h2>Gestion des leçons</h2>
          <p>Créer, éditer, publier et organiser les leçons des modules.</p>
        </div>

        <input
          className="lessonsPage__search"
          type="text"
          placeholder="Rechercher une leçon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
            className="btn btn--success"
            onClick={() => {
                const url = prompt("URL vidéo ?", lesson.videoUrl);
                  if (url) updateLesson(lesson.id, { videoUrl: url });
                }}
        >Ajouter Nouvelle Lecon</button>

      </div>

      <div className="lessonsStats">
        <div className="lessonStatCard">
          <span>Total leçons</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="lessonStatCard">
          <span>Publiées</span>
          <strong>{stats.published}</strong>
        </div>
        <div className="lessonStatCard">
          <span>Brouillons</span>
          <strong>{stats.draft}</strong>
        </div>
        <div className="lessonStatCard">
          <span>Archivées</span>
          <strong>{stats.archived}</strong>
        </div>
        <div className="lessonStatCard">
          <span>Total durée</span>
          <strong>{stats.totalDuration}min</strong>
        </div>
      </div>

      <div className="lessonsPage__mainCard">
        <div className="cardHeader">
          <h3>Liste des leçons</h3>
          <span>{filteredLessons.length} résultat(s)</span>
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
            {filteredLessons.map((lesson) => (
              <tr key={lesson.id}>
                <td>
                  <div className="lessonCell">
                    <div className="lessonAvatar">L</div>
                    <div>
                      <strong>{lesson.title}</strong>
                      <p>Créée le {lesson.createdAt}</p>
                    </div>
                  </div>
                </td>

                <td>{lesson.module}</td>

                <td>
                  <span className="durationBadge">{lesson.duration}</span>
                </td>

                <td>
                  <span className={`difficultyBadge difficulty--${lesson.difficulty.toLowerCase()}`}>
                    {lesson.difficulty}
                  </span>
                </td>

                <td>
                  <select
                    className={`statusSelect statusSelect--${lesson.status}`}
                    value={lesson.status}
                    onChange={(e) =>
                      updateLesson(lesson.id, { status: e.target.value })
                    }
                  >
                    <option value="published">Publiée</option>
                    <option value="draft">Brouillon</option>
                    <option value="archived">Archivée</option>
                  </select>
                </td>

                <td>
                  <div className="actionButtons">
                    <button
                      className="btn btn--info"
                      onClick={() => {
                        const title = prompt("Titre de la leçon ?", lesson.title);
                        const module = prompt("Module ?", lesson.module);
                        if (title && module) {
                          updateLesson(lesson.id, { title, module });
                        }
                      }}
                    >
                      Éditer
                    </button>

                    <button
                      className="btn btn--danger"
                      onClick={() => deleteLesson(lesson.id)}
                    >
                      Supprimer
                    </button>

                    <button
                      className="btn btn--success"
                      onClick={() => {
                        const url = prompt("URL vidéo ?", lesson.videoUrl);
                        if (url) updateLesson(lesson.id, { videoUrl: url });
                      }}
                    >
                      Vidéo
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLessonId !== null && (
        <div className="modalBackDrop" onClick={() => setSelectedLessonId(null)}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Modifier la leçon</h3>
              <button className="closeBtn" onClick={() => setSelectedLessonId(null)}>
                ×
              </button>
            </div>
            <p>Configuration avancée de la leçon sélectionnée.</p>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setSelectedLessonId(null)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};