import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addCandidate, getAllCandidates, getCandidateById, voteCandidate,getResults } from "../controller/candidateController.js";


const router = express.Router();


router.post("/add", authMiddleware, addCandidate);
router.get("/",  getAllCandidates);                        
router.get("/results",  getResults);                   
router.get("/:id",  getCandidateById);                     
router.post("/vote", authMiddleware, voteCandidate);      

export default router;
