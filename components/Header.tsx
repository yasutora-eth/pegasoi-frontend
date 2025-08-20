"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useAuth } from "@/components/AuthProvider"
import {
  Menu,
  X,
  User,

  LogIn,
  Home,
  BookOpen,
  Info,
  Settings,
  BarChart3,
  PenTool,
  Search,
  Archive,
  Zap,
} from "lucide-react"
import { useAuth } from "@/components/AuthProvider"

export function Header() {
  // Use Clerk authentication
  const { isAuthenticated, user, setRole } = useAuth()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { SignInButton, SignOutButton, UserButton } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const publicNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/articles", label: "Articles", icon: BookOpen },
    { href: "/information", label: "Information", icon: Info },
    { href: "/api-testing", label: "API Testing", icon: Settings },
  ]

  const authenticatedNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/graphql-dashboard", label: "GraphQL", icon: Zap },
    { href: "/articles", label: "Articles", icon: BookOpen },
    { href: "/submit-article", label: "Submit Article", icon: PenTool },
    { href: "/research-gallery", label: "Research Gallery", icon: Search },
    { href: "/archive", label: "Archive", icon: Archive },
    { href: "/system-check", label: "System Check", icon: Settings },
    { href: "/information", label: "Information", icon: Info },
  ]

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems

  return (
    <header className="sticky top-0 z-50 w-full cyber-card border-b border-cyan-500/30 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-cyan-100" />
            </div>
            <span className="text-xl font-bold text-cyber text-glow">Research Portal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.href}
                  asChild
                  variant="ghost"
                  className="text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/20 transition-colors"
                >
                  <Link href={item.href} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              )
            })}
          </nav>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user && (
              <div className="hidden md:flex items-center space-x-3">
                <Badge className="cyber-badge px-3 py-1">
                  <User className="h-3 w-3 mr-1" />
                  {user?.name || 'Guest'}
                </Badge>
                <Select value={user?.role || 'user'} onValueChange={setRole}>
                  <SelectTrigger className="w-32 bg-black/50 text-cyan-300 border-cyan-500/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="cyber-card border-cyan-500/30">
                    <SelectItem value="user" className="text-cyan-200 hover:bg-cyan-500/20">
                      User
                    </SelectItem>
                    <SelectItem value="publisher" className="text-cyan-200 hover:bg-cyan-500/20">
                      Publisher
                    </SelectItem>
                    <SelectItem value="admin" className="text-cyan-200 hover:bg-cyan-500/20">
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button disabled className="cyber-button flex items-center space-x-2">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login (Dev)</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyan-500/30 animate-slide-down">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className="justify-start text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href={item.href} className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                )
              })}
            </nav>

            {/* Mobile User Controls */}
            {isAuthenticated && user && (
              <div className="mt-4 pt-4 border-t border-cyan-500/30 space-y-3">
                <Badge className="cyber-badge px-3 py-1">
                  <User className="h-3 w-3 mr-1" />
                  {user?.name || 'Guest'}
                </Badge>
                <Select value={user?.role || 'user'} onValueChange={setRole}>
                  <SelectTrigger className="w-full bg-black/50 text-cyan-300 border-cyan-500/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="cyber-card border-cyan-500/30">
                    <SelectItem value="user" className="text-cyan-200 hover:bg-cyan-500/20">
                      User
                    </SelectItem>
                    <SelectItem value="publisher" className="text-cyan-200 hover:bg-cyan-500/20">
                      Publisher
                    </SelectItem>
                    <SelectItem value="admin" className="text-cyan-200 hover:bg-cyan-500/20">
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
