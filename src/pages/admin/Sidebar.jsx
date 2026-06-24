import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const sections = [
  {
    title: "DASHBOARD",
    items: [
      { label: "Dashboard", to: "/dashboardLayout", icon: "📊" },
    ],
  },
  {
    title: "UTILISATEURS",
    items: [
      { label: "Apprenants", to: "/dashboardLayout/accounts", icon: "👥" },
      { label: "Certificats", to: "/dashboardLayout/certificates", icon: "🏆" },
    ],
  },
  {
    title: "FORMATIONS",
    items: [
      { label: "Modules", to: "/dashboardLayout/module", icon: "📦" },
      { label: "Leçons", to: "/dashboardLayout/lessons", icon: "📝" },
      { label: "Quiz", to: "/dashboardLayout/quiz", icon: "🧠" },
      { label: "Sessions", to: "/dashboardLayout/sessions", icon: "🗓️" },
      { label: "Mentorat", to: "/dashboardLayout/mentorship", icon: "🎯" },
    ],
  },
  {
    title: "PROFIL",
    items: [
      { label: "Mon compte", to: "/dashboardLayout/profile", icon: "👤" },
      { label: "Mot de passe", to: "/dashboardLayout/reset-password", icon: "🔐" },
    ],
  },
];

export default function Sidebar({ collapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logoIcon">T</div>
        {!collapsed && <span className="sidebar__logoText">ToumaiHub</span>}
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        {sections.map((section) => (
          <div key={section.title} className="sidebar__group">
            {!collapsed && (
              <div className="sidebar__groupTitle">{section.title}</div>
            )}
            <ul className="sidebar__list">
              {section.items.map((item) => (
                <li key={item.to} className="sidebar__item">
                  <NavLink
                    to={item.to}
                    end={item.to === "/dashboardLayout"}
                    className={({ isActive }) =>
                      `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
                    }
                    title={collapsed ? item.label : undefined}
                  >
                    <span className="sidebar__icon">{item.icon}</span>
                    {!collapsed && <span className="sidebar__label">{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer sidebar */}
      {!collapsed && (
        <div className="sidebar__footer">
          <div className="sidebar__footerAvatar">K</div>
          <div className="sidebar__footerInfo">
            <strong>Kelvin Kirop</strong>
            <span>Administrateur</span>
          </div>
        </div>
      )}
    </aside>
  );
}