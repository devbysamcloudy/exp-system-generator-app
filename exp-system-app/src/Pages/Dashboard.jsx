import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Topbar from "../components/TopBar";
import "./Dashboard.css";
import CodeEditor from "../components/CodeEditor";
import ProgressBar from "../components/ProgressBar";
import { getLevel, getProgressPercentage } from "../utilis/xpSystem";
import { useAuth } from "./Auth/ProtectedRoutes";
import { useLogout } from "../utilis/authUtils";
function Dashboard() {
  ////////////////////////////////////////
  //Get user data from auth.
  const { userdata } = useAuth();

  ///////////////////////////////////////////////
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [userCode, setUserCode] = useState("");

  // Get theme from localStorage or default to light
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Apply theme class to body and save to localStorage
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

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser ? storedUser.firstName : "User";

  const xp = Number(localStorage.getItem("xp")) || 0;
  const level = getLevel(xp);
  const progress = getProgressPercentage(xp);
  //////////// my suggesstion is we  use  session instead of local storage. supabase safely stores the sessions.
  const logout = useLogout();
  /////////
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
    console.log("Logged out successfully");
  };

  const addXP = (amount) => {
    const currentXP = Number(localStorage.getItem("xp")) || 0;
    const newXP = currentXP + amount;
    localStorage.setItem("xp", newXP);
    window.location.reload();
  };

  const validateSolution = () => {
    try {
      if (!userCode.includes("function") && !userCode.includes("=>")) {
        alert("Please write a function first!");
        return;
      }

      const testFunction = new Function(`
                ${userCode}
                // Try to get the function regardless of its name
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
      } else {
        alert("Incorrect solution. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert(
        "Your code has an error. Make sure you define a function that reverses a string.",
      );
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
              <CodeEditor onCodeChange={setUserCode} />
              <button className="complete-quest-btn" onClick={validateSolution}>
                Complete Quest (+50 XP)
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

            <div className="daily-quest">
              <h2>Daily Coding Quest</h2>
              <p>Create a function that reverses a string.</p>
              <CodeEditor onCodeChange={setUserCode} />
              <button className="complete-quest-btn" onClick={validateSolution}>
                Complete Quest (+50 XP)
              </button>
            </div>
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
            Hello, <span>{userdata.name}</span>!
            <button onClick={logout} className="logout-btn">
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
