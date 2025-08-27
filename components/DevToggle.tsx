'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
      <div className="cyber-card border-cyan-400/20 bg-gray-900/90 p-4 backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-3">
          <div
            className={`h-2 w-2 rounded-full ${
              isAuthenticated ? 'animate-pulse bg-green-400' : 'bg-red-400'
            }`}
          />
          <span className="font-mono text-xs uppercase tracking-wider text-cyan-300">
            {isAuthenticated ? 'AUTHENTICATED' : 'GUEST MODE'}
          </span>
        </div>

        {/* User Info */}
        {isAuthenticated && user && (
          <div className="mb-3 space-y-2">
            <Badge variant="cyber" className={roleColors[user.role]}>
              {React.createElement(roleIcons[user.role], {
                className: 'h-3 w-3 mr-1',
              })}
              {user.role.toUpperCase()}
            </Badge>
            <p className="text-xs text-cyan-300/70">{user.name}</p>
            <p className="font-mono text-xs text-cyan-300/50">{user.email}</p>
          </div>
        )}

        {/* Role Selector */}
        {isAuthenticated && (
          <div className="mb-3">
            <Select
              value={user?.role}
              onValueChange={(value: UserRole) => setRole(value)}
            >
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
          onClick={() => {
            // DevToggle clicked
            toggleAuth()
            // Force a small delay to ensure state updates
            setTimeout(() => {
              // Auth state toggled
            }, 100)
          }}
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
