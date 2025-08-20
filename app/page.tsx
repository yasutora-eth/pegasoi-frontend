'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import {
  BookOpen,
  PenTool,
  Search,
  Settings,
  Zap,
  User,
  Shield,
  Crown,
  BarChart3,
  Archive,
  Terminal,
  Database,
  Cpu,
  Activity,
} from 'lucide-react'
import { useAuth } from '@/components/MockAuthProvider'

// User type definitions - keeping for future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AppUser {
  id: string
  name: string
  email: string
  role: 'user' | 'publisher' | 'admin'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UserRole = 'user' | 'publisher' | 'admin'

export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Cyberpunk floating orbs */}
      <div className="floating-element absolute left-20 top-20 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/10 blur-xl"></div>
      <div
        className="to-cyan-400/8 floating-element absolute right-32 top-1/3 h-24 w-24 rounded-full bg-gradient-to-br from-pink-400/15 blur-lg"
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className="to-pink-400/8 floating-element absolute bottom-32 left-1/4 h-40 w-40 rounded-full bg-gradient-to-br from-purple-600/15 blur-2xl"
        style={{ animationDelay: '4s' }}
      ></div>
      <div
        className="from-cyan-400/12 to-purple-600/6 floating-element absolute bottom-1/3 right-1/3 h-28 w-28 rounded-full bg-gradient-to-br blur-xl"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="from-pink-400/18 floating-element absolute left-10 top-1/2 h-16 w-16 rounded-full bg-gradient-to-br to-transparent blur-md"
        style={{ animationDelay: '3s' }}
      ></div>
      <div
        className="from-cyan-400/12 floating-element absolute right-20 top-3/4 h-20 w-20 rounded-full bg-gradient-to-br to-transparent blur-lg"
        style={{ animationDelay: '5s' }}
      ></div>
    </div>
  )
}

