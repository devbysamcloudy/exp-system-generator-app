import React from "react";

function TopBar({userName = "User"}) {

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>Exp System Dashboard</h2>
      </div>
      <div className="topbar-right">
        <span className="topbar-user">Hello, {userName}</span>
        <button className="topbar-notify">Notification</button>
      </div>
    </div>
  );

}

export default TopBar;