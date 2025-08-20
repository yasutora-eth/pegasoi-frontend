'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Error logging can be handled by external services
  }, [error])

  return (
    <div className="container mx-auto flex min-h-[50vh] items-center justify-center px-4 py-8">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Application Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            An unexpected error occurred. Our team has been notified.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details className="text-sm">
              <summary className="cursor-pointer">Error details</summary>
              <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-xs">
                {error.message}
              </pre>
            </details>
          )}
          <Button onClick={reset} className="w-full">
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
