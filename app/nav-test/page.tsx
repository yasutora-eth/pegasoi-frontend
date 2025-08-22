'use client'

import { useUser } from '@/components/DevAuthProvider'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function NavigationTest() {
  const { isSignedIn, user } = useUser()

  const publicRoutes = [
    { href: '/', label: 'Home' },
    { href: '/articles', label: 'Articles' },
    { href: '/information', label: 'Information' },
    { href: '/api-testing', label: 'API Testing' },
  ]

  const authenticatedRoutes = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/graphql-dashboard', label: 'GraphQL Dashboard' },
    { href: '/articles', label: 'Articles' },
    { href: '/submit-article', label: 'Submit Article' },
    { href: '/research-gallery', label: 'Research Gallery' },
    { href: '/archive', label: 'Archive' },
    { href: '/system-check', label: 'System Check' },
    { href: '/information', label: 'Information' },
  ]

  const currentRoutes = isSignedIn ? authenticatedRoutes : publicRoutes

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">Navigation Test Page</h1>
        <div className="cyber-card p-4">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">Current State:</h2>
          <p className="text-cyan-200">
            <strong>Authentication:</strong> {isSignedIn ? 'AUTHENTICATED' : 'GUEST MODE'}
          </p>
          {isSignedIn && user && (
            <p className="text-cyan-200">
              <strong>User:</strong> {user.name} ({user.role})
            </p>
          )}
          <p className="text-cyan-200">
            <strong>Available Routes:</strong> {currentRoutes.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentRoutes.map((route) => (
          <Card key={route.href} variant="cyber">
            <CardHeader>
              <CardTitle className="text-cyan-400">{route.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link 
                href={route.href}
                className="cyber-button inline-block px-4 py-2 text-center w-full"
              >
                Navigate to {route.label}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card variant="cyber">
          <CardHeader>
            <CardTitle className="text-cyan-400">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-cyan-200">
            <ol className="list-decimal list-inside space-y-2">
              <li>Use the DevToggle button (bottom-right corner) to switch between Guest and Authenticated modes</li>
              <li>In <strong>Guest Mode</strong>: You'll see 4 public navigation items</li>
              <li>In <strong>Authenticated Mode</strong>: You'll see 9 navigation items including Dashboard, GraphQL, etc.</li>
              <li>Click any navigation button above to test the routing</li>
              <li>Protected pages (Dashboard, etc.) will show login prompt in Guest mode</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
