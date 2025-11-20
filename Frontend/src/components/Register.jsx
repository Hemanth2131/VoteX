import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    try{
      const res = await API.post('/users/register', { name, email, password })
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/')
    }catch(err){
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Name</label>
          <input className="w-full border p-2 rounded" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input className="w-full border p-2 rounded" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" className="w-full border p-2 rounded" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
        </div>
      </form>
    </div>
  )
}
