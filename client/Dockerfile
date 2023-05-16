# Use an official Node.js runtime as the base image
FROM node:16-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm i

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use an Nginx image to serve the built frontend
FROM nginx:stable

# Copy the built files to the Nginx container
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port Nginx is running on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
