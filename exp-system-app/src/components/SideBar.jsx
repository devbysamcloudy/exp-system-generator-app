import React from "react";

function SideBar({ onSelectSection, activeSection }) { // Add props

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "xp", label: "XP Progress" },
    { id: "quests", label: "Daily Quests" },
    { id: "tracks", label: "Skill Tracks" },
    { id: "ai", label: "AI Monitoring" },
    { id: "settings", label: "Settings" }
  ];

  const handleClick = (itemId) => {
    if (onSelectSection) {
      onSelectSection(itemId);
    }
  };

  return (
    <div className="sidebar">
      <h3>MENU</h3>
      <ul>
        {menuItems.map((item) => (
          <li 
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={activeSection === item.id ? "active" : ""}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;