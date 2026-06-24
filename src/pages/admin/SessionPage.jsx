import { useMemo, useState } from "react";
import "./SessionPage.css";

const initialSessions = [
  { id: 1, title: "Bootcamp React — Cohorte 1", formation: "Développement Web", instructor: "Paul T.", startDate: "2026-02-01", endDate: "2026-04-30", enrolled: 24, capacity: 30, status: "active" },
  { id: 2, title: "Design UI/UX Intensif", formation: "Design UI/UX", instructor: "Mariam K.", startDate: "2026-03-15", endDate: "2026-05-15", enrolled: 18, capacity: 20, status: "active" },
  { id: 3, title: "Marketing Digital Pro", formation: "Marketing Digital", instructor: "Jean N.", startDate: "2025-11-01", endDate: "2026-01-31", enrolled: 30, capacity: 30, status: "completed" },
  { id: 4, title: "Data Science Avancé", formation: "Data Analysis", instructor: "Awa B.", startDate: "2026-06-01", endDate: "2026-08-31", enrolled: 0, capacity: 25, status: "planned" },
];

const formations = ["Développement Web", "Design UI/UX", "Marketing Digital", "Data Analysis", "Cybersécurité", "Mobile"];
const instructors = ["Paul T.", "Mariam K.", "Jean N.", "Awa B.", "Kelvin K."];
const emptyForm = { title: "", formation: formations[0], instructor: instructors[0], startDate: "", endDate: "", capacity: "", status: "planned" };

