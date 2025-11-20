import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import CandidateList from './components/CandidateList'
import AdminAddCandidate from './components/AdminAddCandidate'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<CandidateList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/add" element={<AdminAddCandidate />} />
        </Routes>
      </main>
    </div>
  )
}
