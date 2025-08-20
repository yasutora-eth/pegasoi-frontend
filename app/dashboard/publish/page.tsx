'use client'

import { PrivateRoute } from '@/components/PrivateRoute'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { LegacyArticle } from '@/types/article'
import { useState } from 'react'

const initialArticles: LegacyArticle[] = [
  {
    id: '1',
    title: 'Article 1',
    content: 'Content 1',
    author: 'Author 1',
    reference: 'Ref 1',
    status: 'in_review',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Article 2',
    content: 'Content 2',
    author: 'Author 2',
    reference: 'Ref 2',
    status: 'in_review',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
  },
  {
    id: '3',
    title: 'Article 3',
    content: 'Content 3',
    author: 'Author 3',
    reference: 'Ref 3',
    status: 'in_review',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
  },
]

export default function PublishArticles() {
  const [articles, setArticles] = useState<LegacyArticle[]>(initialArticles)

  const handlePublish = (id: string) => {
    setArticles(
      articles.map((article) =>
        article.id === id
          ? {
              ...article,
              status: 'published' as const,
              updatedAt: new Date().toISOString(),
            }
          : article
      )
    )
  }

  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Review and Publish Articles</h1>
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">Author: {article.author}</p>
                <p className="mb-2">Reference: {article.reference}</p>
                <p className="mb-2">
                  Content: {article.content.substring(0, 100)}...
                </p>
                <p className="mb-4">Status: {article.status}</p>
                <Button
                  onClick={() => handlePublish(article.id)}
                  disabled={article.status === 'published'}
                >
                  {article.status === 'published' ? 'Published' : 'Publish'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PrivateRoute>
  )
}
