# Project Roadmap for Plant Seeds Cook
## Project Breakdown

### Project 1: Data Engineering Pipeline
- **Objective**: Create a pipeline that pulls current data from the NBA API.

9/23 I am looking into the NBA API system and want to see how to use it in a python file. From the API: [Readme.md](https://github.com/swar/nba_api/blob/master/README.md)
"pip install nba_api"
"pip install nba_api requests"
9/24 I needed to install pandas too, so that is another tech.
9/24 Install this to use mySQL: 
   "pip install pandas sqlalchemy pymysql mysql-connector-python"
9/24 Start mySQL Server
   "mysql.server start"
Running MySQL Queries in the Same Python File:
You can keep everything in the same Python file. The Python file will:
Fetch the data from the NBA API.
Insert it into your MySQL database.
Execute SQL queries on the database.
   HOW?

FURTHER DIVERSION. Reinstall of MySQL, GPT suggests a docker image. Start Docker program
   "docker pull mysql:latest"
   Start the sql container
   "docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=spiderman -d -p 3306:3306 mysql:latest"
   - name mysql-container: Assigns a name to the container.
   - e MYSQL_ROOT_PASSWORD=yourpassword: Sets the root password for MySQL.
   - -d: Runs the container in detached mode (in the background).
   - -p 3306:3306: Maps port 3306 on your local machine to port 3306 in the container
   Verify that the MySQL container is running:
  "docker ps"
   Log into the MySQL server:
  "docker exec -it mysql-container mysql -u root -p" and enter password
  9/24 Sucessful into mysql in terminal
  
  LATER:
  To ensure your data persists even after the container is stopped or removed, use a Docker volume. You can run the container like this instead: I Have not done this yet
  "docker run --name mysql-container -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=yourpassword -d -p"3306:3306 mysql:latest"

EXTRA DIVERSION: I recognized these api need to be running in the docker file so unfortunately I want to head there next:
To the Dockerfile: Setup feature architecture
To the 
Maintain file structure:
/app
├── app.py
├── nba_data.py
├── templates
│   ├── index.html
│   └── other_html_files...
├── requirements.txt
└── Dockerfile

PICKING UP AGAIN:
connecting to mySQL file

Progress 9/24/24:
Starting to see framework for pipeline and website
Building Docker knowledge, also Flask, MySQL, and the NBA API integration. 
Solving lots of problems.
Working towards creating a solid, containerized environment for your app and setting up the necessary pieces for data ingestion and display.

There is a lot, but let's focus here: Figure out how to implement a mysql database in the container - should i work in the /app file or the data file? or another file?. Have it automatically create a empty database and load it with the api info (with panda i think). Then I want to be able to interact with the database back in mySql.

9/27/24
Version Control Method: GitFlow (David Mosyan Medium article)
Implementing the GitFLow branching strategy.
/Main
/Hotfix
/Release
/Develop
/Feature...




#### Steps:
   
2. **Fetch Data**:
   - Use requests library to call the NBA API and extract data.
   - Transform and clean the data as needed.

3. **Store Data**:
   - Create a SQL database to store the fetched data.
   - Implement database schema and tables to hold the information.

### Project 2: Backend API
- **Objective**: Develop a Flask API to serve the data stored in the database.
- **Tech Stack**:
  - **Flask**: To create RESTful API endpoints.
  - **SQLAlchemy**: To interact with the database using ORM.
  - **Docker**: To containerize the API for deployment.

#### Steps:
1. **Create Flask Application**:
   - Set up Flask and define the application structure.
   - Implement API endpoints using Flask.
   
2. **Database Integration**:
   - Connect Flask application to the SQL database using SQLAlchemy.
   - Implement CRUD operations for the data.

3. **Real-time Data Handling**:
   - Use Flask to serve real-time data through the API.
   - Implement JSON responses using `jsonify`.

### Project 3: Data Visualizer
- **Objective**: Build a data visualization tool to display the data fetched from the NBA API.
- **Tech Stack**:
  - **JavaScript** (or **Python** with libraries like Matplotlib): For data visualization.
  - **HTML/CSS**: For front-end development.
  - **Flask**: To serve the front-end and handle requests.

#### Steps:
1. **Set Up Front-end**:
   - Create HTML pages to display the data.
   - Style the pages using CSS.

2. **Integrate with Backend**:
   - Use AJAX or fetch API to call the Flask API endpoints and retrieve data.
   - Visualize data using libraries like Chart.js or D3.js.

## Good Practices
- **Version Control**: Use Git for version control and collaborate effectively.
- **Documentation**: Maintain thorough documentation for the code and API endpoints.
- **Testing**: Write unit tests for the API and data handling logic.
- **Security**: Implement proper authentication and security practices to protect the API.

## Conclusion
Following this roadmap will help in building a dynamic and interactive web service for Plant Seeds Cook. The project will evolve incrementally, allowing for the addition of features as needed.

SNIPPIT from NBA API Redesign.

# nba_data.py
import pandas as pd
from sqlalchemy import create_engine
from config import engine

from nba_api.stats.endpoints    import playercareerstats
from nba_api.live.nba.endpoints import scoreboard
from nba_api.stats.static       import teams
from nba_api.stats.endpoints    import commonplayerinfo

def fetch_data():
    # Fetch Nikola Jokić's career stats
    career = playercareerstats.PlayerCareerStats(player_id='203999') 
    career_data = career.get_data_frames()[0]

    # Write the data into the MySQL table
    career_data.to_sql('jokic_career_stats', engine, if_exists='replace', index=False)

    # Verify the data by running an SQL query directly from Python
    with engine.connect() as connection:
        result = connection.execute("SELECT * FROM jokic_career_stats LIMIT 5")
        for row in result:
            print(row)

# This function can also fetch and print scoreboard, teams, player info, etc.
def fetch_other_data():
    # Fetch today's scoreboard
    games = scoreboard.ScoreBoard()
    games_json = games.get_json()
    print("Today's Scoreboard (JSON):")
    print(games_json)

    # Fetch teams from Minnesota
    minnesota_teams = teams.find_teams_by_state('minnesota')
    print("Minnesota Teams:")
    print(minnesota_teams)

    # Fetch LeBron James' common player info
    player_info = commonplayerinfo.CommonPlayerInfo(player_id=2544)
    player_data = player_info.get_dict()
    print("LeBron James Info (Dict):")
    print(player_data)