'use client'

import type React from 'react'
import { useUser, SignInButton, useAuth } from '@/components/DevAuthProvider'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Shield, LogIn } from 'lucide-react'
import type { UserRole } from '@/types/graphql'

interface PrivateRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
  fallback?: React.ReactNode
}

export function PrivateRoute({ 
  children, 
  requiredRole,
  fallback 
}: PrivateRouteProps) {
  const { isAuthenticated, user, login } = useAuth()

  // Not authenticated
  if (!isAuthenticated) {
    if (fallback) return <>{fallback}</>
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Card variant="cyber" className="max-w-md w-full">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
            <CardTitle className="text-cyan-400 text-glow">
              AUTHENTICATION REQUIRED
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-cyan-300/70">
              Access to this area requires valid credentials.
            </p>
            <Button 
              variant="cyber" 
              onClick={() => login(requiredRole)}
              className="w-full gap-2"
            >
              <LogIn className="h-4 w-4" />
              INITIALIZE LOGIN PROTOCOL
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check role permissions
  if (requiredRole && user?.role !== requiredRole) {
    const roleHierarchy: Record<UserRole, number> = {
      user: 1,
      publisher: 2,
      admin: 3,
    }

    const userLevel = roleHierarchy[user?.role || 'user']
    const requiredLevel = roleHierarchy[requiredRole]

    if (userLevel < requiredLevel) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          <Card variant="cyber" className="max-w-md w-full">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <CardTitle className="text-red-400 text-glow">
                ACCESS DENIED
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-red-300/70">
                Insufficient privileges. Required role: {requiredRole.toUpperCase()}
              </p>
              <p className="text-xs text-red-400/50">
                ERROR CODE: AUTH_403
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }
  }

  return <>{children}</>
}

// Role-specific route components
export function UserRoute({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute requiredRole="user">
      {children}
    </PrivateRoute>
  )
}

export function PublisherRoute({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute requiredRole="publisher">
      {children}
    </PrivateRoute>
  )
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute requiredRole="admin">
      {children}
    </PrivateRoute>
  )
}