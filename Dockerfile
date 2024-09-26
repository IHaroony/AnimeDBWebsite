# Use Node.js 14 from Alpine as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY ./Backend/package*.json ./

# Install the dependencies
RUN npm install

# Copy the remaining application files
COPY ./Backend .

# Expose the port that your app will use
EXPOSE 3000

# Run the app directly (only for starting the app, no dbsetup for now)
CMD ["npm", "start"]
