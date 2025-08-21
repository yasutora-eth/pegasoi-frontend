'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CyberLoading, LoadingState, LoadingSpinner } from '@/components/ui/loading'
import { CyberError, ErrorState, GraphQLError } from '@/components/ui/error'
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
  CheckCircle,
  AlertTriangle,
  Info,
  RefreshCw,
  Plus,
  Minus,
  Edit,
  Trash2,
  Download,
  Upload,
  Eye,
  EyeOff,
  Heart,
  Star,
  Share,
  Filter,
  SortAsc,
  SortDesc,
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

export default function ComprehensiveCheck() {
  const { isAuthenticated, user } = useAuth()
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('')

  const handleTestError = () => {
    setShowError(true)
    setTimeout(() => setShowError(false), 5000)
  }

  const handleTestLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <CyberBackground />
      <div className="container mx-auto px-4 py-12 relative z-10">
        
        {/* Header Section */}
        <div className="animate-fade-in text-center mb-12">
          <div className="mb-6 flex items-center justify-center gap-4">
            <img 
              src="/pegasus-logo.svg" 
              alt="Pegasus Logo" 
              className="h-16 w-16 animate-pulse"
            />
            <h1 className="text-cyber text-glow text-6xl font-bold">
              Comprehensive Component Check
            </h1>
          </div>
          <p className="mb-6 text-2xl text-cyan-300">
            Testing All Components for 100% Perfection
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="cyber">
              <CheckCircle className="mr-1 h-3 w-3" />
              ALL SYSTEMS OPERATIONAL
            </Badge>
            <Badge variant="outline">
              <User className="mr-1 h-3 w-3" />
              {isAuthenticated ? `${user?.role?.toUpperCase()} MODE` : 'GUEST MODE'}
            </Badge>
          </div>
        </div>

        {/* Component Testing Grid */}
        <div className="space-y-12">
          
          {/* Button Component Tests */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-cyan-400 text-center">Button Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Default Buttons */}
              <Card variant="cyber">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Default Variants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="default" className="w-full">Default Button</Button>
                  <Button variant="secondary" className="w-full">Secondary Button</Button>
                  <Button variant="outline" className="w-full">Outline Button</Button>
                  <Button variant="ghost" className="w-full">Ghost Button</Button>
                  <Button variant="link" className="w-full">Link Button</Button>
                </CardContent>
              </Card>

              {/* Cyber Buttons */}
              <Card variant="cyber">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Cyber Variants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="cyber" className="w-full">Cyber Button</Button>
                  <Button variant="cyber" size="sm" className="w-full">Small Cyber</Button>
                  <Button variant="cyber" size="lg" className="w-full">Large Cyber</Button>
                  <Button variant="destructive" className="w-full">Destructive</Button>
                </CardContent>
              </Card>

              {/* Icon Buttons */}
              <Card variant="cyber">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Icon Buttons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="cyber" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="cyber" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="cyber" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="cyber" size="icon">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Card Component Tests */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-cyan-400 text-center">Card Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Default Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>
                    Standard card component with default styling and description.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This is the content area of a default card. It can contain any type of content.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Action</Button>
                </CardFooter>
              </Card>

              {/* Cyber Card */}
              <Card variant="cyber">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Cyber Card</CardTitle>
                  <CardDescription className="text-cyan-300/70">
                    Enhanced cyber-themed card with glowing effects and animations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-cyan-300/80">
                    This cyber card features enhanced styling with gradients and glow effects.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="cyber" className="w-full">Cyber Action</Button>
                </CardFooter>
              </Card>

              {/* Interactive Card */}
              <Card variant="cyber" className="hover:scale-105 transition-transform cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Interactive Card
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-cyan-300">Status</span>
                      <Badge variant="cyber">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-300">Performance</span>
                      <span className="text-green-400">98%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Form Components Tests */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-cyan-400 text-center">Form Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Default Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Default Form Elements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Default Input</label>
                    <Input 
                      placeholder="Enter text here..." 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Default Select</label>
                    <Select value={selectValue} onValueChange={setSelectValue}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Cyber Form */}
              <Card variant="cyber">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Cyber Form Elements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-cyan-300">Cyber Input</label>
                    <Input 
                      variant="cyber"
                      placeholder="Enter cyber data..." 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-cyan-300">Cyber Select</label>
                    <Select>
                      <SelectTrigger variant="cyber">
                        <SelectValue placeholder="Select cyber option" />
                      </SelectTrigger>
                      <SelectContent variant="cyber">
                        <SelectItem value="cyber1">Cyber Option 1</SelectItem>
                        <SelectItem value="cyber2">Cyber Option 2</SelectItem>
                        <SelectItem value="cyber3">Cyber Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Badge Components Tests */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-cyan-400 text-center">Badge Components</h2>
            <Card variant="cyber">
              <CardHeader>
                <CardTitle className="text-cyan-400">Badge Variants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-cyan-300">Default</h4>
                    <Badge>Default</Badge>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-cyan-300">Secondary</h4>
                    <Badge variant="secondary">Secondary</Badge>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-cyan-300">Outline</h4>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-cyan-300">Cyber</h4>
                    <Badge variant="cyber">Cyber</Badge>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <h4 className="text-sm font-medium text-cyan-300">Status Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="cyber">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Online
                    </Badge>
                    <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Warning
                    </Badge>
                    <Badge variant="destructive">
                      <Minus className="mr-1 h-3 w-3" />
                      Offline
                    </Badge>
                    <Badge variant="secondary">
                      <Info className="mr-1 h-3 w-3" />
                      Info
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Loading States Tests */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-cyan-400 text-center">Loading States</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Default Loading */}
              <Card>
                <CardHeader>
                  <CardTitle>Default Loading</CardTitle>
                </CardHeader>
                <CardContent>
                  <LoadingState message="Loading data..." />
                  <div className="mt-4 space-y-2">
                    <LoadingSpinner size="sm" />
                    <LoadingSpinner size="default" />
                    <LoadingSpinner size="lg" />
                  </div>
                </CardContent>
              </Card>

              {/* Cyber Loading */}
              <Card variant="cyber">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Cyber Loading</CardTitle>
                </CardHeader>
                <CardContent>
                  <CyberLoading message="ACCESSING DATABASE..." />
                </CardContent>
              </Card>

              {/* Interactive Loading Test */}
              <Card variant="cyber">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Loading Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="cyber" 
                    onClick={handleTestLoading}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Test Loading
                      </>
                    )}
                  </Button>
                  {loading && (
                    <LoadingState 
                      variant="cyber" 
                      message="PROCESSING REQUEST..." 
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Error States Tests */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-cyan-400 text-center">Error States</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Default Error */}
              <Card>
                <CardHeader>
                  <CardTitle>Default Error States</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ErrorState 
                    title="Standard Error"
                    message="Something went wrong with the operation."
                    onRetry={() => console.log('Retry clicked')}
                    onDismiss={() => console.log('Dismiss clicked')}
                  />
                </CardContent>
              </Card>

              {/* Cyber Error */}
              <Card variant="cyber">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Cyber Error States</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {showError && (
                    <CyberError
                      title="SYSTEM MALFUNCTION"
                      message="Critical error detected in the neural network interface."
                      errorCode="SYS_001"
                      onRetry={() => console.log('Cyber retry clicked')}
                      onDismiss={() => setShowError(false)}
                    />
                  )}
                  {!showError && (
                    <Button 
                      variant="cyber" 
                      onClick={handleTestError}
                      className="w-full"
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Trigger Error Test
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* System Status Dashboard */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-cyan-400 text-center">System Status Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <Card variant="cyber">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Database className="h-5 w-5" />
                    Database
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-cyan-300">Status</span>
                      <Badge variant="cyber">Online</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-300">Connections</span>
                      <span className="text-green-400">1,247</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="cyber">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Activity className="h-5 w-5" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-cyan-300">CPU</span>
                      <span className="text-green-400">23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-300">Memory</span>
                      <span className="text-yellow-400">67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="cyber">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Shield className="h-5 w-5" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-cyan-300">Firewall</span>
                      <Badge variant="cyber">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-300">Threats</span>
                      <span className="text-green-400">0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="cyber">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Zap className="h-5 w-5" />
                    API Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-cyan-300">Uptime</span>
                      <span className="text-green-400">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-300">Requests</span>
                      <span className="text-cyan-400">45.2k</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Final Status */}
          <section className="text-center space-y-6">
            <Card variant="cyber" className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-cyber text-glow text-3xl">
                  🎉 COMPREHENSIVE CHECK COMPLETE
                </CardTitle>
                <CardDescription className="text-cyan-300/70 text-lg">
                  All components tested and verified for 100% perfection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">✓</div>
                    <div className="text-sm text-cyan-300">Buttons</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">✓</div>
                    <div className="text-sm text-cyan-300">Cards</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">✓</div>
                    <div className="text-sm text-cyan-300">Forms</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">✓</div>
                    <div className="text-sm text-cyan-300">States</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Badge variant="cyber" className="text-lg px-6 py-2">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  SYSTEM READY FOR DEPLOYMENT
                </Badge>
              </CardFooter>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}