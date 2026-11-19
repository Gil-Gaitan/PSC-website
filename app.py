from flask import Flask, render_template
from content.projects_data import PROJECTS
from content.team_data import TEAM_MEMBERS
from content.dropabeat_data import DEFAULT_TRACKS
from content.apps_data import APPS
app = Flask(__name__, static_folder="static", static_url_path="/static")


@app.route("/")
def index():
    featured = [project for project in PROJECTS if project.get("featured")]
    return render_template("index.html", projects=featured)


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/projects")
def projects():
    return render_template("projects.html", projects=PROJECTS, apps=APPS)


@app.route("/team")
def team():
    return render_template("team.html", team_members=TEAM_MEMBERS)


@app.route("/dropabeat")
def dropabeat():
    return render_template("dropabeat.html", tracks=DEFAULT_TRACKS)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
