'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CyberLoading, LoadingState } from '@/components/ui/loading'
import { CyberError, ErrorState } from '@/components/ui/error'
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
      <div className="floating-element absolute right-20 top-1/3 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/15 to-cyan-400/10 blur-lg" style={{ animationDelay: '2s' }}></div>
      <div className="floating-element absolute left-1/3 bottom-20 h-28 w-28 rounded-full bg-gradient-to-br from-cyan-300/10 to-purple-400/15 blur-xl" style={{ animationDelay: '4s' }}></div>
    </div>
  )
}

export default function CyberEnhancedHome() {
  const [showDemo, setShowDemo] = React.useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <CyberBackground />
      <div className="container mx-auto px-4 py-12 relative z-10">
        
        {/* Header */}
        <div className="animate-fade-in text-center mb-12">
          <div className="mb-6 flex items-center justify-center gap-4">
            <img 
              src="/pegasus-logo.svg" 
              alt="Pegasus Logo" 
              className="h-16 w-16 animate-pulse"
            />
            <h1 className="text-cyber text-glow text-6xl font-bold">
              Enhanced Cyber Portal
            </h1>
          </div>
          <p className="mb-6 text-2xl text-cyan-300">
            Showcasing Enhanced Components & GraphQL Integration
          </p>
          <Badge variant="cyber">
            DEVELOPMENT MODE • ENHANCED COMPONENTS ACTIVE
          </Badge>
        </div>

        {/* Component Showcase Toggle */}
        <div className="text-center mb-8">
          <Button 
            variant="cyber" 
            onClick={() => setShowDemo(!showDemo)}
            className="gap-2"
          >
            <Zap className="h-4 w-4" />
            {showDemo ? 'HIDE' : 'SHOW'} COMPONENT SHOWCASE
          </Button>
        </div>

        {/* Component Showcase */}
        {showDemo && (
          <div className="space-y-12 mb-16">
            <Card variant="cyber" className="p-8">
              <CardHeader>
                <CardTitle className="text-center text-3xl text-cyan-400 text-glow">
                  ENHANCED CYBER COMPONENTS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Button Variants */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-cyan-400">Button Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default">Default Button</Button>
                    <Button variant="cyber">Cyber Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="destructive">Destructive Button</Button>
                  </div>
                </div>

                {/* Card Variants */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-cyan-400">Card Variants</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          Enhanced cyber-themed card with glowing effects and animated borders.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Badge Variants */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-cyan-400">Badge Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Badge>Default Badge</Badge>
                    <Badge variant="cyber">Cyber Badge</Badge>
                    <Badge variant="outline">Outline Badge</Badge>
                    <Badge variant="secondary">Secondary Badge</Badge>
                    <Badge variant="destructive">Destructive Badge</Badge>
                  </div>
                </div>

                {/* Select Components */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-cyan-400">Select Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Default Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Standard Option 1</SelectItem>
                        <SelectItem value="option2">Standard Option 2</SelectItem>
                        <SelectItem value="option3">Standard Option 3</SelectItem>
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
                  <h3 className="text-xl font-semibold text-cyan-400">Loading States</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-cyan-300">Standard Loading</h4>
                      <LoadingState message="Loading research data..." />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-cyan-300">Cyber Loading</h4>
                      <CyberLoading message="ACCESSING NEURAL NETWORK..." />
                    </div>
                  </div>
                </div>

                {/* Error States */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-cyan-400">Error States</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-cyan-300">Standard Error</h4>
                      <ErrorState 
                        title="Connection Failed"
                        message="Unable to connect to the research database."
                        onRetry={() => console.log('Standard retry clicked')}
                      />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-cyan-300">Cyber Error</h4>
                      <CyberError
                        title="NEURAL LINK SEVERED"
                        message="Critical failure in quantum data transmission protocols."
                        errorCode="QDT_404"
                        onRetry={() => console.log('Cyber retry clicked')}
                      />
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        )}

        {/* System Access Points */}
        <div className="space-y-8">
          <h2 className="text-center text-3xl font-bold text-cyan-400">
            System Access Points
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card variant="cyber">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <BookOpen className="h-5 w-5" />
                  Browse Articles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-cyan-300/70">
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
                  Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-cyan-300/70">
                  Access your research dashboard
                </p>
                <Link href="/dashboard">
                  <Button variant="cyber" className="w-full">
                    ENTER SYSTEM
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Access Level Selection */}
        <div className="space-y-6 mt-16">
          <h2 className="text-center text-3xl font-bold text-cyan-400">
            Access Level Selection
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card variant="cyber" className="border-blue-400/30">
              <CardHeader className="text-center">
                <User className="mx-auto h-12 w-12 text-blue-400" />
                <CardTitle className="text-blue-400">User Access</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4 text-sm text-blue-300/70">
                  Browse and search research articles
                </p>
                <Button 
                  variant="cyber" 
                  className="w-full border-blue-400/30 text-blue-400"
                >
                  INITIALIZE USER MODE
                </Button>
              </CardContent>
            </Card>

            <Card variant="cyber" className="border-green-400/30">
              <CardHeader className="text-center">
                <Shield className="mx-auto h-12 w-12 text-green-400" />
                <CardTitle className="text-green-400">Publisher Access</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4 text-sm text-green-300/70">
                  Submit and manage articles
                </p>
                <Button 
                  variant="cyber" 
                  className="w-full border-green-400/30 text-green-400"
                >
                  INITIALIZE PUBLISHER MODE
                </Button>
              </CardContent>
            </Card>

            <Card variant="cyber" className="border-yellow-400/30">
              <CardHeader className="text-center">
                <Crown className="mx-auto h-12 w-12 text-yellow-400" />
                <CardTitle className="text-yellow-400">Admin Access</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4 text-sm text-yellow-300/70">
                  Full platform management
                </p>
                <Button 
                  variant="cyber" 
                  className="w-full border-yellow-400/30 text-yellow-400"
                >
                  INITIALIZE ADMIN MODE
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-6 mt-16">
          <h2 className="text-center text-3xl font-bold text-cyan-400">
            Enhanced System Status
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card variant="cyber">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Database className="h-5 w-5" />
                  GraphQL Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-cyan-300/70">Apollo Client</span>
                    <Badge variant="cyber" className="text-green-400 border-green-400/30">
                      ACTIVE
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300/70">Query Hooks</span>
                    <Badge variant="cyber" className="text-green-400 border-green-400/30">
                      LOADED
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300/70">Mutations</span>
                    <Badge variant="cyber" className="text-green-400 border-green-400/30">
                      READY
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300/70">Type Safety</span>
                    <Badge variant="cyber" className="text-green-400 border-green-400/30">
                      ENFORCED
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="cyber">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Activity className="h-5 w-5" />
                  Component Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-cyan-300/70">Cyber Variants</span>
                    <Badge variant="cyber" className="text-green-400 border-green-400/30">
                      ENHANCED
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300/70">Loading States</span>
                    <Badge variant="cyber" className="text-green-400 border-green-400/30">
                      OPTIMIZED
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300/70">Error Handling</span>
                    <Badge variant="cyber" className="text-green-400 border-green-400/30">
                      ROBUST
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300/70">Auth System</span>
                    <Badge variant="cyber" className="text-yellow-400 border-yellow-400/30">
                      DEV MODE
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  )
}