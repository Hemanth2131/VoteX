import express from "express";
import { addCandidate, getAllCandidates, getCandidateById, voteCandidate } from "../controller/candidateController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Candidate routes
router.post("/add", authMiddleware, addCandidate);         // admin only
router.get("/", getAllCandidates);                         // anyone can view
router.get("/:id", getCandidateById);                      // anyone can view
router.post("/vote", authMiddleware, voteCandidate);       // voters only

export default router;
