import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String, required: true },
  constituency: { type: String, required: true },
  votesReceived: { type: Number, default: 0 },
  votes: [
    { 
       user:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
       votedAt: { type: Date, default: Date.now }
    }

  ]
});

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
