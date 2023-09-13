FROM node:17-buster-slim

# Create and set the working directory
# WORKDIR ./

# Copy package.json and package-lock.json to the working directory
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install client and server dependencies
RUN cd client && yarn install
RUN cd server && yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN cd client && yarn build

# Expose the port your Express server will run on
EXPOSE 4051

# Start the Express server when the container starts
CMD ["node", "server/index.js"]