import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  function handleLogout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-xl">VoteX</Link>
        <nav>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">{user.name}</span>
              {user.role === 'admin' && (
                <Link to="/admin/add" className="text-sm">Add Candidate</Link>
              )}
              <button className="text-sm text-red-600" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/register" className="text-sm">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
