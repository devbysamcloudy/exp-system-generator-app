import React, { useState } from "react";

function GitHubStats({ onLanguagesDetected }) {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = () => {
    if (!username) return;
    setLoading(true);
    fetch(`http://127.0.0.1:5001/api/github-stats?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
        if (onLanguagesDetected) {
          onLanguagesDetected(Object.keys(data.languages));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch GitHub stats:", err);
        setLoading(false);
      });
  };

  return (
    <div className="github-stats">
      <h3>GitHub Language Monitor</h3>
      <div className="github-input">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchStats} disabled={loading}>
          {loading ? "Loading..." : "Fetch Stats"}
        </button>
      </div>

      {stats && (
        <div className="stats-result">
          <p>Total Repos: <strong>{stats.total_repos}</strong></p>
          <h4>Languages Detected:</h4>
          <div className="language-list">
            {Object.entries(stats.languages).map(([lang, count]) => (
              <div key={lang} className="language-badge">
                <span>{lang}</span>
                <small>{count} repo{count > 1 ? "s" : ""}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GitHubStats;