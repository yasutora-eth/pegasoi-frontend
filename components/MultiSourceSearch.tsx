'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Loader2,
  Search,
  ExternalLink,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'
import { apiService, type SearchResult } from '@/lib/api'

export function MultiSourceSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setResults(null)

    try {
      // Use legacy method for backward compatibility with existing UI
      const searchResults = await apiService.searchAllSourcesLegacy(query.trim())
      setResults(searchResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  const renderSourceResults = (
    source: string,
    data: Record<string, unknown>
  ) => {
    if (!data)
      return <div className="text-muted-foreground">No data available</div>

    if (!data.ok) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error: {String((data as any).error || 'Unknown error')}
          </AlertDescription>
        </Alert>
      )
    }

    // Handle different response formats
    if (typeof data.data === 'string') {
      // ArXiv returns XML
      return (
        <div className="space-y-2">
          <Badge variant="outline">XML Response</Badge>
          <ScrollArea className="h-32 rounded border p-2">
            <pre className="text-xs">{data.data.substring(0, 500)}...</pre>
          </ScrollArea>
        </div>
      )
    }

    if (typeof data.data === 'object') {
      // JSON responses
      return (
        <div className="space-y-2">
          <Badge variant="outline">JSON Response</Badge>
          <ScrollArea className="h-32 rounded border p-2">
            <pre className="text-xs">
              {JSON.stringify(data.data, null, 2).substring(0, 500)}...
            </pre>
          </ScrollArea>
        </div>
      )
    }

    return <div className="text-muted-foreground">Unexpected data format</div>
  }

  const getSourceIcon = (source: string, data: Record<string, unknown>) => {
    if (!data) return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    return data.ok ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-500" />
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Multi-Source Academic Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search across ArXiv, DOAJ, Crossref, Getty..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !query.trim()}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            Search
          </Button>
        </form>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {results && (
          <Tabs defaultValue="arxiv" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="arxiv" className="flex items-center gap-2">
                {getSourceIcon('arxiv', results.arxiv)}
                ArXiv
              </TabsTrigger>
              <TabsTrigger value="doaj" className="flex items-center gap-2">
                {getSourceIcon('doaj', results.doaj)}
                DOAJ
              </TabsTrigger>
              <TabsTrigger value="crossref" className="flex items-center gap-2">
                {getSourceIcon('crossref', results.crossref)}
                Crossref
              </TabsTrigger>
              <TabsTrigger value="getty" className="flex items-center gap-2">
                {getSourceIcon('getty', results.getty)}
                Getty
              </TabsTrigger>
            </TabsList>

            <TabsContent value="arxiv" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    ArXiv Results
                    <ExternalLink className="h-4 w-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderSourceResults('arxiv', results.arxiv)}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="doaj" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    DOAJ Results
                    <ExternalLink className="h-4 w-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderSourceResults('doaj', results.doaj)}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="crossref" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    Crossref Results
                    <ExternalLink className="h-4 w-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderSourceResults('crossref', results.crossref)}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="getty" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    Getty Results
                    <ExternalLink className="h-4 w-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderSourceResults('getty', results.getty)}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
