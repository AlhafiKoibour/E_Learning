import { useMemo, useState } from "react";
import "./MentorshipPage.css";

const initialMentors = [
  { id: 1, name: "Paul T.", email: "paul@email.com", specialty: "Développement Web", rating: 4.8, students: 12, sessions: 48, status: "available", joined: "2026-01-10" },
  { id: 2, name: "Jean N.", email: "jean@email.com", specialty: "React & Node.js", rating: 4.6, students: 8, sessions: 32, status: "busy", joined: "2026-02-01" },
  { id: 3, name: "Mariam K.", email: "mariam@email.com", specialty: "Design UI/UX", rating: 4.9, students: 15, sessions: 60, status: "available", joined: "2025-12-15" },
  { id: 4, name: "Awa B.", email: "awa@email.com", specialty: "Data Analysis", rating: 4.5, students: 5, sessions: 20, status: "inactive", joined: "2026-03-05" },
];

const initialRequests = [
  { id: 1, student: "Fatou S.", mentor: "Paul T.", topic: "Aide sur React Hooks", date: "2026-05-28", status: "pending" },
  { id: 2, student: "Omar D.", mentor: "Mariam K.", topic: "Review de design portfolio", date: "2026-05-29", status: "accepted" },
  { id: 3, student: "Lena M.", mentor: "Jean N.", topic: "Débogage Node.js API", date: "2026-05-30", status: "pending" },
  { id: 4, student: "Alex P.", mentor: "Awa B.", topic: "Visualisation de données", date: "2026-05-27", status: "rejected" },
];

const specialties = ["Développement Web", "React & Node.js", "Design UI/UX", "Data Analysis", "Cybersécurité", "Mobile"];
const emptyMentorForm = { name: "", email: "", specialty: specialties[0], status: "available" };

