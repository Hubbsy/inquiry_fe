#!/bin/bash

# Define the branch to pull
BRANCH="main"

# Change to the root directory of the current git repository
cd "$(git rev-parse --show-toplevel)"

# Pull the latest changes from the specified branch
git pull origin "$BRANCH"