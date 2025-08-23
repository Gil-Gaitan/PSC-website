# Deployment Guide - Render

This guide will help you deploy your PSC website to Render with a MongoDB database and secure admin access.

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Domain** (optional): For custom domain setup

## Step 1: Prepare Your Repository

### 1.1 Environment Variables

Create a `.env` file in your backend directory for local development:

```bash
# Backend/.env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/psc-website
JWT_SECRET=your-super-secret-jwt-key-here
ADMIN_PASSWORD=your-secure-admin-password
FRONTEND_URL=http://localhost:3000
```

### 1.2 Update Frontend API URL

The frontend will automatically use the proxy configuration for local development, but for production, it will use the environment variable.

## Step 2: Deploy to Render

### 2.1 Connect Your Repository

1. Go to [render.com](https://render.com) and sign in
2. Click "New +" and select "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file

### 2.2 Configure Services

The `render.yaml` file defines three services:

1. **Frontend** (Static Site)
   - Builds React app
   - Serves static files
   - Proxies API calls to backend

2. **Backend** (Web Service)
   - Node.js API server
   - Connects to MongoDB
   - Handles admin authentication

3. **Database** (MongoDB)
   - Managed MongoDB instance
   - Automatically configured

### 2.3 Set Environment Variables

After deployment, you'll need to set these in Render dashboard:

**Backend Service Environment Variables:**

- `NODE_ENV`: `production`
- `PORT`: `10000` (Render's default)
- `MONGODB_URI`: (Auto-configured from database)
- `JWT_SECRET`: (Auto-generated)
- `ADMIN_PASSWORD`: Set your secure admin password
- `FRONTEND_URL`: Your frontend URL

## Step 3: Admin Access Setup

### 3.1 Set Admin Password

1. Go to your backend service in Render dashboard
2. Navigate to "Environment" tab
3. Add environment variable:
   - Key: `ADMIN_PASSWORD`
   - Value: Your secure password (e.g., `MySecurePassword123!`)

### 3.2 Access Admin Panel

1. Visit your deployed frontend
2. Click the admin button (bottom-right corner)
3. Enter your admin password
4. You'll now have access to create/edit content

## Step 4: Content Management

### 4.1 Adding Updates

Once logged in as admin, you can:

- Add new updates via API calls
- Use tools like Postman or curl
- Example API call:

```bash
curl -X POST https://your-backend-url.onrender.com/api/updates \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project Launch",
    "content": "Excited to announce our latest project...",
    "featured": true,
    "tags": ["project", "launch"]
  }'
```

### 4.2 Adding Links

```bash
curl -X POST https://your-backend-url.onrender.com/api/links \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Awesome Resource",
    "url": "https://example.com",
    "description": "A great resource for developers",
    "category": "development",
    "featured": true
  }'
```

## Step 5: Security Considerations

### 5.1 Admin Password

- Use a strong, unique password
- Consider changing it regularly
- Never commit it to your repository

### 5.2 JWT Secret

- Render auto-generates this
- Keep it secure
- Rotate if compromised

### 5.3 Database Access

- MongoDB connection is automatically secured
- No public access to database
- Backups are handled by Render

## Step 6: Monitoring & Maintenance

### 6.1 Health Checks

- Backend has `/api/health` endpoint
- Monitor in Render dashboard
- Set up alerts for downtime

### 6.2 Logs

- View logs in Render dashboard
- Monitor for errors
- Set up log aggregation if needed

### 6.3 Scaling

- Render auto-scales based on traffic
- Monitor usage in dashboard
- Upgrade plan if needed

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Render
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **Database Connection Issues**
   - Verify MONGODB_URI is set correctly
   - Check database service is running
   - Ensure network connectivity

3. **Admin Authentication Issues**
   - Verify ADMIN_PASSWORD is set
   - Check JWT_SECRET is generated
   - Clear browser localStorage if needed

4. **CORS Issues**
   - Verify FRONTEND_URL is set correctly
   - Check CORS configuration in backend
   - Ensure proper domain configuration

## Cost Estimation

**Render Pricing (as of 2024):**

- **Static Site**: Free tier available
- **Web Service**: $7/month (Free tier: 750 hours/month)
- **MongoDB**: $7/month (Free tier: 90 days)
- **Total**: ~$14/month (or free with limitations)

## Next Steps

1. **Custom Domain**: Set up your own domain
2. **SSL Certificate**: Automatically handled by Render
3. **CDN**: Consider adding Cloudflare for global performance
4. **Monitoring**: Set up external monitoring (UptimeRobot, etc.)
5. **Backup Strategy**: Configure database backups

## Support

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **Community**: [Render Community](https://community.render.com)
- **Status**: [status.render.com](https://status.render.com)
