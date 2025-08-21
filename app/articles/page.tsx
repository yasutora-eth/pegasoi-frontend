'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface Article {
  id: string
  title: string
  content: string
  author: string
  reference: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pegasoibackend-production.up.railway.app'
      const response = await fetch(`${apiUrl}/api/articles`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setArticles(data)
    } catch (err) {
      console.error('Error fetching articles:', err)
      setError('Failed to load articles')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center px-4 py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading articles...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="mb-4 text-destructive">{error}</p>
          <Button onClick={fetchArticles}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Articles</h1>

      {articles.length === 0 ? (
        <p className="text-muted-foreground">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle className="text-lg">{article.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  By {article.author}
                </p>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">
                  {article.content.substring(0, 150)}...
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Status: {article.status}</span>
                  <span>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
