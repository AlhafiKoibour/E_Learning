import "./WeeklySalesCard.css";

const data = [
  { source: "Twitterlist", revenue: "$42.51", value: "98.1" },
  { source: "Realmix", revenue: "$15.40", value: "63" },
  { source: "Quinu", revenue: "$59.96", value: "57.4" },
  { source: "Chatterpoint", revenue: "$71.47", value: "13.9" },
];

export default function WeeklySalesCard() {
  return (
    <section className="card weeklyCard">
      <div className="card__header">
        <h3>Weekly sales</h3>
        <button className="card__menu">⋮</button>
      </div>

      <div className="weeklyCard__donut">
        <div className="weeklyCard__center">
          <span>Total</span>
          <strong>0.172</strong>
        </div>
      </div>

      <table className="weeklyCard__table">
        <thead>
          <tr>
            <th>Source</th>
            <th>Revenue</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.source}>
              <td>{row.source}</td>
              <td>{row.revenue}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}