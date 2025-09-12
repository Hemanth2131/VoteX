import express from "express";
import { signup, login, getProfile, changePassword } from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/profile", authMiddleware, getProfile);
router.put("/change-password", authMiddleware, changePassword);

export default router;
