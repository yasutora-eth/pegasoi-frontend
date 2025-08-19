"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2, Search } from "lucide-react"
import { apiService, type Article } from "@/lib/api"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ResearchAssistant() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [loadingArticles, setLoadingArticles] = useState(false)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    setLoadingArticles(true)
    try {
      const data = await apiService.getArticles("published")
      setArticles(data.slice(0, 5))
    } catch (error) {
      // Error fetching articles, handle gracefully
      setError("Failed to fetch articles. Please try again later.")
    } finally {
      setLoadingArticles(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      // Simulate AI response for preview
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(userMessage.content),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      // Error occurred, handle gracefully
      setError("Failed to get response from research assistant. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const generateMockResponse = (query: string): string => {
    const responses = {
      egypt: `
        <h3>Ancient Egypt Research</h3>
        <p>Here are some key areas for Egyptian studies:</p>
        <ul>
          <li><strong>Hieroglyphic Writing:</strong> Study the evolution of Egyptian writing systems</li>
          <li><strong>Pharaonic Dynasties:</strong> Research the political structures of ancient Egypt</li>
          <li><strong>Religious Practices:</strong> Explore Egyptian mythology and burial customs</li>
        </ul>
        <p><strong>Recommended Journals:</strong> Journal of Egyptian Archaeology, Journal of the American Research Center in Egypt</p>
      `,
      greece: `
        <h3>Ancient Greece Research</h3>
        <p>Key research areas in Greek studies:</p>
        <ul>
          <li><strong>Philosophy:</strong> Examine works of Plato, Aristotle, and pre-Socratics</li>
          <li><strong>Democracy:</strong> Study the development of Athenian political systems</li>
          <li><strong>Art & Architecture:</strong> Analyze Greek artistic innovations</li>
        </ul>
        <p><strong>Primary Sources:</strong> Herodotus, Thucydides, Plutarch</p>
      `,
      rome: `
        <h3>Ancient Rome Research</h3>
        <p>Roman studies focus areas:</p>
        <ul>
          <li><strong>Imperial History:</strong> Research the Roman Empire's expansion and governance</li>
          <li><strong>Law & Society:</strong> Study Roman legal systems and social structures</li>
          <li><strong>Military:</strong> Analyze Roman military tactics and organization</li>
        </ul>
        <p><strong>Key Sources:</strong> Tacitus, Livy, Suetonius, Cassius Dio</p>
      `,
    }

    const lowerQuery = query.toLowerCase()
    if (lowerQuery.includes("egypt")) return responses.egypt
    if (lowerQuery.includes("greece") || lowerQuery.includes("greek")) return responses.greece
    if (lowerQuery.includes("rome") || lowerQuery.includes("roman")) return responses.rome

    return `
      <h3>Classical Studies Research</h3>
      <p>Your query about "${query}" touches on important aspects of classical studies. Here are some general research directions:</p>
      <ul>
        <li><strong>Primary Sources:</strong> Always start with ancient texts and archaeological evidence</li>
        <li><strong>Modern Scholarship:</strong> Review recent academic publications and debates</li>
        <li><strong>Interdisciplinary Approach:</strong> Consider archaeological, historical, and literary perspectives</li>
      </ul>
      <p><strong>Suggested Databases:</strong> JSTOR, Project MUSE, L'Année philologique</p>
    `
  }

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-primary">Classical Studies Research Assistant</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <ScrollArea className="h-[400px] border rounded-lg p-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Ask me about classical studies research!</p>
                <p className="text-sm mt-2">Try topics like "Ancient Egypt", "Greek philosophy", or "Roman history"</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${
                      message.role === "assistant" ? "bg-accent/20 p-3 rounded-lg" : "bg-muted/20 p-3 rounded-lg"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {message.role === "assistant" ? "Research Assistant" : "You"}
                      </span>
                      <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                    {message.role === "assistant" ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: message.content }}
                        className="prose prose-invert max-w-none text-sm"
                      />
                    ) : (
                      <p className="text-foreground text-sm">{message.content}</p>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Research Assistant is thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              placeholder="Ask about classical studies research..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-input text-foreground"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl mx-auto bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-primary">Published Articles</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingArticles ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading articles...</span>
            </div>
          ) : articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.article_id} className="p-4 bg-accent/10 rounded-lg">
                  <h4 className="font-semibold text-primary">{article.title}</h4>
                  <p className="text-sm text-muted-foreground">By {article.authors.join(", ")}</p>
                  <p className="mt-2 text-sm font-medium">Abstract:</p>
                  <p className="mt-1 text-sm">{article.abstract.substring(0, 150)}...</p>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Status: {article.status}</span>
                    <span>{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                  {article.keywords.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {article.keywords.slice(0, 3).map((keyword, idx) => (
                        <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{keyword}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No published articles found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
