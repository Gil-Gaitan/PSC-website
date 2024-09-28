from flask import Flask, render_template
from config import engine
import pandas as pd
from nba_data import fetch_data, fetch_other_data
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    fetch_data()
    fetch_other_data()
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4440, debug=0)