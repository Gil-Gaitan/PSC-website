# Flask is a web framework for Python, it is used to create web applications.Create servers easily
# render_template: for rendering html, dynamic webpages that combine html and python
from flask import Flask, render_template

# import engine from config.py
from config import engine

#Pandas is a data manipulation library in python. data frames and series to manipulate and analyze data
import pandas as pd

# Create a Flask web server
# This is the main entry point for the application, initializations are done here
# configurations too but some are imported from config.py
app = Flask(__name__)

# Function to fetch data from the database
@app.route('/')                                 #decorator
def home():                                     #function
    fetch_data()                                #function call
    fetch_other_data()                          #function call
    return render_template('index.html')        #function call

if __name__ == '__main__':                      #main function
    app.run(host='0.0.0.0', port=4440, debug=0) #function call