#!/bin/bash

# Docker 이미지 이름과 태그 설정
IMAGE_NAME="gayun5313/stretching:latest"

# Docker Hub에 로그인
echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin

# 새로운 이미지 가져오기
docker pull $IMAGE_NAME

# 기존 컨테이너 중지 및 삭제
docker stop stretching-container || true
docker rm stretching-container || true

# 새로운 이미지로 컨테이너 실행
docker run -d --name stretching-container -p 3005:3005 $IMAGE_NAME
