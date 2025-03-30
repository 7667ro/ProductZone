# ProductZone
ProductZone is a full-stack web application for managing products efficiently. Users can search, add, edit, and delete products seamlessly. It features Google Authentication and JWT-based security to protect user data.

# 🚀 Features

🔐 User Authentication (Signup, Login, JWT-based authentication Google OAuth)

📦 Product Listings (CRUD operations for products)

🏠 Frontend with Vite + React
# 🛠️ Tech Stack

Frontend: React.js, Vite

Backend: Node.js, Express.js, MongoDB

Database: MongoDB (Atlas)

Authentication: JWT (JSON Web Token), Google

# 📌 Installation & Setup

1️⃣ Clone the Repository
```bash
git clone https://github.com/7667ro/ProductZone.git
cd ProductZone
```

2️⃣ Setup Backend

➤ Navigate to the Backend Directory
```bash
cd Server
```
➤ Install Dependencies
```bash
npm install
```
➤ Create a .env file in the Server directory

Add the following environment variables:
```bash
MONGO=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
PORT=3010
```
➤ Start Backend Server
```bash
npm run dev
```
3️⃣ Setup Frontend

➤ Navigate to the Frontend Directory
```bash
cd ../client
```

➤ Install Dependencies
```bash
npm install
```
➤ Create a .env file in the client directory
```bash
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```
Configure Firebase in Client
➤ Create a firebaseConfig.js file in client/src:
```bash
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export default app;
```
# 🐝 Firebase Setup

Go to Firebase Console

Create a new project

Navigate to Project Settings > General

Add a new Web App and copy the Firebase Config

Enable Authentication (Google, Email/Password, etc.)

Enable Firestore Database if needed

➤ Start Frontend Server
```bash
npm run dev
```

