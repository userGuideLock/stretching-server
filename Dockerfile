# Node.js를 위한 기본 이미지를 설정합니다.
FROM node:20.14.0

# 작업 디렉토리를 생성하고 설정합니다.
WORKDIR /app

# package.json과 package-lock.json 파일을 먼저 복사합니다.
COPY package*.json ./

# 의존성을 설치합니다.
RUN npm install

# 현재 경로의 모든 파일을 /app에 복사합니다.
COPY . .

# MariaDB 설치 및 설정
RUN apt-get update && \
    apt-get install -y mariadb-server && \
    service mysql start && \
    mysql -e "UPDATE mysql.user SET Password = PASSWORD('stretching') WHERE User = 'root';" && \
    mysql -e "FLUSH PRIVILEGES;" && \
    mysql -e "CREATE DATABASE stretching;" && \
    service mysql stop

# MariaDB와 Node.js 애플리케이션의 포트 노출
EXPOSE 3000 3307

# 애플리케이션 및 MariaDB 시작 명령어를 설정합니다.
CMD service mysql start && npm run dev
