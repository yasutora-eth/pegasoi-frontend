'use client'

import { PrivateRoute } from '@/components/PrivateRoute'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function MyArticles() {
  const myArticles = [
    { id: 1, title: 'My Article 1', status: 'Draft' },
    { id: 2, title: 'My Article 2', status: 'Submitted' },
    { id: 3, title: 'My Article 3', status: 'In Review' },
  ]

  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">My Articles</h1>
        <div className="space-y-4">
          {myArticles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Status: {article.status}</p>
                <Button asChild className="mt-2">
                  <Link href={`/dashboard/my-articles/${article.id}`}>
                    Edit
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PrivateRoute>
  )
}
