'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Loader2,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react'
import { RedisOptimizedSearch } from '@/components/RedisOptimizedSearch'
import { EnhancedMultiSourceSearch } from '@/components/EnhancedMultiSourceSearch'
import { MultiSourceSearch } from '@/components/MultiSourceSearch'

export default function SearchTestPage() {
  const [testResults, setTestResults] = useState<any[]>([])
  const [isTestingAPI, setIsTestingAPI] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<string>('redis')

  // Verified working parameters from the user
  const testQueries = [
    {
      query: 'python',
      sources: ['crossref', 'arxiv'],
      limit: 5,
      description: 'Python programming papers',
    },
    {
      query: 'machine learning',
      sources: ['crossref'],
      limit: 3,
      description: 'ML research papers (CrossRef only)',
    },
    {
      query: 'artificial intelligence',
      sources: ['arxiv', 'crossref'],
      limit: 10,
      description: 'AI research papers',
    },
    {
      query: 'quantum computing',
      sources: ['crossref', 'arxiv', 'doaj'],
      limit: 5,
      description: 'Quantum research papers',
    },
  ]

  const testBackendDirectly = async () => {
    setIsTestingAPI(true)
    setTestResults([])

    const results = []

    for (const testQuery of testQueries) {
      try {
        // Test REST API
        const restUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/search/papers?query=${encodeURIComponent(testQuery.query)}&sources=${testQuery.sources.join(',')}&limit=${testQuery.limit}`

        // Testing REST API endpoint

        const restResponse = await fetch(restUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          signal: AbortSignal.timeout(30000),
        })

        const restData = await restResponse.json()

        // Test GraphQL API
        const graphqlQuery = {
          query: `
            query SearchArticles($query: String!, $sources: [String!], $limit: Int) {
              search(query: $query, sources: $sources, limit: $limit) {
                title
                authors
                abstract
                source
                url
                relevanceScore
                doi
                journal
              }
            }
          `,
          variables: {
            query: testQuery.query,
            sources: testQuery.sources,
            limit: testQuery.limit,
          },
        }

        const graphqlResponse = await fetch(
          `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(graphqlQuery),
            signal: AbortSignal.timeout(30000),
          }
        )

        const graphqlData = await graphqlResponse.json()

        results.push({
          query: testQuery.query,
          description: testQuery.description,
          sources: testQuery.sources,
          limit: testQuery.limit,
          restSuccess: restResponse.ok,
          restResults: Array.isArray(restData) ? restData.length : 0,
          restData: restData,
          graphqlSuccess: !graphqlData.errors,
          graphqlResults: graphqlData.data?.search?.length || 0,
          graphqlData: graphqlData,
          timestamp: new Date().toISOString(),
        })
      } catch (error) {
        results.push({
          query: testQuery.query,
          description: testQuery.description,
          sources: testQuery.sources,
          limit: testQuery.limit,
          restSuccess: false,
          restResults: 0,
          restError: error instanceof Error ? error.message : 'Unknown error',
          graphqlSuccess: false,
          graphqlResults: 0,
          graphqlError:
            error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
        })
      }
    }

    setTestResults(results)
    setIsTestingAPI(false)
  }

  const renderTestResult = (result: any, index: number) => {
    const restStatus = result.restSuccess ? 'success' : 'error'
    const graphqlStatus = result.graphqlSuccess ? 'success' : 'error'

    return (
      <Card key={index} className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{result.description}</span>
            <Badge variant="outline">Query: "{result.query}"</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* REST API Results */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {result.restSuccess ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="font-semibold">REST API</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sources: {result.sources.join(', ')} | Limit: {result.limit}
              </p>
              <p className="text-sm">
                Results: <span className="font-mono">{result.restResults}</span>
              </p>
              {result.restError && (
                <p className="text-sm text-red-500">
                  Error: {result.restError}
                </p>
              )}
            </div>

            {/* GraphQL Results */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {result.graphqlSuccess ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="font-semibold">GraphQL API</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sources: {result.sources.join(', ')} | Limit: {result.limit}
              </p>
              <p className="text-sm">
                Results:{' '}
                <span className="font-mono">{result.graphqlResults}</span>
              </p>
              {result.graphqlError && (
                <p className="text-sm text-red-500">
                  Error: {result.graphqlError}
                </p>
              )}
            </div>
          </div>

          {/* Sample Results */}
          {(result.restResults > 0 || result.graphqlResults > 0) && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium">
                View Sample Results
              </summary>
              <div className="mt-2 space-y-2">
                {result.restResults > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold">REST API Sample:</h4>
                    <pre className="overflow-x-auto rounded bg-gray-100 p-2 text-xs">
                      {JSON.stringify(result.restData?.slice(0, 1), null, 2)}
                    </pre>
                  </div>
                )}
                {result.graphqlResults > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold">GraphQL Sample:</h4>
                    <pre className="overflow-x-auto rounded bg-gray-100 p-2 text-xs">
                      {JSON.stringify(
                        result.graphqlData?.data?.search?.slice(0, 1),
                        null,
                        2
                      )}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Search Functionality Test</h1>
        <p className="text-muted-foreground">
          Testing search components with verified working parameters
        </p>
        <Badge variant="outline" className="text-sm">
          Backend: {process.env.NEXT_PUBLIC_API_URL}
        </Badge>
      </div>

      {/* Direct API Testing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Direct Backend API Testing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Test the backend APIs directly with verified working parameters
          </p>
          <Button
            onClick={testBackendDirectly}
            disabled={isTestingAPI}
            className="w-full"
          >
            {isTestingAPI ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing APIs...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Test Backend APIs
              </>
            )}
          </Button>

          {testResults.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold">Test Results</h3>
              {testResults.map(renderTestResult)}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Component Testing */}
      <Card>
        <CardHeader>
          <CardTitle>Frontend Component Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={selectedComponent === 'redis' ? 'default' : 'outline'}
                onClick={() => setSelectedComponent('redis')}
              >
                Redis Optimized Search
              </Button>
              <Button
                variant={
                  selectedComponent === 'enhanced' ? 'default' : 'outline'
                }
                onClick={() => setSelectedComponent('enhanced')}
              >
                Enhanced Multi-Source
              </Button>
              <Button
                variant={selectedComponent === 'multi' ? 'default' : 'outline'}
                onClick={() => setSelectedComponent('multi')}
              >
                Multi-Source Search
              </Button>
            </div>

            <div className="rounded-lg border p-4">
              {selectedComponent === 'redis' && <RedisOptimizedSearch />}
              {selectedComponent === 'enhanced' && (
                <EnhancedMultiSourceSearch />
              )}
              {selectedComponent === 'multi' && <MultiSourceSearch />}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Test Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Verified Working Queries:</strong>
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>python - Returns academic papers about Python programming</li>
              <li>machine learning - Returns ML research papers</li>
              <li>artificial intelligence - Returns AI research papers</li>
              <li>quantum computing - Returns quantum research papers</li>
            </ul>
            <p className="mt-4">
              <strong>Expected Behavior:</strong>
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Backend APIs should return real academic paper data</li>
              <li>Frontend components should display search results</li>
              <li>
                If empty results [], there may be a temporary connectivity issue
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
