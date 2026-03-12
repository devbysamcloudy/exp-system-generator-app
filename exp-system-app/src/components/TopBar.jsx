function TopBar({ userName = "User", toggleTheme, darkMode }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>Exp System Dashboard</h2>
      </div>
      <div className="topbar-right">
        <span className="topbar-user">Hello, {userName}</span>
        <button className="topbar-notify">Notification</button>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </div>
  );
}

export default TopBar;
