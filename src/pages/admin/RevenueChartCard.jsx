import "./RevenueChartCard.css";

export default function RevenueChartCard() {
  return (
    <section className="card card--big">
      <div className="card__header">
        <h3>Revenu total par secteur</h3>
        <button className="card__menu">⋮</button>
      </div>

      <div className="revenueChart">
        <div className="revenueChart__grid">
          <span>120k</span>
          <span>90k</span>
          <span>60k</span>
          <span>30k</span>
          <span>0</span>
        </div>

        {/* Ces div simulent les lignes de ton graphique dans le CSS */}
        <div className="revenueChart__line revenueChart__line--1"></div>
        <div className="revenueChart__line revenueChart__line--2"></div>

        <div className="revenueChart__legend">
          <span><i className="legendDot legendDot--1"></i> Développement</span>
          <span><i className="legendDot legendDot--2"></i> Design</span>
        </div>
      </div>
    </section>
  );
}