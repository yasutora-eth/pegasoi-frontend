'use client'

import type React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser, SignInButton } from '@/components/DevAuthProvider'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Shield, Crown, LogIn } from 'lucide-react'

export default function Login() {
  const { isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn, router])

  const roleIcons = {
    user: <User className="h-4 w-4" />,
    publisher: <Shield className="h-4 w-4" />,
    admin: <Crown className="h-4 w-4" />,
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign In to Research Portal
          </CardTitle>
          <div className="text-center">
            <Badge variant="secondary" className="text-xs">
              Secure Authentication with Clerk
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SignInButton>
              <Button className="flex w-full items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign In / Sign Up
              </Button>
            </SignInButton>
          </div>

          <div className="mt-6 rounded-lg bg-muted/50 p-4">
            <h4 className="mb-2 text-sm font-medium">Role Permissions:</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                {roleIcons.user}
                <span>
                  <strong>User:</strong> View articles, submit articles
                </span>
              </div>
              <div className="flex items-center gap-2">
                {roleIcons.publisher}
                <span>
                  <strong>Publisher:</strong> + Review and publish articles
                </span>
              </div>
              <div className="flex items-center gap-2">
                {roleIcons.admin}
                <span>
                  <strong>Admin:</strong> + Archive articles, full access
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
