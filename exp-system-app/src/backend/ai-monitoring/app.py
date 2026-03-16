from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import requests as req
app = Flask(__name__)
CORS(app)

ai_logs = []
@app.route("/api/github-stats", methods = ["GET"])
@app.route("/api/ai-logs", methods=["GET"])

def github_stats():
    username = request.args.get("username")
    if not username:
        return jsonify({"error": "Username required"}), 400
    repos_res = req.get(f"https://api.github.com/users/{username}/repos")
    repos = repos_res.json()

    language_count = {}
    for repo in repos:
        lang = repo.get("language")
        if lang:
            language_count[lang]= language_count.get(lang, 0) + 1
    top_language = sorted(language_count.items(), key=lambda x: x[1], reverse= True)

    return jsonify({
        "username" : username,
        "total_repos": len(repos),
        "languages": dict(top_language),
    })

def get_logs():
    return jsonify(ai_logs)

@app.route("/api/ai-logs", methods=["POST"])
def add_log():
    data = request.json

    if not all(k in data for k in ("user", "feature", "success")):
        return jsonify({"error": "Missing fields"}), 400

    log_entry = {
        "user": data["user"],
        "feature": data["feature"],
        "success": data["success"],
        "timestamp": datetime.utcnow().isoformat()
    }
    ai_logs.append(log_entry)
    return jsonify({"message": "Log added", "log": log_entry}), 201

@app.route("/api/dashboard-stats", methods=["GET"])
def dashboard_stats():
    stats = {
        "total_logs": len(ai_logs),
        "successful": sum(1 for log in ai_logs if log["success"]),
        "failed": sum(1 for log in ai_logs if not log["success"]),
    }
    return jsonify(stats)

if __name__ == "__main__":
    app.run(port=5001, debug=True)