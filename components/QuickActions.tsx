"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { apiService } from "@/lib/api"
import { Loader2, Database, TestTube, Zap, CheckCircle } from "lucide-react"

export function QuickActions() {
  const [loading, setLoading] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, any>>({})

  const runAction = async (actionName: string, action: () => Promise<any>) => {
    setLoading(actionName)
    try {
      const result = await action()
      setResults((prev) => ({ ...prev, [actionName]: { success: true, data: result } }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [actionName]: {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        },
      }))
    } finally {
      setLoading(null)
    }
  }

  const actions = [
    {
      name: "testConnection",
      label: "Test KV Connection",
      icon: <Database className="h-4 w-4" />,
      action: () => fetch("/api/test-connection").then((r) => r.json()),
    },
    {
      name: "healthCheck",
      label: "Health Check",
      icon: <TestTube className="h-4 w-4" />,
      action: () => fetch("/api/health").then((r) => r.json()),
    },
    {
      name: "loadArticles",
      label: "Load Articles",
      icon: <Zap className="h-4 w-4" />,
      action: () => apiService.getArticles(),
    },
    {
      name: "createSample",
      label: "Create Sample Article",
      icon: <CheckCircle className="h-4 w-4" />,
      action: async () => {
        const sample = {
          title: `Sample Article ${Date.now()}`,
          content:
            "This is a sample article created for testing purposes. It demonstrates the article creation functionality.",
          author: "System Test",
          reference: "Quick Actions Test",
        }
        return apiService.createArticle(sample)
      },
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => (
            <Button
              key={action.name}
              variant="outline"
              size="sm"
              onClick={() => runAction(action.name, action.action)}
              disabled={loading === action.name}
              className="justify-start"
            >
              {loading === action.name ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <span className="mr-2">{action.icon}</span>
              )}
              {action.label}
            </Button>
          ))}
        </div>

        {Object.keys(results).length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Results:</h4>
            {Object.entries(results).map(([actionName, result]) => (
              <div key={actionName} className="text-xs p-2 bg-muted/50 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{actionName}</span>
                  <Badge variant={result.success ? "default" : "destructive"}>
                    {result.success ? "Success" : "Error"}
                  </Badge>
                </div>
                {result.success ? (
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(result.data, null, 2).substring(0, 200)}
                    {JSON.stringify(result.data, null, 2).length > 200 ? "..." : ""}
                  </pre>
                ) : (
                  <div className="text-destructive">{result.error}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
