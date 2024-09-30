# This script fetches Anthony Edwards' career stats using the NBA API and prints the first few rows of the data using pandas
import pandas as pd
# Import the modules from the nba_api library
from nba_api.stats.endpoints import playercareerstats commonteamroster, commonplayerinfo
from nba_api.stats.static import teams

# Get Minnesota Timberwolves team ID
def get_timberwolves_team_id():
    nba_teams = teams.get_teams()
    timberwolves = [team for team in nba_teams if team['full_name'] == 'Minnesota Timberwolves'][0]
    return timberwolves['id']

if __name__ == "__main__":
    team_id = get_timberwolves_team_id()
    print(team_id)
# 
# Anthony Edwards' career stats
def fetch_ant_stats():
    career = playercareerstats.PlayerCareerStats(player_id='1630163') 
    career_data = career.get_data_frames()[0]

    # Print the first few rows of the data using pandas for a nicely formatted table
    print("Anthony Edwards Career Stats:")
    print(career_data.head())  # Prints top 5 rows

if __name__ == "__main__":
    fetch_ant_stats()