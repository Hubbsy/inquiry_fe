FROM node:17-buster-slim

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR /server

COPY ./server /server
RUN yarn install

EXPOSE 4051

USER node