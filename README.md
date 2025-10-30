🗳️ VoteX – AI-Powered Online Voting Platform

📖 Description

VoteX is a secure and user-friendly voting application built using Node.js (Express) for the backend and React + Tailwind CSS for the frontend.
It allows users to:

Register & log in securely 🔐

Vote for candidates 🗳️

View real-time election results 📊

⚙️ Tech Stack

Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Auth: JWT-based authentication

🚀 Features

✅ Secure JWT authentication
✅ Role-based access (Admin, Voter)
✅ Real-time vote counting & results
✅ Interactive charts using Recharts
✅ Responsive UI built with Tailwind CSS

🧩 Folder Structure
VoteX/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
│   └── package.json
│
└── README.md

🧠 Setup Guide
1️⃣ Clone the Repository
git clone https://github.com/Hemanth2131/VoteX.git
cd VoteX

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Make sure to create a .env file in /backend with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

3️⃣ Frontend Setup
cd frontend
npm install
npm start
