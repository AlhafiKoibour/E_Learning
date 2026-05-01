import "./MobileDesktopCard.css";

export default function MobileDesktopCard() {
  const bars = [
    { a: 52, b: 74 },
    { a: 38, b: 60 },
    { a: 62, b: 77 },
    { a: 20, b: 35 },
    { a: 43, b: 67 },
    { a: 25, b: 44 },
  ];

  return (
    <section className="card mobileCard">
      <div className="card__header">
        <h3>Mobile/Desktop</h3>
        <button className="card__menu">≡</button>
      </div>

      <div className="mobileCard__chart">
        {bars.map((item, index) => (
          <div className="mobileCard__group" key={index}>
            <div className="mobileCard__bar mobileCard__bar--a" style={{ height: `${item.a}%` }}></div>
            <div className="mobileCard__bar mobileCard__bar--b" style={{ height: `${item.b}%` }}></div>
          </div>
        ))}
      </div>

      <div className="mobileCard__legend">
        <span><i className="legendDot legendDot--1"></i> PRODUCT A</span>
        <span><i className="legendDot legendDot--2"></i> PRODUCT B</span>
      </div>
    </section>
  );
}