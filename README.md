# Plant Seeds Cook - Full Stack React Website

A modern, scalable website built with React, Node.js, and MongoDB. This project showcases backend development and data engineering skills while providing a platform for collaboration and content sharing.

## 🌱 Features

- **Real-time Clock**: Live time display in the header
- **Dynamic Updates**: Blog-style updates with contributor support
- **Curated Links**: Organized resource links with categories
- **Modern UI**: Material-UI components with responsive design
- **Real-time Updates**: Socket.IO integration for live content updates
- **Analytics**: Visitor tracking and page analytics
- **Docker Support**: Complete containerized deployment
- **API Integration**: RESTful API with MongoDB backend

## 🏗️ Architecture

```
Frontend (React + Material-UI)
├── Real-time clock display
├── Dynamic content management
├── Responsive design
└── Modern UI components

Backend (Node.js + Express)
├── RESTful API endpoints
├── MongoDB integration
├── Socket.IO for real-time features
└── Analytics tracking

Database (MongoDB)
├── Updates collection
├── Links collection
└── Analytics collection

Infrastructure (Docker)
├── Multi-container setup
├── Nginx for production
└── Redis for caching
```

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Git

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd PSC-website
   ```

2. **Start all services with Docker Compose**

   ```bash
   docker-compose up --build
   ```

3. **Access the application**
       - Frontend: <http://localhost:3000>
    - Backend API: <http://localhost:5001>
   - MongoDB: localhost:27017

### Local Development

1. **Frontend Development**

   ```bash
   cd frontend
   npm install
   npm start
   ```

2. **Backend Development**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

## 📁 Project Structure

```
PSC-website/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React context providers
│   │   ├── pages/          # Page components
│   │   └── App.js          # Main application
│   ├── package.json
│   └── Dockerfile
├── backend/                  # Node.js API
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── server.js           # Express server
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml       # Multi-container orchestration
└── README.md
```

## 🔧 API Endpoints

### Updates

- `GET /api/updates` - Get all updates
- `GET /api/updates/featured` - Get featured update
- `POST /api/updates` - Create new update
- `PUT /api/updates/:id` - Update existing update
- `DELETE /api/updates/:id` - Delete update

### Links

- `GET /api/links` - Get all links
- `GET /api/links/category/:category` - Get links by category
- `POST /api/links` - Create new link
- `PUT /api/links/:id` - Update existing link
- `DELETE /api/links/:id` - Delete link

### Analytics

- `POST /api/analytics/pageview` - Track page view
- `GET /api/analytics/summary` - Get analytics summary
- `GET /api/analytics/visitor-count` - Get visitor count

## 🎨 Customization

### Adding New Features

1. **Frontend Components**: Add new components in `frontend/src/components/`
2. **Pages**: Create new pages in `frontend/src/pages/`
3. **API Routes**: Add new routes in `backend/routes/`
4. **Database Models**: Create new schemas in `backend/models/`

### Styling

- Material-UI theme customization in `frontend/src/index.js`
- Component-specific styling using Material-UI's `sx` prop
- Responsive design with Material-UI breakpoints

## 🤝 Contributing

This project is designed for collaboration! Here's how you can contribute:

1. **Add Updates**: Use the updates API to add new content
2. **Share Links**: Add useful resources to the links section
3. **Improve Features**: Submit pull requests for new features
4. **Report Issues**: Create issues for bugs or improvements

### Contributor Guidelines

- Follow the existing code style
- Add proper documentation for new features
- Test your changes before submitting
- Use meaningful commit messages

## 🚀 Deployment

### Production Deployment

1. **Build the application**

   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

2. **Environment Variables**
   - Set `NODE_ENV=production`
   - Configure MongoDB connection string
   - Set up Redis for caching

3. **Domain Configuration**
   - Point your domain to the server
   - Configure SSL certificates
   - Set up reverse proxy if needed

## 📊 Analytics & Monitoring

- **Visitor Tracking**: Automatic page view and click tracking
- **Real-time Updates**: Live content updates via Socket.IO
- **Performance Monitoring**: Built-in health check endpoints
- **Error Logging**: Comprehensive error handling and logging

## 🔒 Security Features

- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Request validation and sanitization
- **Helmet.js**: Security headers and protection

## 📱 Mobile Support

- **Responsive Design**: Mobile-first approach
- **Touch-friendly**: Optimized for touch interactions
- **Progressive Web App**: PWA capabilities for mobile experience

## 🌟 Future Enhancements

- [ ] User authentication and authorization
- [ ] Advanced analytics dashboard
- [ ] Content management system
- [ ] Email newsletter integration
- [ ] Social media integration
- [ ] Advanced search functionality
- [ ] Multi-language support
- [ ] Dark/light theme toggle

## 📞 Contact

- **Email**: <Gil@plantseedscook.com>
- **GitHub**: [Gil-Gaitan](https://github.com/Gil-Gaitan)
- **LinkedIn**: [Gil Gaitan](https://www.linkedin.com/in/gil-gaitan-86094894/)

---

**Always be planting.** 🌱

Built with React, Node.js, MongoDB, and a passion for backend development.
