# Use an official nginx image to serve static content
FROM nginx:alpine

# Copy the static content to the nginx directory
COPY . /usr/share/nginx/html

# Expose the port that the nginx server is running on
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]