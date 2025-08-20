"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "publisher" | "admin"
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (role?: "user" | "publisher" | "admin") => void
  logout: () => void
  toggleAuth: () => void
  setRole: (role: "user" | "publisher" | "admin") => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function DevAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const login = (role: "user" | "publisher" | "admin" = "user") => {
    const mockUser: User = {
      id: "dev-user-123",
      name: "Development User",
      email: "dev@example.com",
      role: role,
    }
    setUser(mockUser)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const toggleAuth = () => {
    if (isAuthenticated) {
      logout()
    } else {
      login("user")
    }
  }

  const setRole = (role: "user" | "publisher" | "admin") => {
    if (user) {
      setUser({ ...user, role })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        toggleAuth,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within a DevAuthProvider")
  }
  return context
}
