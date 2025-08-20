'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'

interface SearchResult {
  ok: boolean
  data?: {
    entries: Array<{
      title: string
      authors: string[]
      abstract?: string
      journal?: string
      year?: string
      source: string
      classics_relevance?: number
    }>
    total: number
  }
  fallback?: boolean
  error?: string
}

interface MultiSourceResults {
  arxiv: SearchResult
  doaj: SearchResult
  crossref: SearchResult
  getty: SearchResult
}

export default function ApiTestPage() {
  const [query, setQuery] = useState('ancient rome')
  const [results, setResults] = useState<MultiSourceResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedSource, setSelectedSource] = useState<string | null>(null)

  const testMultiSource = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/research-assistant?query=${encodeURIComponent(query)}`
      )
      const data = await response.json()
      setResults(data)
    } catch {
      // Error handled by error boundary
    } finally {
      setLoading(false)
    }
  }

  const testSingleSource = async (source: string) => {
    setLoading(true)
    setSelectedSource(source)
    try {
      const response = await fetch(
        `/api/research-assistant?query=${encodeURIComponent(query)}&source=${source}`
      )
      const data = await response.json()
      setResults({ [source]: data } as MultiSourceResults)
    } catch {
      // Error handled by error boundary
    } finally {
      setLoading(false)
      setSelectedSource(null)
    }
  }

  const getStatusBadge = (result: SearchResult) => {
    if (!result) return <Badge variant="secondary">Not tested</Badge>
    if (result.ok) {
      if (result.fallback) {
        return (
          <Badge variant="outline">Fallback ({result.data?.total || 0})</Badge>
        )
      }
      return (
        <Badge variant="default">Success ({result.data?.total || 0})</Badge>
      )
    }
    return <Badge variant="destructive">Failed</Badge>
  }

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">API Testing Dashboard</h1>
        <p className="text-muted-foreground">
          Test the research assistant APIs with real queries and see live
          results.
        </p>
      </div>

      {/* Test Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Test Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter search query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={testMultiSource}
              disabled={loading || !query.trim()}
            >
              {loading && !selectedSource ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Test All APIs
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {['arxiv', 'doaj', 'crossref', 'getty'].map((source) => (
              <Button
                key={source}
                variant="outline"
                size="sm"
                onClick={() => testSingleSource(source)}
                disabled={loading || !query.trim()}
              >
                {loading && selectedSource === source ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Test {source.toUpperCase()}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Overview */}
      {results && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>API Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Object.entries(results).map(([source, result]) => (
                <div key={source} className="text-center">
                  <div className="mb-2 font-semibold">
                    {source.toUpperCase()}
                  </div>
                  {getStatusBadge(result)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Results */}
      {results && (
        <div className="grid gap-6">
          {Object.entries(results).map(([source, result]) => (
            <Card key={source}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="capitalize">{source} Results</CardTitle>
                  {getStatusBadge(result)}
                </div>
              </CardHeader>
              <CardContent>
                {result.ok ? (
                  <div className="space-y-4">
                    {result.fallback && (
                      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                        <p className="text-sm text-yellow-800">
                          ⚠️ Using fallback data - API endpoint may be
                          unavailable
                        </p>
                      </div>
                    )}

                    <div className="mb-4 text-sm text-muted-foreground">
                      Found {result.data?.total || 0} results
                    </div>

                    {result.data?.entries
                      .slice(0, 3)
                      .map(
                        (
                          entry: NonNullable<
                            SearchResult['data']
                          >['entries'][0],
                          index: number
                        ) => (
                          <div key={index} className="rounded-lg border p-4">
                            <h4 className="mb-2 line-clamp-2 font-semibold">
                              {entry.title}
                            </h4>

                            <div className="mb-2 text-sm text-muted-foreground">
                              {entry.authors.length > 0 && (
                                <div>
                                  Authors:{' '}
                                  {entry.authors.slice(0, 3).join(', ')}
                                </div>
                              )}
                              {entry.journal && (
                                <div>Journal: {entry.journal}</div>
                              )}
                              {entry.year && <div>Year: {entry.year}</div>}
                            </div>

                            {entry.abstract && (
                              <p className="mb-2 line-clamp-3 text-sm">
                                {entry.abstract}
                              </p>
                            )}

                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">
                                {entry.source}
                              </Badge>
                              {entry.classics_relevance !== undefined &&
                                entry.classics_relevance !== null && (
                                  <Badge variant="outline" className="text-xs">
                                    Relevance:{' '}
                                    {(
                                      Number(entry.classics_relevance) * 100
                                    ).toFixed(0)}
                                    %
                                  </Badge>
                                )}
                            </div>
                          </div>
                        )
                      )}
                  </div>
                ) : (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-red-800">
                      ❌ API Error: {result.error || 'Unknown error occurred'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Sample Queries */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Sample Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              'ancient rome',
              'greek philosophy',
              'roman archaeology',
              'classical literature',
              'byzantine empire',
              'ancient egypt',
            ].map((sampleQuery) => (
              <Button
                key={sampleQuery}
                variant="ghost"
                size="sm"
                onClick={() => setQuery(sampleQuery)}
                className="text-xs"
              >
                {sampleQuery}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
