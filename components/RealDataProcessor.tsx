"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ExternalLink, BookOpen, Calendar, User, LinkIcon } from "lucide-react"

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
  published?: { "date-parts": number[][] }
  URL?: string
  subject?: string[]
  "container-title"?: string[]
}

export function RealDataProcessor() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("quantum computing")

  const testRealAPIs = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8000/search?query=${encodeURIComponent(query)}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("API test failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const parseArxivXML = (xmlString: string): ArxivEntry[] => {
    try {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlString, "text/xml")
      const entries = xmlDoc.getElementsByTagName("entry")

      const parsed: ArxivEntry[] = []
      for (let i = 0; i < Math.min(entries.length, 5); i++) {
        const entry = entries[i]
        const title = entry.getElementsByTagName("title")[0]?.textContent?.trim() || "No title"
        const summary = entry.getElementsByTagName("summary")[0]?.textContent?.trim() || "No summary"
        const published = entry.getElementsByTagName("published")[0]?.textContent?.trim() || ""
        const link = entry.getElementsByTagName("id")[0]?.textContent?.trim() || ""

        const authors: string[] = []
        const authorElements = entry.getElementsByTagName("author")
        for (let j = 0; j < authorElements.length; j++) {
          const name = authorElements[j].getElementsByTagName("name")[0]?.textContent?.trim()
          if (name) authors.push(name)
        }

        const categories: string[] = []
        const categoryElements = entry.getElementsByTagName("category")
        for (let j = 0; j < categoryElements.length; j++) {
          const term = categoryElements[j].getAttribute("term")
          if (term) categories.push(term)
        }

        parsed.push({ title, summary, authors, published, link, categories })
      }
      return parsed
    } catch (error) {
      console.error("ArXiv XML parsing error:", error)
      return []
    }
  }

  const renderArxivResults = (data: any) => {
    if (!data?.ok || typeof data.data !== "string") {
      return <div className="text-destructive">ArXiv data unavailable or invalid format</div>
    }

    const entries = parseArxivXML(data.data)

    return (
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-start gap-2">
                <BookOpen className="h-5 w-5 mt-1 text-blue-500" />
                <div className="flex-1">
                  {entry.title}
                  {entry.link && (
                    <a href={entry.link} target="_blank" rel="noopener noreferrer" className="ml-2">
                      <ExternalLink className="h-4 w-4 inline text-blue-500 hover:text-blue-700" />
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
                    {entry.authors.slice(0, 3).join(", ")}
                    {entry.authors.length > 3 && ` +${entry.authors.length - 3} more`}
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

  const renderDoajResults = (data: any) => {
    if (!data?.ok || !data.data?.results) {
      return <div className="text-destructive">DOAJ data unavailable</div>
    }

    const articles: DoajArticle[] = data.data.results.slice(0, 5)

    return (
      <div className="space-y-4">
        {articles.map((article, index) => (
          <Card key={index} className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-start gap-2">
                <BookOpen className="h-5 w-5 mt-1 text-green-500" />
                <div className="flex-1">
                  {article.bibjson.title || "No title"}
                  {article.bibjson.link?.[0]?.url && (
                    <a href={article.bibjson.link[0].url} target="_blank" rel="noopener noreferrer" className="ml-2">
                      <ExternalLink className="h-4 w-4 inline text-green-500 hover:text-green-700" />
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
                      .join(", ")}
                  </div>
                )}
                {article.bibjson.year && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {article.bibjson.year}
                  </div>
                )}
                {article.bibjson.journal?.title && <Badge variant="outline">{article.bibjson.journal.title}</Badge>}
              </div>
              {article.bibjson.abstract && <p className="text-sm">{article.bibjson.abstract.substring(0, 300)}...</p>}
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

  const renderCrossrefResults = (data: any) => {
    if (!data?.ok || !data.data?.message?.items) {
      return <div className="text-destructive">Crossref data unavailable</div>
    }

    const items: CrossrefItem[] = data.data.message.items.slice(0, 5)

    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={index} className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-start gap-2">
                <BookOpen className="h-5 w-5 mt-1 text-purple-500" />
                <div className="flex-1">
                  {item.title?.[0] || "No title"}
                  {item.URL && (
                    <a href={item.URL} target="_blank" rel="noopener noreferrer" className="ml-2">
                      <ExternalLink className="h-4 w-4 inline text-purple-500 hover:text-purple-700" />
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
                      .join(", ")}
                  </div>
                )}
                {item.published?.["date-parts"]?.[0] && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {item.published["date-parts"][0][0]}
                  </div>
                )}
                {item["container-title"]?.[0] && <Badge variant="outline">{item["container-title"][0]}</Badge>}
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

  const renderGettyResults = (data: any) => {
    if (!data?.ok) {
      return (
        <Alert>
          <AlertDescription>
            Getty API: {data?.error || "Service may be unavailable or require authentication"}
          </AlertDescription>
        </Alert>
      )
    }

    return <div className="text-muted-foreground">Getty API response received (format varies)</div>
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
              className="flex-1 px-3 py-2 border rounded"
              placeholder="Enter search query..."
            />
            <Button onClick={testRealAPIs} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Test Real APIs"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-6">
          {/* ArXiv Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-blue-500" />
                ArXiv Results (XML → Parsed)
                <Badge variant={results.arxiv?.ok ? "default" : "destructive"}>
                  {results.arxiv?.ok ? "Success" : "Error"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">{renderArxivResults(results.arxiv)}</ScrollArea>
            </CardContent>
          </Card>

          {/* DOAJ Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-green-500" />
                DOAJ Results (JSON → Processed)
                <Badge variant={results.doaj?.ok ? "default" : "destructive"}>
                  {results.doaj?.ok ? "Success" : "Error"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">{renderDoajResults(results.doaj)}</ScrollArea>
            </CardContent>
          </Card>

          {/* Crossref Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-purple-500" />
                Crossref Results (JSON → Processed)
                <Badge variant={results.crossref?.ok ? "default" : "destructive"}>
                  {results.crossref?.ok ? "Success" : "Error"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">{renderCrossrefResults(results.crossref)}</ScrollArea>
            </CardContent>
          </Card>

          {/* Getty Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-orange-500" />
                Getty Results
                <Badge variant={results.getty?.ok ? "default" : "destructive"}>
                  {results.getty?.ok ? "Success" : "Error"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>{renderGettyResults(results.getty)}</CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
