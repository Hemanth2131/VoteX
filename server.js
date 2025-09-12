import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
dotenv.config(); // must be at the very top



const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error(" MongoDB URI is missing! Check your .env file.");
  process.exit(1); // stop server if URI is missing
}

mongoose.connect(MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
