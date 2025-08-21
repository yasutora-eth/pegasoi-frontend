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
      // Use mock data for development since API endpoint is not available
      const mockArticles: Article[] = [
        {
          id: '1',
          title: 'Roman Architecture in the Imperial Period',
          content: 'An extensive study of architectural developments during the height of the Roman Empire, examining the evolution of construction techniques, materials, and design principles that defined imperial Roman architecture.',
          author: 'Dr. Marcus Aurelius',
          reference: 'Journal of Classical Architecture, Vol. 15',
          status: 'published',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          title: 'Greek Pottery: Styles and Techniques',
          content: 'A comprehensive analysis of ancient Greek pottery traditions, exploring the various styles, decorative techniques, and cultural significance of ceramic arts in classical antiquity.',
          author: 'Prof. Helena Athena',
          reference: 'Classical Studies Quarterly, Issue 42',
          status: 'published',
          createdAt: '2024-01-20T14:30:00Z',
          updatedAt: '2024-01-20T14:30:00Z'
        },
        {
          id: '3',
          title: 'Egyptian Hieroglyphic Evolution',
          content: 'Tracing the development of hieroglyphic writing systems from early dynastic periods through the Ptolemaic era, examining linguistic changes and cultural influences.',
          author: 'Dr. Anubis Thoth',
          reference: 'Egyptian Studies Review, Vol. 8',
          status: 'published',
          createdAt: '2024-01-25T09:15:00Z',
          updatedAt: '2024-01-25T09:15:00Z'
        },
        {
          id: '4',
          title: 'Classical Literature Analysis',
          content: 'A detailed examination of narrative structures and literary devices employed in classical Greek and Roman literature, with focus on epic poetry and dramatic works.',
          author: 'Prof. Sophia Minerva',
          reference: 'Literary Classics Today, Vol. 12',
          status: 'published',
          createdAt: '2024-02-01T16:45:00Z',
          updatedAt: '2024-02-01T16:45:00Z'
        },
        {
          id: '5',
          title: 'Byzantine Art and Culture',
          content: 'Exploring the artistic and cultural achievements of the Byzantine Empire, from religious iconography to architectural innovations that bridged classical and medieval periods.',
          author: 'Dr. Constantine Justinian',
          reference: 'Byzantine Studies International, Issue 28',
          status: 'published',
          createdAt: '2024-02-10T11:20:00Z',
          updatedAt: '2024-02-10T11:20:00Z'
        }
      ]
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      setArticles(mockArticles)
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
