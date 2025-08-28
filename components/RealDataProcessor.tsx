'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Loader2,
  ExternalLink,
  BookOpen,
  Calendar,
  User,
  LinkIcon,
} from 'lucide-react'

interface ArxivEntry {
  title: string
  summary: string
  authors: string[]
  published: string
  link: string
  categories: string[]
}

interface DoajArticle {
  bibjson: {
    title: string
    abstract?: string
    author?: Array<{ name: string }>
    year?: string
    journal?: { title: string }
    link?: Array<{ url: string }>
    subject?: Array<{ term: string }>
  }
}

interface CrossrefItem {
  title: string[]
  author?: Array<{ given: string; family: string }>
  published?: { 'date-parts': number[][] }
  URL?: string
  subject?: string[]
  'container-title'?: string[]
}

export function RealDataProcessor() {
  const [results, setResults] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('quantum computing')

  const testRealAPIs = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/search/papers?query=${encodeURIComponent(query)}&limit=5&sources=crossref,arxiv,doaj`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(60000), // 60 second timeout
        }
      )
      const data = await response.json()
      setResults(data)
    } catch {
      // API test failed, handle gracefully
    } finally {
      setLoading(false)
    }
  }

  const parseArxivXML = (xmlString: string): ArxivEntry[] => {
    try {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml')
      const entries = xmlDoc.getElementsByTagName('entry')

      const parsed: ArxivEntry[] = []
      for (let i = 0; i < Math.min(entries.length, 5); i++) {
        const entry = entries[i]
        const title =
          entry.getElementsByTagName('title')[0]?.textContent?.trim() ||
          'No title'
        const summary =
          entry.getElementsByTagName('summary')[0]?.textContent?.trim() ||
          'No summary'
        const published =
          entry.getElementsByTagName('published')[0]?.textContent?.trim() || ''
        const link =
          entry.getElementsByTagName('id')[0]?.textContent?.trim() || ''

        const authors: string[] = []
        const authorElements = entry.getElementsByTagName('author')
        for (let j = 0; j < authorElements.length; j++) {
          const name = authorElements[j]
            .getElementsByTagName('name')[0]
            ?.textContent?.trim()
          if (name) authors.push(name)
        }

        const categories: string[] = []
        const categoryElements = entry.getElementsByTagName('category')
        for (let j = 0; j < categoryElements.length; j++) {
          const term = categoryElements[j].getAttribute('term')
          if (term) categories.push(term)
        }

        parsed.push({ title, summary, authors, published, link, categories })
      }
      return parsed
    } catch {
      // ArXiv XML parsing error, return empty result
      return []
    }
  }

  const renderArxivResults = (data: Record<string, unknown>) => {
    // Handle new unified API response format
    if (Array.isArray(data)) {
      const arxivResults = (data as any[]).filter(item => item.source === 'arxiv')
      if (arxivResults.length === 0) {
        return (
          <div className="text-muted-foreground">
            No ArXiv results found for this query
          </div>
        )
      }
      
      return (
        <div className="space-y-4">
          {arxivResults.map((entry, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-start gap-2 text-lg">
                  <BookOpen className="mt-1 h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    {entry.title}
                    {entry.url && (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2"
                      >
                        <ExternalLink className="inline h-4 w-4 text-blue-500 hover:text-blue-700" />
                      </a>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {entry.authors && entry.authors.length > 0 && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {entry.authors.slice(0, 3).join(', ')}
                      {entry.authors.length > 3 &&
                        ` +${entry.authors.length - 3} more`}
                    </div>
                  )}
                  {entry.publicationDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(entry.publicationDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                {entry.abstract && (
                  <p className="text-sm">{entry.abstract.substring(0, 300)}...</p>
                )}
                <div className="flex flex-wrap gap-1">
                  {entry.keywords && entry.keywords.slice(0, 5).map((cat: string, i: number) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    // Legacy format handling
    if (!data?.ok || typeof data.data !== 'string') {
      return (
        <div className="text-destructive">
          ArXiv data unavailable or invalid format
        </div>
      )
    }

    const entries = parseArxivXML(data.data)

    return (
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-start gap-2 text-lg">
                <BookOpen className="mt-1 h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  {entry.title}
                  {entry.link && (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2"
                    >
                      <ExternalLink className="inline h-4 w-4 text-blue-500 hover:text-blue-700" />
                    </a>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {entry.authors.length > 0 && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {entry.authors.slice(0, 3).join(', ')}
                    {entry.authors.length > 3 &&
                      ` +${entry.authors.length - 3} more`}
                  </div>
                )}
                {entry.published && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(entry.published).toLocaleDateString()}
                  </div>
                )}
              </div>
              <p className="text-sm">{entry.summary.substring(0, 300)}...</p>
              <div className="flex flex-wrap gap-1">
                {entry.categories.slice(0, 5).map((cat, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderDoajResults = (data: Record<string, unknown>) => {
    // Handle new unified API response format
    if (Array.isArray(data)) {
      const doajResults = (data as any[]).filter(item => item.source === 'doaj')
      if (doajResults.length === 0) {
        return (
          <div className="text-muted-foreground">
            No DOAJ results found for this query
          </div>
        )
      }
      
      return (
        <div className="space-y-4">
          {doajResults.map((article, index) => (
            <Card key={index} className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-start gap-2 text-lg">
                  <BookOpen className="mt-1 h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    {article.title || 'No title'}
                    {article.url && (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2"
                      >
                        <ExternalLink className="inline h-4 w-4 text-green-500 hover:text-green-700" />
                      </a>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {article.authors && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {article.authors.slice(0, 3).join(', ')}
                    </div>
                  )}
                  {article.publicationDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(article.publicationDate).toLocaleDateString()}
                    </div>
                  )}
                  {article.journal && (
                    <Badge variant="outline">
                      {article.journal}
                    </Badge>
                  )}
                </div>
                {article.abstract && (
                  <p className="text-sm">
                    {article.abstract.substring(0, 300)}...
                  </p>
                )}
                <div className="flex flex-wrap gap-1">
                  {article.keywords?.slice(0, 5).map((subj: string, i: number) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {subj}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    // Legacy format handling
    if (!data?.ok || !(data as any).data?.results) {
      return <div className="text-destructive">DOAJ data unavailable</div>
    }

    const articles: DoajArticle[] = (data as any).data.results.slice(0, 5)

    return (
      <div className="space-y-4">
        {articles.map((article, index) => (
          <Card key={index} className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-start gap-2 text-lg">
                <BookOpen className="mt-1 h-5 w-5 text-green-500" />
                <div className="flex-1">
                  {article.bibjson.title || 'No title'}
                  {article.bibjson.link?.[0]?.url && (
                    <a
                      href={article.bibjson.link[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2"
                    >
                      <ExternalLink className="inline h-4 w-4 text-green-500 hover:text-green-700" />
                    </a>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {article.bibjson.author && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {article.bibjson.author
                      .slice(0, 3)
                      .map((a) => a.name)
                      .join(', ')}
                  </div>
                )}
                {article.bibjson.year && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {article.bibjson.year}
                  </div>
                )}
                {article.bibjson.journal?.title && (
                  <Badge variant="outline">
                    {article.bibjson.journal.title}
                  </Badge>
                )}
              </div>
              {article.bibjson.abstract && (
                <p className="text-sm">
                  {article.bibjson.abstract.substring(0, 300)}...
                </p>
              )}
              <div className="flex flex-wrap gap-1">
                {article.bibjson.subject?.slice(0, 5).map((subj, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {subj.term}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderCrossrefResults = (data: Record<string, unknown>) => {
    // Handle new unified API response format
    if (Array.isArray(data)) {
      const crossrefResults = (data as any[]).filter(item => item.source === 'crossref')
      if (crossrefResults.length === 0) {
        return (
          <div className="text-muted-foreground">
            No CrossRef results found for this query
          </div>
        )
      }
      
      return (
        <div className="space-y-4">
          {crossrefResults.map((item, index) => (
            <Card key={index} className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-start gap-2 text-lg">
                  <BookOpen className="mt-1 h-5 w-5 text-purple-500" />
                  <div className="flex-1">
                    {item.title || 'No title'}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2"
                      >
                        <ExternalLink className="inline h-4 w-4 text-purple-500 hover:text-purple-700" />
                      </a>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {item.authors && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {item.authors.slice(0, 3).join(', ')}
                    </div>
                  )}
                  {item.publicationDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(item.publicationDate).toLocaleDateString()}
                    </div>
                  )}
                  {item.journal && (
                    <Badge variant="outline">{item.journal}</Badge>
                  )}
                </div>
                {item.abstract && (
                  <p className="text-sm">{item.abstract.substring(0, 300)}...</p>
                )}
                <div className="flex flex-wrap gap-1">
                  {item.keywords?.slice(0, 5).map((subj: string, i: number) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {subj}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    // Legacy format handling
    if (!data?.ok || !(data as any).data?.message?.items) {
      return <div className="text-destructive">Crossref data unavailable</div>
    }

    const items: CrossrefItem[] = (data as any).data.message.items.slice(0, 5)

    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={index} className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-start gap-2 text-lg">
                <BookOpen className="mt-1 h-5 w-5 text-purple-500" />
                <div className="flex-1">
                  {item.title?.[0] || 'No title'}
                  {item.URL && (
                    <a
                      href={item.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2"
                    >
                      <ExternalLink className="inline h-4 w-4 text-purple-500 hover:text-purple-700" />
                    </a>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {item.author && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {item.author
                      .slice(0, 3)
                      .map((a) => `${a.given} ${a.family}`)
                      .join(', ')}
                  </div>
                )}
                {item.published?.['date-parts']?.[0] && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {item.published['date-parts'][0][0]}
                  </div>
                )}
                {item['container-title']?.[0] && (
                  <Badge variant="outline">{item['container-title'][0]}</Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-1">
                {item.subject?.slice(0, 5).map((subj, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {subj}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderGettyResults = (data: Record<string, unknown>) => {
    if (!data?.ok) {
      return (
        <Alert>
          <AlertDescription>
            Getty API:{' '}
            {String(
              (data as any)?.error ||
                'Service may be unavailable or require authentication'
            )}
          </AlertDescription>
        </Alert>
      )
    }

    return (
      <div className="text-muted-foreground">
        Getty API response received (format varies)
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Real API Data Testing & Processing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded border px-3 py-2"
              placeholder="Enter search query..."
            />
            <Button onClick={testRealAPIs} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Test Real APIs'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-6">
          {/* Unified Results Display */}
          {Array.isArray(results) ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-cyan-500" />
                  Search Results
                  <Badge variant="default">
                    {results.length} results found
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {results.map((item: any, index: number) => (
                      <Card key={index} className={`border-l-4 ${
                        item.source === 'crossref' ? 'border-l-purple-500' :
                        item.source === 'arxiv' ? 'border-l-blue-500' :
                        item.source === 'doaj' ? 'border-l-green-500' :
                        'border-l-orange-500'
                      }`}>
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-start gap-2 text-lg">
                            <BookOpen className={`mt-1 h-5 w-5 ${
                              item.source === 'crossref' ? 'text-purple-500' :
                              item.source === 'arxiv' ? 'text-blue-500' :
                              item.source === 'doaj' ? 'text-green-500' :
                              'text-orange-500'
                            }`} />
                            <div className="flex-1">
                              {item.title}
                              {item.url && (
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2"
                                >
                                  <ExternalLink className={`inline h-4 w-4 ${
                                    item.source === 'crossref' ? 'text-purple-500 hover:text-purple-700' :
                                    item.source === 'arxiv' ? 'text-blue-500 hover:text-blue-700' :
                                    item.source === 'doaj' ? 'text-green-500 hover:text-green-700' :
                                    'text-orange-500 hover:text-orange-700'
                                  }`} />
                                </a>
                              )}
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {item.source.toUpperCase()}
                            </Badge>
                            {item.authors && (
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {Array.isArray(item.authors) ? item.authors.slice(0, 3).join(', ') : item.authors}
                              </div>
                            )}
                            {item.publicationDate && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(item.publicationDate).toLocaleDateString()}
                              </div>
                            )}
                            {item.relevanceScore && (
                              <Badge variant="secondary">
                                Score: {item.relevanceScore}
                              </Badge>
                            )}
                          </div>
                          {item.abstract && (
                            <p className="text-sm">{item.abstract.substring(0, 300)}...</p>
                          )}
                          {item.journal && (
                            <Badge variant="outline">{item.journal}</Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Legacy format display */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5 text-blue-500" />
                    ArXiv Results (XML → Parsed)
                    <Badge
                      variant={
                        (results.arxiv as any)?.ok ? 'default' : 'destructive'
                      }
                    >
                      {(results.arxiv as any)?.ok ? 'Success' : 'Error'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    {renderArxivResults(results.arxiv as Record<string, unknown>)}
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5 text-green-500" />
                    DOAJ Results (JSON → Processed)
                    <Badge
                      variant={
                        (results.doaj as any)?.ok ? 'default' : 'destructive'
                      }
                    >
                      {(results.doaj as any)?.ok ? 'Success' : 'Error'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    {renderDoajResults(results.doaj as Record<string, unknown>)}
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5 text-purple-500" />
                    Crossref Results (JSON → Processed)
                    <Badge
                      variant={
                        (results.crossref as any)?.ok ? 'default' : 'destructive'
                      }
                    >
                      {(results.crossref as any)?.ok ? 'Success' : 'Error'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    {renderCrossrefResults(
                      results.crossref as Record<string, unknown>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5 text-orange-500" />
                    Getty Results
                    <Badge
                      variant={
                        (results.getty as any)?.ok ? 'default' : 'destructive'
                      }
                    >
                      {(results.getty as any)?.ok ? 'Success' : 'Error'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderGettyResults(results.getty as Record<string, unknown>)}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  )
}
