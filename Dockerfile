# Use the official Node.js image from DockerHub
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Backend folder contents into the /app directory in the container
COPY ./Backend .

# Install dependencies inside the container
RUN npm install

# Run the database setup command (adjust as needed for your setup)
RUN npm run dbsetup

# Expose the port the app will run on (adjust this if your app uses a different port)
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
