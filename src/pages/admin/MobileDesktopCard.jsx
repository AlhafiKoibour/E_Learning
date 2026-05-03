import "./MobileDesktopCard.css";

export default function MobileDesktopCard() {
  const bars = [
    { a: 52, b: 74, c: 80, d: 57 },
    { a: 38, b: 60, c: 70, d: 87 },
    { a: 62, b: 77, c: 90, d: 76},
    { a: 20, b: 35, c: 48, d: 56 },
    { a: 43, b: 67, c: 77, d: 60 },
    { a: 25, b: 44, c: 60, d: 58 },
  ];

  return (
    <section className="card mobileCard">
      <div className="card__header">
        <h3>Inscription par catégories</h3>
        <button className="card__menu">≡</button>
      </div>

      <div className="mobileCard__chart">
        {bars.map((item, index) => (
          <div className="mobileCard__group" key={index}>
            <div className="mobileCard__bar mobileCard__bar--a" style={{ height: `${item.a}%` }}></div>
            <div className="mobileCard__bar mobileCard__bar--b" style={{ height: `${item.b}%` }}></div>
            <div className="mobileCard__bar mobileCard__bar--c" style={{ height: `${item.c}%` }}></div>
            <div className="mobileCard__bar mobileCard__bar--d" style={{ height: `${item.d}%` }}></div>
          </div>
        ))}
      </div>

      <div className="mobileCard__legend">
        <span><i className="legendDot legendDot--1"></i> Développement</span>
        <span><i className="legendDot legendDot--2"></i> Design</span>
        <span><i className="legendDot legendDot--3"></i> Marketing</span>
        <span><i className="legendDot legendDot--4"></i> Data</span>
      </div>
    </section>
  );
}