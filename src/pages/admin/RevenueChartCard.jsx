import "./RevenueChartCard.css";

export default function RevenueChartCard() {
  return (
    <section className="card card--big">
      <div className="card__header">
        <h3>Total revenue</h3>
        <button className="card__menu">⋮</button>
      </div>

      <div className="revenueChart">
        <div className="revenueChart__grid">
          <span>120</span>
          <span>90</span>
          <span>60</span>
          <span>30</span>
          <span>0</span>
        </div>

        <div className="revenueChart__line revenueChart__line--1"></div>
        <div className="revenueChart__line revenueChart__line--2"></div>

        <div className="revenueChart__legend">
          <span><i className="legendDot legendDot--1"></i> series1</span>
          <span><i className="legendDot legendDot--2"></i> series2</span>
        </div>
      </div>
    </section>
  );
}