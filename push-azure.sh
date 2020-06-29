#!/bin/bash

docker build -t idle-trading-hero-frontend-azure -f Dockerfile-azure .
docker tag idle-trading-hero-frontend-azure idletradinghero.azurecr.io/idle-trading-hero-frontend-azure
docker push idletradinghero.azurecr.io/idle-trading-hero-frontend-azure