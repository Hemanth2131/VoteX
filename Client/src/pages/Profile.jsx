"use client"

import { useState } from "react"
import { Spinner } from "../components/Spinner"
import { useToast } from "../components/Toast"
import { useAuth } from "../context/AuthContext"
import api from "../api/api"

export const Profile = () => {
  const { user, refreshUser } = useAuth()
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { showToast, ToastContainer } = useToast()

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" })
      return
    }

    try {
      setLoading(true)
      await api.put("/users/change-password", {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      })
      showToast("Password changed successfully!", "success")
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" })
    } catch (error) {
      const errorData = error.response?.data
      if (errorData?.errors) {
        setErrors(errorData.errors)
      } else {
        showToast(errorData?.message || "Failed to change password", "error")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>

          <div className="mb-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Name</p>
                <p className="text-gray-800 font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-gray-800 font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Role</p>
                <p className="text-gray-800 font-semibold capitalize">{user.role}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Age</p>
                <p className="text-gray-800 font-semibold">{user.age}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Mobile</p>
                <p className="text-gray-800 font-semibold">{user.mobile}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Voting Status</p>
                <p className={`font-semibold ${user.hasVoted ? "text-success" : "text-warning"}`}>
                  {user.hasVoted ? "Voted" : "Not Voted"}
                </p>
              </div>
            </div>
          </div>

          <hr className="my-8" />

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
              {errors.oldPassword && <p className="text-error text-sm mt-1">{errors.oldPassword}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
              {errors.newPassword && <p className="text-error text-sm mt-1">{errors.newPassword}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
              {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Spinner size="sm" /> : null}
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
