# Use the official Node.js image from DockerHub
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Backend folder contents into the /app directory in the container
COPY ./Backend .

# Copy wait-for-it script to the container
COPY ./scripts/wait-for-it.sh /usr/bin/wait-for-it.sh
RUN chmod +x /usr/bin/wait-for-it.sh

# Install dependencies inside the container
RUN npm install

# Expose the port the app will run on
EXPOSE 3000

# Command to start the app and run dbsetup only after MySQL is ready
CMD ["sh", "-c", "/usr/bin/wait-for-it.sh ${MYSQLHOST}:${MYSQLPORT} --timeout=30 --strict -- npm run dbsetup && npm start"]
