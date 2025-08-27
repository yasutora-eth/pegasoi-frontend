'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useUser, SignInButton, UserButton } from '@/components/DevAuthProvider'
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
} from 'lucide-react'

export function Header() {
  const { isSignedIn, user } = useUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const publicNavItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/articles', label: 'Articles', icon: BookOpen },
    { href: '/information', label: 'Information', icon: Info },
    { href: '/api-testing', label: 'API Testing', icon: Settings },
  ]

  const authenticatedNavItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/graphql-dashboard', label: 'GraphQL', icon: Zap },
    { href: '/articles', label: 'Articles', icon: BookOpen },
    { href: '/submit-article', label: 'Submit Article', icon: PenTool },
    { href: '/research-gallery', label: 'Research Gallery', icon: Search },
    { href: '/archive', label: 'Archive', icon: Archive },
    { href: '/system-check', label: 'System Check', icon: Settings },
    { href: '/information', label: 'Information', icon: Info },
  ]

  const navItems = isSignedIn ? authenticatedNavItems : publicNavItems

  return (
    <header className="cyber-card sticky top-0 z-50 w-full border-b border-cyan-500/30 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600">
              <BookOpen className="h-5 w-5 text-cyan-100" />
            </div>
            <span className="text-cyber text-glow text-xl font-bold">
              Research Portal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.href}
                  asChild
                  variant="ghost"
                  className="text-cyan-300 transition-colors hover:bg-cyan-500/20 hover:text-cyan-200"
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              )
            })}
          </nav>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            {isSignedIn && user && (
              <div className="hidden items-center space-x-3 md:flex">
                <Badge className="cyber-badge px-3 py-1">
                  <User className="mr-1 h-3 w-3" />
                  {user?.name || 'Guest'}
                </Badge>
                <UserButton />
              </div>
            )}

            {!isSignedIn && (
              <SignInButton>
                <Button className="cyber-button flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              </SignInButton>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="animate-slide-down border-t border-cyan-500/30 py-4 md:hidden">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className="justify-start text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                )
              })}
            </nav>

            {/* Mobile User Controls */}
            {isSignedIn && user && (
              <div className="mt-4 space-y-3 border-t border-cyan-500/30 pt-4">
                <Badge className="cyber-badge px-3 py-1">
                  <User className="mr-1 h-3 w-3" />
                  {user?.name || 'Guest'}
                </Badge>
                <UserButton />
              </div>
            )}

            {!isSignedIn && (
              <div className="mt-4 border-t border-cyan-500/30 pt-4">
                <SignInButton>
                  <Button className="cyber-button flex w-full items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                </SignInButton>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
