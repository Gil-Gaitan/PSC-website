from flask import Flask, render_template, jsonify, request, send_from_directory
import sqlite3
import os
from datetime import datetime

app = Flask(__name__, static_folder="static", static_url_path="/static")


# Database initialization
def init_db():
    conn = sqlite3.connect("plantseedscook.db")
    cursor = conn.cursor()

    # Create visitors table
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS visitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip_address TEXT,
            visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_agent TEXT
        )
    """
    )

    # Create updates table
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS updates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            author TEXT DEFAULT 'Plant Seeds Cook Team'
        )
    """
    )

    # Insert sample update if table is empty
    cursor.execute("SELECT COUNT(*) FROM updates")
    if cursor.fetchone()[0] == 0:
        cursor.execute(
            """
            INSERT INTO updates (title, content) VALUES 
            (?, ?)
        """,
            (
                "Welcome to Plant Seeds Cook",
                "We are excited to launch our new website with enhanced backend capabilities. Our team is ready to help you build scalable solutions.",
            ),
        )

    conn.commit()
    conn.close()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/projects")
def projects():
    return render_template("projects.html")


@app.route("/team")
def team():
    return render_template("team.html")


@app.route("/api/visitor-count")
def visitor_count():
    conn = sqlite3.connect("plantseedscook.db")
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM visitors")
    count = cursor.fetchone()[0]
    conn.close()
    return jsonify({"count": count})


@app.route("/api/latest-update")
def latest_update():
    conn = sqlite3.connect("plantseedscook.db")
    cursor = conn.cursor()
    cursor.execute(
        "SELECT title, content, publish_date FROM updates ORDER BY publish_date DESC LIMIT 1"
    )
    update = cursor.fetchone()
    conn.close()

    if update:
        return jsonify(
            {"title": update[0], "content": update[1], "publish_date": update[2]}
        )
    return jsonify({"error": "No updates found"})


@app.route("/api/record-visit", methods=["POST"])
def record_visit():
    data = request.get_json()
    conn = sqlite3.connect("plantseedscook.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO visitors (ip_address, user_agent) VALUES (?, ?)
    """,
        (data.get("ip", ""), data.get("user_agent", "")),
    )
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})


if __name__ == "__main__":
    init_db()
    app.run(debug=True, host="0.0.0.0", port=5000)
