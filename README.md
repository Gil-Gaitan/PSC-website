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

### Prerequisites

- Python 3.8 or higher
- Git

### Local Development Setup

1. **Create a virtual environment**

   ```bash
   python3 -m venv venv
   ```

2. **Activate the virtual environment**

   ```bash
   source venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the development server**

   ```bash
   python run_dev.py
   ```

5. **View the site**
   - Open your browser to `http://localhost:5000`

### Quick Start (After Initial Setup)

Once you've done the setup above once, you only need to:

```bash
source venv/bin/activate
python run_dev.py
```

### Docker (Optional)

```bash
docker build -t plantseedscook .
docker run -p 5000:5000 plantseedscook
```

### Notes

- The database (`plantseedscook.db`) is created automatically on first run
- Development server runs on port 5000 by default
- The site deploys automatically to Render when changes are pushed to `main` branch

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For questions or collaboration opportunities, contact us at <hello@plantseedscook.com>
