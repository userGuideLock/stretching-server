# Node.js를 위한 기본 이미지를 설정합니다.
FROM node:20.14.0

# 작업 디렉토리를 생성하고 설정합니다.
WORKDIR /app

# package.json과 package-lock.json 파일을 먼저 복사합니다.
COPY package*.json ./

# 의존성을 설치합니다.
RUN npm install

# 현재 Dockerfile 있는 경로의 모든 파일을 /app 에 복사
COPY . .

# 애플리케이션이 3000번 포트를 사용할 것이라고 명시합니다.
EXPOSE 3000

# 애플리케이션 시작 명령어를 설정합니다.
CMD ["npm", "run", "dev"]
