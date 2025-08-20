'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Plus, Edit, Trash2, Save, X, AlertCircle } from 'lucide-react'
import {
  apiService,
  type Article,
  type ArticleCreate,
  type ArticleUpdate,
} from '@/lib/api'

export function ArticleManager() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const [formData, setFormData] = useState<ArticleCreate>({
    title: '',
    authors: [''],
    abstract: '',
    content: '',
    keywords: [],
    publicationDate: new Date().toISOString().split('T')[0] + 'T00:00:00',
    doi: '',
    journal: '',
  })

  const fetchArticles = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiService.getArticles(
        statusFilter === 'all' ? undefined : statusFilter
      )
      setArticles(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles')
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  const handleCreate = async () => {
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.abstract.trim()
    )
      return
    if (formData.authors[0].trim() === '') return

    try {
      // Filter out empty authors and keywords
      const cleanedData = {
        ...formData,
        authors: formData.authors.filter((author) => author.trim() !== ''),
        keywords:
          formData.keywords?.filter((keyword) => keyword.trim() !== '') || [],
      }
      const newArticle = await apiService.createArticle(cleanedData)
      setArticles([newArticle, ...articles])
      setFormData({
        title: '',
        authors: [''],
        abstract: '',
        content: '',
        keywords: [],
        publicationDate: new Date().toISOString().split('T')[0] + 'T00:00:00',
        doi: '',
        journal: '',
      })
      setCreating(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create article')
    }
  }

  const handleUpdate = async (id: string, updates: ArticleUpdate) => {
    try {
      const updatedArticle = await apiService.updateArticleStatus(
        id,
        updates.status
      )
      setArticles(
        articles.map((a) => (a.articleId === id ? updatedArticle : a))
      )
      setEditingId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update article')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    try {
      await apiService.deleteArticle(id)
      setArticles(articles.filter((a) => a.articleId !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article')
    }
  }

  const handleBatchStatusUpdate = async (status: string) => {
    const selectedIds = articles
      .filter((a) => a.status !== status)
      .map((a) => a.articleId)
    if (selectedIds.length === 0) return

    try {
      const updates = selectedIds.map((id) => ({ id, data: { status } }))
      await apiService.batchUpdateArticles(updates)
      await fetchArticles()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to batch update articles'
      )
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'default'
      case 'in_review':
        return 'secondary'
      case 'archived':
        return 'outline'
      default:
        return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Article Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Articles</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => setCreating(true)} disabled={creating}>
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>

            <Button
              variant="outline"
              onClick={() => handleBatchStatusUpdate('published')}
            >
              Batch Publish
            </Button>

            <Button
              variant="outline"
              onClick={fetchArticles}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Refresh'
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Create Form */}
      {creating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Article</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Article Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Authors</label>
              {formData.authors.map((author, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Author name"
                    value={author}
                    onChange={(e) => {
                      const newAuthors = [...formData.authors]
                      newAuthors[index] = e.target.value
                      setFormData({ ...formData, authors: newAuthors })
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (formData.authors.length > 1) {
                        const newAuthors = formData.authors.filter(
                          (_, i) => i !== index
                        )
                        setFormData({ ...formData, authors: newAuthors })
                      }
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setFormData({
                    ...formData,
                    authors: [...formData.authors, ''],
                  })
                }
              >
                + Add Author
              </Button>
            </div>
            <Textarea
              placeholder="Abstract"
              value={formData.abstract}
              onChange={(e) =>
                setFormData({ ...formData, abstract: e.target.value })
              }
              rows={3}
            />
            <Textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={6}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="DOI (optional)"
                value={formData.doi}
                onChange={(e) =>
                  setFormData({ ...formData, doi: e.target.value })
                }
              />
              <Input
                placeholder="Journal (optional)"
                value={formData.journal}
                onChange={(e) =>
                  setFormData({ ...formData, journal: e.target.value })
                }
              />
            </div>
            <Input
              type="date"
              value={formData.publicationDate.split('T')[0]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  publicationDate: e.target.value + 'T00:00:00',
                })
              }
            />
            <div className="flex gap-2">
              <Button onClick={handleCreate}>
                <Save className="mr-2 h-4 w-4" />
                Create
              </Button>
              <Button variant="outline" onClick={() => setCreating(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Articles List */}
      <div className="space-y-4">
        {articles.map((article) => (
          <Card key={article.articleId}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    By {article.authors.join(', ')} •{' '}
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                  {article.keywords.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {article.keywords.slice(0, 3).map((keyword, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {keyword}
                        </Badge>
                      ))}
                      {article.keywords.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{article.keywords.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(article.status)}>
                    {article.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingId(article.articleId)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(article.articleId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editingId === article.articleId ? (
                <div className="space-y-4">
                  <Select
                    value={article.status}
                    onValueChange={(status) =>
                      handleUpdate(article.articleId, { status })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={() => setEditingId(null)}>
                    Done
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="mb-2 text-sm font-medium">Abstract:</p>
                  <p className="mb-3 text-sm">
                    {article.abstract.substring(0, 200)}...
                  </p>
                  <p className="mb-2 text-sm">
                    {article.content.substring(0, 150)}...
                  </p>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>DOI: {article.doi || 'N/A'}</span>
                    <span>Journal: {article.journal || 'N/A'}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
