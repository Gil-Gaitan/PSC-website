from flask import Flask, render_template
from content.projects_data import PROJECTS, SERVICES, TECHNOLOGIES
from content.team_data import TEAM_MEMBERS

app = Flask(__name__, static_folder="static", static_url_path="/static")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/projects")
def projects():
    return render_template("projects.html", projects=PROJECTS, services=SERVICES, technologies=TECHNOLOGIES)


@app.route("/team")
def team():
    return render_template("team.html", team_members=TEAM_MEMBERS)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
