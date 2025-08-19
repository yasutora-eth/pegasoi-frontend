"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
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
} from "lucide-react"
// import { useAuth } from "@/components/AuthProvider"

export function CyberBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Cyberpunk floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-600/10 rounded-full blur-xl floating-element"></div>
      <div
        className="absolute top-1/3 right-32 w-24 h-24 bg-gradient-to-br from-pink-400/15 to-cyan-400/8 rounded-full blur-lg floating-element"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-600/15 to-pink-400/8 rounded-full blur-2xl floating-element"
        style={{ animationDelay: "4s" }}
      ></div>
      <div
        className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-gradient-to-br from-cyan-400/12 to-purple-600/6 rounded-full blur-xl floating-element"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-pink-400/18 to-transparent rounded-full blur-md floating-element"
        style={{ animationDelay: "3s" }}
      ></div>
      <div
        className="absolute top-3/4 right-20 w-20 h-20 bg-gradient-to-br from-cyan-400/12 to-transparent rounded-full blur-lg floating-element"
        style={{ animationDelay: "5s" }}
      ></div>
    </div>
  )
}

export default function Home() {
  // Temporary no-auth version for development
  const isAuthenticated = false
  const user = null
  const toggleAuth = () => console.log('Auth disabled for development')
  const setRole = () => console.log('Role setting disabled for development')

  // Content for unauthenticated users
  const PublicContent = () => (
    <div className="space-y-8 relative z-10">
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl font-bold mb-6 text-cyber text-glow">Research Portal</h1>
        <p className="text-2xl text-cyan-300 mb-6">Classical Studies Research & Publication Platform</p>
        <Badge className="mb-8 cyber-badge pulse-glow data-stream">
          <Terminal className="h-4 w-4 mr-2" />
          Public Access - Initialize Login Protocol
        </Badge>
      </div>

      <section className="animate-slide-up">
        <h2 className="text-4xl font-semibold mb-10 text-center text-cyan-300 text-glow">System Access Points</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="cyber-card hover:cyber-glow transition-all duration-300 animate-scale-in holographic">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-cyan-300 text-lg">
                <BookOpen className="h-6 w-6 text-cyan-400" />
                Browse Articles
              </CardTitle>
              <CardDescription className="text-cyan-400/80 text-base">
                Explore published research in classical studies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full cyber-button text-lg py-3">
                <Link href="/articles">Access Database</Link>
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cyber-card hover:cyber-glow transition-all duration-300 animate-scale-in holographic"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-cyan-300 text-lg">
                <Search className="h-6 w-6 text-cyan-400" />
                Information
              </CardTitle>
              <CardDescription className="text-cyan-400/80 text-base">
                Learn about our platform and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full cyber-button text-lg py-3">
                <Link href="/information">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cyber-card hover:cyber-glow transition-all duration-300 animate-scale-in holographic"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-cyan-300 text-lg">
                <Settings className="h-6 w-6 text-cyan-400" />
                API Testing
              </CardTitle>
              <CardDescription className="text-cyan-400/80 text-base">
                Test our research APIs and integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full cyber-button text-lg py-3">
                <Link href="/api-testing">Run Tests</Link>
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cyber-card hover:cyber-glow transition-all duration-300 animate-scale-in holographic"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-cyan-300 text-lg">
                <Zap className="h-6 w-6 text-cyan-400" />
                Initialize
              </CardTitle>
              <CardDescription className="text-cyan-400/80 text-base">Join our research community</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={toggleAuth} className="w-full cyber-button text-lg py-3">
                Boot System
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-4xl font-semibold mb-10 text-center text-cyan-300 text-glow">Access Level Selection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center cyber-card hover:cyber-glow transition-all duration-300 holographic">
            <CardHeader className="pb-6">
              <User className="h-16 w-16 mx-auto text-blue-400 mb-6" />
              <CardTitle className="text-cyan-300 text-xl">User Access</CardTitle>
              <CardDescription className="text-cyan-400/80 text-base">
                Browse and search research articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => {
                  toggleAuth()
                  setTimeout(() => setRole("user"), 100)
                }}
                className="w-full cyber-button text-lg py-3"
              >
                Initialize User Mode
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center cyber-card hover:cyber-glow transition-all duration-300 holographic">
            <CardHeader className="pb-6">
              <Shield className="h-16 w-16 mx-auto text-green-400 mb-6" />
              <CardTitle className="text-cyan-300 text-xl">Publisher Access</CardTitle>
              <CardDescription className="text-cyan-400/80 text-base">Submit and manage articles</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => {
                  toggleAuth()
                  setTimeout(() => setRole("publisher"), 100)
                }}
                className="w-full cyber-button text-lg py-3"
              >
                Initialize Publisher Mode
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center cyber-card hover:cyber-glow transition-all duration-300 holographic">
            <CardHeader className="pb-6">
              <Crown className="h-16 w-16 mx-auto text-yellow-400 mb-6" />
              <CardTitle className="text-cyan-300 text-xl">Admin Access</CardTitle>
              <CardDescription className="text-cyan-400/80 text-base">Full platform management</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => {
                  toggleAuth()
                  setTimeout(() => setRole("admin"), 100)
                }}
                className="w-full cyber-button text-lg py-3"
              >
                Initialize Admin Mode
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-4xl font-semibold mb-10 text-center text-cyan-300 text-glow">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="cyber-card holographic">
            <CardHeader>
              <CardTitle className="text-cyan-300 text-xl">Latest Publications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-base">
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full pulse-glow"></div>
                  <span className="text-cyan-200">"Roman Architecture in the Imperial Period"</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full pulse-glow"></div>
                  <span className="text-cyan-200">"Greek Pottery: Styles and Techniques"</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full pulse-glow"></div>
                  <span className="text-cyan-200">"Egyptian Hieroglyphic Evolution"</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full pulse-glow"></div>
                  <span className="text-cyan-200">"Classical Literature Analysis"</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full pulse-glow"></div>
                  <span className="text-cyan-200">"Byzantine Art and Culture"</span>
                </li>
              </ul>
              <Button asChild className="mt-8 w-full cyber-button text-lg py-3">
                <Link href="/articles">Access Full Database</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cyber-card holographic">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-cyan-300 text-xl">
                <Activity className="h-6 w-6" />
                System Diagnostics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5 text-base">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200">API Status:</span>
                  <Badge className="bg-green-500/30 text-green-300 border-green-500/50 px-3 py-1">OPERATIONAL</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200">Database:</span>
                  <Badge className="bg-green-500/30 text-green-300 border-green-500/50 px-3 py-1">CONNECTED</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200">AI Assistant:</span>
                  <Badge className="bg-green-500/30 text-green-300 border-green-500/50 px-3 py-1">READY</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200">Authentication:</span>
                  <Badge className="bg-yellow-500/30 text-yellow-300 border-yellow-500/50 px-3 py-1">DEMO MODE</Badge>
                </div>
              </div>
              <Button asChild className="mt-8 w-full cyber-button text-lg py-3">
                <Link href="/system-check">
                  <Zap className="h-5 w-5 mr-2" />
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
    <div className="space-y-8 relative z-10">
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl font-bold mb-6 text-cyber text-glow">Welcome Back, {user?.name}!</h1>
        <p className="text-2xl text-cyan-300 mb-6">Classical Studies Research & Publication Platform</p>
        <Badge className="mb-8 cyber-badge pulse-glow px-4 py-2 text-lg data-stream">
          <User className="h-4 w-4 mr-2" />
          {user?.role?.toUpperCase()} ACCESS GRANTED
        </Badge>
      </div>

      <Tabs defaultValue="dashboard" className="w-full animate-slide-up">
        <TabsList className="grid w-full grid-cols-4 cyber-tabs p-2 h-auto">
          <TabsTrigger value="dashboard" className="cyber-tab-trigger py-3 text-base">
            <Database className="h-5 w-5 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="research" className="cyber-tab-trigger py-3 text-base">
            <Search className="h-5 w-5 mr-2" />
            Research
          </TabsTrigger>
          <TabsTrigger value="publish" className="cyber-tab-trigger py-3 text-base">
            <PenTool className="h-5 w-5 mr-2" />
            Publish
          </TabsTrigger>
          <TabsTrigger value="manage" className="cyber-tab-trigger py-3 text-base">
            <Settings className="h-5 w-5 mr-2" />
            Manage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-8 animate-slide-up mt-8">
          <h2 className="text-4xl font-semibold text-cyan-300 text-glow">System Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="cyber-card hover:cyber-glow transition-all duration-300 holographic">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-cyan-300 text-xl">
                  <BarChart3 className="h-6 w-6 text-cyan-400" />
                  My Articles
                </CardTitle>
                <CardDescription className="text-cyan-400/80 text-base">Manage your published research</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-cyan-400 mb-4 text-glow">12</div>
                <Button asChild className="w-full cyber-button text-lg py-3">
                  <Link href="/dashboard/my-articles">Access Articles</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cyber-card hover:cyber-glow transition-all duration-300 holographic">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-cyan-300 text-xl">
                  <PenTool className="h-6 w-6 text-orange-400" />
                  In Review
                </CardTitle>
                <CardDescription className="text-cyan-400/80 text-base">Articles pending review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-orange-400 mb-4 text-glow">3</div>
                <Button asChild className="w-full cyber-button text-lg py-3">
                  <Link href="/dashboard/in-review">Check Status</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cyber-card hover:cyber-glow transition-all duration-300 holographic">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-cyan-300 text-xl">
                  <Cpu className="h-6 w-6 text-green-400" />
                  System Status
                </CardTitle>
                <CardDescription className="text-cyan-400/80 text-base">Platform health monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-400 mb-4 text-glow">✓</div>
                <Button asChild className="w-full cyber-button text-lg py-3">
                  <Link href="/system-check">Run Diagnostics</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="research" className="space-y-8 animate-slide-up mt-8">
          <h2 className="text-4xl font-semibold text-cyan-300 text-glow">Research Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="cyber-card hover:cyber-glow transition-all duration-300 holographic">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-cyan-300 text-xl">
                  <Search className="h-6 w-6 text-cyan-400" />
                  Research Gallery
                </CardTitle>
                <CardDescription className="text-cyan-400/80 text-base">
                  AI-powered research assistance and multi-source search
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full cyber-button text-lg py-3">
                  <Link href="/research-gallery">Initialize Research</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cyber-card hover:cyber-glow transition-all duration-300 holographic">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-cyan-300 text-xl">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                  Browse Articles
                </CardTitle>
                <CardDescription className="text-cyan-400/80 text-base">
                  Explore published research and academic papers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full cyber-button text-lg py-3">
                  <Link href="/articles">Access Database</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="publish" className="space-y-8 animate-slide-up mt-8">
          <h2 className="text-4xl font-semibold text-cyan-300 text-glow">Publishing Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="cyber-card hover:cyber-glow transition-all duration-300 holographic">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-cyan-300 text-xl">
                  <PenTool className="h-6 w-6 text-green-400" />
                  Submit Article
                </CardTitle>
                <CardDescription className="text-cyan-400/80 text-base">
                  Submit new research for publication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full cyber-button text-lg py-3">
                  <Link href="/submit-article">Initialize Upload</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cyber-card hover:cyber-glow transition-all duration-300 holographic">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-cyan-300 text-xl">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                  Published Works
                </CardTitle>
                <CardDescription className="text-cyan-400/80 text-base">
                  View and manage your published articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full cyber-button text-lg py-3">
                  <Link href="/dashboard/published">Access Published</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manage" className="space-y-8 animate-slide-up mt-8">
          <h2 className="text-4xl font-semibold text-cyan-300 text-glow">Management Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="cyber-card hover:cyber-glow transition-all duration-300 holographic">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-cyan-300 text-xl">
                  <Archive className="h-6 w-6 text-yellow-400" />
                  Archive
                </CardTitle>
                <CardDescription className="text-cyan-400/80 text-base">
                  Manage archived content and historical data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full cyber-button text-lg py-3">
                  <Link href="/archive">Access Archive</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="cyber-card hover:cyber-glow transition-all duration-300 holographic">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-cyan-300 text-xl">
                  <Terminal className="h-6 w-6 text-pink-400" />
                  API Testing
                </CardTitle>
                <CardDescription className="text-cyan-400/80 text-base">
                  Test platform integrations and external APIs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full cyber-button text-lg py-3">
                  <Link href="/api-testing">Run Tests</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-4xl font-semibold mb-10 text-center text-cyan-300 text-glow">Activity Matrix</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Card className="text-center cyber-card pulse-glow holographic">
            <CardHeader className="pb-6">
              <CardTitle className="text-5xl font-bold text-cyan-400 text-glow mb-2">12</CardTitle>
              <CardDescription className="text-cyan-300 text-base">Articles Submitted</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center cyber-card pulse-glow holographic">
            <CardHeader className="pb-6">
              <CardTitle className="text-5xl font-bold text-green-400 text-glow mb-2">8</CardTitle>
              <CardDescription className="text-cyan-300 text-base">Published Works</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center cyber-card pulse-glow holographic">
            <CardHeader className="pb-6">
              <CardTitle className="text-5xl font-bold text-blue-400 text-glow mb-2">156</CardTitle>
              <CardDescription className="text-cyan-300 text-base">Research Queries</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center cyber-card pulse-glow holographic">
            <CardHeader className="pb-6">
              <CardTitle className="text-5xl font-bold text-pink-400 text-glow mb-2">2.4k</CardTitle>
              <CardDescription className="text-cyan-300 text-base">Article Views</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  )

  return (
    <div className="container mx-auto px-6 py-12 relative">
      <CyberBackground />
      {isAuthenticated ? <AuthenticatedContent /> : <PublicContent />}
    </div>
  )
}
