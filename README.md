# URUMURI Platform

A lightweight social platform built with Node.js, Express, SQLite, HTML, CSS, and Vanilla JavaScript. It supports user authentication, creating posts with media, reactions (likes), comments, and sharing.

This README provides step‑by‑step instructions for setting up the backend and frontend locally.



## Features

* User Registration & Login (JWT Auth)
* Create text/image/video posts
* Like (React) to posts
* Comment on posts
* Share posts
* Fully working backend API (Node.js + SQLite)
* Clean UI with interactive frontend


# 1. Prerequisites

Before starting, install:

* Node.js (v16 or higher) → [https://nodejs.org](https://nodejs.org)
* SQLite Community Server → [https://dev.SQLite.com/downloads/](https://dev.SQLite.com/downloads/)
* Git → [https://git-scm.com/](https://git-scm.com/)
* A code editor (VSCode recommended)


# 📥 2. Clone the Repository

```bash
git clone https://github.com/larissa4-droid/URUMURI-platform.git
```

```bash
cd URUMURI-platform
```


# 3. Backend Setup (Node.js + SQLite)

## Step 3.1 — Install Dependencies

```bash
cd backend
npm install
```

## Step 3.2 — Create a SQLite Database

Open SQLite shell and run:

```sql
CREATE DATABASE urumuri;
```

## Step 3.3 — Configure Environment Variables

In the backend folder, create a file named:

```
.env
```

Add the following:

```env
PORT=5005
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= YOUR_PASSWORD
DB_NAME=urumuri
JWT_SECRET=your_jwt_secret
```



## Step 3.4 — Run Database Migrations 

If the project contains SQL files or Sequelize/Prisma:

```bash
npm run migrate
```

If not, the backend creates required tables automatically on startup.

## Step 3.5 — Start the Backend Server

```bash
npm start
```

Your API will now run at:

```
http://localhost:5005/api
```

# 4. Frontend Setup

Your real frontend lives inside the `urumuri-frontend/` folder.

## Step 4.1 — Navigate to the Frontend Folder

```bash
cd ../urumuri-frontend
```

This folder contains:

```
urumuri-frontend/
│── index.html
│── login.html
│── register.html
│── profile.html
│── dashboard.html
│── JS/
│     ├── auth.js
│     ├── data.js
│     ├── main.js
│── CSS/
│     └── style.css
```

## Step 4.2 — Update API Base URL

Inside every JS file that sends requests to the backend, update the API base:

```
urumuri-frontend/JS/auth.js
urumuri-frontend/JS/data.js
urumuri-frontend/JS/main.js
```

Set:

```javascript
const apiBase = "http://localhost:5001/api";
```

## Step 4.3 — Start the Frontend

You can run it in two ways:

## Option A — Open index.html directly

Just double‑click:

```
index.html
```

This works for quick testing.

## Option B — Recommended: Use VSCode Live Server

1. Open the folder `urumuri-frontend` in VSCode.
2. Install the extension Live Server.
3. Right‑click `index.html` → Open with Live Server.

This gives you auto‑refresh and avoids file‑path issues.

---

# 5. Authentication Flow

1. User registers → details stored in SQLite
2. User logs in → backend returns a JWT token
3. Token is saved in `localStorage`:

```js
localStorage.setItem("urumuri_token", token)
```

4. All protected routes require:

```
Authorization: Bearer <token>
```


# 6. Testing the API (Optional)

You can test endpoints using Postman or ThunderClient.

Examples:

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/posts`
* `POST /api/posts/create`
* `POST /api/posts/:id/comment`


# Project Structure

```
URUMURI-platform
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── uploads
│   ├── server.js
│   └── package.json
│
urumuri-frontend/
│── index.html
│── login.html
│── register.html
│── profile.html
│── dashboard.html
│── JS/
│     ├── auth.js
│     ├── data.js
│     ├── main.js
│── CSS/
│     └── style.css
│
└── README.md
```


# 7. Common Errors & Fixes

### Error: Cannot connect to SQLite

✔ Ensure SQLite is running
✔ Check `.env` credentials
✔ Try: `SQLite -u root -p`

### CORS Error

Add in backend:

```js
const cors = require('cors');
app.use(cors());
```

### Token undefined

Means login failed — check credentials.


# 8. Deployment (Optional)

* Use Railway, Render, or Vercel for backend
* Serve the frontend via Netlify, Vercel, or Nginx server
* Update API URL in JS files accordingly


#  9. Contribution Guidelines

1. Fork the repo
2. Create a new branch
3. Submit a pull request

# 10. License

MIT License — free to use and modify.


Your URUMURI platform is now ready to run locally.

