FROM node:lts-bookworm-slim

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

COPY ./server /server

WORKDIR /server

RUN yarn install

USER node