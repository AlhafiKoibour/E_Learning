import { useMemo, useState } from "react";
import "./comptePage.css";

const initialUsers = [
  {
    id: 1,
    name: "Jean N.",
    email: "jean@email.com",
    role: "Apprenant",
    formation: "Développement Web",
    status: "active",
    verified: true,
    joined: "2026-01-12",
  },
  {
    id: 2,
    name: "Mariam K.",
    email: "mariam@email.com",
    role: "Apprenant",
    formation: "Design UI/UX",
    status: "blocked",
    verified: false,
    joined: "2026-02-08",
  },
  {
    id: 3,
    name: "Paul T.",
    email: "paul@email.com",
    role: "Formateur",
    formation: "Marketing Digital",
    status: "active",
    verified: true,
    joined: "2026-03-01",
  },
  {
    id: 4,
    name: "Awa B.",
    email: "awa@email.com",
    role: "Apprenant",
    formation: "Développement Mobile",
    status: "pending",
    verified: false,
    joined: "2026-04-05",
  },
];

const formations = [
  "Développement Web",
  "Développement Mobile",
  "Design UI/UX",
  "Marketing Digital",
  "Data Analysis",
  "Cybersécurité",
];

export const ComptePage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedFormation, setSelectedFormation] = useState(formations[0]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const stats = useMemo(
    () => ({
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      blocked: users.filter((u) => u.status === "blocked").length,
      verified: users.filter((u) => u.verified).length,
    }),
    [users]
  );

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.formation.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      selectedStatus === "all" ? true : user.status === selectedStatus;

    return matchSearch && matchStatus;
  });

  const updateUser = (id, patch) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...patch } : user))
    );
  };

  const resetPassword = (id) => {
    alert(`Mot de passe réinitialisé pour l'utilisateur #${id}`);
  };

  const associateFormation = (id) => {
    updateUser(id, { formation: selectedFormation });
  };

  return (
    <div className="accountPage">
      <div className="accountPage__header">
        <div>
          <h2>Gestion des comptes</h2>
          <p>
            Activer, bloquer, vérifier et associer les utilisateurs à une
            formation.
          </p>
        </div>

        <div className="accountPage__actions">
          <input
            className="accountPage__search"
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="accountPage__select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="blocked">Bloqués</option>
            <option value="pending">En attente</option>
          </select>
        </div>
      </div>

      <div className="statsGrid">
        <div className="statCard statCard--blue">
          <span>Total comptes</span>
          <strong>{stats.total}</strong>
        </div>

        <div className="statCard statCard--green">
          <span>Comptes actifs</span>
          <strong>{stats.active}</strong>
        </div>

        <div className="statCard statCard--red">
          <span>Comptes bloqués</span>
          <strong>{stats.blocked}</strong>
        </div>

        <div className="statCard statCard--purple">
          <span>Comptes vérifiés</span>
          <strong>{stats.verified}</strong>
        </div>
      </div>

      <div className="accountPage__tableCard">
        <div className="tableCard__header">
          <h3>Liste des utilisateurs</h3>
          <span>{filteredUsers.length} résultat(s)</span>
        </div>

        <table className="usersTable">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Rôle</th>
              <th>Formation</th>
              <th>Statut</th>
              <th>Vérifié</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="userCell">
                    <div className="userAvatar">{user.name.charAt(0)}</div>
                    <div>
                      <strong>{user.name}</strong>
                      <p>{user.email}</p>
                    </div>
                  </div>
                </td>

                <td>{user.role}</td>

                <td>{user.formation}</td>

                <td>
                  <select
                    className={`statusSelect statusSelect--${user.status}`}
                    value={user.status}
                    onChange={(e) =>
                      updateUser(user.id, { status: e.target.value })
                    }
                  >
                    <option value="active">Actif</option>
                    <option value="blocked">Bloqué</option>
                    <option value="pending">En attente</option>
                  </select>
                </td>

                <td>
                  <button
                    className={`verifyBtn ${user.verified ? "yes" : "no"}`}
                    onClick={() =>
                      updateUser(user.id, { verified: !user.verified })
                    }
                  >
                    {user.verified ? "Vérifié" : "Non vérifié"}
                  </button>
                </td>

                <td>
                  <div className="actionButtons">
                    <button
                      className="btn btn--success"
                      onClick={() => updateUser(user.id, { status: "active" })}
                    >
                      Activer
                    </button>

                    <button
                      className="btn btn--danger"
                      onClick={() => updateUser(user.id, { status: "blocked" })}
                    >
                      Bloquer
                    </button>

                    <button
                      className="btn btn--info"
                      onClick={() => updateUser(user.id, { verified: true })}
                    >
                      Vérifier
                    </button>

                    <button
                      className="btn btn--dark"
                      onClick={() => resetPassword(user.id)}
                    >
                      Reset password
                    </button>

                    <button
                      className="btn btn--purple"
                      onClick={() => setSelectedUserId(user.id)}
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

      {selectedUserId !== null && (
        <div
          className="modalBackDrop"
          onClick={() => setSelectedUserId(null)}
        >
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalCard__header">
              <h3>Associer à une formation</h3>
              <button
                className="modalClose"
                onClick={() => setSelectedUserId(null)}
              >
                ×
              </button>
            </div>

            <p>
              Choisis la formation à associer à cet utilisateur puis valide.
            </p>

            <select
              className="accountPage__select full"
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
              <button
                className="btn btn--secondary"
                onClick={() => setSelectedUserId(null)}
              >
                Annuler
              </button>

              <button
                className="btn btn--primary"
                onClick={() => {
                  if (selectedUserId !== null) {
                    associateFormation(selectedUserId);
                  }
                  setSelectedUserId(null);
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