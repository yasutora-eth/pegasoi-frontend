"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cookie, X } from "lucide-react"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
      <Card className="cyber-card max-w-md mx-auto">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Cookie className="h-5 w-5 text-cyan-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-cyan-300 mb-3">
                We use cookies to enhance your experience and analyze site usage. Your privacy is important to us.
              </p>
              <div className="flex space-x-2">
                <Button onClick={acceptCookies} size="sm" className="cyber-button flex-1">
                  Accept
                </Button>
                <Button
                  onClick={declineCookies}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 bg-transparent"
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
