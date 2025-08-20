import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Force dynamic rendering for all pages
export const dynamic = 'force-dynamic'
import { ClerkProvider } from '@clerk/nextjs'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apollo-client'
import { AuthProvider } from '@/components/AuthProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { CookieConsent } from '@/components/CookieConsent'
import { BackToTop } from '@/components/BackToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Research Portal - Classical Studies Research & Publication Platform',
  description:
    'Advanced research platform for classical studies with AI-powered assistance and multi-source search capabilities.',
  keywords: 'research, classical studies, academic, publication, AI assistant',
  authors: [{ name: 'Research Portal Team' }],
  manifest: '/manifest.json',
  generator: 'v0.app',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00ffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ApolloProvider client={apolloClient}>
        <html lang="en" className="dark">
          <body className={inter.className}>
            <AuthProvider>
              <ErrorBoundary>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <CookieConsent />
                <BackToTop />
              </ErrorBoundary>
            </AuthProvider>
          </body>
        </html>
      </ApolloProvider>
    </ClerkProvider>
  )
}
