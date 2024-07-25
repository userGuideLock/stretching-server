#!/bin/bash
docker pull myapp:latest
docker stop myapp || true
docker rm myapp || true
docker run -d --name myapp -p 80:80 myapp:latest
