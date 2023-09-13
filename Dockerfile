FROM node:17-buster-slim

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

COPY ./server /server
RUN cd /server && yarn install

WORKDIR /server

USER node