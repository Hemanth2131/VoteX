"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CandidateCard } from "../components/CandidateCard"
import { Spinner } from "../components/Spinner"
import { useToast } from "../components/Toast"
import { useAuth } from "../context/AuthContext"
import api from "../api/api"

export const Home = () => {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [voting, setVoting] = useState(null)
  const { user, refreshUser } = useAuth()
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    try {
      setLoading(true)
      const response = await api.get("/candidates")
      console.log("[v0] Candidates loaded:", response.data)
      setCandidates(response.data)
    } catch (error) {
      console.error("[v0] Failed to load candidates:", error.message)
      showToast("Failed to load candidates. Make sure backend is running.", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (candidateId) => {
    try {
      setVoting(candidateId)
      await api.post("/candidates/vote", { candidateId })
      showToast("Vote cast successfully!", "success")
      await refreshUser()
      await fetchCandidates()
    } catch (error) {
      const message = error.response?.data?.message || "Failed to cast vote"
      console.error("[v0] Vote error:", message)
      showToast(message, "error")
    } finally {
      setVoting(null)
    }
  }

  const handleViewDetails = (candidateId) => {
    navigate(`/candidate/${candidateId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Candidates</h1>
        <p className="text-gray-600 mb-8">
          {user?.hasVoted ? "You have already voted." : "Select a candidate to vote."}
        </p>

        {candidates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No candidates available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate._id}
                candidate={candidate}
                onVote={handleVote}
                onViewDetails={handleViewDetails}
                isVoting={voting === candidate._id}
              />
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}
