import { useMemo, useState, useEffect } from "react";
import { moduleService, formationService, lessonService } from "../../services/formationService";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../utils/errorHelper";
import "./modulePage.css";

const emptyForm = {
  title: "",
  description: "",
  durationHours: 1,
  formationId: "",
};

export const ModulePage = () => {
  const [modules, setModules] = useState([]);
  const [formationsList, setFormationsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssocModal, setShowAssocModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [activeModule, setActiveModule] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    duration: 15,
    videoUrl: "",
    documentUrl: "",
  });
  const [selectedFormationId, setSelectedFormationId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [modulesRes, formationsRes] = await Promise.all([
        moduleService.getAll(),
        formationService.getAll(),
      ]);
      setModules(modulesRes.data || []);
      setFormationsList(formationsRes.data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      toast.error(getApiErrorMessage(error) || "Erreur de chargement des modules");
    } finally {
      setLoading(false);
    }
  };

  const getFormationTitle = (formationId) => {
    if (!formationId) return "Non assigné";
    const found = formationsList.find((f) => String(f.id) === String(formationId));
    return found ? found.title : `Formation #${formationId}`;
  };

  const stats = useMemo(() => {
    const total = modules.length;
    const totalLessons = modules.reduce(
      (acc, m) => acc + (m.lessons ? m.lessons.length : 0),
      0
    );
    const totalHours = modules.reduce(
      (acc, m) => acc + (Number(m.durationHours) || 0),
      0
    );
    return {
      total,
      totalLessons,
      totalHours,
    };
  }, [modules]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return modules;
    return modules.filter((m) => {
      const title = m.title?.toLowerCase() || "";
      const desc = m.description?.toLowerCase() || "";
      const formTitle = getFormationTitle(m.formationId).toLowerCase();
      return title.includes(q) || desc.includes(q) || formTitle.includes(q);
    });
  }, [modules, search, formationsList]);

  /* ---- ADD MODULE ---- */
  const openAdd = () => {
    setFormData({
      ...emptyForm,
      formationId: formationsList.length > 0 ? String(formationsList[0].id) : "",
    });
    setShowAddModal(true);
  };

  const confirmAdd = async () => {
    if (!formData.title.trim()) {
      toast.error("Le titre du module est requis");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        durationHours: Number(formData.durationHours) || 1,
        formationId: formData.formationId ? Number(formData.formationId) : null,
        orderIndex: modules.length + 1,
      };
      const response = await moduleService.create(payload);
      toast.success("Module créé avec succès !");
      setModules((prev) => [response.data, ...prev]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Erreur création module:", error);
      toast.error(getApiErrorMessage(error) || "Erreur lors de la création du module");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---- EDIT MODULE ---- */
  const openEdit = (mod) => {
    setActiveModule(mod);
    setFormData({
      title: mod.title || "",
      description: mod.description || "",
      durationHours: mod.durationHours || 1,
      formationId: mod.formationId ? String(mod.formationId) : "",
    });
    setShowEditModal(true);
  };

  const confirmEdit = async () => {
    if (!formData.title.trim()) {
      toast.error("Le titre du module est requis");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        durationHours: Number(formData.durationHours) || 1,
        formationId: formData.formationId ? Number(formData.formationId) : null,
        orderIndex: activeModule.orderIndex || 1,
      };
      const response = await moduleService.update(activeModule.id, payload);
      toast.success("Module mis à jour !");
      setModules((prev) =>
        prev.map((m) => (m.id === activeModule.id ? response.data : m))
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Erreur modification module:", error);
      toast.error(getApiErrorMessage(error) || "Erreur lors de la modification");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---- DELETE MODULE ---- */
  const openDelete = (mod) => {
    setActiveModule(mod);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsSubmitting(true);
    try {
      await moduleService.delete(activeModule.id);
      toast.success("Module supprimé avec succès");
      setModules((prev) => prev.filter((m) => m.id !== activeModule.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Erreur suppression module:", error);
      toast.error(getApiErrorMessage(error) || "Erreur lors de la suppression");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---- ADD LESSON TO MODULE ---- */
  const openLesson = (mod) => {
    setActiveModule(mod);
    setLessonForm({
      title: "",
      description: "",
      duration: 15,
      videoUrl: "",
      documentUrl: "",
    });
    setShowLessonModal(true);
  };

  const confirmLesson = async () => {
    if (!lessonForm.title.trim()) {
      toast.error("Le titre de la leçon est requis");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        title: lessonForm.title,
        description: lessonForm.description,
        duration: Number(lessonForm.duration) || 15,
        videoUrl: lessonForm.videoUrl,
        documentUrl: lessonForm.documentUrl,
        moduleIds: [activeModule.id],
        orderIndex: (activeModule.lessons?.length || 0) + 1,
      };
      await lessonService.create(payload);
      toast.success(`Leçon ajoutée au module "${activeModule.title}" !`);
      fetchData(); // rafraîchir la liste complète
      setShowLessonModal(false);
    } catch (error) {
      console.error("Erreur ajout leçon:", error);
      toast.error(getApiErrorMessage(error) || "Erreur lors de l'ajout de la leçon");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---- ASSOCIATE MODULE TO FORMATION ---- */
  const openAssoc = (mod) => {
    setActiveModule(mod);
    setSelectedFormationId(mod.formationId ? String(mod.formationId) : "");
    setShowAssocModal(true);
  };

  const confirmAssoc = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: activeModule.title,
        description: activeModule.description,
        durationHours: activeModule.durationHours,
        orderIndex: activeModule.orderIndex,
        formationId: selectedFormationId ? Number(selectedFormationId) : null,
      };
      const response = await moduleService.update(activeModule.id, payload);
      toast.success("Formation associée avec succès !");
      setModules((prev) =>
        prev.map((m) => (m.id === activeModule.id ? response.data : m))
      );
      setShowAssocModal(false);
    } catch (error) {
      console.error("Erreur association formation:", error);
      toast.error(getApiErrorMessage(error) || "Erreur lors de l'association");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modulePage">
      <div className="modulePage__header">
        <div>
          <h2>Gestion des modules</h2>
          <p>Créer, modifier, supprimer et organiser les modules de formation.</p>
        </div>
        <div className="modulePage__headerActions">
          <input
            className="modulePage__search"
            type="text"
            placeholder="Rechercher un module..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn--primary" onClick={openAdd}>
            + Nouveau module
          </button>
        </div>
      </div>

      <div className="moduleStats">
        {[
          { label: "Total modules", val: stats.total, color: "blue" },
          { label: "Total leçons", val: stats.totalLessons, color: "purple" },
          { label: "Heures de cours", val: `${stats.totalHours}h`, color: "green" },
          { label: "Formations liées", val: formationsList.length, color: "orange" },
        ].map(({ label, val, color }) => (
          <div key={label} className={`moduleStatCard moduleStatCard--${color}`}>
            <span>{label}</span>
            <strong>{val}</strong>
          </div>
        ))}
      </div>

      <div className="modulePage__mainCard">
        <div className="cardHeader">
          <h3>Liste des modules</h3>
          <span>{filtered.length} résultat(s)</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement des modules...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Aucun module trouvé. Cliquez sur "+ Nouveau module" pour en créer un.
          </div>
        ) : (
          <table className="moduleTable">
            <thead>
              <tr>
                <th>Module</th>
                <th>Description</th>
                <th>Durée (heures)</th>
                <th>Leçons</th>
                <th>Formation liée</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((mod) => (
                <tr key={mod.id}>
                  <td>
                    <div className="moduleCell">
                      <div className="moduleAvatar">
                        {mod.title ? mod.title.charAt(0).toUpperCase() : "M"}
                      </div>
                      <div>
                        <strong>{mod.title}</strong>
                        <p>ID #{mod.id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-xs text-gray-600 truncate max-w-xs">
                      {mod.description || "Aucune description"}
                    </p>
                  </td>
                  <td>{mod.durationHours || 0} h</td>
                  <td>
                    <span className="lessonBadge">
                      {mod.lessons ? mod.lessons.length : 0} leçons
                    </span>
                  </td>
                  <td>
                    <span className="text-sm font-medium text-primary">
                      {getFormationTitle(mod.formationId)}
                    </span>
                  </td>
                  <td>
                    <div className="actionButtons">
                      <button className="btn btn--info" onClick={() => openEdit(mod)}>
                        Éditer
                      </button>
                      <button className="btn btn--success" onClick={() => openLesson(mod)}>
                        + Leçon
                      </button>
                      <button className="btn btn--purple" onClick={() => openAssoc(mod)}>
                        Associer
                      </button>
                      <button className="btn btn--danger" onClick={() => openDelete(mod)}>
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

      {/* ===== MODAL ADD MODULE ===== */}
      {showAddModal && (
        <div className="modalBackDrop" onClick={() => !isSubmitting && setShowAddModal(false)}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Nouveau module</h3>
              <button className="closeBtn" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>
            <div className="modalBody">
              <label>Nom du module *</label>
              <input
                className="modalInput"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Introduction à React"
              />
              <label>Description</label>
              <textarea
                className="modalInput"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description détaillée du module..."
              />
              <label>Durée estimée (heures)</label>
              <input
                className="modalInput"
                type="number"
                min="1"
                value={formData.durationHours}
                onChange={(e) =>
                  setFormData({ ...formData, durationHours: e.target.value })
                }
              />
              <label>Formation associée</label>
              <select
                className="modalInput"
                value={formData.formationId}
                onChange={(e) => setFormData({ ...formData, formationId: e.target.value })}
              >
                <option value="">-- Sélectionner une formation --</option>
                {formationsList.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="modalActions">
              <button
                className="btn btn--secondary"
                disabled={isSubmitting}
                onClick={() => setShowAddModal(false)}
              >
                Annuler
              </button>
              <button className="btn btn--primary" disabled={isSubmitting} onClick={confirmAdd}>
                {isSubmitting ? "Création..." : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL EDIT MODULE ===== */}
      {showEditModal && activeModule && (
        <div className="modalBackDrop" onClick={() => !isSubmitting && setShowEditModal(false)}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Modifier le module</h3>
              <button className="closeBtn" onClick={() => setShowEditModal(false)}>
                ×
              </button>
            </div>
            <div className="modalBody">
              <label>Nom du module *</label>
              <input
                className="modalInput"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <label>Description</label>
              <textarea
                className="modalInput"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <label>Durée estimée (heures)</label>
              <input
                className="modalInput"
                type="number"
                min="1"
                value={formData.durationHours}
                onChange={(e) =>
                  setFormData({ ...formData, durationHours: e.target.value })
                }
              />
              <label>Formation associée</label>
              <select
                className="modalInput"
                value={formData.formationId}
                onChange={(e) => setFormData({ ...formData, formationId: e.target.value })}
              >
                <option value="">-- Aucune --</option>
                {formationsList.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="modalActions">
              <button
                className="btn btn--secondary"
                disabled={isSubmitting}
                onClick={() => setShowEditModal(false)}
              >
                Annuler
              </button>
              <button className="btn btn--primary" disabled={isSubmitting} onClick={confirmEdit}>
                {isSubmitting ? "Sauvegarde..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL DELETE MODULE ===== */}
      {showDeleteModal && activeModule && (
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
                Supprimer le module <strong>"{activeModule.title}"</strong> ? Cette action est irréversible.
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

      {/* ===== MODAL ADD LESSON ===== */}
      {showLessonModal && activeModule && (
        <div className="modalBackDrop" onClick={() => !isSubmitting && setShowLessonModal(false)}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Ajouter une leçon</h3>
              <button className="closeBtn" onClick={() => setShowLessonModal(false)}>
                ×
              </button>
            </div>
            <div className="modalBody">
              <p className="mb-3">
                Ajouter une leçon au module : <strong>"{activeModule.title}"</strong>
              </p>
              <label>Titre de la leçon *</label>
              <input
                className="modalInput"
                value={lessonForm.title}
                onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                placeholder="Ex: Les fondamentaux du HTML5"
              />
              <label>Description</label>
              <textarea
                className="modalInput"
                rows="2"
                value={lessonForm.description}
                onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                placeholder="Aperçu du cours..."
              />
              <label>Durée (minutes)</label>
              <input
                className="modalInput"
                type="number"
                min="1"
                value={lessonForm.duration}
                onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
              />
              <label>URL Vidéo (MP4, YouTube, Vimeo)</label>
              <input
                className="modalInput"
                value={lessonForm.videoUrl}
                onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                placeholder="https://..."
              />
              <label>URL Document/Support (PDF, Doc)</label>
              <input
                className="modalInput"
                value={lessonForm.documentUrl}
                onChange={(e) => setLessonForm({ ...lessonForm, documentUrl: e.target.value })}
                placeholder="https://.../support.pdf"
              />
            </div>
            <div className="modalActions">
              <button
                className="btn btn--secondary"
                disabled={isSubmitting}
                onClick={() => setShowLessonModal(false)}
              >
                Annuler
              </button>
              <button className="btn btn--success" disabled={isSubmitting} onClick={confirmLesson}>
                {isSubmitting ? "Ajout..." : "Ajouter la leçon"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL ASSOCIATE TO FORMATION ===== */}
      {showAssocModal && activeModule && (
        <div className="modalBackDrop" onClick={() => !isSubmitting && setShowAssocModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Associer à une formation</h3>
              <button className="closeBtn" onClick={() => setShowAssocModal(false)}>
                ×
              </button>
            </div>
            <div className="modalBody">
              <p className="mb-3">
                Module : <strong>"{activeModule.title}"</strong>
              </p>
              <label>Choisir la formation</label>
              <select
                className="modalInput"
                value={selectedFormationId}
                onChange={(e) => setSelectedFormationId(e.target.value)}
              >
                <option value="">-- Aucune (Détacher) --</option>
                {formationsList.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="modalActions">
              <button
                className="btn btn--secondary"
                disabled={isSubmitting}
                onClick={() => setShowAssocModal(false)}
              >
                Annuler
              </button>
              <button className="btn btn--primary" disabled={isSubmitting} onClick={confirmAssoc}>
                {isSubmitting ? "Association..." : "Associer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};