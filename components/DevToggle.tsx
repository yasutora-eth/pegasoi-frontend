"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/components/DevAuthProvider'
import { LogIn, LogOut, User, Shield, Crown } from 'lucide-react'
import type { UserRole } from '@/types/graphql'

export function DevToggle() {
  const { isAuthenticated, user, toggleAuth, setRole } = useAuth()

  const roleIcons = {
    user: User,
    publisher: Shield,
    admin: Crown,
  }

  const roleColors = {
    user: 'text-blue-400 border-blue-400/30',
    publisher: 'text-green-400 border-green-400/30', 
    admin: 'text-yellow-400 border-yellow-400/30',
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {/* Auth Status */}
      <div className="cyber-card p-4 bg-gray-900/90 backdrop-blur-sm border-cyan-400/20">
        <div className="flex items-center gap-3 mb-3">
          <div className={`h-2 w-2 rounded-full ${
            isAuthenticated ? 'bg-green-400 animate-pulse' : 'bg-red-400'
          }`} />
          <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
            {isAuthenticated ? 'AUTHENTICATED' : 'GUEST MODE'}
          </span>
        </div>

        {/* User Info */}
        {isAuthenticated && user && (
          <div className="space-y-2 mb-3">
            <Badge variant="cyber" className={roleColors[user.role]}>
              {React.createElement(roleIcons[user.role], { className: "h-3 w-3 mr-1" })}
              {user.role.toUpperCase()}
            </Badge>
            <p className="text-xs text-cyan-300/70">{user.name}</p>
            <p className="text-xs text-cyan-300/50 font-mono">{user.email}</p>
          </div>
        )}

        {/* Role Selector */}
        {isAuthenticated && (
          <div className="mb-3">
            <Select value={user?.role} onValueChange={(value: UserRole) => setRole(value)}>
              <SelectTrigger variant="cyber" className="h-8 text-xs">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent variant="cyber">
                <SelectItem value="user">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    User
                  </div>
                </SelectItem>
                <SelectItem value="publisher">
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    Publisher
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Crown className="h-3 w-3" />
                    Admin
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Toggle Button */}
        <Button 
          variant="cyber"
          size="sm"
          onClick={toggleAuth}
          className="w-full gap-2"
        >
          {isAuthenticated ? (
            <>
              <LogOut className="h-3 w-3" />
              LOGOUT
            </>
          ) : (
            <>
              <LogIn className="h-3 w-3" />
              LOGIN
            </>
          )}
        </Button>
      </div>
    </div>
  )
}