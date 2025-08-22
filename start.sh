#!/bin/bash

echo "🌱 Plant Seeds Cook - Full Stack React Application"
echo "=================================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Function to stop containers
stop_containers() {
    echo "🛑 Stopping containers..."
    docker-compose down
    echo "✅ Containers stopped"
}

# Function to start containers
start_containers() {
    echo "🚀 Starting containers..."
    docker-compose up --build -d
    echo "✅ Containers started"
}

# Function to show logs
show_logs() {
    echo "📋 Showing logs..."
    docker-compose logs -f
}

# Function to show status
show_status() {
    echo "📊 Container status:"
    docker-compose ps
}

# Function to reset everything
reset_all() {
    echo "🔄 Resetting everything..."
    docker-compose down -v
    docker system prune -f
    echo "✅ Reset complete"
}

# Main menu
while true; do
    echo ""
    echo "Choose an option:"
    echo "1) Start the application"
    echo "2) Stop the application"
    echo "3) Show logs"
    echo "4) Show status"
    echo "5) Reset everything"
    echo "6) Exit"
    echo ""
    read -p "Enter your choice (1-6): " choice

    case $choice in
        1)
            start_containers
            echo ""
            echo "🎉 Application is starting!"
            echo "📱 Frontend: http://localhost:3000"
            echo "🔧 Backend API: http://localhost:5001"
            echo "🗄️  MongoDB: localhost:27017"
            echo ""
            echo "⏳ Please wait a few moments for all services to start..."
            ;;
        2)
            stop_containers
            ;;
        3)
            show_logs
            ;;
        4)
            show_status
            ;;
        5)
            read -p "Are you sure you want to reset everything? This will delete all data. (y/N): " confirm
            if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
                reset_all
            else
                echo "Reset cancelled."
            fi
            ;;
        6)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option. Please choose 1-6."
            ;;
    esac
done
