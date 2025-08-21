import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DevAuthProvider } from '@/components/DevAuthProvider'
import { Header } from '@/components/Header'
import { DevToggle } from '@/components/DevToggle'
import '../styles/globals.css'

// Force dynamic rendering for all pages
export const dynamic = 'force-dynamic'

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
    <DevAuthProvider>
      <html lang="en" className="dark">
        <body className={inter.className}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <DevToggle />
          </div>
        </body>
      </html>
    </DevAuthProvider>
  )
}
