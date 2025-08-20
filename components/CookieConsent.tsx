'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Cookie, X } from 'lucide-react'

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="animate-slide-up fixed bottom-4 left-4 right-4 z-50">
      <Card className="cyber-card mx-auto max-w-md">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Cookie className="mt-0.5 h-5 w-5 text-cyan-400" />
            <div className="flex-1">
              <p className="mb-3 text-sm text-cyan-300">
                We use cookies to enhance your experience and analyze site
                usage. Your privacy is important to us.
              </p>
              <div className="flex space-x-2">
                <Button
                  onClick={acceptCookies}
                  size="sm"
                  className="cyber-button flex-1"
                >
                  Accept
                </Button>
                <Button
                  onClick={declineCookies}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-cyan-500/30 bg-transparent text-cyan-300 hover:bg-cyan-500/10"
                >
                  Decline
                </Button>
              </div>
            </div>
            <Button
              onClick={declineCookies}
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-cyan-400 hover:text-cyan-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
