# Build stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY client/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY client/ .

# Build the Angular application
EXPOSE 4200

# Start the application
CMD ["npm", "run", "start:docker"]