FROM node:17-buster-slim

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Creating the working directory named `client`
WORKDIR /app

#Copying all the application source code and files to the working directory `app`
COPY . .

WORKDIR /server

COPY ./server /server
RUN cd /server && yarn install

EXPOSE 4051

USER node
#Command to start the Docker container for the frontend React.js application
# CMD ["yarn", "start"]