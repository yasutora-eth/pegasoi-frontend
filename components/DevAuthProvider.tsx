"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, UserRole } from "@/types/graphql"

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (role?: UserRole) => void
  logout: () => void
  toggleAuth: () => void
  setRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for different roles
const mockUsers: Record<UserRole, User> = {
  user: {
    id: "dev-user-001",
    name: "Research User",
    email: "user@research.dev",
    role: "user",
  },
  publisher: {
    id: "dev-publisher-001", 
    name: "Academic Publisher",
    email: "publisher@research.dev",
    role: "publisher",
  },
  admin: {
    id: "dev-admin-001",
    name: "System Administrator", 
    email: "admin@research.dev",
    role: "admin",
  },
}

export function DevAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // Persist auth state in localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('dev-auth-state')
    if (savedAuth) {
      try {
        const { isAuthenticated: savedIsAuth, user: savedUser } = JSON.parse(savedAuth)
        if (savedIsAuth !== isAuthenticated || JSON.stringify(savedUser) !== JSON.stringify(user)) {
          setIsAuthenticated(savedIsAuth)
          setUser(savedUser)
        }
      } catch (error) {
        console.warn('Failed to restore auth state:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('dev-auth-state', JSON.stringify({ isAuthenticated, user }))
  }, [isAuthenticated, user])

  const login = (role: UserRole = 'admin') => {
    const selectedUser = mockUsers[role]
    setUser(selectedUser)
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
      login(user?.role || 'admin')
    }
  }

  const setRole = (role: UserRole) => {
    if (user) {
      const newUser = { ...mockUsers[role], id: user.id }
      setUser(newUser)
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

// Mock Clerk components for development
export function SignInButton({ children }: { children?: ReactNode }) {
  const { login } = useAuth()
  return <div onClick={() => login()} style={{ cursor: 'pointer' }}>{children || "Sign In"}</div>
}

export function UserButton() {
  const { logout } = useAuth()
  return <button onClick={logout}>👤</button>
}

export function useUser() {
  const { user, isAuthenticated } = useAuth()
  return {
    user: isAuthenticated ? user : null,
    isLoaded: true,
    isSignedIn: isAuthenticated
  }
}