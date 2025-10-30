import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addCandidate, getAllCandidates, getCandidateById, voteCandidate,getResults } from "../controller/candidateController.js";


const router = express.Router();

// Candidate routes
router.post("/add", authMiddleware, addCandidate);
router.get("/",  getAllCandidates);                         // anyone can view
router.get("/results",  getResults);                   // anyone can view
router.get("/:id",  getCandidateById);                      // anyone can view
router.post("/vote", authMiddleware, voteCandidate);       // voters only

export default router;
