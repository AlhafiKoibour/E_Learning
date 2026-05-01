import "./StatCard.css";

export default function StatCard({ title, value, trend, tone, label }) {
  return (
    <article className="statCard">
      <div className="statCard__head">
        <span className="statCard__title">{title}</span>
        <span className="statCard__label">{label}</span>
      </div>

      <div className="statCard__value">{value}</div>

      <div className={`statCard__trend ${tone}`}>
        {trend} <span>Compared to previous month</span>
      </div>
    </article>
  );
}