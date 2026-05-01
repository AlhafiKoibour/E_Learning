import "./Topbar.css";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <button className="topbar__menuBtn">☰</button>
        <div className="topbar__search">
          <input type="text" placeholder="search" />
        </div>
      </div>

      <div className="topbar__right">
        <button className="topbar__icon">🇬🇧</button>
        <button className="topbar__icon">◌</button>
        <button className="topbar__icon">◌</button>
        <button className="topbar__icon">⏻</button>
        <button className="topbar__icon">⚙</button>
      </div>
    </header>
  );
}