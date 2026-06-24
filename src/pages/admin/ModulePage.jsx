import { useMemo, useState } from "react";
import "./modulePage.css";

const initialModules = [
  { id: 1, name: "Introduction au développement web", category: "Développement Web", lessons: 8, formation: "Bootcamp Frontend", status: "published", createdAt: "2026-01-12" },
  { id: 2, name: "Design UI/UX moderne", category: "Design", lessons: 5, formation: "Design Pro", status: "draft", createdAt: "2026-02-08" },
  { id: 3, name: "Marketing digital avancé", category: "Marketing", lessons: 12, formation: "Business Growth", status: "published", createdAt: "2026-03-01" },
  { id: 4, name: "Cybersécurité essentielle", category: "Sécurité", lessons: 6, formation: "Security Starter", status: "archived", createdAt: "2026-04-05" },
];

const formations = ["Bootcamp Frontend", "Design Pro", "Business Growth", "Security Starter", "Data Academy", "Mobile Mastery"];
const emptyForm = { name: "", category: "", lessons: "", formation: formations[0], status: "draft" };

export const ModulePage = () => {
  const [modules, setModules] = useState(initialModules);
  const [search, setSearch] = useState("");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssocModal, setShowAssocModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [activeModule, setActiveModule] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [lessonName, setLessonName] = useState("");
  const [selectedFormation, setSelectedFormation] = useState(formations[0]);

  const stats = useMemo(() => ({
    total: modules.length,
    published: modules.filter((m) => m.status === "published").length,
    draft: modules.filter((m) => m.status === "draft").length,
    archived: modules.filter((m) => m.status === "archived").length,
    lessons: modules.reduce((acc, m) => acc + m.lessons, 0),
  }), [modules]);

  const filtered = modules.filter((m) => {
    const q = search.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q) || m.formation.toLowerCase().includes(q);
  });

  const updateModule = (id, patch) =>
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  /* ---- ADD ---- */
  const openAdd = () => { setFormData(emptyForm); setShowAddModal(true); };
  const confirmAdd = () => {
    if (!formData.name.trim() || !formData.category.trim()) return;
    setModules((prev) => [{ id: Date.now(), ...formData, lessons: Number(formData.lessons || 0), createdAt: new Date().toISOString().slice(0, 10) }, ...prev]);
    setShowAddModal(false);
  };

  /* ---- EDIT ---- */
  const openEdit = (mod) => { setActiveModule(mod); setFormData({ name: mod.name, category: mod.category, lessons: mod.lessons, formation: mod.formation, status: mod.status }); setShowEditModal(true); };
  const confirmEdit = () => {
    updateModule(activeModule.id, { ...formData, lessons: Number(formData.lessons || 0) });
    setShowEditModal(false);
  };

  /* ---- DELETE ---- */
  const openDelete = (mod) => { setActiveModule(mod); setShowDeleteModal(true); };
  const confirmDelete = () => { setModules((prev) => prev.filter((m) => m.id !== activeModule.id)); setShowDeleteModal(false); };

  /* ---- LESSON ---- */
  const openLesson = (mod) => { setActiveModule(mod); setLessonName(""); setShowLessonModal(true); };
  const confirmLesson = () => {
    if (!lessonName.trim()) return;
    updateModule(activeModule.id, { lessons: activeModule.lessons + 1 });
    setShowLessonModal(false);
  };

  /* ---- ASSOCIATE ---- */
  const openAssoc = (mod) => { setActiveModule(mod); setSelectedFormation(mod.formation); setShowAssocModal(true); };
  const confirmAssoc = () => { updateModule(activeModule.id, { formation: selectedFormation }); setShowAssocModal(false); };

  const StatusBadge = ({ status }) => {
    const map = { published: "Publié", draft: "Brouillon", archived: "Archivé" };
    return <span className={`statusBadge statusBadge--${status}`}>{map[status] || status}</span>;
  };

  return (
    <div className="modulePage">
      <div className="modulePage__header">
        <div>
          <h2>Gestion des modules</h2>
          <p>Créer, modifier, supprimer et organiser les modules de formation.</p>
        </div>
        <div className="modulePage__headerActions">
          <input className="modulePage__search" type="text" placeholder="Rechercher un module..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn--primary" onClick={openAdd}>+ Nouveau module</button>
        </div>
      </div>

      <div className="moduleStats">
        {[
          { label: "Total modules", val: stats.total, color: "blue" },
          { label: "Publiés", val: stats.published, color: "green" },
          { label: "Brouillons", val: stats.draft, color: "orange" },
          { label: "Archivés", val: stats.archived, color: "gray" },
          { label: "Total leçons", val: stats.lessons, color: "purple" },
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

        <table className="moduleTable">
          <thead>
            <tr>
              <th>Module</th>
              <th>Catégorie</th>
              <th>Leçons</th>
              <th>Formation</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((mod) => (
              <tr key={mod.id}>
                <td>
                  <div className="moduleCell">
                    <div className="moduleAvatar">{mod.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <strong>{mod.name}</strong>
                      <p>Créé le {mod.createdAt}</p>
                    </div>
                  </div>
                </td>
                <td>{mod.category}</td>
                <td><span className="lessonBadge">{mod.lessons} leçons</span></td>
                <td>{mod.formation}</td>
                <td>
                  <select
                    className={`statusSelect statusSelect--${mod.status}`}
                    value={mod.status}
                    onChange={(e) => updateModule(mod.id, { status: e.target.value })}
                  >
                    <option value="published">Publié</option>
                    <option value="draft">Brouillon</option>
                    <option value="archived">Archivé</option>
                  </select>
                </td>
                <td>
                  <div className="actionButtons">
                    <button className="btn btn--info" onClick={() => openEdit(mod)}>Éditer</button>
                    <button className="btn btn--danger" onClick={() => openDelete(mod)}>Supprimer</button>
                    <button className="btn btn--success" onClick={() => openLesson(mod)}>+ Leçon</button>
                    <button className="btn btn--purple" onClick={() => openAssoc(mod)}>Associer</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MODAL ADD ===== */}
      {showAddModal && (
        <div className="modalBackDrop" onClick={() => setShowAddModal(false)}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Nouveau module</h3>
              <button className="closeBtn" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <label>Nom du module *</label>
              <input className="modalInput" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: Introduction à React" />
              <label>Catégorie *</label>
              <input className="modalInput" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Ex: Développement Web" />
              <label>Nombre de leçons</label>
              <input className="modalInput" type="number" min="0" value={formData.lessons} onChange={(e) => setFormData({ ...formData, lessons: e.target.value })} placeholder="0" />
              <label>Formation associée</label>
              <select className="modalInput" value={formData.formation} onChange={(e) => setFormData({ ...formData, formation: e.target.value })}>
                {formations.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              <label>Statut</label>
              <select className="modalInput" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowAddModal(false)}>Annuler</button>
              <button className="btn btn--primary" onClick={confirmAdd}>Créer</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL EDIT ===== */}
      {showEditModal && activeModule && (
        <div className="modalBackDrop" onClick={() => setShowEditModal(false)}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Modifier le module</h3>
              <button className="closeBtn" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <label>Nom du module</label>
              <input className="modalInput" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <label>Catégorie</label>
              <input className="modalInput" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              <label>Nombre de leçons</label>
              <input className="modalInput" type="number" min="0" value={formData.lessons} onChange={(e) => setFormData({ ...formData, lessons: e.target.value })} />
              <label>Formation associée</label>
              <select className="modalInput" value={formData.formation} onChange={(e) => setFormData({ ...formData, formation: e.target.value })}>
                {formations.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              <label>Statut</label>
              <select className="modalInput" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowEditModal(false)}>Annuler</button>
              <button className="btn btn--primary" onClick={confirmEdit}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL DELETE ===== */}
      {showDeleteModal && activeModule && (
        <div className="modalBackDrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Confirmer la suppression</h3>
              <button className="closeBtn" onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <p>Supprimer le module <strong>"{activeModule.name}"</strong> ? Cette action est irréversible.</p>
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowDeleteModal(false)}>Annuler</button>
              <button className="btn btn--danger" onClick={confirmDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL ADD LESSON ===== */}
      {showLessonModal && activeModule && (
        <div className="modalBackDrop" onClick={() => setShowLessonModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Ajouter une leçon</h3>
              <button className="closeBtn" onClick={() => setShowLessonModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <p>Ajouter une leçon au module <strong>"{activeModule.name}"</strong></p>
              <label>Nom de la leçon</label>
              <input className="modalInput" value={lessonName} onChange={(e) => setLessonName(e.target.value)} placeholder="Ex: Les bases du HTML" />
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowLessonModal(false)}>Annuler</button>
              <button className="btn btn--success" onClick={confirmLesson}>Ajouter</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL ASSOCIATE ===== */}
      {showAssocModal && activeModule && (
        <div className="modalBackDrop" onClick={() => setShowAssocModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Associer à une formation</h3>
              <button className="closeBtn" onClick={() => setShowAssocModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <p>Module : <strong>"{activeModule.name}"</strong></p>
              <label>Formation</label>
              <select className="modalInput" value={selectedFormation} onChange={(e) => setSelectedFormation(e.target.value)}>
                {formations.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowAssocModal(false)}>Annuler</button>
              <button className="btn btn--primary" onClick={confirmAssoc}>Associer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};