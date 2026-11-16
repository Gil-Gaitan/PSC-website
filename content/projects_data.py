"""
Projects data
"""

PROJECTS = [
    {
        "name": "AntDunks",
        "description": (
            "Database and web application for tracking Anthony Edwards dunks. "
            "FastAPI, React, and PostgreSQL run on the home server, with CI and monitoring. "
            "Live at antdunks.com."
        ),
        "status": "Live",
        "technologies": [
            "FastAPI",
            "React",
            "PostgreSQL",
            "CI",
            "Monitoring",
        ],
        "help": [
            "Add media and video",
            "Add rate limits, caching, and broader tests",
        ],
        "url": "https://antdunks.com/",
        "screenshot": "/static/images/antdunks-screenshot.png",
        "featured": True,
    },
    {
        "name": "G-Unit Server",
        "description": (
            "Linux server that hosts services for Plant Seeds Cook. "
            "Brought current, with some redesign. "
            "Firewall and SSH are hardened, and a maintenance plan is in place."
        ),
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
        "featured": True,
    },
    {
        "name": "Hegstrom & Sons",
        "repo": "https://github.com/Gil-Gaitan/hegstromandsons-main",
        "featured": True,
    },
    {
        "name": "Cultivate Rhythms",
        "featured": True,
    },
    {
        "name": "dropyourbeat.com",
        "description": "F# and Fable dunk archive, fan site, and in-game dunk tracker.",
        "signup": "Sign up on the site if you want.",
        "status": "Rolling out",
        "technologies": [
            "F#",
            "Fable",
        ],
        "url": "https://dropyourbeat.com",
        "featured": True,
    },
]
