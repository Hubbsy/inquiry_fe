# Use the official Node.js base image
FROM node:17-buster-slim

# Set up the working directory
WORKDIR /server

# Copy the server files to the container
COPY ./server /server

# Change the default shell to bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install dependencies
RUN yarn install

# Expose the port your server listens on
EXPOSE 4051

# Set the user to run the server
USER node

# Start the server
CMD ["yarn", "start"]

# FROM node:17-buster-slim

# RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# COPY ./server /server
# RUN cd /server && yarn install

# WORKDIR /server

# USER node