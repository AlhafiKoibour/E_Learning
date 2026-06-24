import { useState } from "react";
import "./ProfilePage.css";

const initialProfile = {
  name: "Kelvin Kirop",
  email: "kelvin.kirop@toumaihub.com",
  role: "Administrateur",
  phone: "+225 07 12 34 56",
  location: "Abidjan, Côte d'Ivoire",
  bio: "Administrateur de la plateforme ToumaiHub. Responsable de la gestion des formations, des apprenants et du contenu pédagogique.",
  joined: "2025-10-01",
  avatar: "K",
};

export const ProfilePage = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setProfile(formData);
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditMode(false);
  };

  return (
    <div className="profilePage">
      <div className="profilePage__header">
        <div>
          <h2>Mon profil</h2>
          <p>Gérer les informations de votre compte administrateur.</p>
        </div>
        {!editMode ? (
          <button className="btn btn--primary" onClick={() => setEditMode(true)}>✏️ Modifier le profil</button>
        ) : (
          <div className="profilePage__editActions">
            <button className="btn btn--secondary" onClick={handleCancel}>Annuler</button>
            <button className="btn btn--success" onClick={handleSave}>💾 Enregistrer</button>
          </div>
        )}
      </div>

      {saved && (
        <div className="profilePage__toast">
          ✅ Profil mis à jour avec succès !
        </div>
      )}

      <div className="profilePage__layout">
        {/* LEFT — Avatar + quick info */}
        <div className="profileCard profileCard--left">
          <div className="profileAvatar__large">
            {profile.name.charAt(0)}
          </div>
          <h3 className="profileCard__name">{profile.name}</h3>
          <span className="profileCard__role">{profile.role}</span>
          <div className="profileCard__meta">
            <div className="profileMeta__item">
              <span>📧</span>
              <span>{profile.email}</span>
            </div>
            <div className="profileMeta__item">
              <span>📞</span>
              <span>{profile.phone}</span>
            </div>
            <div className="profileMeta__item">
              <span>📍</span>
              <span>{profile.location}</span>
            </div>
            <div className="profileMeta__item">
              <span>📅</span>
              <span>Membre depuis {profile.joined}</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Edit form */}
        <div className="profileCard profileCard--right">
          <h3 className="profileCard__sectionTitle">Informations personnelles</h3>

          <div className="profileForm">
            <div className="profileForm__row">
              <div className="profileForm__field">
                <label>Nom complet</label>
                {editMode
                  ? <input className="modalInput" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  : <span className="profileForm__value">{profile.name}</span>
                }
              </div>
              <div className="profileForm__field">
                <label>Email</label>
                {editMode
                  ? <input className="modalInput" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  : <span className="profileForm__value">{profile.email}</span>
                }
              </div>
            </div>

            <div className="profileForm__row">
              <div className="profileForm__field">
                <label>Téléphone</label>
                {editMode
                  ? <input className="modalInput" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  : <span className="profileForm__value">{profile.phone}</span>
                }
              </div>
              <div className="profileForm__field">
                <label>Localisation</label>
                {editMode
                  ? <input className="modalInput" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                  : <span className="profileForm__value">{profile.location}</span>
                }
              </div>
            </div>

            <div className="profileForm__field profileForm__field--full">
              <label>Biographie</label>
              {editMode
                ? <textarea className="modalInput modalTextarea" rows={4} value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
                : <span className="profileForm__value">{profile.bio}</span>
              }
            </div>
          </div>

          <div className="profileCard__divider" />

          <h3 className="profileCard__sectionTitle">Informations du compte</h3>
          <div className="profileForm">
            <div className="profileForm__row">
              <div className="profileForm__field">
                <label>Rôle</label>
                <span className="profileForm__value roleBadge">{profile.role}</span>
              </div>
              <div className="profileForm__field">
                <label>Date d'inscription</label>
                <span className="profileForm__value">{profile.joined}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
