import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const sections = [
  {
    title: "DASHBOARD",
    items: [{ label: "Dashboard", to: "/dashboardLayout" }],
  },
  {
    title: "UTILISATEURS",
    items: [
      { label: "Apprenants", to: "/dashboardLayout/accounts" },
      { label: "Certificats", to: "/dashboardLayout/certificates" },
    ],
  },
  {
    title: "FORMATIONS",
    items: [
      { label: "Modules", to: "/dashboardLayout/module" },
      { label: "Lesson", to: "/dashboardLayout/lessons" },
      { label: "Quiz", to: "/dashboardLayout/quiz" },
      { label: "Sessions", to: "/dashboardLayout/sessions" },
      { label: "Mentorat", to: "/dashboardLayout/mentorship" },
    ],
  },
  {
    title: "PROFILS",
    items: [
      { label: "Compte", to: "/dashboardLayout/profile" },
      { label: "Réinitialiser le mot de passe", to: "/dashboardLayout/reset-password" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <strong>Bienvenue Kelvin Kirop</strong>
      </div>

      <div className="sidebar__nav">
        {sections.map((section) => (
          <div key={section.title} className="sidebar__group">
            <div className="sidebar__groupTitle">{section.title}</div>
            <ul className="sidebar__list">
              {section.items.map((item) => (
                <li key={item.to} className="sidebar__item">
                  <NavLink
                    to={item.to}
                    end={item.to === "/dashboardLayout"}
                    className={({ isActive }) =>
                      `sidebar__link ${isActive ? "active" : ""}`
                    }
                  >
                    <span className="sidebar__dot">•</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}