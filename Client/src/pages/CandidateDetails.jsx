"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Spinner } from "../components/Spinner"
import { useToast } from "../components/Toast"
import api from "../api/api"

export const CandidateDetails = () => {
  const { id } = useParams()
  const [candidate, setCandidate] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()

  useEffect(() => {
    fetchCandidateDetails()
  }, [id])

  const fetchCandidateDetails = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/candidates/${id}`)
      setCandidate(response.data)
    } catch (error) {
      showToast("Failed to load candidate details", "error")
      console.error(error)
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Candidate not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button onClick={() => navigate("/")} className="mb-6 text-primary hover:text-secondary font-semibold">
          ← Back to Candidates
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{candidate.name}</h1>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-gray-600 text-sm">Party</p>
              <p className="text-gray-800 font-semibold text-lg">{candidate.party}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Constituency</p>
              <p className="text-gray-800 font-semibold text-lg">{candidate.constituency}</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <p className="text-gray-600 text-sm mb-2">Total Votes Received</p>
            <p className="text-5xl font-bold text-primary">{candidate.votesReceived || 0}</p>
          </div>

          {candidate.votes && candidate.votes.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Voters</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {candidate.votes.map((vote, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded border border-gray-200">
                    <p className="text-gray-800 font-semibold">{vote.voterName || "Anonymous"}</p>
                    <p className="text-gray-600 text-sm">{new Date(vote.votedAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
