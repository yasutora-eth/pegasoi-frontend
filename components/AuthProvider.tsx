'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  useUser,
  useAuth as useClerkAuth,
  SignInButton,
  SignOutButton,
  UserButton,
} from '@clerk/nextjs'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'publisher' | 'admin'
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
  toggleAuth: () => void
  setRole: (role: 'user' | 'publisher' | 'admin') => void
  // Clerk-specific components
  SignInButton: typeof SignInButton
  SignOutButton: typeof SignOutButton
  UserButton: typeof UserButton
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: clerkUser, isLoaded } = useUser()
  const { isSignedIn } = useClerkAuth()
  const [user, setUser] = useState<User | null>(null)

  // Convert Clerk user to our User interface
  useEffect(() => {
    if (isLoaded && clerkUser) {
      const userData: User = {
        id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.firstName || 'Unknown User',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        role:
          (clerkUser.unsafeMetadata?.role as 'user' | 'publisher' | 'admin') ||
          'user',
      }
      setUser(userData)
    } else if (isLoaded && !clerkUser) {
      setUser(null)
    }
  }, [clerkUser, isLoaded])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = (userData: User) => {
    // With Clerk, login is handled by Clerk components
    // This method is kept for backward compatibility
    console.warn(
      'Direct login is handled by Clerk. Use SignInButton component instead.'
    )
  }

  const logout = () => {
    // With Clerk, logout is handled by Clerk components
    // This method is kept for backward compatibility
    console.warn(
      'Direct logout is handled by Clerk. Use SignOutButton component instead.'
    )
  }

  const toggleAuth = () => {
    // With Clerk, authentication toggle is handled by Clerk components
    console.warn(
      'Authentication toggle is handled by Clerk components. Use SignInButton/SignOutButton instead.'
    )
  }

  const setRole = async (role: 'user' | 'publisher' | 'admin') => {
    if (clerkUser) {
      try {
        // Update user metadata in Clerk (using unsafeMetadata for development)
        await clerkUser.update({
          unsafeMetadata: {
            ...clerkUser.unsafeMetadata,
            role: role,
          },
        })

        // Update local user state
        if (user) {
          setUser({ ...user, role })
        }
      } catch (error) {
        console.error('Failed to update user role:', error)
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isSignedIn || false,
        user,
        login,
        logout,
        toggleAuth,
        setRole,
        SignInButton,
        SignOutButton,
        UserButton,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
