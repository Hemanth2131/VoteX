import React, { useState } from 'react'
import API from '../api'

export default function CandidateCard({candidate, onVoted}){
  const [loading, setLoading] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  async function handleVote(){
    if (!user) return alert('Please login to vote')
    setLoading(true)
    try{
      await API.post('/candidates/vote', { candidateId: candidate._id || candidate.id })
      alert('Vote cast successfully')
      if (onVoted) onVoted()
    }catch(err){
      alert(err.response?.data?.message || 'Voting failed')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{candidate.name}</h3>
      <p className="text-sm text-gray-600">{candidate.party || ''}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-gray-700">Votes: {candidate.votesReceived ?? candidate.votes ?? 0}</span>
        <div>
          <button
            className="ml-2 bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
            onClick={handleVote}
            disabled={loading}
          >
            {loading ? 'Voting...' : 'Vote'}
          </button>
        </div>
      </div>
    </div>
  )
}
