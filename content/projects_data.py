"""
Projects data
"""

PROJECTS = [
    {
        "name": "AntDunks",
        "description": "Database and web application for tracking Anthony Edwards dunks. Robust CI/CD pipeline to deploy new features and fixes.",
        "status": "Live",
        "technologies": [
            "Python",
            "PostgreSQL",
            "React",
            "REST API",
            "Grafana",
            "IaC",
        ],
        "url": "https://antdunks.com/",
        "screenshot": "/static/images/antdunks-screenshot.png",
    },
    {
        "name": "G-Unit Server",
        "description": "Linux server that hosts a variety of services for Plant Seeds Cook. This will reduce overhead and add scalability to our workshop.",
        "status": "Live",
        "technologies": [
            "Linux",
            "Server Administration",
            "Docker",
            "GitHub Actions",
            "CI/CD",
            "Web Hosting",
            "Cloudflare",
        ],
    },
    {
        "name": "dropyourbeat.com",
        "description": "This is the next sibling of the drop a beat app. Will be hosted on G-Unit with a user database. Aside from a login feature, the app will provide a way for users to share their playlist in the form of a generated URL.",
        "status": "Cooking",
        "technologies": [
            "F#",
            "Elmish",
            "PostgreSQL",
        ],
    },
]
