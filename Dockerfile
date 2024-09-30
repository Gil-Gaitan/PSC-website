# Python image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . /app

# Expose the port the app will run on
EXPOSE 5000

# Command to run the Flask application
ENV FLASK_APP=app.py
CMD ["flask", "run", "--host=0.0.0.0"]
