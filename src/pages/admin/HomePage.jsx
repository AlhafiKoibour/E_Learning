import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboardLayout.css";

const StatCard = ({ title, value, trend, tone, label, icon }) => (
  <div className={`statCard statCard--${tone}`}>
    <div className="statCard__top">
      <span className="statCard__icon">{icon}</span>
      <span className={`statCard__trend trend--${tone}`}>{trend}</span>
    </div>
    <div className="statCard__value">{value}</div>
    <div className="statCard__title">{title}</div>
    <div className="statCard__label">{label}</div>
  </div>
);

const quickLinks = [
  { label: "Gérer les apprenants", path: "/dashboardLayout/accounts", icon: "👥", color: "#6366f1" },
  { label: "Modules de formation", path: "/dashboardLayout/module", icon: "📚", color: "#10b981" },
  { label: "Leçons", path: "/dashboardLayout/lessons", icon: "📝", color: "#f59e0b" },
  { label: "Quiz & Évaluations", path: "/dashboardLayout/quiz", icon: "🧠", color: "#3b82f6" },
  { label: "Sessions", path: "/dashboardLayout/sessions", icon: "🗓️", color: "#8b5cf6" },
  { label: "Mentorat", path: "/dashboardLayout/mentorship", icon: "🎯", color: "#0d9488" },
  { label: "Certificats", path: "/dashboardLayout/certificates", icon: "🏆", color: "#d97706" },
  { label: "Mon profil", path: "/dashboardLayout/profile", icon: "👤", color: "#ec4899" },
];

const recentActivity = [
  { action: "Nouvel apprenant inscrit", name: "Fatou Sow", time: "Il y a 5 min", icon: "👤" },
  { action: "Module publié", name: "Introduction à React", time: "Il y a 20 min", icon: "📦" },
  { action: "Quiz complété", name: "JavaScript ES6+ — Score 92%", time: "Il y a 1h", icon: "✅" },
  { action: "Certificat émis", name: "CERT-2026-0005 — Fatou S.", time: "Il y a 2h", icon: "🏆" },
  { action: "Session démarrée", name: "Bootcamp React — Cohorte 1", time: "Il y a 3h", icon: "🚀" },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const greeting = now.getHours() < 12 ? "Bonjour" : now.getHours() < 18 ? "Bon après-midi" : "Bonsoir";
  const dateStr = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="homePage">
      {/* Welcome Header */}
      <div className="homePage__welcome">
        <div>
          <h1 className="homePage__greeting">{greeting}, Kelvin 👋</h1>
          <p className="homePage__date">{dateStr}</p>
        </div>
        <div className="homePage__badge">Administrateur</div>
      </div>

      {/* KPI Stats */}
      <div className="homePage__stats">
        <StatCard title="Apprenants actifs"    value="248"  trend="+12%" tone="success" label="CE MOIS"  icon="👥" />
        <StatCard title="Formations publiées"  value="14"   trend="+3"   tone="info"    label="TOTAL"    icon="📚" />
        <StatCard title="Revenus du mois"      value="1 240 000 F" trend="+18%" tone="success" label="FCFA" icon="💰" />
        <StatCard title="Taux de complétion"   value="74%"  trend="-2%"  tone="warning" label="MOYENNE"  icon="📈" />
      </div>

      {/* Quick Links */}
      <div className="homePage__section">
        <h2 className="homePage__sectionTitle">⚡ Accès rapide</h2>
        <div className="homePage__quickLinks">
          {quickLinks.map((link) => (
            <button
              key={link.path}
              className="quickLink"
              onClick={() => navigate(link.path)}
            >
              <span className="quickLink__icon" style={{ background: link.color + "22", color: link.color }}>
                {link.icon}
              </span>
              <span className="quickLink__label">{link.label}</span>
              <span className="quickLink__arrow">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="homePage__section">
        <h2 className="homePage__sectionTitle">🕐 Activité récente</h2>
        <div className="homePage__activity">
          {recentActivity.map((item, i) => (
            <div key={i} className="activityItem">
              <div className="activityItem__icon">{item.icon}</div>
              <div className="activityItem__content">
                <span className="activityItem__action">{item.action}</span>
                <span className="activityItem__name">{item.name}</span>
              </div>
              <span className="activityItem__time">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};