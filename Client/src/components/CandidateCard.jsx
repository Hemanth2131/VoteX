"use client"

import { useAuth } from "../context/AuthContext"

export const CandidateCard = ({ candidate, onVote, onViewDetails, isVoting = false }) => {
  const { user } = useAuth()
  const hasVoted = user?.hasVoted

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{candidate.name}</h3>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Party:</span> {candidate.party}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Constituency:</span> {candidate.constituency}
      </p>

      <div className="bg-blue-50 rounded p-3 mb-4">
        <p className="text-center text-2xl font-bold text-primary">{candidate.votesReceived || 0}</p>
        <p className="text-center text-sm text-gray-600">Votes Received</p>
      </div>

      <div className="flex gap-2">
        {user?.role === "voter" && !hasVoted ? (
          <button
            onClick={() => onVote(candidate._id)}
            disabled={isVoting}
            className="flex-1 bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
          >
            {isVoting ? "Voting..." : "Vote"}
          </button>
        ) : user?.role === "voter" && hasVoted ? (
          <button
            disabled
            className="flex-1 bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded cursor-not-allowed"
          >
            Already Voted
          </button>
        ) : null}

        <button
          onClick={() => onViewDetails(candidate._id)}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition"
        >
          Details
        </button>
      </div>
    </div>
  )
}
