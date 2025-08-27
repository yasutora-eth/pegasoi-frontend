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
  fallback,
}: PrivateRouteProps) {
  const { isAuthenticated, user, login } = useAuth()

  // Not authenticated
  if (!isAuthenticated) {
    if (fallback) return <>{fallback}</>

    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
        <Card variant="cyber" className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="mx-auto mb-4 h-12 w-12 text-cyan-400" />
            <CardTitle className="text-glow text-cyan-400">
              AUTHENTICATION REQUIRED
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
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
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
          <Card variant="cyber" className="w-full max-w-md">
            <CardHeader className="text-center">
              <Shield className="mx-auto mb-4 h-12 w-12 text-red-400" />
              <CardTitle className="text-glow text-red-400">
                ACCESS DENIED
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-red-300/70">
                Insufficient privileges. Required role:{' '}
                {requiredRole.toUpperCase()}
              </p>
              <p className="text-xs text-red-400/50">ERROR CODE: AUTH_403</p>
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
  return <PrivateRoute requiredRole="user">{children}</PrivateRoute>
}

export function PublisherRoute({ children }: { children: React.ReactNode }) {
  return <PrivateRoute requiredRole="publisher">{children}</PrivateRoute>
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  return <PrivateRoute requiredRole="admin">{children}</PrivateRoute>
}
