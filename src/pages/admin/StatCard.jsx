import "./StatCard.css";

export default function StatCard({ title, value, trend, tone, label }) {
  // On transforme le label en classe (ex: "ANNUAL" devient "label-annual")
  const labelClass = label ? `label-${label.toLowerCase()}` : "";

  return (
    <article className="statCard">
      <div className="statCard__head">
        <span className="statCard__title">{title}</span>
        {/* Ajout de la classe dynamique ici */}
        <span className={`statCard__label ${labelClass}`}>{label}</span>
      </div>

      <div className="statCard__value">{value}</div>

      <div className={`statCard__trend ${tone}`}>
        <span className="trend__value">{trend}</span> 
        <span className="trend__text"> par rapport au mois dernier</span>
      </div>
    </article>
  );
}