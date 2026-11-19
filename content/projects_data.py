"""
Projects data
"""

PROJECTS = [
    {
        "name": "AntDunks",
        "description": "We recently started laying out a pathway for our hosted service to move from a foundational prototype to an early version app with fuller capability and longevity. We can't wait to work on data collection and distribution, but we want to tighten up the foundation before we roll out new features.",
        "status": "Live",
        "technologies": [
            "FastAPI",
            "React",
            "PostgreSQL",
            "CI",
            "Monitoring",
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
        "featured": False,
    },
    {
        "name": "Small Business Advertising",
        "description": "Some work for local small businesses to set up a basic site with a custom domain and email address. Request forms offer a new form of contact with customers. Next we will be developing the system to add additional projects to the gallery.",
        "names": [
            "Hegstrom & Sons",
            "Cultivate Rhythms",
        ],
        "featured": False,
    },
    {
        "name": "dropyourbeat.com",
        "description": "F# and Fable. Useful music app for increased productivity while working, by decreasing time spent on music selection.",
        "signup": "Sign up on the site if you want.",
        "status": "Live",
        "technologies": [
            "F#",
            "Fable",
        ],
        "url": "https://dropyourbeat.com",
        "screenshot": "/static/images/dropyourbeat.png",
        "featured": True,
    },
]
