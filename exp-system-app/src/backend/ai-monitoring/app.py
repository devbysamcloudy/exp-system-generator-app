from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
app = Flask(__name__)
CORS(app)  
ai_logs = []
@app.route("/api/ai-logs", methods=["GET"])
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
if __name__ == "__main__":
    app.run(port=5001, debug=True)
