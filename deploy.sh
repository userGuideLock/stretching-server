#!/bin/bash

set -e

# Docker Compose 파일의 위치
DOCKER_COMPOSE_FILE="/home/hermi/deploy/docker-compose.yml"

# Docker 로그인 정보
DOCKER_USERNAME="${DOCKER_USERNAME}"
DOCKER_PASSWORD="${DOCKER_PASSWORD}"

# Docker Hub 로그인
echo "Logging in to Docker Hub..."
echo "$DOCKER_PASSWORD" | docker login --username "$DOCKER_USERNAME" --password-stdin

# 새로운 이미지 가져오기
echo "Pulling the latest Docker image..."
docker pull gayun5313/stretching:latest

# 기존 컨테이너 중지 및 삭제
echo "Stopping and removing existing containers..."
docker-compose -f "$DOCKER_COMPOSE_FILE" down || true

# 새로운 컨테이너 시작
echo "Starting new Docker containers..."
docker-compose -f "$DOCKER_COMPOSE_FILE" up -d

# Wait for MariaDB to be ready
echo "Waiting for MariaDB to be ready..."
until docker exec -it $(docker-compose ps -q mariadb) mysqladmin ping --silent; do
  echo "Waiting for MariaDB..."
  sleep 5
done

echo "MariaDB is ready. Deployment completed successfully."
