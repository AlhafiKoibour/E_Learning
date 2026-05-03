import { useMemo, useState } from "react";
import "./modulePage.css";

const initialModules = [
  {
    id: 1,
    name: "Introduction au développement web",
    category: "Développement Web",
    lessons: 8,
    formation: "Bootcamp Frontend",
    status: "published",
    createdAt: "2026-01-12",
  },
  {
    id: 2,
    name: "Design UI/UX moderne",
    category: "Design",
    lessons: 5,
    formation: "Design Pro",
    status: "draft",
    createdAt: "2026-02-08",
  },
  {
    id: 3,
    name: "Marketing digital avancé",
    category: "Marketing",
    lessons: 12,
    formation: "Business Growth",
    status: "published",
    createdAt: "2026-03-01",
  },
  {
    id: 4,
    name: "Cybersécurité essentielle",
    category: "Sécurité",
    lessons: 6,
    formation: "Security Starter",
    status: "archived",
    createdAt: "2026-04-05",
  },
];

const formations = [
  "Bootcamp Frontend",
  "Design Pro",
  "Business Growth",
  "Security Starter",
  "Data Academy",
  "Mobile Mastery",
];

export const ModulePage = () => {
  const [modules, setModules] = useState(initialModules);
  const [search, setSearch] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState(formations[0]);
  const [newModule, setNewModule] = useState({
    name: "",
    category: "",
    lessons: "",
    formation: formations[0],
    status: "draft",
  });

  const stats = useMemo(() => {
    return {
      total: modules.length,
      published: modules.filter((m) => m.status === "published").length,
      draft: modules.filter((m) => m.status === "draft").length,
      archived: modules.filter((m) => m.status === "archived").length,
      lessons: modules.reduce((acc, mod) => acc + mod.lessons, 0),
    };
  }, [modules]);

  const filteredModules = modules.filter((mod) => {
    const q = search.toLowerCase();
    return (
      mod.name.toLowerCase().includes(q) ||
      mod.category.toLowerCase().includes(q) ||
      mod.formation.toLowerCase().includes(q)
    );
  });

  const updateModule = (id, patch) => {
    setModules((prev) =>
      prev.map((mod) => (mod.id === id ? { ...mod, ...patch } : mod))
    );
  };

  const deleteModule = (id) => {
    if (window.confirm("Supprimer ce module ?")) {
      setModules((prev) => prev.filter((mod) => mod.id !== id));
    }
  };

  const addModule = (e) => {
    e.preventDefault();

    if (!newModule.name.trim() || !newModule.category.trim()) return;

    const moduleToAdd = {
      id: Date.now(),
      name: newModule.name,
      category: newModule.category,
      lessons: Number(newModule.lessons || 0),
      formation: newModule.formation,
      status: newModule.status,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setModules((prev) => [moduleToAdd, ...prev]);
    setNewModule({
      name: "",
      category: "",
      lessons: "",
      formation: formations[0],
      status: "draft",
    });
  };

  const addLessonToModule = (id) => {
    const lessonName = prompt("Nom de la leçon à ajouter ?");
    if (!lessonName) return;

    updateModule(id, { lessons: (modules.find((m) => m.id === id)?.lessons || 0) + 1 });
    alert(`Leçon "${lessonName}" ajoutée au module.`);
  };

  const associateModuleToFormation = (id) => {
    updateModule(id, { formation: selectedFormation });
  };

  return (
    <div className="modulePage">
      <div className="modulePage__header">
        <div>
          <h2>Gestion des modules</h2>
          <p>Créer, modifier, supprimer et organiser les modules de formation.</p>
        </div>

        <input
          className="modulePage__search"
          type="text"
          placeholder="Rechercher un module..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
            className="btn btn--success"
            onClick={() => deleteModule(mod.id)}
            >
            Ajouter un nouveau module
        </button>

      </div>

      <div className="moduleStats">
        <div className="moduleStatCard">
          <span>Total modules</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="moduleStatCard">
          <span>Publiés</span>
          <strong>{stats.published}</strong>
        </div>
        <div className="moduleStatCard">
          <span>Brouillons</span>
          <strong>{stats.draft}</strong>
        </div>
        <div className="moduleStatCard">
          <span>Archivés</span>
          <strong>{stats.archived}</strong>
        </div>
        <div className="moduleStatCard">
          <span>Total leçons</span>
          <strong>{stats.lessons}</strong>
        </div>
      </div>

      <div className="modulePage__layout">
        <div className="modulePage__mainCard">
          <div className="cardHeader">
            <h3>Liste des modules</h3>
            <span>{filteredModules.length} résultat(s)</span>
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
              {filteredModules.map((mod) => (
                <tr key={mod.id}>
                  <td>
                    <div className="moduleCell">
                      <div className="moduleAvatar">M</div>
                      <div>
                        <strong>{mod.name}</strong>
                        <p>Créé le {mod.createdAt}</p>
                      </div>
                    </div>
                  </td>

                  <td>{mod.category}</td>

                  <td>
                    <span className="lessonBadge">{mod.lessons} leçons</span>
                  </td>

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
                      <button
                        className="btn btn--info"
                        onClick={() => {
                          const name = prompt("Nouveau nom du module ?", mod.name);
                          const category = prompt("Nouvelle catégorie ?", mod.category);
                          if (name && category) {
                            updateModule(mod.id, { name, category });
                          }
                        }}
                      >
                        Éditer
                      </button>

                      <button
                        className="btn btn--danger"
                        onClick={() => deleteModule(mod.id)}
                      >
                        Supprimer
                      </button>

                      <button
                        className="btn btn--success"
                        onClick={() => addLessonToModule(mod.id)}
                      >
                        Ajouter une leçon
                      </button>

                      <button
                        className="btn btn--purple"
                        onClick={() => setSelectedModuleId(mod.id)}
                      >
                        Associer à une formation
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>

      {selectedModuleId !== null && (
        <div className="modalBackDrop" onClick={() => setSelectedModuleId(null)}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Associer le module</h3>
              <button className="closeBtn" onClick={() => setSelectedModuleId(null)}>
                ×
              </button>
            </div>

            <p>Choisis la formation à appliquer au module sélectionné.</p>

            <select
              className="fullSelect"
              value={selectedFormation}
              onChange={(e) => setSelectedFormation(e.target.value)}
            >
              {formations.map((formation) => (
                <option key={formation} value={formation}>
                  {formation}
                </option>
              ))}
            </select>

            <div className="modalActions">
              <button className="btn btn--secondary" onClick={() => setSelectedModuleId(null)}>
                Annuler
              </button>
              <button
                className="btn btn--primary"
                onClick={() => {
                  if (selectedModuleId !== null) {
                    associateModuleToFormation(selectedModuleId);
                  }
                  setSelectedModuleId(null);
                }}
              >
                Associer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};