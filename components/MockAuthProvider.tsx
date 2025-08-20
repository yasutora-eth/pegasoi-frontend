'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'publisher' | 'admin'
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  toggleAuth: () => void
  setRole: (role: 'user' | 'publisher' | 'admin') => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const toggleAuth = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false)
      setUser(null)
    } else {
      setIsAuthenticated(true)
      setUser({
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@pegasoi.com',
        role: 'user'
      })
    }
  }

  const setRole = (role: 'user' | 'publisher' | 'admin') => {
    if (user) {
      setUser({ ...user, role })
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, toggleAuth, setRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a MockAuthProvider')
  }
  return context
}
