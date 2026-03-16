import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Topbar from "../components/TopBar";
import "./Dashboard.css";
import CodeEditor from "../components/CodeEditor";
import ProgressBar from "../components/ProgressBar";
import { getLevel, getProgressPercentage, addXPToStorage } from "../utilis/xpSystem";
import { useAuth } from "./Auth/ProtectedRoutes";
import { useLogout } from "../utilis/authUtils";
import AIMonitoring from "../components/AIMonitoring";
import DashboardStats from "../components/DashboardStats";
import GitHubStats from "../components/GitHubStats";
import QuestGenerator from "../components/QuestGenerator";

function Dashboard() {
  const { userdata } = useAuth();

  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [userCode, setUserCode] = useState("");
  const [logs, setLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("aiLogs")) || [];
  });
  const [detectedLanguages, setDetectedLanguages] = useState([]);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const xp = Number(localStorage.getItem("xp")) || 0;
  const level = getLevel(xp);
  const progress = getProgressPercentage(xp);

  const logout = useLogout();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const addXP = (amount) => {
    addXPToStorage(amount);
  };

  const logAction = (feature, success) => {
    const newLog = {
      user: userdata?.name || "User",
      feature,
      success,
      timestamp: new Date().toISOString(),
    };

    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    localStorage.setItem("aiLogs", JSON.stringify(updatedLogs));

    fetch("http://127.0.0.1:5001/api/ai-logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: newLog.user,
        feature: newLog.feature,
        success: newLog.success,
      }),
    }).catch((err) => console.error("Failed to send log to backend:", err));
  };

  const handleQuestAccepted = (quest) => {
    const reward = quest.xpReward || 50;
    addXP(reward);
    logAction(quest.language, true);
    alert(`Quest accepted! +${reward} XP`);
    window.location.reload();
  };

  const validateSolution = () => {
    try {
      if (!userCode.includes("function") && !userCode.includes("=>")) {
        alert("Please write a function first!");
        logAction("Daily Quest", false);
        return;
      }

      const testFunction = new Function(`
        ${userCode}
        const functions = Object.values(this).filter(val => typeof val === 'function');
        const reverseFunc = functions.find(f => f("hello") === "olleh");
        if (reverseFunc) {
          return reverseFunc("hello");
        }
        return null;
      `);

      const result = testFunction();

      if (result === "olleh") {
        addXP(50);
        alert("Correct solution! +50 XP");
        logAction("Daily Quest", true);
        window.location.reload();
      } else {
        alert("Incorrect solution. Try again.");
        logAction("Daily Quest", false);
      }
    } catch (error) {
      console.error(error);
      alert("Your code has an error. Make sure you define a function that reverses a string.");
      logAction("Daily Quest", false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "xp":
        return (
          <div className="xp-page">
            <h2>XP Progress</h2>
            <div className="xp-section">
              <h3>Level {level}</h3>
              <ProgressBar progress={progress} />
              <p>{xp} XP</p>
            </div>
          </div>
        );
      case "quests":
        return (
          <div className="quests-page">
            <h2>Daily Quests</h2>
            <div className="daily-quest">
              <h3>Daily Coding Quest</h3>
              <p>Create a function that reverses a string.</p>
              <CodeEditor
                onCodeChange={setUserCode}
                darkMode={darkMode}
              />
              <button className="complete-quest-btn" onClick={validateSolution}>
                Complete Quest (+50 XP)
              </button>
            </div>
            <QuestGenerator
              languages={detectedLanguages}
              onQuestAccepted={handleQuestAccepted}
              darkMode={darkMode}
            />
          </div>
        );
      case "aiMonitoring":
        return <AIMonitoring logs={logs} />;
      case "settings":
        return (
          <div className="settings-page">
            <h2>Settings</h2>
            <div className="setting-item">
              <label>Dark Mode</label>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleTheme}
              />
            </div>
            <div className="setting-item">
              <label>Reset XP</label>
              <button
                onClick={() => {
                  localStorage.setItem("xp", 0);
                  window.location.reload();
                }}
              >
                Reset
              </button>
            </div>
          </div>
        );
      case "dashboard":
      default:
        return (
          <>
            <div className="xp-section">
              <h3>Level {level}</h3>
              <ProgressBar progress={progress} />
              <p>{xp} XP</p>
            </div>
            <DashboardStats />
            <GitHubStats onLanguagesDetected={setDetectedLanguages} />
            <QuestGenerator
              languages={detectedLanguages}
              onQuestAccepted={handleQuestAccepted}
              darkMode={darkMode}
            />
            <div className="daily-quest">
              <h2>Daily Coding Quest</h2>
              <p>Create a function that reverses a string.</p>
              <CodeEditor
                onCodeChange={setUserCode}
                darkMode={darkMode}
              />
              <button className="complete-quest-btn" onClick={validateSolution}>
                Complete Quest (+50 XP)
              </button>
            </div>
            <AIMonitoring logs={logs} />
          </>
        );
    }
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <Topbar
        userName={userdata?.name}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
      />
      <Sidebar
        onSelectSection={setActiveSection}
        activeSection={activeSection}
        darkMode={darkMode}
      />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-greeting">
            Hello, <span>{userdata?.name}</span>!
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;