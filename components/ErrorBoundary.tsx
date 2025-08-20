'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Error logging can be handled by external services
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <Card className="cyber-card w-full max-w-md">
            <CardHeader className="text-center">
              <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-400" />
              <CardTitle className="text-cyan-300">
                System Error Detected
              </CardTitle>
              <CardDescription className="text-cyan-400">
                An unexpected error occurred in the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.error && (
                <div className="rounded border border-red-500/20 bg-red-500/10 p-3">
                  <p className="font-mono text-sm text-red-300">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              <Button
                onClick={() =>
                  this.setState({ hasError: false, error: undefined })
                }
                className="cyber-button w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Restart System
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
