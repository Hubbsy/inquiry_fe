FROM node:17-buster-slim

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# # Copying all the tools and dependencies in the package.json file to the working directory `app`
COPY package.json .
# #Installing all the tools and dependencies in the container
# RUN yarn install

COPY ./server /server
RUN cd /server && yarn install

WORKDIR /server

USER node