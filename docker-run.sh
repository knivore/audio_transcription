#!/bin/bash

# Stop and remove existing containers
docker compose down

# Build Project MATA containers
docker compose build

# Start Project MATA containers
docker compose up -d
