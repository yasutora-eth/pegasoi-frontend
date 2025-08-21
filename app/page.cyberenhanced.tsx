'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CyberLoading, LoadingState } from '@/components/ui/loading'
import { CyberError, ErrorState } from '@/components/ui/error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Toggle } from '@/components/ui/toggle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EnhancedBackground, MicroTextureOverlay } from '@/components/ui/enhanced-background'
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
    <>
      {/* Enhanced background layers */}
      <EnhancedBackground intensity="subtle" />
      <MicroTextureOverlay />
      
      {/* Ultra-subtle floating elements */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="floating-element absolute left-20 top-20 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/8 to-purple-600/4 blur-xl opacity-60"></div>
        <div className="floating-element absolute right-20 top-1/3 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/6 to-cyan-400/4 blur-lg opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="floating-element absolute left-1/3 bottom-20 h-28 w-28 rounded-full bg-gradient-to-br from-cyan-300/5 to-purple-400/6 blur-xl opacity-70" style={{ animationDelay: '4s' }}></div>
        
        {/* Additional micro-elements for depth */}
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/3 to-transparent blur-lg opacity-40" style={{ animation: 'float-cyber 12s ease-in-out infinite', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/4 to-transparent blur-xl opacity-30" style={{ animation: 'float-cyber 15s ease-in-out infinite', animationDelay: '3s' }}></div>
      </div>
    </>
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

                {/* Form Components */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-cyan-400">Form Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Default Input</Label>
                        <Input placeholder="Enter text..." />
                      </div>
                      <div className="space-y-2">
                        <Label variant="cyber">Cyber Input</Label>
                        <Input variant="cyber" placeholder="ENTER DATA..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Default Select</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label variant="cyber">Cyber Textarea</Label>
                        <Textarea variant="cyber" placeholder="ENTER DETAILED INFORMATION..." />
                      </div>
                      <div className="space-y-2">
                        <Label variant="cyber">Cyber Select</Label>
                        <Select>
                          <SelectTrigger variant="cyber">
                            <SelectValue placeholder="SELECT PROTOCOL..." />
                          </SelectTrigger>
                          <SelectContent variant="cyber">
                            <SelectItem value="alpha">ALPHA PROTOCOL</SelectItem>
                            <SelectItem value="beta">BETA PROTOCOL</SelectItem>
                            <SelectItem value="gamma">GAMMA PROTOCOL</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress & Avatar Components */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-cyan-400">Progress & Avatar Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Default Progress</Label>
                        <Progress value={65} />
                      </div>
                      <div className="space-y-2">
                        <Label variant="cyber">Cyber Progress</Label>
                        <Progress variant="cyber" value={85} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label variant="cyber">Avatar Components</Label>
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <Avatar variant="cyber" size="lg">
                            <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Form Components */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-cyan-400">Advanced Form Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label variant="cyber">Checkbox Options</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="cyber1" variant="cyber" />
                            <Label htmlFor="cyber1">Enable Neural Interface</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="cyber2" variant="cyber" />
                            <Label htmlFor="cyber2">Activate Quantum Protocols</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label variant="cyber">Radio Selection</Label>
                        <RadioGroup variant="cyber" defaultValue="alpha">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem variant="cyber" value="alpha" id="alpha" />
                            <Label htmlFor="alpha">Alpha Protocol</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem variant="cyber" value="beta" id="beta" />
                            <Label htmlFor="beta">Beta Protocol</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label variant="cyber">System Controls</Label>
                        <div className="flex items-center space-x-2">
                          <Switch variant="cyber" id="system-power" />
                          <Label htmlFor="system-power">System Power</Label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label variant="cyber">Power Level: 75%</Label>
                        <Slider variant="cyber" defaultValue={[75]} max={100} step={1} />
                      </div>
                      <div className="space-y-2">
                        <Label variant="cyber">Toggle Controls</Label>
                        <div className="flex gap-2">
                          <Toggle variant="cyber" size="sm">Neural</Toggle>
                          <Toggle variant="cyber" size="sm">Quantum</Toggle>
                          <Toggle variant="cyber" size="sm">Cyber</Toggle>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Components */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-cyan-400">Interactive Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="cyber">Hover for Info</Button>
                          </TooltipTrigger>
                          <TooltipContent variant="cyber">
                            <p>This is a cyber-themed tooltip with enhanced styling</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="cyber">System Menu</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent variant="cyber">
                          <DropdownMenuItem variant="cyber">Neural Interface</DropdownMenuItem>
                          <DropdownMenuItem variant="cyber">Quantum Protocols</DropdownMenuItem>
                          <DropdownMenuItem variant="cyber">System Diagnostics</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="space-y-4">
                      <Tabs defaultValue="neural" className="w-full">
                        <TabsList variant="cyber">
                          <TabsTrigger variant="cyber" value="neural">Neural</TabsTrigger>
                          <TabsTrigger variant="cyber" value="quantum">Quantum</TabsTrigger>
                          <TabsTrigger variant="cyber" value="cyber">Cyber</TabsTrigger>
                        </TabsList>
                        <TabsContent value="neural" className="mt-4">
                          <Card variant="cyber">
                            <CardContent className="p-4">
                              <p className="text-cyan-300">Neural interface protocols active. All systems operational.</p>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="quantum" className="mt-4">
                          <Card variant="cyber">
                            <CardContent className="p-4">
                              <p className="text-cyan-300">Quantum entanglement established. Data transmission secure.</p>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="cyber" className="mt-4">
                          <Card variant="cyber">
                            <CardContent className="p-4">
                              <p className="text-cyan-300">Cybernetic enhancement modules loaded. Ready for deployment.</p>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>

                <Separator variant="cyber" className="my-8" />

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