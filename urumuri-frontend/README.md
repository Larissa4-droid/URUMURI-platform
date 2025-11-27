# 🕯️ URUMURI PLATFORM
### Empowering Student Voices in Education

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Urumuri** is a digital platform designed to bridge the gap between students and school administrators. It provides a safe, anonymous space for students to report issues, share concerns, and view real-time insights into student welfare through an interactive dashboard.

---

##  Quick Links

| Resource | Link |
| :--- | :--- |
| ** Deployed Site** | [Click here to view the live app] https://urumuriplatform.netlify.app/
| ** SRS Document** | https://docs.google.com/document/d/13GC8qFMNB1f9pr61Bg3A5s_t1mkpxca3H6T_RdCfuQo/edit?usp=sharing

| ** Demo Video** | [Watch the Walkthrough] https://www.youtube.com/watch?v=eAyig5HG2Tw

---

##  Project Structure

The project is organized into two main components:

* **`root/` (Frontend):** Contains the static HTML, CSS, and Vanilla JavaScript files for the user interface.
* **`backend/` (Server):** Contains the Node.js API, authentication logic, and the SQLite database (`urumuri.db`).

---

## 🛠️ Local Setup Instructions

Follow these steps to get the project running locally on your machine.

### 1. Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or higher)
* [Git](https://git-scm.com/)
* **VS Code** (Recommended) with the "Live Server" extension.

### 2. Clone the Repository
Open your terminal and run:

```bash
git clone [https://github.com/larissa4-droid/urumuri-platform.git](https://github.com/larissa4-droid/urumuri-platform.git)
cd urumuri-platform

3. Backend Setup (Server)
The backend must be running for the application to function.

a.Navigate to the backend folder:
cd backend

b.Install dependencies:
npm install

c.Start the server:
npm start
Success: You should see ✅ SERVER STARTED on Port 5005 in your terminal. Keep this terminal open.

4. Frontend Setup (Client)
By default, the frontend connects to the live deployed server. For local testing, you must point it to your local backend.

Configure API URL: Open the following files in your code editor:

JS/auth.js

JS/main.js

JS/dashboard.js

profile.html (Script section at the bottom)

Locate the API_URL or API_BASE variable at the top and change it from the Render URL to localhost:

// Change this:
// const API_URL = "[https://urumuri-platform.onrender.com/api](https://urumuri-platform.onrender.com/api)";

// To this:
const API_URL = "http://localhost:5005/api";
Run the App:

Right-click on index.html or login.html in VS Code.

Select "Open with Live Server".

🧪 Key Features
Authentication: Secure Login and Registration using JWT (JSON Web Tokens).

Anonymous Reporting: Students can post issues with an "Anonymous" tag to protect their identity.

Multimedia Support: Users can upload images or videos as evidence for their reports.

Interactive Feed: Like, comment, and reply to posts in real-time.

Live Dashboard: A visual analytics dashboard (using Chart.js) showing trending issues (e.g., #Hygiene, #REB).

API Endpoints
The backend provides the following RESTful endpoints:

Method,Endpoint,Description,Auth Required
POST,/api/auth/register,Register a new user,❌
POST,/api/auth/login,Login and receive Token,❌
GET,/api/posts,Fetch all posts,❌
POST,/api/posts,Create a new post,✅
POST,/api/posts/:id/like,Like a post,✅
GET,/api/comments/:id,Get comments for a post,❌