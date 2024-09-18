# Use an official nginx image to serve static content
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy all the files in your current directory (HTML/CSS) to the container
COPY . .

# Expose port 80 to serve the site
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]