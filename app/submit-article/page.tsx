'use client'

import type React from 'react'

import { PrivateRoute } from '@/components/PrivateRoute'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiService } from '@/lib/api'

export default function SubmitArticle() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [abstract, setAbstract] = useState('')
  const [authors, setAuthors] = useState([''])
  const [keywords, setKeywords] = useState<string[]>([])
  const [doi, setDoi] = useState('')
  const [journal, setJournal] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await apiService.createArticle({
        title,
        content,
        abstract,
        authors: authors.filter((author) => author.trim() !== ''),
        keywords: keywords.filter((keyword) => keyword.trim() !== ''),
        publicationDate: new Date().toISOString(), // Backend expects camelCase
        doi: doi || undefined,
        journal: journal || undefined,
      })

      alert('Article submitted successfully!')
      router.push('/dashboard')
    } catch {
      alert('Failed to submit article. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-primary">Submit Article</h1>
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Article Submission Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="abstract">Abstract</Label>
                <Textarea
                  id="abstract"
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  required
                  rows={4}
                  placeholder="Brief summary of the article..."
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={10}
                />
              </div>
              <div>
                <Label htmlFor="authors">Authors (one per line)</Label>
                <Textarea
                  id="authors"
                  value={authors.join('\n')}
                  onChange={(e) => setAuthors(e.target.value.split('\n'))}
                  required
                  rows={3}
                  placeholder="Author Name 1&#10;Author Name 2"
                />
              </div>
              <div>
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  value={keywords.join(', ')}
                  onChange={(e) =>
                    setKeywords(e.target.value.split(',').map((k) => k.trim()))
                  }
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
              <div>
                <Label htmlFor="journal">Journal (optional)</Label>
                <Input
                  id="journal"
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="doi">DOI (optional)</Label>
                <Input
                  id="doi"
                  value={doi}
                  onChange={(e) => setDoi(e.target.value)}
                  placeholder="10.1000/example"
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Submitting...' : 'Submit Article'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PrivateRoute>
  )
}