export const MentorshipPage = () => {
  const [mentors, setMentors] = useState(initialMentors);
  const [requests, setRequests] = useState(initialRequests);
  const [activeTab, setActiveTab] = useState("mentors");
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeMentor, setActiveMentor] = useState(null);
  const [formData, setFormData] = useState(emptyMentorForm);

  const stats = useMemo(() => ({
    totalMentors: mentors.length,
    available: mentors.filter((m) => m.status === "available").length,
    totalStudents: mentors.reduce((acc, m) => acc + m.students, 0),
    pendingRequests: requests.filter((r) => r.status === "pending").length,
    avgRating: (mentors.reduce((acc, m) => acc + m.rating, 0) / Math.max(1, mentors.length)).toFixed(1),
  }), [mentors, requests]);

  const filteredMentors = mentors.filter((m) => {
    const q = search.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.specialty.toLowerCase().includes(q);
  });

  const updateMentor = (id, patch) => setMentors((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  const updateRequest = (id, patch) => setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const confirmAdd = () => {
    if (!formData.name.trim()) return;
    setMentors((prev) => [{ id: Date.now(), ...formData, rating: 0, students: 0, sessions: 0, joined: new Date().toISOString().slice(0, 10) }, ...prev]);
    setShowAddModal(false);
  };

  const openDelete = (m) => { setActiveMentor(m); setShowDeleteModal(true); };
  const confirmDelete = () => { setMentors((prev) => prev.filter((m) => m.id !== activeMentor.id)); setShowDeleteModal(false); };

  const statusLabels = { available: "Disponible", busy: "Occupé", inactive: "Inactif" };
  const statusColors = { available: "green", busy: "orange", inactive: "gray" };
  const reqStatusColors = { pending: "orange", accepted: "green", rejected: "red" };
  const reqStatusLabels = { pending: "En attente", accepted: "Acceptée", rejected: "Refusée" };

  return (
    <div className="mentorshipPage">
      <div className="mentorshipPage__header">
        <div>
          <h2>Gestion du mentorat</h2>
          <p>Administrer les mentors, suivre les demandes et les sessions.</p>
        </div>
        <div className="mentorshipPage__headerActions">
          <input className="mentorshipPage__search" type="text" placeholder="Rechercher un mentor..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn--primary" onClick={() => { setFormData(emptyMentorForm); setShowAddModal(true); }}>+ Ajouter un mentor</button>
        </div>
      </div>

      <div className="mentorshipStats">
        {[
          { label: "Total mentors", val: stats.totalMentors, color: "blue", icon: "👥" },
          { label: "Disponibles", val: stats.available, color: "green", icon: "✅" },
          { label: "Étudiants suivis", val: stats.totalStudents, color: "purple", icon: "🎓" },
          { label: "Demandes en attente", val: stats.pendingRequests, color: "orange", icon: "⏳" },
          { label: "Note moyenne", val: `⭐ ${stats.avgRating}`, color: "gold", icon: "" },
        ].map(({ label, val, color, icon }) => (
          <div key={label} className={`mentorStatCard mentorStatCard--${color}`}>
            <span>{label}</span>
            <strong>{val}</strong>
          </div>
        ))}
      </div>

      <div className="mentorshipPage__tabs">
        <button className={`tab ${activeTab === "mentors" ? "tab--active" : ""}`} onClick={() => setActiveTab("mentors")}>
          👥 Mentors ({mentors.length})
        </button>
        <button className={`tab ${activeTab === "requests" ? "tab--active" : ""}`} onClick={() => setActiveTab("requests")}>
          📩 Demandes ({requests.filter((r) => r.status === "pending").length} en attente)
        </button>
      </div>

      {activeTab === "mentors" && (
        <div className="mentorGrid">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="mentorCard">
              <div className="mentorCard__top">
                <div className="mentorAvatar">{mentor.name.charAt(0)}</div>
                <div className={`mentorBadge badge--${statusColors[mentor.status]}`}>
                  {statusLabels[mentor.status]}
                </div>
              </div>
              <h3 className="mentorCard__name">{mentor.name}</h3>
              <p className="mentorCard__email">{mentor.email}</p>
              <p className="mentorCard__specialty">🎯 {mentor.specialty}</p>
              <div className="mentorCard__stats">
                <div><strong>{mentor.students}</strong><span>Étudiants</span></div>
                <div><strong>{mentor.sessions}</strong><span>Sessions</span></div>
                <div><strong>⭐ {mentor.rating}</strong><span>Note</span></div>
              </div>
              <div className="mentorCard__actions">
                <select
                  className={`statusSelect statusSelect--${mentor.status}`}
                  value={mentor.status}
                  onChange={(e) => updateMentor(mentor.id, { status: e.target.value })}
                >
                  <option value="available">Disponible</option>
                  <option value="busy">Occupé</option>
                  <option value="inactive">Inactif</option>
                </select>
                <button className="btn btn--danger btn--sm" onClick={() => openDelete(mentor)}>Retirer</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "requests" && (
        <div className="requestsPage__mainCard">
          <div className="cardHeader">
            <h3>Demandes de mentorat</h3>
            <span>{requests.length} demande(s)</span>
          </div>
          <table className="requestsTable">
            <thead>
              <tr>
                <th>Étudiant</th>
                <th>Mentor</th>
                <th>Sujet</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td><strong>{req.student}</strong></td>
                  <td>{req.mentor}</td>
                  <td>{req.topic}</td>
                  <td>{req.date}</td>
                  <td>
                    <span className={`reqBadge reqBadge--${reqStatusColors[req.status]}`}>
                      {reqStatusLabels[req.status]}
                    </span>
                  </td>
                  <td>
                    <div className="actionButtons">
                      {req.status === "pending" && (
                        <>
                          <button className="btn btn--success" onClick={() => updateRequest(req.id, { status: "accepted" })}>Accepter</button>
                          <button className="btn btn--danger" onClick={() => updateRequest(req.id, { status: "rejected" })}>Refuser</button>
                        </>
                      )}
                      {req.status !== "pending" && (
                        <button className="btn btn--secondary" onClick={() => updateRequest(req.id, { status: "pending" })}>Remettre en attente</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <div className="modalBackDrop" onClick={() => setShowAddModal(false)}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Ajouter un mentor</h3>
              <button className="closeBtn" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <label>Nom complet *</label>
              <input className="modalInput" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: Marie Dupont" />
              <label>Email</label>
              <input className="modalInput" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="marie@email.com" />
              <label>Spécialité</label>
              <select className="modalInput" value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}>
                {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <label>Disponibilité</label>
              <select className="modalInput" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option value="available">Disponible</option>
                <option value="busy">Occupé</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowAddModal(false)}>Annuler</button>
              <button className="btn btn--primary" onClick={confirmAdd}>Ajouter</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && activeMentor && (
        <div className="modalBackDrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Retirer le mentor</h3>
              <button className="closeBtn" onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <p>Retirer <strong>{activeMentor.name}</strong> de la liste des mentors ?</p>
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowDeleteModal(false)}>Annuler</button>
              <button className="btn btn--danger" onClick={confirmDelete}>Retirer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
