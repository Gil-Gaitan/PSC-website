# Use Python 3.11 slim image with security updates
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Update system packages and install security updates
RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# The templates and static directories are already in place

# Expose port 5000
EXPOSE 5000

# Start the Flask application
CMD ["python", "app.py"]