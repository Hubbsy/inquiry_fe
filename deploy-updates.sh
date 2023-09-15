#!/bin/bash

# Define the branch to pull
BRANCH="jwh-github-actions"

# Change to the root directory of the current git repository
cd "$(git rev-parse --show-toplevel)"

# Pull the latest changes from the specified branch
git pull origin "$BRANCH"

sudo docker stack deploy --compose-file docker-compose-swarm.yml inquiry_fe
