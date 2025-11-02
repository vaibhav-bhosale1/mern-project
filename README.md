# 🖼️ MERN + OAuth Project: Image Search & Multi-Select

This is a **full-stack MERN application** (MongoDB, Express.js, React.js, Node.js) built as part of an internship task.  
It implements a **secure image search platform** powered by the **Unsplash API**, with **OAuth-based authentication** (Google, Facebook, GitHub).

---

## 🚀 Features

- **🔐 OAuth Authentication:**  
  Users must log in via **Google**, **Facebook**, or **GitHub** to access the app. Only authenticated users can perform searches or view their history.

- **🏆 Top Searches Banner:**  
  Displays the **top 5 most frequently searched terms** across all users.

- **🔍 Image Search (via Unsplash):**  
  Authenticated users can search for images. Each search term is stored in the database.

- **🖱️ Multi-Select Grid:**  
  Search results are displayed in a **4-column responsive grid**.  
  Users can click on images to select them, with a **live counter** showing the number of selected images.

- **🕓 Personal Search History:**  
  Each user has a **personalized search history**, showing past search terms and timestamps.

---

## 🛠️ Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | Passport.js (Google, Facebook, GitHub strategies) |
| **API** | Unsplash API |
| **Other Tools** | axios, cors, dotenv, express-session, helmet |

---

## 📁 Project Structure

mern-image-search/
├── client/ # React Frontend
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
├── server/ # Express Backend
│ ├── config/
│ ├── models/
│ ├── routes/
│ ├── .env # Must create manually
│ ├── package.json
│ └── server.js
│
└── README.md

yaml
Copy code

---

## ⚙️ Setup & Installation

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
2. Backend Setup (/server)
bash
Copy code
# Navigate to the server directory
cd server

# Install dependencies
npm install
Create a .env File
Create a new .env file in the /server directory and add the following:

bash
Copy code
# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# Express Session Secret
SESSION_SECRET=a_very_strong_secret_key_12345

# Unsplash API
UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
Run the Backend Server
bash
Copy code
# Start the server (runs on http://localhost:5000)
npm run dev
# or
node server.js
3. Frontend Setup (/client)
bash
Copy code
# Open a new terminal
cd client

# Install dependencies
npm install

# Run the React app
npm start
Your frontend should now be running on http://localhost:3000

📡 API Reference
🔑 Authentication Routes
Method	Endpoint	Description
GET	/auth/google	Initiates Google OAuth login
GET	/auth/google/callback	Callback for Google OAuth
GET	/auth/facebook	Initiates Facebook OAuth login
GET	/auth/facebook/callback	Callback for Facebook OAuth
GET	/auth/github	Initiates GitHub OAuth login
GET	/auth/github/callback	Callback for GitHub OAuth
GET	/auth/current_user	Fetches the currently logged-in user
GET	/auth/logout	Logs out the current user

📷 Application Routes
Method	Endpoint	Description
GET	/api/top-searches	Get the top 5 most searched terms across all users
GET	/api/history	Get the current user’s personal search history
POST	/api/search	Submit a new search ({ "term": "your_search_query" })

