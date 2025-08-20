"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Loader2, Server, Database, Zap } from "lucide-react"
import { apiService, type HealthStatus } from "@/lib/api"

export function SystemStatus() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [connectionTest, setConnectionTest] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkHealth = async () => {
    setLoading(true)
    setError(null)

    try {
      // Test basic connection first
      const connectionResult = await apiService.testConnection()
      setConnectionTest(connectionResult)

      // Then try health endpoint
      const healthResult = await apiService.healthCheck()
      setHealth(healthResult)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkHealth()
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "unhealthy":
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variant = status === "healthy" || status === "connected" ? "default" : "destructive"
    return <Badge variant={variant}>{status}</Badge>
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Backend System Status
          {connectionTest && getStatusIcon("connected")}
        </CardTitle>
        <Button onClick={checkHealth} disabled={loading} variant="outline" size="sm">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
          Check
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="text-destructive text-sm bg-destructive/10 p-3 rounded">
            <div className="font-medium">Connection Error:</div>
            <div>{error}</div>
            <div className="mt-2 text-xs">
              Make sure the backend is running: <code>cd backend && uvicorn main:app --reload</code>
            </div>
          </div>
        )}

        {connectionTest && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Backend Connection</h4>
            <div className="p-2 bg-muted/50 rounded text-xs">
              <div>✅ Service: {connectionTest.service}</div>
              <div>✅ Version: {connectionTest.version}</div>
              <div>✅ Environment: {connectionTest.environment}</div>
              <div>✅ CORS: {connectionTest.cors_origins?.length || 0} origins configured</div>
            </div>
          </div>
        )}

        {health && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Overall Status</p>
                {getStatusBadge(health.status)}
              </div>
              <div>
                <p className="text-sm font-medium">Environment</p>
                <Badge variant="outline">{health.environment}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Database className="h-4 w-4" />
                Services
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(health.services).map(([service, status]) => (
                  <div key={service} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm capitalize">{service}</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      {getStatusBadge(status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <div>Last checked: {new Date(health.timestamp).toLocaleString()}</div>
              <div>Version: {health.version}</div>
              <div>Backend URL: {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}</div>
            </div>
          </>
        )}

        {!connectionTest && !health && !loading && (
          <div className="text-center py-4">
            <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Click &ldquo;Check&rdquo; to test backend connection</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
