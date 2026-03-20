# EXP System Dashboard

A gamified developer dashboard that monitors your coding activity, tracks your progress with an XP/leveling system, generates coding quests based on your GitHub repositories, and locks AI access when daily limits are exceeded.

---

## 🚀 Features

### 🎮 Gamification
- **XP & Leveling System** — Earn XP by completing coding quests and level up
- **Skill Tracks** — Per-language XP and level tracking (HTML, CSS, JavaScript, Python, React, Flutter)
- **Daily Quest Card** — Rotating daily challenges with difficulty levels and XP rewards
- **Quest Generator** — Generates coding challenges based on your detected GitHub languages
- **20 Questions Per Language** — Unique quest bank with no repeats until all are completed

### 🤖 AI Monitoring & Lock System
- **AI Usage Monitoring** — Tracks every quest attempt with timestamps and results
- **Lock Mechanism** — AI access locks after 20 daily requests
- **Quest Unlock** — Complete 4 consecutive quests to unlock AI access
- **Dashboard Stats** — Live stats showing total, successful, and failed attempts

### 🐙 GitHub Integration
- **GitHub Language Monitor** — Detects programming languages from your public repos
- **Language-Based Quests** — Quest Generator uses your GitHub languages to create relevant challenges

### 📊 Analytics & Logs
- **Reports & Analytics** — Charts showing XP progress, quest completion rates, AI usage stats and daily activity (powered by Recharts and Chart.js)
- **Audit Logs / History** — Full history of all activity with filters by date, language, and status — exportable as CSV

### 🔔 Notifications
- **Real-time Notifications** — Bell icon with unread count badge
- **Event-driven** — Fires on quest complete, level up, skill level up, AI locked, AI unlocked, and GitHub connected

### 🎨 UI/UX
- **Dark / Light Mode** — Theme toggle that persists across sessions
- **Mobile Responsive** — Hamburger menu, collapsible sidebar, responsive layouts
- **Profile Management** — Upload and remove profile picture, update name and email
- **Sidebar with Icons** — Menu icons and user profile at the bottom of the sidebar
- **XP Display in Topbar** — Shows current XP, next level XP, and level badge

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Monaco Editor (`@monaco-editor/react`)
- React Router DOM
- Recharts
- Chart.js + react-chartjs-2
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
│   │   ├── AuditLogs.jsx
│   │   ├── CodeEditor.jsx
│   │   ├── DailyQuestCard.jsx
│   │   ├── DashboardStats.jsx
│   │   ├── GitHubStats.jsx
│   │   ├── LockModal.jsx
│   │   ├── NotificationBell.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── QuestGenerator.jsx
│   │   ├── Reports.jsx
│   │   ├── Settings.jsx
│   │   ├── SkillTracks.jsx
│   │   ├── SideBar.jsx
│   │   └── TopBar.jsx
│   ├── Pages/
│   │   ├── Dashboard.jsx
│   │   └── Auth/
│   ├── utilis/
│   │   ├── apiservices.js
│   │   ├── authUtils.js
│   │   ├── lockUtils.js
│   │   ├── notificationUtils.js
│   │   ├── questBank.js
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
npm install recharts chart.js react-chartjs-2
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
| GET | `/api/dashboard-stats` | Get total, successful, and failed counts |
| GET | `/api/github-stats?username=` | Fetch GitHub repo languages |
| GET | `/api/ai-detection` | Detect most used languages from logs |

---

## 🎮 How It Works

1. **Enter your GitHub username** in the GitHub Language Monitor
2. The app fetches your public repositories and detects your languages
3. **Generate a quest** based on your detected languages
4. **Write and submit your solution** in the built-in Monaco code editor
5. If your solution is correct, **XP is awarded** based on language difficulty
6. XP is tracked globally and per language in **Skill Tracks**
7. After **20 daily AI requests**, access is locked
8. Complete **4 consecutive quests** to unlock AI access again
9. Track all your activity in **Audit Logs** and view charts in **Reports**

---

## 🏆 XP Rewards by Language

| Language | XP Reward |
|----------|-----------|
| React | 80 XP |
| Flutter | 80 XP |
| Java | 70 XP |
| TypeScript | 70 XP |
| JavaScript | 60 XP |
| Python | 60 XP |
| CSS | 40 XP |
| HTML | 40 XP |
| Default | 50 XP |

---

## 🔒 Lock Mechanism

- AI access is tracked per day using `localStorage` and the FastAPI backend
- Once **20 requests** are made in a day, the Lock Modal appears
- The user must complete **4 consecutive quests** to unlock access
- Progress dots show how many quests have been completed toward the unlock
- The Unlock button activates only when all 4 quests are done
- Lock and unlock events fire real notifications in the bell

---

## 📊 Quest Bank

Each supported language has **20 unique questions** stored in `questBank.js`:
- Completed quest IDs are tracked in `localStorage`
- Questions are never repeated until all 20 are done
- After all 20 are completed, the bank resets automatically
- Progress bars show completion percentage per language in the Quest Generator

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

## 🗂 Sidebar Navigation

| Section | Description |
|---------|-------------|
| 🏠 Dashboard | Overview with XP, daily quest, skill tracks, GitHub stats and AI monitoring |
| ⭐ XP Progress | Full XP progress bar and skill track breakdown |
| 📋 Daily Quests | Daily quest card and quest generator |
| 🎯 Skill Tracks | Per-language XP and level progress |
| 🤖 AI Monitoring | Activity log table |
| 📊 Reports | Charts and analytics |
| 📜 Audit Logs | Full history with filters and CSV export |
| ⚙️ Settings | Profile, theme, and XP reset |

---

## 👥 Team

- **Samuel Nganga** — Frontend, AI API Integration, Quest System, Team Lead
- **Mark Mulyungi** — Backend, FastAPI, Project Architecture

---

## 📄 License

This project is licensed under the MIT License.
```
