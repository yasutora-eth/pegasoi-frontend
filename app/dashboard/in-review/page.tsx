'use client'

import { PrivateRoute } from '@/components/PrivateRoute'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function InReview() {
  const inReviewArticles = [
    { id: 1, title: 'Article 1', reviewStatus: 'Pending' },
    { id: 2, title: 'Article 2', reviewStatus: 'In Progress' },
    { id: 3, title: 'Article 3', reviewStatus: 'Revision Requested' },
  ]

  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Articles In Review</h1>
        <div className="space-y-4">
          {inReviewArticles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Review Status: {article.reviewStatus}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PrivateRoute>
  )
}
