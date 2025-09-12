import Candidate from "../models/candidate.js";
import User from "../models/user.js";

// ==========================
// Add Candidate (Admin only)
// ==========================
export const addCandidate = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can add candidates" });
    }

    const { name, party, constituency } = req.body;

    const candidate = new Candidate({ name, party, constituency });
    await candidate.save();

    res.status(201).json({ message: "Candidate added successfully", candidate });
  } catch (error) {
    res.status(500).json({ message: "Error adding candidate", error: error.message });
  }
};

// ==========================
// Get All Candidates
// ==========================
export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().populate("votes.user", "name email");
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching candidates", error: error.message });
  }
};

// ==========================
// Get Candidate By ID
// ==========================
export const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id).populate("votes.user", "name email");
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: "Error fetching candidate", error: error.message });
  }
};

// ==========================
// Vote for Candidate (Voter only)
// ==========================
export const voteCandidate = async (req, res) => {
  try {
    const { candidateId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "voter") {
      return res.status(403).json({ message: "Only voters can vote" });
    }

    if (user.hasVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    // update candidate votes
    candidate.votesReceived += 1;
    candidate.votes.push({ user: user._id });
    await candidate.save();

    // update user
    user.hasVoted = true;
    await user.save();

    res.status(200).json({ message: "Vote cast successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error while voting", error: error.message });
  }
};
