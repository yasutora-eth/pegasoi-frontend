"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

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

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="cyber-card max-w-md w-full">
            <CardHeader className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <CardTitle className="text-cyan-300">System Error Detected</CardTitle>
              <CardDescription className="text-cyan-400">
                An unexpected error occurred in the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                  <p className="text-red-300 text-sm font-mono">{this.state.error.message}</p>
                </div>
              )}
              <Button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="w-full cyber-button"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
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
