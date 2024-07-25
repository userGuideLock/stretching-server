#!/bin/bash

# Docker 이미지 이름과 태그 설정
IMAGE_NAME="gayun5313/stretching:latest"

# Docker Hub에 로그인 (비상호작용 모드)
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# 로그인 오류 확인
if [ $? -ne 0 ]; then
    echo "Error: Docker Hub login failed."
    exit 1
fi

# 새로운 이미지 가져오기
docker pull $IMAGE_NAME

# 이미지 풀링 오류 확인
if [ $? -ne 0 ]; then
    echo "Error: Failed to pull image $IMAGE_NAME."
    exit 1
fi

# 기존 컨테이너 중지 및 삭제
docker stop stretching-container || true
docker rm stretching-container || true

# 새로운 이미지로 컨테이너 실행
docker run -d --name stretching-container -p 3005:3005 $IMAGE_NAME

# 컨테이너 실행 오류 확인
if [ $? -ne 0 ]; then
    echo "Error: Failed to start container stretching-container."
    exit 1
fi

echo "Deployment completed successfully."
