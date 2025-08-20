'use client'

import { useState, useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Search, Clock, Zap, Database } from 'lucide-react'
import { SEARCH_PAPERS } from '@/lib/graphql/queries'
import { debounce } from 'lodash'

interface SearchResult {
  title: string
  authors: string[]
  abstract: string
  source: string
  url: string
  year?: number
  journal?: string
  doi?: string
  classics_relevance?: number
}

interface SearchResponse {
  ok: boolean
  data: {
    entries: SearchResult[]
    total: number
    cached?: boolean
    response_time?: number
  }
  error?: string
}

export function RedisOptimizedSearch() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([
    'arxiv',
    'doaj',
    'crossref',
  ])

  // Debounced search to reduce Redis load
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim().length >= 3) {
        setDebouncedQuery(searchQuery.trim())
      }
    }, 500),
    [setDebouncedQuery]
  )

  useEffect(() => {
    debouncedSearch(query)
    return () => {
      debouncedSearch.cancel()
    }
  }, [query, debouncedSearch])

  // GraphQL query with Redis caching
  const { data, loading, error } = useQuery<{ searchPapers: SearchResponse }>(
    SEARCH_PAPERS,
    {
      variables: {
        query: debouncedQuery,
        sources: selectedSources,
        limit: 20,
      },
      skip: !debouncedQuery,
      fetchPolicy: 'cache-first', // Use Redis cache when available
      errorPolicy: 'all',
    }
  )

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim() && !searchHistory.includes(searchQuery.trim())) {
      setSearchHistory((prev) => [searchQuery.trim(), ...prev.slice(0, 4)])
    }
  }

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery)
    setDebouncedQuery(historyQuery)
  }

  const toggleSource = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    )
  }

  const searchResults = data?.searchPapers
  const responseTime = searchResults?.data?.response_time
  const isCached = searchResults?.data?.cached
  const totalResults = searchResults?.data?.total || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-gradient-to-r from-green-500 to-blue-600 p-2">
          <Database className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
            Redis-Optimized Search
          </h2>
          <p className="text-muted-foreground">
            Lightning-fast search with Redis caching and real-time results
          </p>
        </div>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Academic Paper Search
            {isCached && (
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <Zap className="mr-1 h-3 w-3" />
                Cached
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Search academic papers... (min 3 characters)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              className="flex-1"
            />
            <Button
              onClick={() => handleSearch(query)}
              disabled={query.trim().length < 3 || loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Source Selection */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium">Sources:</span>
            {['arxiv', 'doaj', 'crossref', 'getty'].map((source) => (
              <Badge
                key={source}
                variant={
                  selectedSources.includes(source) ? 'default' : 'outline'
                }
                className="cursor-pointer"
                onClick={() => toggleSource(source)}
              >
                {source.toUpperCase()}
              </Badge>
            ))}
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Recent:</span>
              {searchHistory.map((historyQuery, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleHistoryClick(historyQuery)}
                >
                  <Clock className="mr-1 h-3 w-3" />
                  {historyQuery}
                </Badge>
              ))}
            </div>
          )}

          {/* Performance Metrics */}
          {responseTime && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Response time: {responseTime}ms</span>
              <span>Results: {totalResults}</span>
              <span>Cache: {isCached ? 'HIT' : 'MISS'}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>Search error: {error.message}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          <span>Searching Redis cache and external sources...</span>
        </div>
      )}

      {/* Search Results */}
      {searchResults?.ok && searchResults.data.entries.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Search Results ({totalResults} found)
            </h3>
            {isCached && (
              <Badge variant="outline" className="bg-green-50">
                <Database className="mr-1 h-3 w-3" />
                Served from Redis Cache
              </Badge>
            )}
          </div>

          <div className="grid gap-4">
            {searchResults.data.entries.map((result, index) => (
              <Card key={index} className="transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="text-lg font-semibold leading-tight">
                        {result.url ? (
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-blue-600"
                          >
                            {result.title}
                          </a>
                        ) : (
                          result.title
                        )}
                      </h4>
                      <Badge variant="outline">
                        {result.source.toUpperCase()}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      By {result.authors.join(', ')}
                      {result.year && ` • ${result.year}`}
                      {result.journal && ` • ${result.journal}`}
                    </p>

                    <p className="text-sm leading-relaxed">{result.abstract}</p>

                    {result.classics_relevance && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Classics Relevance:
                        </span>
                        <Badge variant="secondary">
                          {(result.classics_relevance * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchResults?.ok &&
        searchResults.data.entries.length === 0 &&
        debouncedQuery && (
          <div className="py-8 text-center text-muted-foreground">
            <Search className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p>No results found for &quot;{debouncedQuery}&quot;</p>
            <p className="mt-2 text-sm">
              Try different keywords or check your spelling
            </p>
          </div>
        )}
    </div>
  )
}
