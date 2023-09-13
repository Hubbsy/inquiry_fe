# Use the official Node.js image as the base image
FROM node:lts-slim

# Create the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the app directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the app directory
COPY . .

# Expose the port on which the application will run
EXPOSE 4051

# Start the application
CMD [ "npm", "start" ]