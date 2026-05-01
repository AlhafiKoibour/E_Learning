import "./Sidebar.css";

const sections = [
  {
    title: "UTILISATEURS",
    items: ["Compte", "Certificants"],
  },
  {
    title: "FORMATIONS",
    items: ["Modules", "Leçons", "", "Quiz", "Sessions",  "Mentorat"],
  },
  {
    title: "PROFILS",
    items: ["Compte", "Reset Password"],
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar__profile">
      
        <strong>Welcome Kelvin Kirop</strong>
      
      </div>

      <div className="sidebar__nav">
        {sections.map((section) => (
          <div key={section.title} className="sidebar__group">
            <div className="sidebar__groupTitle">{section.title}</div>
            <ul className="sidebar__list">
              {section.items.map((item, index) => (
                <li
                  key={item}
                  className={`sidebar__item ${section.title === "DASHBOARD" && index === 0 ? "active" : ""}`}
                >
                  <span className="sidebar__dot">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>


    </aside>
  );
}