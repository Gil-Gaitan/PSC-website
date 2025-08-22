# 🚀 Quick Setup Guide

## Prerequisites

- Docker and Docker Compose installed
- Git

## Getting Started

### Option 1: Use the Startup Script (Recommended)

```bash
# Make the script executable (if not already done)
chmod +x start.sh

# Run the startup script
./start.sh
```

### Option 2: Manual Docker Commands

```bash
# Start all services
docker-compose up --build

# Or run in background
docker-compose up --build -d
```

## Access the Application

Once everything is running, you can access:

- **Frontend**: <http://localhost:3000>
- **Backend API**: <http://localhost:5001>
- **MongoDB**: localhost:27017

## Development

### Frontend Development

```bash
cd frontend
npm install
npm start
```

### Backend Development

```bash
cd backend
npm install
npm run dev
```

## Features Available

✅ **Real-time Clock** - Live time display in header  
✅ **Dynamic Updates** - Blog-style updates with contributor support  
✅ **Curated Links** - Organized resource links with categories  
✅ **Modern UI** - Material-UI components with responsive design  
✅ **Real-time Updates** - Socket.IO integration  
✅ **Analytics** - Visitor tracking and page analytics  
✅ **Docker Support** - Complete containerized deployment  

## API Endpoints

- `GET /api/updates` - Get all updates
- `GET /api/links` - Get all links
- `GET /api/analytics/summary` - Get analytics summary
- `POST /api/updates` - Create new update
- `POST /api/links` - Create new link

## Troubleshooting

### Port Already in Use

If you get port conflicts, stop existing containers:

```bash
docker-compose down
```

### Reset Everything

To completely reset the application:

```bash
docker-compose down -v
docker system prune -f
```

### View Logs

```bash
docker-compose logs -f
```

## Next Steps

1. **Customize Content**: Update the content in the React components
2. **Add Your Resume**: Place your resume.pdf in the frontend/public/ directory
3. **Configure Analytics**: Set up proper analytics tracking
4. **Deploy**: Use docker-compose.prod.yml for production deployment

## Support

If you encounter any issues, check the logs or refer to the main README.md file for detailed documentation.
