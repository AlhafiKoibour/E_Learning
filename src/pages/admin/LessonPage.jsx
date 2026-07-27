import { useMemo, useState, useEffect } from "react";
import { lessonService, moduleService } from "../../services/formationService";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../utils/errorHelper";
import "./LessonPage.css";

const emptyForm = {
  title: "",
  description: "",
  duration: 15,
  moduleId: "",
  videoUrl: "",
  documentUrl: "",
};

export const LessonPage = () => {
  const [lessons, setLessons] = useState([]);
  const [modulesList, setModulesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const [activeLesson, setActiveLesson] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [lessonsRes, modulesRes] = await Promise.all([
        lessonService.getAll(),
        moduleService.getAll(),
      ]);
      setLessons(lessonsRes.data || []);
      setModulesList(modulesRes.data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des leçons:", error);
      toast.error(getApiErrorMessage(error) || "Erreur de chargement des leçons");
    } finally {
      setLoading(false);
    }
  };

  const getModuleName = (moduleIds) => {
    if (!moduleIds || moduleIds.length === 0) return "Aucun module";
    const modId = moduleIds[0];
    const found = modulesList.find((m) => String(m.id) === String(modId));
    return found ? found.title : `Module #${modId}`;
  };

  const stats = useMemo(() => {
    const total = lessons.length;
    const totalDuration = lessons.reduce(
      (acc, l) => acc + (Number(l.duration) || 0),
      0
    );
    const withVideo = lessons.filter((l) => Boolean(l.videoUrl)).length;
    const withDoc = lessons.filter(
      (l) => Boolean(l.resources && l.resources.length > 0) || Boolean(l.documentUrl)
    ).length;

    return {
      total,
      totalDuration,
      withVideo,
      withDoc,
    };
  }, [lessons]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return lessons;
    return lessons.filter((l) => {
      const title = l.title?.toLowerCase() || "";
      const desc = l.description?.toLowerCase() || "";
      const modName = getModuleName(l.moduleIds).toLowerCase();
      return title.includes(q) || desc.includes(q) || modName.includes(q);
    });
  }, [lessons, search, modulesList]);

  /* ---- ADD LESSON ---- */
  const openAdd = () => {
    setFormData({
      ...emptyForm,
      moduleId: modulesList.length > 0 ? String(modulesList[0].id) : "",
    });
    setShowAddModal(true);
  };

  const confirmAdd = async () => {
    if (!formData.title.trim()) {
      toast.error("Le titre de la leçon est requis");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        duration: Number(formData.duration) || 15,
        videoUrl: formData.videoUrl,
        documentUrl: formData.documentUrl,
        moduleIds: formData.moduleId ? [Number(formData.moduleId)] : [],
        orderIndex: lessons.length + 1,
      };
      const response = await lessonService.create(payload);
      toast.success("Leçon créée avec succès !");
      setLessons((prev) => [response.data, ...prev]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Erreur création leçon:", error);
      toast.error(getApiErrorMessage(error) || "Erreur lors de la création");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---- EDIT LESSON ---- */
  const openEdit = (lesson) => {
    setActiveLesson(lesson);
    const modId = lesson.moduleIds && lesson.moduleIds.length > 0 ? String(lesson.moduleIds[0]) : "";
    setFormData({
      title: lesson.title || "",
      description: lesson.description || "",
      duration: lesson.duration || 15,
      moduleId: modId,
      videoUrl: lesson.videoUrl || "",
      documentUrl: lesson.documentUrl || "",
    });
    setShowEditModal(true);
  };

  const confirmEdit = async () => {
    if (!formData.title.trim()) {
      toast.error("Le titre de la leçon est requis");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        duration: Number(formData.duration) || 15,
        videoUrl: formData.videoUrl,
        documentUrl: formData.documentUrl,
        moduleIds: formData.moduleId ? [Number(formData.moduleId)] : [],
        orderIndex: activeLesson.orderIndex || 1,
      };
      const response = await lessonService.update(activeLesson.id, payload);
      toast.success("Leçon mise à jour !");
      setLessons((prev) =>
        prev.map((l) => (l.id === activeLesson.id ? response.data : l))
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Erreur modification leçon:", error);
      toast.error(getApiErrorMessage(error) || "Erreur lors de la modification");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---- DELETE LESSON ---- */
  const openDelete = (lesson) => {
    setActiveLesson(lesson);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsSubmitting(true);
    try {
      await lessonService.delete(activeLesson.id);
      toast.success("Leçon supprimée");
      setLessons((prev) => prev.filter((l) => l.id !== activeLesson.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Erreur suppression leçon:", error);
      toast.error(getApiErrorMessage(error) || "Erreur lors de la suppression");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---- VIDEO MODAL ---- */
  const openVideo = (lesson) => {
    setActiveLesson(lesson);
    setVideoUrlInput(lesson.videoUrl || "");
    setShowVideoModal(true);
  };

  const confirmVideo = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: activeLesson.title,
        description: activeLesson.description,
        duration: activeLesson.duration,
        videoUrl: videoUrlInput,
        documentUrl: activeLesson.documentUrl,
        moduleIds: activeLesson.moduleIds || [],
        orderIndex: activeLesson.orderIndex || 1,
      };
      const response = await lessonService.update(activeLesson.id, payload);
      toast.success("URL Vidéo enregistrée !");
      setLessons((prev) =>
        prev.map((l) => (l.id === activeLesson.id ? response.data : l))
      );
      setShowVideoModal(false);
    } catch (error) {
      console.error("Erreur mise à jour vidéo:", error);
      toast.error(getApiErrorMessage(error) || "Erreur lors de la mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ModalForm = ({ title, onClose, onConfirm, confirmLabel = "Enregistrer" }) => (
    <div className="modalBackDrop" onClick={() => !isSubmitting && onClose()}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h3>{title}</h3>
          <button className="closeBtn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modalBody">
          <label>Titre de la leçon *</label>
          <input
            className="modalInput"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ex: Introduction au HTML5"
          />

          <label>Module rattaché</label>
          <select
            className="modalInput"
            value={formData.moduleId}
            onChange={(e) => setFormData({ ...formData, moduleId: e.target.value })}
          >
            <option value="">-- Aucun module --</option>
            {modulesList.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>

          <label>Durée (en minutes)</label>
          <input
            className="modalInput"
            type="number"
            min="1"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />

          <label>Description du cours</label>
          <textarea
            className="modalInput"
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Résumé du contenu de la leçon..."
          />

          <label>URL Vidéo (MP4, YouTube, Vimeo)</label>
          <input
            className="modalInput"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            placeholder="https://www.w3schools.com/html/movie.mp4"
          />

          <label>URL Document / Support de cours (PDF)</label>
          <input
            className="modalInput"
            value={formData.documentUrl}
            onChange={(e) => setFormData({ ...formData, documentUrl: e.target.value })}
            placeholder="https://.../support.pdf"
          />
        </div>
        <div className="modalActions">
          <button className="btn btn--secondary" disabled={isSubmitting} onClick={onClose}>
            Annuler
          </button>
          <button className="btn btn--primary" disabled={isSubmitting} onClick={onConfirm}>
            {isSubmitting ? "Enregistrement..." : confirmLabel}
          </button>
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
          <input
            className="lessonsPage__search"
            type="text"
            placeholder="Rechercher une leçon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn--primary" onClick={openAdd}>
            + Nouvelle leçon
          </button>
        </div>
      </div>

      <div className="lessonsStats">
        {[
          { label: "Total leçons", val: stats.total, color: "blue" },
          { label: "Durée totale", val: `${stats.totalDuration} min`, color: "purple" },
          { label: "Avec Vidéo", val: stats.withVideo, color: "green" },
          { label: "Avec Document", val: stats.withDoc, color: "orange" },
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

        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement des leçons...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Aucune leçon trouvée. Cliquez sur "+ Nouvelle leçon" pour en créer une.
          </div>
        ) : (
          <table className="lessonsTable">
            <thead>
              <tr>
                <th>Leçon</th>
                <th>Module</th>
                <th>Durée</th>
                <th>Vidéos & Supports</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lesson) => (
                <tr key={lesson.id}>
                  <td>
                    <div className="lessonCell">
                      <div className="lessonAvatar">
                        {lesson.title ? lesson.title.charAt(0).toUpperCase() : "L"}
                      </div>
                      <div>
                        <strong>{lesson.title}</strong>
                        <p className="text-xs text-gray-500 truncate max-w-xs">
                          {lesson.description || "Aucune description"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm font-medium text-primary">
                      {getModuleName(lesson.moduleIds)}
                    </span>
                  </td>
                  <td>
                    <span className="durationBadge">{lesson.duration || 0} min</span>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center">
                      {lesson.videoUrl ? (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-semibold">
                          📹 Vidéo
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                          Pas de vidéo
                        </span>
                      )}
                      {(lesson.resources && lesson.resources.length > 0) || lesson.documentUrl ? (
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-semibold">
                          📄 Support
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td>
                    <div className="actionButtons">
                      <button className="btn btn--info" onClick={() => openEdit(lesson)}>
                        Éditer
                      </button>
                      <button className="btn btn--success" onClick={() => openVideo(lesson)}>
                        {lesson.videoUrl ? "📹 Modif Vidéo" : "📎 Ajouter vidéo"}
                      </button>
                      <button className="btn btn--danger" onClick={() => openDelete(lesson)}>
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showAddModal && (
        <ModalForm
          title="Nouvelle leçon"
          onClose={() => setShowAddModal(false)}
          onConfirm={confirmAdd}
          confirmLabel="Créer la leçon"
        />
      )}

      {showEditModal && activeLesson && (
        <ModalForm
          title="Modifier la leçon"
          onClose={() => setShowEditModal(false)}
          onConfirm={confirmEdit}
          confirmLabel="Sauvegarder"
        />
      )}

      {showDeleteModal && activeLesson && (
        <div className="modalBackDrop" onClick={() => !isSubmitting && setShowDeleteModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Confirmer la suppression</h3>
              <button className="closeBtn" onClick={() => setShowDeleteModal(false)}>
                ×
              </button>
            </div>
            <div className="modalBody">
              <p>
                Supprimer la leçon <strong>"{activeLesson.title}"</strong> ? Cette action est irréversible.
              </p>
            </div>
            <div className="modalActions">
              <button
                className="btn btn--secondary"
                disabled={isSubmitting}
                onClick={() => setShowDeleteModal(false)}
              >
                Annuler
              </button>
              <button className="btn btn--danger" disabled={isSubmitting} onClick={confirmDelete}>
                {isSubmitting ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showVideoModal && activeLesson && (
        <div className="modalBackDrop" onClick={() => !isSubmitting && setShowVideoModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Changer l'URL de la vidéo</h3>
              <button className="closeBtn" onClick={() => setShowVideoModal(false)}>
                ×
              </button>
            </div>
            <div className="modalBody">
              <p className="mb-2">
                Leçon : <strong>"{activeLesson.title}"</strong>
              </p>
              <label>Lien Vidéo (MP4 / Web / YouTube)</label>
              <input
                className="modalInput"
                value={videoUrlInput}
                onChange={(e) => setVideoUrlInput(e.target.value)}
                placeholder="https://www.w3schools.com/html/movie.mp4"
              />
            </div>
            <div className="modalActions">
              <button
                className="btn btn--secondary"
                disabled={isSubmitting}
                onClick={() => setShowVideoModal(false)}
              >
                Annuler
              </button>
              <button className="btn btn--success" disabled={isSubmitting} onClick={confirmVideo}>
                {isSubmitting ? "Enregistrement..." : "Enregistrer la vidéo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};