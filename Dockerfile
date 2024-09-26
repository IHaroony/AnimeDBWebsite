# Use the official Node.js image from DockerHub
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Backend folder contents into the /app directory in the container
COPY ./Backend .

# Install dependencies inside the container
RUN npm install

# Expose the port the app will run on
EXPOSE 3000

# Command to start the app and run dbsetup at runtime, ensuring the database is ready
CMD ["sh", "-c", "npm run dbsetup && npm start"]
