# It uses node:18-alpine as the base image for the Node.js application
FROM node:17-buster-slim
# It installs the nodemon package globally for monitoring and watching the backend Express server
RUN yarn install -g nodemon
# Creating the working directory named `app`
WORKDIR /server
# Copying all the tools and dependencies in the package.json file to the working directory `app`
COPY package.json .
#Installing all the tools and dependencies in the container
RUN yarn install
#Copying all the application source code and files to the working directory `app`
COPY . .
#Exposing the container to run on this port 4005
EXPOSE 4005

USER node
#Command to start the Docker container for the backed server application
CMD ["node", "index.js"]