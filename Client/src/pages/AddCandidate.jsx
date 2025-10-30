"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Spinner } from "../components/Spinner"
import { useToast } from "../components/Toast"
import api from "../api/api"

export const AddCandidate = () => {
  const [formData, setFormData] = useState({
    name: "",
    party: "",
    constituency: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    try {
      setLoading(true)
      await api.post("/candidates/add", formData)
      showToast("Candidate added successfully!", "success")
      navigate("/")
    } catch (error) {
      const errorData = error.response?.data
      if (errorData?.errors) {
        setErrors(errorData.errors)
      } else {
        showToast(errorData?.message || "Failed to add candidate", "error")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add Candidate</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              required
            />
            {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Party</label>
            <input
              type="text"
              name="party"
              value={formData.party}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              required
            />
            {errors.party && <p className="text-error text-sm mt-1">{errors.party}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Constituency</label>
            <input
              type="text"
              name="constituency"
              value={formData.constituency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              required
            />
            {errors.constituency && <p className="text-error text-sm mt-1">{errors.constituency}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Spinner size="sm" /> : null}
            {loading ? "Adding..." : "Add Candidate"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}
