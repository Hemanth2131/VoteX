"use client"

import React, { createContext, useState, useEffect, useCallback } from "react"
import api from "../api/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const response = await api.get("/users/profile")
          setUser(response.data)
          console.log("[v0] User profile loaded:", response.data)
        } catch (error) {
          console.error("[v0] Failed to fetch profile:", error.message)
          localStorage.removeItem("token")
          setToken(null)
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [token])

  const login = useCallback((newToken) => {
    console.log("[v0] User logged in with token")
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }, [])

  const logout = useCallback(() => {
    console.log("[v0] User logged out")
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get("/users/profile")
      setUser(response.data)
      console.log("[v0] User refreshed:", response.data)
      return response.data
    } catch (error) {
      console.error("[v0] Failed to refresh user:", error.message)
      throw error
    }
  }, [])

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