export default function Home() {
  // Use Clerk authentication
  const { isAuthenticated, user, toggleAuth, setRole } = useAuth()

  // Content for unauthenticated users
  const PublicContent = () => (
    <div className="relative z-10 space-y-8">
      <div className="animate-fade-in text-center">
        <h1 className="text-cyber text-glow mb-6 text-6xl font-bold">
          Research Portal
        </h1>
        <p className="mb-6 text-2xl text-cyan-300">
          Classical Studies Research & Publication Platform
        </p>
        <Badge className="cyber-badge pulse-glow data-stream mb-8">
          <Terminal className="mr-2 h-4 w-4" />
          Public Access - Initialize Login Protocol
        </Badge>
      </div>

      <section className="animate-slide-up">
        <h2 className="text-glow mb-10 text-center text-4xl font-semibold text-cyan-300">
          System Access Points
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="cyber-card hover:cyber-glow animate-scale-in holographic transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-cyan-300">
                <BookOpen className="h-6 w-6 text-cyan-400" />
                Browse Articles
              </CardTitle>
              <CardDescription className="text-base text-cyan-400/80">
                Explore published research in classical studies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="cyber-button w-full py-3 text-lg">
                <Link href="/articles">Access Database</Link>
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cyber-card hover:cyber-glow animate-scale-in holographic transition-all duration-300"
            style={{ animationDelay: '0.1s' }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-cyan-300">
                <Search className="h-6 w-6 text-cyan-400" />
                Information
              </CardTitle>
              <CardDescription className="text-base text-cyan-400/80">
                Learn about our platform and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="cyber-button w-full py-3 text-lg">
                <Link href="/information">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cyber-card hover:cyber-glow animate-scale-in holographic transition-all duration-300"
            style={{ animationDelay: '0.2s' }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-cyan-300">
                <Settings className="h-6 w-6 text-cyan-400" />
                API Testing
              </CardTitle>
              <CardDescription className="text-base text-cyan-400/80">
                Test our research APIs and integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="cyber-button w-full py-3 text-lg">
                <Link href="/api-testing">Run Tests</Link>
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cyber-card hover:cyber-glow animate-scale-in holographic transition-all duration-300"
            style={{ animationDelay: '0.3s' }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-cyan-300">
                <Zap className="h-6 w-6 text-cyan-400" />
                Initialize
              </CardTitle>
              <CardDescription className="text-base text-cyan-400/80">
                Join our research community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={toggleAuth}
                className="cyber-button w-full py-3 text-lg"
              >
                Boot System
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-glow mb-10 text-center text-4xl font-semibold text-cyan-300">
          Access Level Selection
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="cyber-card hover:cyber-glow holographic text-center transition-all duration-300">
            <CardHeader className="pb-6">
              <User className="mx-auto mb-6 h-16 w-16 text-blue-400" />
              <CardTitle className="text-xl text-cyan-300">
                User Access
              </CardTitle>
              <CardDescription className="text-base text-cyan-400/80">
                Browse and search research articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => {
                  toggleAuth()
                  setTimeout(() => setRole('user'), 100)
                }}
                className="cyber-button w-full py-3 text-lg"
              >
                Initialize User Mode
              </Button>
            </CardContent>
          </Card>

          <Card className="cyber-card hover:cyber-glow holographic text-center transition-all duration-300">
            <CardHeader className="pb-6">
              <Shield className="mx-auto mb-6 h-16 w-16 text-green-400" />
              <CardTitle className="text-xl text-cyan-300">
                Publisher Access
              </CardTitle>
              <CardDescription className="text-base text-cyan-400/80">
                Submit and manage articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => {
                  toggleAuth()
                  setTimeout(() => setRole('publisher'), 100)
                }}
                className="cyber-button w-full py-3 text-lg"
              >
                Initialize Publisher Mode
              </Button>
            </CardContent>
          </Card>

          <Card className="cyber-card hover:cyber-glow holographic text-center transition-all duration-300">
            <CardHeader className="pb-6">
              <Crown className="mx-auto mb-6 h-16 w-16 text-yellow-400" />
              <CardTitle className="text-xl text-cyan-300">
                Admin Access
              </CardTitle>
              <CardDescription className="text-base text-cyan-400/80">
                Full platform management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => {
                  toggleAuth()
                  setTimeout(() => setRole('admin'), 100)
                }}
                className="cyber-button w-full py-3 text-lg"
              >
                Initialize Admin Mode
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-glow mb-10 text-center text-4xl font-semibold text-cyan-300">
          System Status
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="cyber-card holographic">
            <CardHeader>
              <CardTitle className="text-xl text-cyan-300">
                Latest Publications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-base">
                <li className="flex items-center space-x-3">
                  <div className="pulse-glow h-3 w-3 rounded-full bg-green-400"></div>
                  <span className="text-cyan-200">
                    &ldquo;Roman Architecture in the Imperial Period&rdquo;
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="pulse-glow h-3 w-3 rounded-full bg-green-400"></div>
                  <span className="text-cyan-200">
                    &ldquo;Greek Pottery: Styles and Techniques&rdquo;
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="pulse-glow h-3 w-3 rounded-full bg-green-400"></div>
                  <span className="text-cyan-200">
                    &ldquo;Egyptian Hieroglyphic Evolution&rdquo;
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="pulse-glow h-3 w-3 rounded-full bg-green-400"></div>
                  <span className="text-cyan-200">
                    &ldquo;Classical Literature Analysis&rdquo;
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="pulse-glow h-3 w-3 rounded-full bg-green-400"></div>
                  <span className="text-cyan-200">
                    &ldquo;Byzantine Art and Culture&rdquo;
                  </span>
                </li>
              </ul>
              <Button asChild className="cyber-button mt-8 w-full py-3 text-lg">
                <Link href="/articles">Access Full Database</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cyber-card holographic">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-cyan-300">
                <Activity className="h-6 w-6" />
                System Diagnostics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5 text-base">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-200">API Status:</span>
                  <Badge className="border-green-500/50 bg-green-500/30 px-3 py-1 text-green-300">
                    OPERATIONAL
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-200">Database:</span>
                  <Badge className="border-green-500/50 bg-green-500/30 px-3 py-1 text-green-300">
                    CONNECTED
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-200">AI Assistant:</span>
                  <Badge className="border-green-500/50 bg-green-500/30 px-3 py-1 text-green-300">
                    READY
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-200">Authentication:</span>
                  <Badge className="border-yellow-500/50 bg-yellow-500/30 px-3 py-1 text-yellow-300">
                    DEMO MODE
                  </Badge>
                </div>
              </div>
              <Button asChild className="cyber-button mt-8 w-full py-3 text-lg">
                <Link href="/system-check">
                  <Zap className="mr-2 h-5 w-5" />
                  Run Full Diagnostics
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )

  // Content for authenticated users
  const AuthenticatedContent = () => (
    <div className="relative z-10 space-y-8">
      <div className="animate-fade-in text-center">
        <h1 className="text-cyber text-glow mb-6 text-6xl font-bold">
          Welcome Back, {user?.name || 'User'}!
        </h1>
        <p className="mb-6 text-2xl text-cyan-300">
          Classical Studies Research & Publication Platform
        </p>
        <Badge className="cyber-badge pulse-glow data-stream mb-8 px-4 py-2 text-lg">
          <User className="mr-2 h-4 w-4" />
          {user?.role?.toUpperCase() || 'USER'} ACCESS GRANTED
        </Badge>
      </div>

      <Tabs defaultValue="dashboard" className="animate-slide-up w-full">
        <TabsList className="cyber-tabs grid h-auto w-full grid-cols-4 p-2">
          <TabsTrigger
            value="dashboard"
            className="cyber-tab-trigger py-3 text-base"
          >
            <Database className="mr-2 h-5 w-5" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="research"
            className="cyber-tab-trigger py-3 text-base"
          >
            <Search className="mr-2 h-5 w-5" />
            Research
          </TabsTrigger>
          <TabsTrigger
            value="publish"
            className="cyber-tab-trigger py-3 text-base"
          >
            <PenTool className="mr-2 h-5 w-5" />
            Publish
          </TabsTrigger>
          <TabsTrigger
            value="manage"
            className="cyber-tab-trigger py-3 text-base"
          >
            <Settings className="mr-2 h-5 w-5" />
            Manage
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="dashboard"
          className="animate-slide-up mt-8 space-y-8"
        >
          <h2 className="text-glow text-4xl font-semibold text-cyan-300">
            System Dashboard
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cyber-card hover:cyber-glow holographic transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-cyan-300">
                  <BarChart3 className="h-6 w-6 text-cyan-400" />
                  My Articles
                </CardTitle>
                <CardDescription className="text-base text-cyan-400/80">
                  Manage your published research
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-glow mb-4 text-4xl font-bold text-cyan-400">
                  12
                </div>
                <Button asChild className="cyber-button w-full py-3 text-lg">
                  <Link href="/dashboard/my-articles">Access Articles</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cyber-card hover:cyber-glow holographic transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-cyan-300">
                  <PenTool className="h-6 w-6 text-orange-400" />
                  In Review
                </CardTitle>
                <CardDescription className="text-base text-cyan-400/80">
                  Articles pending review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-glow mb-4 text-4xl font-bold text-orange-400">
                  3
                </div>
                <Button asChild className="cyber-button w-full py-3 text-lg">
                  <Link href="/dashboard/in-review">Check Status</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cyber-card hover:cyber-glow holographic transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-cyan-300">
                  <Cpu className="h-6 w-6 text-green-400" />
                  System Status
                </CardTitle>
                <CardDescription className="text-base text-cyan-400/80">
                  Platform health monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-glow mb-4 text-4xl font-bold text-green-400">
                  ✓
                </div>
                <Button asChild className="cyber-button w-full py-3 text-lg">
                  <Link href="/system-check">Run Diagnostics</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="research"
          className="animate-slide-up mt-8 space-y-8"
        >
          <h2 className="text-glow text-4xl font-semibold text-cyan-300">
            Research Tools
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="cyber-card hover:cyber-glow holographic transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-cyan-300">
                  <Search className="h-6 w-6 text-cyan-400" />
                  Research Gallery
                </CardTitle>
                <CardDescription className="text-base text-cyan-400/80">
                  AI-powered research assistance and multi-source search
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="cyber-button w-full py-3 text-lg">
                  <Link href="/research-gallery">Initialize Research</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cyber-card hover:cyber-glow holographic transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-cyan-300">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                  Browse Articles
                </CardTitle>
                <CardDescription className="text-base text-cyan-400/80">
                  Explore published research and academic papers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="cyber-button w-full py-3 text-lg">
                  <Link href="/articles">Access Database</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="publish"
          className="animate-slide-up mt-8 space-y-8"
        >
          <h2 className="text-glow text-4xl font-semibold text-cyan-300">
            Publishing Tools
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="cyber-card hover:cyber-glow holographic transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-cyan-300">
                  <PenTool className="h-6 w-6 text-green-400" />
                  Submit Article
                </CardTitle>
                <CardDescription className="text-base text-cyan-400/80">
                  Submit new research for publication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="cyber-button w-full py-3 text-lg">
                  <Link href="/submit-article">Initialize Upload</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cyber-card hover:cyber-glow holographic transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-cyan-300">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                  Published Works
                </CardTitle>
                <CardDescription className="text-base text-cyan-400/80">
                  View and manage your published articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="cyber-button w-full py-3 text-lg">
                  <Link href="/dashboard/published">Access Published</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manage" className="animate-slide-up mt-8 space-y-8">
          <h2 className="text-glow text-4xl font-semibold text-cyan-300">
            Management Tools
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="cyber-card hover:cyber-glow holographic transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-cyan-300">
                  <Archive className="h-6 w-6 text-yellow-400" />
                  Archive
                </CardTitle>
                <CardDescription className="text-base text-cyan-400/80">
                  Manage archived content and historical data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="cyber-button w-full py-3 text-lg">
                  <Link href="/archive">Access Archive</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cyber-card hover:cyber-glow holographic transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-cyan-300">
                  <Terminal className="h-6 w-6 text-pink-400" />
                  API Testing
                </CardTitle>
                <CardDescription className="text-base text-cyan-400/80">
                  Test platform integrations and external APIs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="cyber-button w-full py-3 text-lg">
                  <Link href="/api-testing">Run Tests</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-glow mb-10 text-center text-4xl font-semibold text-cyan-300">
          Activity Matrix
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <Card className="cyber-card pulse-glow holographic text-center">
            <CardHeader className="pb-6">
              <CardTitle className="text-glow mb-2 text-5xl font-bold text-cyan-400">
                12
              </CardTitle>
              <CardDescription className="text-base text-cyan-300">
                Articles Submitted
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="cyber-card pulse-glow holographic text-center">
            <CardHeader className="pb-6">
              <CardTitle className="text-glow mb-2 text-5xl font-bold text-green-400">
                8
              </CardTitle>
              <CardDescription className="text-base text-cyan-300">
                Published Works
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="cyber-card pulse-glow holographic text-center">
            <CardHeader className="pb-6">
              <CardTitle className="text-glow mb-2 text-5xl font-bold text-blue-400">
                156
              </CardTitle>
              <CardDescription className="text-base text-cyan-300">
                Research Queries
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="cyber-card pulse-glow holographic text-center">
            <CardHeader className="pb-6">
              <CardTitle className="text-glow mb-2 text-5xl font-bold text-pink-400">
                2.4k
              </CardTitle>
              <CardDescription className="text-base text-cyan-300">
                Article Views
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  )

  return (
    <div className="container relative mx-auto px-6 py-12">
      <CyberBackground />
      {isAuthenticated ? <AuthenticatedContent /> : <PublicContent />}
    </div>
  )
}
