FROM node:20-bookworm-slim

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install tini
RUN apt-get update && apt-get install -y tini

COPY ./server /server

WORKDIR /server

RUN yarn install

USER node

# Use tini as the entrypoint
ENTRYPOINT ["/usr/bin/tini", "--"]