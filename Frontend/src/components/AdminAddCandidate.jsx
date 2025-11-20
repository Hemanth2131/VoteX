import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

export default function AdminAddCandidate(){
  const [name, setName] = useState('')
  const [party, setParty] = useState('')
  const [constituency, setConstituency] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    try{
      await API.post('/candidates/add', { name, party, constituency })
      navigate('/')
    }catch(err){
      setError(err.response?.data?.message || 'Failed to add candidate')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Candidate</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Name</label>
          <input className="w-full border p-2 rounded" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Party</label>
          <input className="w-full border p-2 rounded" value={party} onChange={e=>setParty(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Constituency</label>
          <input className="w-full border p-2 rounded" value={constituency} onChange={e=>setConstituency(e.target.value)} />
        </div>
        <div>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Add Candidate</button>
        </div>
      </form>
    </div>
  )
}
