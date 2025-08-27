'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CyberLoading, LoadingState } from '@/components/ui/loading'
import { CyberError, ErrorState } from '@/components/ui/error'
import { useAuth } from '@/components/DevAuthProvider'
import {
  BookOpen,
  Search,
  Settings,
  Zap,
  User,
  Shield,
  Crown,
  Database,
  Activity,
} from 'lucide-react'

export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="floating-element absolute left-20 top-20 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/10 blur-xl"></div>
      <div
        className="floating-element absolute right-20 top-1/3 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/15 to-cyan-400/10 blur-lg"
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className="floating-element absolute bottom-20 left-1/3 h-28 w-28 rounded-full bg-gradient-to-br from-cyan-300/10 to-purple-400/15 blur-xl"
        style={{ animationDelay: '4s' }}
      ></div>
    </div>
  )
}

export default function Home() {
  const { isAuthenticated, user } = useAuth()

  const PublicContent = () => (
    <div className="relative z-10 space-y-8">
      <div className="animate-fade-in text-center">
        <div className="mb-6 flex items-center justify-center gap-4">
          <img
            src="/pegasus-logo.svg"
            alt="Pegasus Logo"
            className="h-16 w-16 animate-pulse"
          />
          <h1 className="text-cyber text-glow text-6xl font-bold">
            Pegasoi Research Portal
          </h1>
        </div>
        <p className="mb-6 text-2xl text-cyan-300">
          Classical Studies Research & Publication Platform
        </p>
        <Badge variant="cyber">PUBLIC ACCESS • INITIALIZE LOGIN PROTOCOL</Badge>
      </div>

      {/* Component Showcase */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-cyan-400">
            Enhanced Cyber Components
          </h2>
          <p className="text-cyan-300/70">
            Showcasing the new cyber variants and improved functionality
          </p>
        </div>

        {/* Button Variants */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-cyan-400">
            Button Variants
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default Button</Button>
            <Button variant="cyber">Cyber Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </div>

        {/* Card Variants */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-cyan-400">Card Variants</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Standard card component with default styling.
                </p>
              </CardContent>
            </Card>
            <Card variant="cyber">
              <CardHeader>
                <CardTitle className="text-cyan-400">Cyber Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-cyan-300/70">
                  Enhanced cyber-themed card with glowing effects.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Badge Variants */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-cyan-400">
            Badge Variants
          </h3>
          <div className="flex flex-wrap gap-4">
            <Badge>Default Badge</Badge>
            <Badge variant="cyber">Cyber Badge</Badge>
            <Badge variant="outline">Outline Badge</Badge>
            <Badge variant="secondary">Secondary Badge</Badge>
          </div>
        </div>

        {/* Select Component */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-cyan-400">
            Select Components
          </h3>
          <div className="grid max-w-md grid-cols-1 gap-4 md:grid-cols-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Default Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger variant="cyber">
                <SelectValue placeholder="Cyber Select" />
              </SelectTrigger>
              <SelectContent variant="cyber">
                <SelectItem value="option1">Cyber Option 1</SelectItem>
                <SelectItem value="option2">Cyber Option 2</SelectItem>
                <SelectItem value="option3">Cyber Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading States */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-cyan-400">
            Loading States
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <LoadingState message="Loading data..." />
            <CyberLoading message="ACCESSING DATABASE..." />
          </div>
        </div>

        {/* Error States */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-cyan-400">Error States</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ErrorState
              title="Standard Error"
              message="Something went wrong with the operation."
              onRetry={() => {
                /* Handle retry */
              }}
            />
            <CyberError
              title="SYSTEM MALFUNCTION"
              message="Critical error detected in the neural network interface."
              errorCode="SYS_001"
              onRetry={() => {
                /* Handle cyber retry */
              }}
            />
          </div>
        </div>
      </div>

      {/* System Access Points */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="cyber">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <BookOpen className="h-5 w-5" />
              Browse Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-300">
              Explore published research in classical studies
            </p>
            <Link href="/articles">
              <Button variant="cyber" className="w-full">
                ACCESS DATABASE
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card variant="cyber">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Search className="h-5 w-5" />
              Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-cyan-300/70">
              Learn about our platform and services
            </p>
            <Link href="/information">
              <Button variant="cyber" className="w-full">
                LEARN MORE
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card variant="cyber">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Settings className="h-5 w-5" />
              API Testing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-cyan-300/70">
              Test our research APIs and integrations
            </p>
            <Link href="/api-testing">
              <Button variant="cyber" className="w-full">
                RUN TESTS
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card variant="cyber">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Zap className="h-5 w-5" />
              Initialize
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-cyan-300/70">
              Join our research community
            </p>
            <Button variant="cyber" className="w-full">
              BOOT SYSTEM
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Access Level Selection */}
      <div className="space-y-6">
        <h2 className="text-center text-3xl font-bold text-cyan-400">
          Access Level Selection
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-blue-400/30 bg-gray-900/60 backdrop-blur-sm">
            <CardHeader className="text-center">
              <User className="mx-auto h-12 w-12 text-blue-400" />
              <CardTitle className="text-blue-400">User Access</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4 text-sm text-gray-300">
                Browse and search research articles
              </p>
              <Button
                variant="outline"
                className="w-full border-blue-400 text-blue-400"
              >
                INITIALIZE USER MODE
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-400/30 bg-gray-900/60 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Shield className="mx-auto h-12 w-12 text-green-400" />
              <CardTitle className="text-green-400">Publisher Access</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4 text-sm text-gray-300">
                Submit and manage articles
              </p>
              <Button
                variant="outline"
                className="w-full border-green-400 text-green-400"
              >
                INITIALIZE PUBLISHER MODE
              </Button>
            </CardContent>
          </Card>

          <Card className="border-yellow-400/30 bg-gray-900/60 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Crown className="mx-auto h-12 w-12 text-yellow-400" />
              <CardTitle className="text-yellow-400">Admin Access</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4 text-sm text-gray-300">
                Full platform management
              </p>
              <Button
                variant="outline"
                className="w-full border-yellow-400 text-yellow-400"
              >
                INITIALIZE ADMIN MODE
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Status */}
      <div className="space-y-6">
        <h2 className="text-center text-3xl font-bold text-cyan-400">
          System Status
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="border-cyan-400/20 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Database className="h-5 w-5" />
                Recent Publications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                - • &ldquo;Roman Architecture in the Imperial Period&rdquo; - •
                &ldquo;Greek Pottery: Styles and Techniques&rdquo; - •
                &ldquo;Egyptian Hieroglyphic Evolution&rdquo; - •
                &ldquo;Classical Literature Analysis&rdquo; - • &ldquo;Byzantine
                Art and Culture&rdquo;
              </ul>
              <Link href="/articles">
                <Button
                  variant="outline"
                  className="mt-4 w-full border-cyan-400 text-cyan-400"
                >
                  Access Full Database
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-cyan-400/20 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Activity className="h-5 w-5" />
                System Diagnostics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Database Status</span>
                  <span className="text-green-400">ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">API Services</span>
                  <span className="text-green-400">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Search Engine</span>
                  <span className="text-green-400">OPERATIONAL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Authentication</span>
                  <span className="text-yellow-400">STANDBY</span>
                </div>
              </div>
              <Link href="/system-check">
                <Button
                  variant="outline"
                  className="mt-4 w-full border-cyan-400 text-cyan-400"
                >
                  Run Full Diagnostics
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const AuthenticatedContent = () => (
    <div className="relative z-10 space-y-8">
      <div className="animate-fade-in text-center">
        <div className="mb-6 flex items-center justify-center gap-4">
          <img
            src="/pegasus-logo.svg"
            alt="Pegasus Logo"
            className="h-16 w-16 animate-pulse"
          />
          <h1 className="text-cyber text-glow text-6xl font-bold">
            Welcome Back, {user?.name || 'Researcher'}
          </h1>
        </div>
        <p className="mb-6 text-2xl text-cyan-300">
          Access Level: {user?.role?.toUpperCase() || 'USER'}
        </p>
        <Badge variant="cyber">AUTHENTICATED • SYSTEM ACCESS GRANTED</Badge>
      </div>

      {/* Quick Access Dashboard */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card variant="cyber">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Database className="h-5 w-5" />
              Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-cyan-300/70">
              Access your personal dashboard
            </p>
            <Link href="/dashboard">
              <Button variant="cyber" className="w-full">
                ENTER DASHBOARD
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card variant="cyber">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Search className="h-5 w-5" />
              Research Gallery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-cyan-300/70">
              Advanced search and research tools
            </p>
            <Link href="/research-gallery">
              <Button variant="cyber" className="w-full">
                ACCESS RESEARCH
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card variant="cyber">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <BookOpen className="h-5 w-5" />
              Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-cyan-300/70">
              Browse and manage articles
            </p>
            <Link href="/articles">
              <Button variant="cyber" className="w-full">
                VIEW ARTICLES
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <CyberBackground />
      <div className="container mx-auto px-4 py-12">
        {isAuthenticated ? <AuthenticatedContent /> : <PublicContent />}
      </div>
    </div>
  )
}
