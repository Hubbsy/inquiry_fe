FROM node:17-buster-slim

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    net-tools \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY ./server /server
RUN cd /server && yarn install

EXPOSE 4051

WORKDIR /server

USER node