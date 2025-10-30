import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";


dotenv.config(); // must be at the very top

const app = express();
app.use(cors());
app.use(express.json()); // ✅ added middleware


app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error(" MongoDB URI is missing! Check your .env file.");
  process.exit(1); 
}

mongoose.connect(MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
