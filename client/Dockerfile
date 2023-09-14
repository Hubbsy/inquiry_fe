# It uses node:18-alpine as the base image for the frontend React.js application
FROM node:17-buster-slim
# Creating the working directory named `app`
WORKDIR /app
# Copying all the tools and dependencies in the package.json file to the working directory `app`
COPY package.json .
COPY yarn.lock .
#Installing all the tools and dependencies in the container
RUN yarn install
#Copying all the application source code and files to the working directory `app`
COPY . .
#Exposing the container to run on this port 3000
EXPOSE 4051
#Command to start the Docker container for the frontend React.js application
CMD ["yarn", "start"]