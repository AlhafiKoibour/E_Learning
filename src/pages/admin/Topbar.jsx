import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import "./Topbar.css";

const routeLabels = {
  "/dashboardLayout": "Dashboard",
  "/dashboardLayout/accounts": "Apprenants",
  "/dashboardLayout/certificates": "Certificats",
  "/dashboardLayout/module": "Modules",
  "/dashboardLayout/lessons": "Leçons",
  "/dashboardLayout/quiz": "Quiz",
  "/dashboardLayout/sessions": "Sessions",
  "/dashboardLayout/mentorship": "Mentorat",
  "/dashboardLayout/profile": "Mon profil",
  "/dashboardLayout/reset-password": "Mot de passe",
};

const notifications = [
  { id: 1, icon: "👤", text: "Nouvel apprenant inscrit : Fatou S.", time: "Il y a 5 min", unread: true },
  { id: 2, icon: "✅", text: "Quiz complété : JavaScript ES6+ — 92%", time: "Il y a 1h", unread: true },
  { id: 3, icon: "🏆", text: "Certificat émis pour Jean N.", time: "Il y a 2h", unread: false },
  { id: 4, icon: "📦", text: "Module publié : Introduction à React", time: "Il y a 3h", unread: false },
];

export default function Topbar({ onToggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifList, setNotifList] = useState(notifications);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const currentLabel = routeLabels[location.pathname] || "Dashboard";
  const unreadCount = notifList.filter((n) => n.unread).length;

  // Fermer les dropdowns en cliquant ailleurs
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => {
    setNotifList((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    // Recherche dans les routes
    const match = Object.entries(routeLabels).find(([, label]) =>
      label.toLowerCase().includes(search.toLowerCase())
    );
    if (match) navigate(match[0]);
    setSearch("");
  };

  return (
    <header className="adminTopbar">
      {/* ===== GAUCHE ===== */}
      <div className="adminTopbar__left">
        {/* Bouton menu sidebar */}
        <button className="adminTopbar__menuBtn" onClick={onToggleSidebar} title="Menu">
          <span /><span /><span />
        </button>

        {/* Breadcrumb */}
        <nav className="adminTopbar__breadcrumb" aria-label="breadcrumb">
          <NavLink to="/dashboardLayout" className="breadcrumb__home">
            🏠
          </NavLink>
          <span className="breadcrumb__sep">›</span>
          <span className="breadcrumb__current">{currentLabel}</span>
        </nav>
      </div>

      {/* ===== CENTRE — Recherche ===== */}
      <form className="adminTopbar__search" onSubmit={handleSearch}>
        <span className="adminTopbar__searchIcon">🔍</span>
        <input
          type="text"
          placeholder="Rechercher une page, un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button type="button" className="adminTopbar__searchClear" onClick={() => setSearch("")}>
            ×
          </button>
        )}
      </form>

      {/* ===== DROITE ===== */}
      <div className="adminTopbar__right">

        {/* Raccourcis rapides */}
        <button
          className="adminTopbar__iconBtn"
          title="Accueil dashboard"
          onClick={() => navigate("/dashboardLayout")}
        >
          📊
        </button>

        <button
          className="adminTopbar__iconBtn"
          title="Ajouter un apprenant"
          onClick={() => navigate("/dashboardLayout/accounts")}
        >
          ➕
        </button>

        {/* Notifications */}
        <div className="adminTopbar__notifWrapper" ref={notifRef}>
          <button
            className={`adminTopbar__iconBtn ${showNotif ? "iconBtn--active" : ""}`}
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            title="Notifications"
          >
            🔔
            {unreadCount > 0 && (
              <span className="notifBadge">{unreadCount}</span>
            )}
          </button>

          {showNotif && (
            <div className="adminTopbar__dropdown notifDropdown">
              <div className="dropdown__header">
                <h4>Notifications</h4>
                {unreadCount > 0 && (
                  <button className="dropdown__headerAction" onClick={markAllRead}>
                    Tout lire
                  </button>
                )}
              </div>
              <div className="notifDropdown__list">
                {notifList.map((n) => (
                  <div
                    key={n.id}
                    className={`notifItem ${n.unread ? "notifItem--unread" : ""}`}
                    onClick={() => setNotifList((prev) => prev.map((x) => x.id === n.id ? { ...x, unread: false } : x))}
                  >
                    <span className="notifItem__icon">{n.icon}</span>
                    <div className="notifItem__content">
                      <p>{n.text}</p>
                      <span>{n.time}</span>
                    </div>
                    {n.unread && <div className="notifItem__dot" />}
                  </div>
                ))}
              </div>
              <div className="dropdown__footer">
                <button onClick={() => setShowNotif(false)}>Fermer</button>
              </div>
            </div>
          )}
        </div>

        {/* Séparateur */}
        <div className="adminTopbar__sep" />

        {/* Profil */}
        <div className="adminTopbar__profileWrapper" ref={profileRef}>
          <button
            className={`adminTopbar__profileBtn ${showProfile ? "profileBtn--active" : ""}`}
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
          >
            <div className="profileBtn__avatar">K</div>
            <div className="profileBtn__info">
              <span className="profileBtn__name">Kelvin Kirop</span>
              <span className="profileBtn__role">Administrateur</span>
            </div>
            <span className={`profileBtn__chevron ${showProfile ? "chevron--up" : ""}`}>›</span>
          </button>

          {showProfile && (
            <div className="adminTopbar__dropdown profileDropdown">
              <div className="profileDropdown__header">
                <div className="profileDropdown__avatar">K</div>
                <div>
                  <strong>Kelvin Kirop</strong>
                  <p>kelvin.kirop@toumaihub.com</p>
                </div>
              </div>

              <div className="profileDropdown__menu">
                <button onClick={() => { navigate("/dashboardLayout/profile"); setShowProfile(false); }}>
                  <span>👤</span> Mon profil
                </button>
                <button onClick={() => { navigate("/dashboardLayout"); setShowProfile(false); }}>
                  <span>📊</span> Dashboard
                </button>
                <button onClick={() => { navigate("/dashboardLayout/reset-password"); setShowProfile(false); }}>
                  <span>🔐</span> Changer le mot de passe
                </button>
              </div>

              <div className="profileDropdown__footer">
                <button
                  className="profileDropdown__logout"
                  onClick={() => navigate("/login")}
                >
                  <span>🚪</span> Se déconnecter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}