export const SessionPage = () => {
  const [sessions, setSessions] = useState(initialSessions);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [activeSession, setActiveSession] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const stats = useMemo(() => ({
    total: sessions.length,
    active: sessions.filter((s) => s.status === "active").length,
    completed: sessions.filter((s) => s.status === "completed").length,
    planned: sessions.filter((s) => s.status === "planned").length,
    totalEnrolled: sessions.reduce((acc, s) => acc + s.enrolled, 0),
  }), [sessions]);

  const filtered = sessions.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = s.title.toLowerCase().includes(q) || s.formation.toLowerCase().includes(q) || s.instructor.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateSession = (id, patch) =>
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const openAdd = () => { setFormData(emptyForm); setShowAddModal(true); };
  const confirmAdd = () => {
    if (!formData.title.trim()) return;
    setSessions((prev) => [{ id: Date.now(), ...formData, enrolled: 0, capacity: Number(formData.capacity || 20) }, ...prev]);
    setShowAddModal(false);
  };

  const openEdit = (s) => { setActiveSession(s); setFormData({ title: s.title, formation: s.formation, instructor: s.instructor, startDate: s.startDate, endDate: s.endDate, capacity: s.capacity, status: s.status }); setShowEditModal(true); };
  const confirmEdit = () => { updateSession(activeSession.id, { ...formData, capacity: Number(formData.capacity) }); setShowEditModal(false); };

  const openDelete = (s) => { setActiveSession(s); setShowDeleteModal(true); };
  const confirmDelete = () => { setSessions((prev) => prev.filter((s) => s.id !== activeSession.id)); setShowDeleteModal(false); };

  const statusLabels = { active: "Active", completed: "Terminée", planned: "Planifiée" };
  const statusColors = { active: "green", completed: "blue", planned: "orange" };

  const SessionForm = ({ title, onClose, onConfirm, confirmLabel }) => (
    <div className="modalBackDrop" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h3>{title}</h3>
          <button className="closeBtn" onClick={onClose}>×</button>
        </div>
        <div className="modalBody">
          <label>Titre de la session *</label>
          <input className="modalInput" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Ex: Bootcamp React — Cohorte 2" />
          <label>Formation</label>
          <select className="modalInput" value={formData.formation} onChange={(e) => setFormData({ ...formData, formation: e.target.value })}>
            {formations.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <label>Formateur</label>
          <select className="modalInput" value={formData.instructor} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}>
            {instructors.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
          <div className="modalRow">
            <div>
              <label>Date de début</label>
              <input className="modalInput" type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
            </div>
            <div>
              <label>Date de fin</label>
              <input className="modalInput" type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
            </div>
          </div>
          <label>Capacité max</label>
          <input className="modalInput" type="number" min="1" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} placeholder="30" />
          <label>Statut</label>
          <select className="modalInput" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
            <option value="planned">Planifiée</option>
            <option value="active">Active</option>
            <option value="completed">Terminée</option>
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
    <div className="sessionPage">
      <div className="sessionPage__header">
        <div>
          <h2>Gestion des sessions</h2>
          <p>Planifier, suivre et gérer les sessions de formation.</p>
        </div>
        <div className="sessionPage__headerActions">
          <input className="sessionPage__search" type="text" placeholder="Rechercher une session..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="sessionPage__select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Tous les statuts</option>
            <option value="active">Actives</option>
            <option value="planned">Planifiées</option>
            <option value="completed">Terminées</option>
          </select>
          <button className="btn btn--primary" onClick={openAdd}>+ Nouvelle session</button>
        </div>
      </div>

      <div className="sessionStats">
        {[
          { label: "Total sessions", val: stats.total, color: "blue" },
          { label: "Actives", val: stats.active, color: "green" },
          { label: "Planifiées", val: stats.planned, color: "orange" },
          { label: "Terminées", val: stats.completed, color: "gray" },
          { label: "Apprenants inscrits", val: stats.totalEnrolled, color: "purple" },
        ].map(({ label, val, color }) => (
          <div key={label} className={`sessionStatCard sessionStatCard--${color}`}>
            <span>{label}</span>
            <strong>{val}</strong>
          </div>
        ))}
      </div>

      <div className="sessionPage__grid">
        {filtered.map((session) => {
          const pct = Math.round((session.enrolled / Math.max(1, session.capacity)) * 100);
          return (
            <div key={session.id} className="sessionCard">
              <div className="sessionCard__top">
                <div className={`sessionCard__badge badge--${statusColors[session.status]}`}>
                  {statusLabels[session.status]}
                </div>
                <div className="sessionCard__actions">
                  <button className="iconBtn iconBtn--edit" onClick={() => openEdit(session)} title="Modifier">✏️</button>
                  <button className="iconBtn iconBtn--delete" onClick={() => openDelete(session)} title="Supprimer">🗑️</button>
                </div>
              </div>
              <h3 className="sessionCard__title">{session.title}</h3>
              <p className="sessionCard__formation">📚 {session.formation}</p>
              <p className="sessionCard__instructor">👤 {session.instructor}</p>
              <div className="sessionCard__dates">
                <span>🗓️ {session.startDate}</span>
                <span>→</span>
                <span>{session.endDate}</span>
              </div>
              <div className="sessionCard__progress">
                <div className="progressLabel">
                  <span>{session.enrolled}/{session.capacity} inscrits</span>
                  <span>{pct}%</span>
                </div>
                <div className="progressBar">
                  <div className="progressFill" style={{ width: `${pct}%`, background: pct >= 90 ? "#ef4444" : pct >= 60 ? "#f59e0b" : "#10b981" }} />
                </div>
              </div>
              <div className="sessionCard__statusRow">
                <select
                  className={`statusSelect statusSelect--${session.status}`}
                  value={session.status}
                  onChange={(e) => updateSession(session.id, { status: e.target.value })}
                >
                  <option value="planned">Planifiée</option>
                  <option value="active">Active</option>
                  <option value="completed">Terminée</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && <SessionForm title="Nouvelle session" onClose={() => setShowAddModal(false)} onConfirm={confirmAdd} confirmLabel="Créer" />}
      {showEditModal && activeSession && <SessionForm title="Modifier la session" onClose={() => setShowEditModal(false)} onConfirm={confirmEdit} confirmLabel="Enregistrer" />}

      {showDeleteModal && activeSession && (
        <div className="modalBackDrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Confirmer la suppression</h3>
              <button className="closeBtn" onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <p>Supprimer la session <strong>"{activeSession.title}"</strong> ?</p>
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowDeleteModal(false)}>Annuler</button>
              <button className="btn btn--danger" onClick={confirmDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
