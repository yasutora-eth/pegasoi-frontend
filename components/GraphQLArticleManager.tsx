'use client'

import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Plus, Edit, Trash2, Save, X } from 'lucide-react'
import { GET_ARTICLES } from '@/lib/graphql/queries'
import {
  CREATE_ARTICLE,
  UPDATE_ARTICLE_STATUS,
  DELETE_ARTICLE,
} from '@/lib/graphql/mutations'
// import { useRealTimeArticles } from '@/hooks/useRealTimeArticles'
import type { ArticleCreate } from '@/lib/api'

export function GraphQLArticleManager() {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // GraphQL Query with error handling
  const {
    data: articlesData,
    loading,
    error,
  } = useQuery(GET_ARTICLES, {
    variables: {
      status: statusFilter === 'all' ? undefined : statusFilter,
      limit: 100,
    },
    pollInterval: 30000, // Poll every 30 seconds for updates
    errorPolicy: 'all', // Continue rendering with partial data on error
    notifyOnNetworkStatusChange: true,
  })

  // Mock data fallback when GraphQL fails
  const mockArticles = [
    {
      articleId: '1',
      title: 'Roman Architecture in the Imperial Period',
      authors: ['Dr. Marcus Aurelius'],
      abstract: 'An extensive study of architectural developments during the height of the Roman Empire, examining the evolution of construction techniques, materials, and design principles.',
      content: 'Full content of the Roman Architecture article...',
      keywords: ['Roman', 'Architecture', 'Imperial', 'Construction'],
      publicationDate: '2024-01-15T00:00:00',
      status: 'published',
      createdAt: '2024-01-15T00:00:00',
      updatedAt: '2024-01-15T00:00:00',
      doi: '10.1000/182',
      journal: 'Classical Studies Quarterly'
    },
    {
      articleId: '2',
      title: 'Greek Pottery: Styles and Techniques',
      authors: ['Prof. Helena Athena'],
      abstract: 'A comprehensive analysis of ancient Greek pottery traditions, exploring the various styles, decorative techniques, and cultural significance of ceramic art.',
      content: 'Full content of the Greek Pottery article...',
      keywords: ['Greek', 'Pottery', 'Ceramics', 'Art'],
      publicationDate: '2024-01-20T00:00:00',
      status: 'published',
      createdAt: '2024-01-20T00:00:00',
      updatedAt: '2024-01-20T00:00:00',
      doi: '10.1000/183',
      journal: 'Archaeological Review'
    }
  ]

  // Use articles from GraphQL or fallback to mock data
  const articles = articlesData?.articles || (error ? mockArticles : [])
  const [notifications, setNotifications] = useState<string[]>([])

  // GraphQL Mutations
  const [createArticleMutation] = useMutation(CREATE_ARTICLE, {
    refetchQueries: [{ query: GET_ARTICLES }],
  })

  const [updateStatusMutation] = useMutation(UPDATE_ARTICLE_STATUS)
  const [deleteArticleMutation] = useMutation(DELETE_ARTICLE, {
    refetchQueries: [{ query: GET_ARTICLES }],
  })

  // Form state
  const [formData, setFormData] = useState<ArticleCreate>({
    title: '',
    authors: [''],
    abstract: '',
    content: '',
    publicationDate: new Date().toISOString().split('T')[0] + 'T00:00:00',
    keywords: [],
  })

  const handleCreate = async () => {
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.abstract.trim()
    )
      return
    if (formData.authors[0].trim() === '') return

    try {
      const cleanedData = {
        ...formData,
        authors: formData.authors.filter((author) => author.trim() !== ''),
        keywords:
          formData.keywords?.filter((keyword) => keyword.trim() !== '') || [],
      }

      await createArticleMutation({
        variables: { input: cleanedData },
      })

      // Reset form
      setFormData({
        title: '',
        authors: [''],
        abstract: '',
        content: '',
        publicationDate: new Date().toISOString().split('T')[0] + 'T00:00:00',
        keywords: [],
      })
      setShowCreateForm(false)
    } catch (error) {
      console.error('Failed to create article:', error)
    }
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateStatusMutation({
        variables: { id, status },
        optimisticResponse: {
          updateArticleStatus: {
            __typename: 'Article',
            articleId: id,
            status,
            updatedAt: new Date().toISOString(),
          },
        },
      })
      setEditingId(null)
    } catch (error) {
      console.error('Failed to update article status:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    try {
      await deleteArticleMutation({
        variables: { id },
      })
    } catch (error) {
      console.error('Failed to delete article:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading articles...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert>
        <AlertDescription>
          Failed to load articles: {error.message}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Success Notifications */}
      {notifications.length > 0 && (
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <Alert key={index} className="border-green-200 bg-green-50">
              <AlertDescription className="flex items-center justify-between">
                {notification}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    setNotifications((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">GraphQL Article Manager</h2>
          <Badge variant="outline" className="bg-green-50">
            Real-time Updates
          </Badge>
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Article
          </Button>
        </div>
      </div>

      {/* Create Form */}
      {showCreateForm && (
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
            <Input
              placeholder="Authors (comma-separated)"
              value={formData.authors.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  authors: e.target.value.split(',').map((a) => a.trim()),
                })
              }
            />
            <div className="flex gap-2">
              <Button onClick={handleCreate}>
                <Save className="mr-2 h-4 w-4" />
                Create Article
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Articles List */}
      <div className="grid gap-4">
        {articles.map((article) => (
          <Card
            key={article.articleId}
            className="transition-shadow hover:shadow-md"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    By {article.authors.join(', ')} •{' '}
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      article.status === 'published'
                        ? 'default'
                        : article.status === 'draft'
                          ? 'secondary'
                          : article.status === 'rejected'
                            ? 'destructive'
                            : 'outline'
                    }
                  >
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
              <p className="mb-4 text-sm text-muted-foreground">
                {article.abstract}
              </p>

              {editingId === article.articleId ? (
                <div className="flex gap-2">
                  <Select
                    value={article.status}
                    onValueChange={(status) =>
                      handleStatusUpdate(article.articleId, status)
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>Keywords: {article.keywords.join(', ') || 'None'}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="py-8 text-center text-muted-foreground">
          No articles found. Create your first article!
        </div>
      )}
    </div>
  )
}
