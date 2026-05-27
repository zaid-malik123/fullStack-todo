#!/bin/bash

set -e

cd /home/ubuntu/fullStack-todo

git pull origin main

echo "Backend"

cd backend
npm install

pm2 restart todo-backend

echo "Frontend"

cd ../frontend
npm install
npm run build

sudo rm -rf /var/www/todo/*
sudo cp -r dist/* /var/www/todo/

echo "Deployment completed"