'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { apiService } from '@/lib/api'
import { Loader2, Database, TestTube, Zap, CheckCircle } from 'lucide-react'

export function QuickActions() {
  const [loading, setLoading] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, unknown>>({})

  const runAction = async (
    actionName: string,
    action: () => Promise<unknown>
  ) => {
    setLoading(actionName)
    try {
      const result = await action()
      setResults((prev) => ({
        ...prev,
        [actionName]: { success: true, data: result },
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [actionName]: {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }))
    } finally {
      setLoading(null)
    }
  }

  const actions = [
    {
      name: 'testConnection',
      label: 'Test KV Connection',
      icon: <Database className="h-4 w-4" />,
      action: () => fetch('/api/test-connection').then((r) => r.json()),
    },
    {
      name: 'healthCheck',
      label: 'Health Check',
      icon: <TestTube className="h-4 w-4" />,
      action: () => fetch('/api/health').then((r) => r.json()),
    },
    {
      name: 'loadArticles',
      label: 'Load Articles',
      icon: <Zap className="h-4 w-4" />,
      action: () => apiService.getArticles(),
    },
    {
      name: 'createSample',
      label: 'Create Sample Article',
      icon: <CheckCircle className="h-4 w-4" />,
      action: async () => {
        const sample = {
          title: `Sample Article ${Date.now()}`,
          content:
            'This is a sample article created for testing purposes. It demonstrates the article creation functionality.',
          abstract: 'A sample article for testing the article creation system.',
          authors: ['System Test'],
          keywords: ['test', 'sample', 'demo'],
          publicationDate: new Date().toISOString(), // Backend expects camelCase
          journal: 'Test Journal',
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
              <div key={actionName} className="rounded bg-muted/50 p-2 text-xs">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-medium">{actionName}</span>
                  <Badge
                    variant={
                      (result as any).success ? 'default' : 'destructive'
                    }
                  >
                    {(result as any).success ? 'Success' : 'Error'}
                  </Badge>
                </div>
                {(result as any).success ? (
                  <pre className="overflow-auto text-xs">
                    {JSON.stringify((result as any).data, null, 2).substring(
                      0,
                      200
                    )}
                    {JSON.stringify((result as any).data, null, 2).length > 200
                      ? '...'
                      : ''}
                  </pre>
                ) : (
                  <div className="text-destructive">
                    {String((result as any).error)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
