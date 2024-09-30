import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

# Load environment variables from .env file
load_dotenv()

# Get MySQL connection details from environment variables
db_user = os.getenv('MYSQL_USER')
db_password = os.getenv('MYSQL_PASSWORD')
db_host = os.getenv('MYSQL_HOST')
db_name = os.getenv('MYSQL_DB')

# Create SQLAlchemy engine
engine = create_engine(f'mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}')

#Other Configurations we may need:
#debug Module
# NotFoundError
# secret key session mgmt __spec__
# db config
# allow db to host 
# static and media for uploads
# Security
# keys for apis