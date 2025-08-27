import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from '@/components/ApolloWrapper'
import { DevAuthProvider } from '@/components/DevAuthProvider'
import { Header } from '@/components/Header'
import { DevToggle } from '@/components/DevToggle'
import { WebVitalsMonitor } from '@/components/WebVitalsMonitor'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import './globals.css'

// Force dynamic rendering for all pages
export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Pegasoi Research Platform - Academic Research Discovery',
    template: '%s | Pegasoi Research Platform',
  },
  description:
    'Discover academic research papers across multiple sources including ArXiv, DOAJ, Crossref, and Getty Vocabulary. Web3-ready platform for researchers.',
  keywords: [
    'academic research',
    'research papers',
    'arxiv',
    'doaj',
    'crossref',
    'web3',
    'blockchain',
    'academic discovery',
    'research platform',
  ],
  authors: [{ name: 'Pegasoi Research Platform' }],
  creator: 'Pegasoi Research Platform',
  publisher: 'Pegasoi',
  robots: 'index, follow',
  manifest: '/manifest.json',
  icons: {
    icon: '/pegasoi-favicon-32.png',
    apple: '/pegasoi-logo-1024.png',
    shortcut: '/pegasoi-favicon-32.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pegasoi.com',
    siteName: 'Pegasoi Research Platform',
    title: 'Pegasoi Research Platform - Academic Research Discovery',
    description:
      'Discover academic research papers across multiple sources including ArXiv, DOAJ, Crossref, and Getty Vocabulary. Web3-ready platform for researchers.',
    images: [
      {
        url: '/pegasoi-logo-1024.png',
        width: 1024,
        height: 1024,
        alt: 'Pegasoi Research Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pegasoi Research Platform - Academic Research Discovery',
    description:
      'Discover academic research papers across multiple sources including ArXiv, DOAJ, Crossref, and Getty Vocabulary.',
    images: ['/pegasoi-logo-1024.png'],
    creator: '@pegasoi',
  },
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
    <ApolloWrapper>
      <DevAuthProvider>
        <html lang="en" className="dark">
          <body
            className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900`}
          >
            <WebVitalsMonitor />
            <ErrorBoundary>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <DevToggle />
              </div>
            </ErrorBoundary>
          </body>
        </html>
      </DevAuthProvider>
    </ApolloWrapper>
  )
}
