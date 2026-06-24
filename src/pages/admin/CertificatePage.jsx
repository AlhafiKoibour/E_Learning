import { useMemo, useState } from "react";
import "./CertificatePage.css";

const initialCertificates = [
  { id: 1, studentName: "Jean N.", studentEmail: "jean@email.com", formation: "Développement Web", completedAt: "2026-04-15", score: 92, status: "issued", certId: "CERT-2026-0001" },
  { id: 2, studentName: "Mariam K.", studentEmail: "mariam@email.com", formation: "Design UI/UX", completedAt: "2026-04-20", score: 88, status: "issued", certId: "CERT-2026-0002" },
  { id: 3, studentName: "Awa B.", studentEmail: "awa@email.com", formation: "Marketing Digital", completedAt: "2026-05-01", score: 75, status: "pending", certId: "CERT-2026-0003" },
  { id: 4, studentName: "Paul T.", studentEmail: "paul@email.com", formation: "Data Analysis", completedAt: "2026-05-10", score: 45, status: "rejected", certId: "CERT-2026-0004" },
  { id: 5, studentName: "Fatou S.", studentEmail: "fatou@email.com", formation: "Cybersécurité", completedAt: "2026-05-15", score: 96, status: "issued", certId: "CERT-2026-0005" },
];

export const CertificatePage = () => {
  const [certs, setCerts] = useState(initialCertificates);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [activeCert, setActiveCert] = useState(null);

  const stats = useMemo(() => ({
    total: certs.length,
    issued: certs.filter((c) => c.status === "issued").length,
    pending: certs.filter((c) => c.status === "pending").length,
    rejected: certs.filter((c) => c.status === "rejected").length,
    avgScore: Math.round(certs.reduce((acc, c) => acc + c.score, 0) / Math.max(1, certs.length)),
  }), [certs]);

  const filtered = certs.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = c.studentName.toLowerCase().includes(q) || c.formation.toLowerCase().includes(q) || c.certId.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateCert = (id, patch) => setCerts((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const openRevoke = (c) => { setActiveCert(c); setShowRevokeModal(true); };
  const confirmRevoke = () => { updateCert(activeCert.id, { status: "rejected" }); setShowRevokeModal(false); };

  const openIssue = (c) => { setActiveCert(c); setShowIssueModal(true); };
  const confirmIssue = () => { updateCert(activeCert.id, { status: "issued" }); setShowIssueModal(false); };

  const statusConfig = {
    issued: { label: "Délivré", color: "green" },
    pending: { label: "En attente", color: "orange" },
    rejected: { label: "Refusé", color: "red" },
  };

  const scoreColor = (score) => score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div className="certPage">
      <div className="certPage__header">
        <div>
          <h2>Gestion des certificats</h2>
          <p>Émettre, valider, révoquer et suivre les certificats de formation.</p>
        </div>
        <div className="certPage__headerActions">
          <input className="certPage__search" type="text" placeholder="Rechercher un certificat..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="certPage__select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Tous les statuts</option>
            <option value="issued">Délivrés</option>
            <option value="pending">En attente</option>
            <option value="rejected">Refusés</option>
          </select>
        </div>
      </div>

      <div className="certStats">
        {[
          { label: "Total certificats", val: stats.total, color: "blue", icon: "📜" },
          { label: "Délivrés", val: stats.issued, color: "green", icon: "✅" },
          { label: "En attente", val: stats.pending, color: "orange", icon: "⏳" },
          { label: "Refusés", val: stats.rejected, color: "red", icon: "❌" },
          { label: "Score moyen", val: `${stats.avgScore}%`, color: "purple", icon: "📊" },
        ].map(({ label, val, color }) => (
          <div key={label} className={`certStatCard certStatCard--${color}`}>
            <span>{label}</span>
            <strong>{val}</strong>
          </div>
        ))}
      </div>

      <div className="certPage__mainCard">
        <div className="cardHeader">
          <h3>Liste des certificats</h3>
          <span>{filtered.length} résultat(s)</span>
        </div>

        <table className="certTable">
          <thead>
            <tr>
              <th>ID Certificat</th>
              <th>Étudiant</th>
              <th>Formation</th>
              <th>Score</th>
              <th>Date d'obtention</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((cert) => (
              <tr key={cert.id}>
                <td>
                  <span className="certId">{cert.certId}</span>
                </td>
                <td>
                  <div className="certStudentCell">
                    <div className="certAvatar">{cert.studentName.charAt(0)}</div>
                    <div>
                      <strong>{cert.studentName}</strong>
                      <p>{cert.studentEmail}</p>
                    </div>
                  </div>
                </td>
                <td>{cert.formation}</td>
                <td>
                  <span className="scorePill" style={{ background: scoreColor(cert.score) + "22", color: scoreColor(cert.score), border: `1px solid ${scoreColor(cert.score)}` }}>
                    {cert.score}%
                  </span>
                </td>
                <td>{cert.completedAt}</td>
                <td>
                  <span className={`certBadge certBadge--${statusConfig[cert.status].color}`}>
                    {statusConfig[cert.status].label}
                  </span>
                </td>
                <td>
                  <div className="actionButtons">
                    {cert.status === "pending" && (
                      <button className="btn btn--success" onClick={() => openIssue(cert)}>✅ Émettre</button>
                    )}
                    {cert.status === "issued" && (
                      <>
                        <button className="btn btn--info" onClick={() => alert(`Téléchargement simulé pour ${cert.certId}`)}>⬇️ Télécharger</button>
                        <button className="btn btn--danger" onClick={() => openRevoke(cert)}>🚫 Révoquer</button>
                      </>
                    )}
                    {cert.status === "rejected" && (
                      <button className="btn btn--success" onClick={() => openIssue(cert)}>♻️ Réactiver</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showIssueModal && activeCert && (
        <div className="modalBackDrop" onClick={() => setShowIssueModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Émettre le certificat</h3>
              <button className="closeBtn" onClick={() => setShowIssueModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <p>Confirmer l'émission du certificat <strong>{activeCert.certId}</strong> pour <strong>{activeCert.studentName}</strong> ?</p>
              <div className="certPreview">
                <div className="certPreview__badge">🏆</div>
                <p><strong>{activeCert.formation}</strong></p>
                <p>Score : <strong>{activeCert.score}%</strong></p>
              </div>
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowIssueModal(false)}>Annuler</button>
              <button className="btn btn--success" onClick={confirmIssue}>Émettre</button>
            </div>
          </div>
        </div>
      )}

      {showRevokeModal && activeCert && (
        <div className="modalBackDrop" onClick={() => setShowRevokeModal(false)}>
          <div className="modalCard modalCard--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Révoquer le certificat</h3>
              <button className="closeBtn" onClick={() => setShowRevokeModal(false)}>×</button>
            </div>
            <div className="modalBody">
              <p>⚠️ Révoquer le certificat <strong>{activeCert.certId}</strong> de <strong>{activeCert.studentName}</strong> ? Cette action annule la certification.</p>
            </div>
            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setShowRevokeModal(false)}>Annuler</button>
              <button className="btn btn--danger" onClick={confirmRevoke}>Révoquer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
