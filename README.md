# Fullstack Todo App (Docker Practice)

This is a **fullstack Todo application** built with **React (frontend)**, **Node.js + Express (backend)**, and **MongoDB**.  
The main purpose of this project is to **practice Docker** by containerizing both frontend and backend and running them in a network.

---

## 🛠 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios  
- **Backend:** Node.js, Express, Mongoose, dotenv  
- **Database:** MongoDB Atlas  
- **Containerization:** Docker  

---

## 📂 Project Structure

fullstack-todo/
├─ backend/
│ ├─ Dockerfile
│ ├─ .dockerignore
│ ├─ app.js
│ ├─ model.js
│ └─ package.json
├─ frontend/
│ ├─ Dockerfile
│ ├─ .dockerignore
│ ├─ App.jsx
│ └─ package.json
└─ README.md


---

## 🚀 Features

- Add, update, toggle complete, and delete todos  
- Full CRUD operations via REST API  
- Backend is CORS-enabled for Docker containers  
- Frontend dynamically fetches backend URL via environment variable (`VITE_API_URL`)  
- Run entirely using Docker containers, without local code  

---

## 🐳 Docker Setup

### 1️⃣ Build Images

**Backend:**

```bash
docker build -t backend-todo ./backend


Frontend:

docker build -t frontend-todo ./frontend

2️⃣ Create Docker Network
docker network create todo-network

3️⃣ Run Containers

Backend:

docker run -d --name backend --network todo-network -p 3000:3000 -e PORT=3000 -e MONGO_URI="YOUR_MONGO_URI" backend-todo


Frontend:

docker run -d --name frontend --network todo-network -p 80:80 -e VITE_API_URL=http://backend:3000 frontend-todo


Replace YOUR_MONGO_URI with your MongoDB Atlas connection string.

4️⃣ Access Application

Frontend (UI): http://localhost

Backend API: http://localhost:3000/api/todo

✅ Notes

Make sure frontend uses environment variable for backend URL (baseUrl = import.meta.env.VITE_API_URL + "/api/todo")

Backend must allow CORS from frontend container origin

After Docker setup, you can safely delete local code and still run the app

💡 Learnings

Building separate frontend and backend Docker images

Setting up Docker network for container communication

Using environment variables for containerized apps

Fixing CORS issues in a Dockerized setup

Managing multi-container fullstack apps