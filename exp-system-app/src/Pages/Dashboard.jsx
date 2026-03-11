import React from "react";
import Sidebar from "../components/SideBar"
import Topbar from "../components/TopBar"
import "./Dashboard.css";

function Dashboard(){
    
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userName = storedUser ? storedUser.firstName : "User";
    
    return(
        <div className="dashboard-container">
            <Topbar userName={userName} />
            <Sidebar />
            <div className="dashboard-content">
               
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <div className="user-greeting">
                        Hello, <span>{userName}</span>!
                    </div>
                </div>
                
                <div className="dashboard-empty">
                    <p>Your dashboard will appear here as you complete tasks and earn XP.</p>
                    <p>Start by exploring the menu on the left!</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;