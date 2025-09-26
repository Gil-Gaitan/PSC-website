# Plant Seeds Cook Website

**Plant Seeds Cook LLC** is a small team of creative developers passionate about learning and building cool projects. This website showcases our work and serves as our company's digital presence.

## Project Overview

A professional website built with HTML, CSS, and Flask backend, designed to showcase our team's capabilities and current projects.

## Features

- Clean, responsive design
- Team page with member profiles
- Services and technologies showcase
- Flask backend with SQLite database
- Docker containerization ready

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Python Flask
- **Database:** SQLite
- **Deployment:** Docker
- **Version Control:** Git

## Getting Started

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/plant-seeds-cook.git
cd plant-seeds-cook

# Run with Python HTTP server (static)
python3 -m http.server 3000

# Or run with Flask (with database features)
source venv/bin/activate
python app.py
```

### Docker

```bash
# Build and run with Docker
docker build -t plantseedscook .
docker run -p 5000:5000 plantseedscook
```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For questions or collaboration opportunities, contact us at <hello@plantseedscook.com>
