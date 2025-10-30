"use client"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const Navbar = () => {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Voting App
        </Link>

        <div className="flex gap-6 items-center">
          {token ? (
            <>
              <Link to="/" className="hover:text-blue-200 transition">
                Home
              </Link>
              <Link to="/results" className="hover:text-blue-200 transition">
                Results
              </Link>
              <Link to="/profile" className="hover:text-blue-200 transition">
                Profile
              </Link>

              {user?.role === "admin" && (
                <Link to="/add-candidate" className="hover:text-blue-200 transition">
                  Add Candidate
                </Link>
              )}

              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 transition">
                Login
              </Link>
              <Link to="/signup" className="hover:text-blue-200 transition">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
