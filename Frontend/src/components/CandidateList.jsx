import React, { useEffect, useState } from 'react'
import API from '../api'
import CandidateCard from './CandidateCard'

export default function CandidateList(){
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchCandidates(){
    setLoading(true)
    try{
      const res = await API.get('/candidates')
      setCandidates(res.data)
    }catch(err){
      setError('Failed to load candidates')
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ fetchCandidates() },[])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {candidates.map(c => (
        <CandidateCard key={c._id || c.id} candidate={c} onVoted={fetchCandidates} />
      ))}
    </div>
  )
}
