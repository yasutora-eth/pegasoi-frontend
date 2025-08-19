"use client"

import { PrivateRoute } from "@/components/PrivateRoute"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Published() {
  const publishedArticles = [
    { id: 1, title: "Published Article 1", publicationDate: "2024-01-15" },
    { id: 2, title: "Published Article 2", publicationDate: "2024-02-20" },
    { id: 3, title: "Published Article 3", publicationDate: "2024-03-10" },
  ]

  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Published Articles</h1>
        <div className="space-y-4">
          {publishedArticles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Publication Date: {article.publicationDate}</p>
                <Button asChild className="mt-2">
                  <Link href={`/articles/${article.id}`}>View Article</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PrivateRoute>
  )
}
