import { useState } from "react";
import "./ResetPasswordPage.css";

export const ResetPasswordPage = () => {
  const [form, setForm] = useState({ current: "", newPwd: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthLabel = ["", "Faible", "Moyen", "Bon", "Excellent"];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#3b82f6", "#10b981"];
  const strength = getStrength(form.newPwd);

  const validate = () => {
    const errs = {};
    if (!form.current) errs.current = "Mot de passe actuel requis";
    if (!form.newPwd || form.newPwd.length < 8) errs.newPwd = "Au moins 8 caractères";
    if (!/[A-Z]/.test(form.newPwd)) errs.newPwd = "Au moins une majuscule";
    if (!/[0-9]/.test(form.newPwd)) errs.newPwd = "Au moins un chiffre";
    if (form.newPwd !== form.confirm) errs.confirm = "Les mots de passe ne correspondent pas";
    if (form.current === form.newPwd) errs.newPwd = "Le nouveau mot de passe doit être différent";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSuccess(true);
    setForm({ current: "", newPwd: "", confirm: "" });
    setErrors({});
    setTimeout(() => setSuccess(false), 5000);
  };

  const Field = ({ id, label, value, show, onToggle, error, placeholder, onChange }) => (
    <div className="resetField">
      <label htmlFor={id}>{label}</label>
      <div className="resetField__inputWrapper">
        <input
          id={id}
          className={`resetField__input ${error ? "resetField__input--error" : ""}`}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="new-password"
        />
        <button type="button" className="resetField__eye" onClick={onToggle}>
          {show ? "🙈" : "👁️"}
        </button>
      </div>
      {error && <span className="resetField__error">{error}</span>}
    </div>
  );

  return (
    <div className="resetPage">
      <div className="resetPage__header">
        <div>
          <h2>Réinitialiser le mot de passe</h2>
          <p>Modifier le mot de passe de votre compte administrateur.</p>
        </div>
      </div>

      <div className="resetPage__layout">
        <div className="resetCard">
          <div className="resetCard__icon">🔐</div>
          <h3>Changer le mot de passe</h3>

          {success && (
            <div className="resetSuccess">
              ✅ Mot de passe modifié avec succès !
            </div>
          )}

          <form onSubmit={handleSubmit} className="resetForm">
            <Field
              id="current"
              label="Mot de passe actuel"
              value={form.current}
              show={showCurrent}
              onToggle={() => setShowCurrent(!showCurrent)}
              error={errors.current}
              placeholder="Votre mot de passe actuel"
              onChange={(e) => setForm({ ...form, current: e.target.value })}
            />

            <Field
              id="newPwd"
              label="Nouveau mot de passe"
              value={form.newPwd}
              show={showNew}
              onToggle={() => setShowNew(!showNew)}
              error={errors.newPwd}
              placeholder="Au moins 8 caractères"
              onChange={(e) => setForm({ ...form, newPwd: e.target.value })}
            />

            {form.newPwd && (
              <div className="strengthMeter">
                <div className="strengthMeter__bars">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="strengthBar"
                      style={{ background: i <= strength ? strengthColor[strength] : "#e5e7eb" }}
                    />
                  ))}
                </div>
                <span style={{ color: strengthColor[strength], fontWeight: 600, fontSize: "0.8rem" }}>
                  {strengthLabel[strength]}
                </span>
              </div>
            )}

            <Field
              id="confirm"
              label="Confirmer le nouveau mot de passe"
              value={form.confirm}
              show={showConfirm}
              onToggle={() => setShowConfirm(!showConfirm)}
              error={errors.confirm}
              placeholder="Répéter le mot de passe"
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />

            <button type="submit" className="btn btn--primary btn--full">
              🔒 Changer le mot de passe
            </button>
          </form>
        </div>

        <div className="resetCard resetCard--tips">
          <h3>🛡️ Conseils de sécurité</h3>
          <ul className="resetTips">
            <li className={form.newPwd.length >= 8 ? "tip--ok" : ""}>
              {form.newPwd.length >= 8 ? "✅" : "⬜"} Au moins 8 caractères
            </li>
            <li className={/[A-Z]/.test(form.newPwd) ? "tip--ok" : ""}>
              {/[A-Z]/.test(form.newPwd) ? "✅" : "⬜"} Au moins une lettre majuscule
            </li>
            <li className={/[0-9]/.test(form.newPwd) ? "tip--ok" : ""}>
              {/[0-9]/.test(form.newPwd) ? "✅" : "⬜"} Au moins un chiffre
            </li>
            <li className={/[^A-Za-z0-9]/.test(form.newPwd) ? "tip--ok" : ""}>
              {/[^A-Za-z0-9]/.test(form.newPwd) ? "✅" : "⬜"} Un caractère spécial (!, @, #...)
            </li>
            <li className={form.newPwd && form.newPwd !== form.current ? "tip--ok" : ""}>
              {form.newPwd && form.newPwd !== form.current ? "✅" : "⬜"} Différent de l'actuel
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
