```markdown
# EXP System Dashboard

A gamified developer dashboard that monitors your coding activity, tracks your progress with an XP/leveling system, and generates coding quests based on your GitHub repositories.

---

## 🚀 Features

- **XP & Leveling System** — Earn XP by completing coding quests and level up
- **GitHub Language Monitor** — Detects programming languages from your GitHub repos
- **Quest Generator** — Generates coding challenges based on your detected languages
- **Daily Coding Quest** — A fixed daily challenge to keep you sharp
- **AI Usage Monitoring** — Tracks every quest attempt with timestamps and results
- **Dashboard Stats** — Live stats showing total, successful, and failed attempts
- **Profile Management** — Update your name, email, and profile picture
- **Dark / Light Mode** — Theme toggle that persists across sessions

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Monaco Editor (`@monaco-editor/react`)
- React Router DOM
- CSS Variables for theming

### Backend
- FastAPI
- Uvicorn
- Python `requests` library
- GitHub REST API

---

## 📁 Project Structure

```
exp-system-app/
├── src/
│   ├── components/
│   │   ├── AIMonitoring.jsx
│   │   ├── CodeEditor.jsx
│   │   ├── DashboardStats.jsx
│   │   ├── GitHubStats.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── QuestGenerator.jsx
│   │   ├── Settings.jsx
│   │   ├── SideBar.jsx
│   │   └── TopBar.jsx
│   ├── Pages/
│   │   ├── Dashboard.jsx
│   │   └── Auth/
│   ├── utilis/
│   │   ├── apiservices.js
│   │   ├── authUtils.js
│   │   └── xpSystem.js
│   └── backend/
│       └── ai-monitoring/
│           ├── router.py
│           └── run.py
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js
- Python 3.10+
- pip

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/devbysamcloudy/exp-system-generator-app.git
cd exp-system-generator-app
```

**2. Install frontend dependencies:**
```bash
npm install
```

**3. Install backend dependencies:**
```bash
cd src/backend/ai-monitoring
pip install fastapi uvicorn requests
```

---

## 🏃 Running the App

You need two terminals running simultaneously.

**Terminal 1 — Backend:**
```bash
cd src/backend/ai-monitoring
python run.py
```
Backend runs on: `http://127.0.0.1:8000`

**Terminal 2 — Frontend:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/` | Health check |
| GET | `/api/ai-logs` | Fetch all activity logs |
| POST | `/api/ai-logs` | Add a new activity log |
| GET | `/api/dashboard-stats` | Get total, successful, failed counts |
| GET | `/api/github-stats?username=` | Fetch GitHub repo languages |

---

## 🎮 How It Works

1. **Enter your GitHub username** in the GitHub Language Monitor
2. The app fetches your public repositories and detects your languages
3. **Generate a quest** based on your detected languages
4. **Write and submit your solution** in the built-in code editor
5. If your solution is correct, **XP is awarded** based on language difficulty
6. Track all your activity in the **AI Monitoring** section

---

## 🏆 XP Rewards by Language

| Language | XP Reward |
|----------|-----------|
| Java | 70 XP |
| TypeScript | 70 XP |
| JavaScript | 60 XP |
| Python | 60 XP |
| CSS | 40 XP |
| HTML | 40 XP |
| Default | 50 XP |

---

## 🔧 Configuration

To switch from development to production, update one line in `src/utilis/apiservices.js`:

```javascript
// Development
const BASE_URL = "http://127.0.0.1:8000/api";

// Production
const BASE_URL = "https://your-production-url.com/api";
```

---

## 👥 Team

- **Samuel Nganga** — Frontend, AI API Integration, Team Lead
- **Partner** — Backend, FastAPI, Project Architecture

---

## 📄 License

This project is licensed under the MIT License.
```
