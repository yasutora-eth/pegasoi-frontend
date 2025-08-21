'use client'

import React, { useState } from 'react'
import { ArticleCard } from './ArticleCard'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { CyberLoading, LoadingState } from '@/components/ui/loading'
import { CyberError, ErrorState } from '@/components/ui/error'
import { Search, Filter, Grid, List, RefreshCw } from 'lucide-react'
import type { Article, ArticleStatus } from '@/types/graphql'

interface ArticlesListProps {
  articles: Article[]
  loading?: boolean
  error?: Error | null
  variant?: 'default' | 'cyber'
  onRefresh?: () => void
  onViewArticle?: (article: Article) => void
  className?: string
}

export function ArticlesList({
  articles,
  loading = false,
  error = null,
  variant = 'default',
  onRefresh,
  onViewArticle,
  className
}: ArticlesListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<ArticleStatus | 'all'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter articles based on search and status
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      article.articleAbstract?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || article.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Get unique statuses for filter
  const availableStatuses = Array.from(new Set(articles.map(a => a.status))) as ArticleStatus[]

  // Loading state
  if (loading) {
    return variant === 'cyber' ? (
      <CyberLoading message="ACCESSING RESEARCH DATABASE..." />
    ) : (
      <LoadingState message="Loading articles..." />
    )
  }

  // Error state
  if (error) {
    return variant === 'cyber' ? (
      <CyberError
        title="DATABASE CONNECTION FAILED"
        message="Unable to establish connection with the research database."
        errorCode="DB_001"
        onRetry={onRefresh}
      />
    ) : (
      <ErrorState
        title="Failed to Load Articles"
        message="There was an error loading the articles. Please try again."
        onRetry={onRefresh}
      />
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className={`text-4xl font-bold ${
            variant === 'cyber' ? 'text-cyber text-glow' : ''
          }`}>
            {variant === 'cyber' ? 'RESEARCH DATABASE' : 'Articles'}
          </h1>
          <p className={`${
            variant === 'cyber' ? 'text-cyan-300/70' : 'text-muted-foreground'
          }`}>
            {filteredArticles.length} of {articles.length} articles
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          {onRefresh && (
            <Button
              variant={variant === 'cyber' ? 'cyber' : 'outline'}
              size="sm"
              onClick={onRefresh}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              {variant === 'cyber' ? 'REFRESH' : 'Refresh'}
            </Button>
          )}

          {/* View Mode Toggle */}
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === 'grid' ? (variant === 'cyber' ? 'cyber' : 'default') : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? (variant === 'cyber' ? 'cyber' : 'default') : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
            variant === 'cyber' ? 'text-cyan-400' : 'text-muted-foreground'
          }`} />
          <input
            type="text"
            placeholder={variant === 'cyber' ? 'SEARCH DATABASE...' : 'Search articles...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full rounded-md border px-10 py-2 text-sm focus:outline-none focus:ring-2 ${
              variant === 'cyber' 
                ? 'cyber-tabs border-cyan-400/20 bg-gray-900/50 text-cyan-300 placeholder:text-cyan-400/50 focus:ring-cyan-400/50'
                : 'border-input bg-background focus:ring-ring'
            }`}
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className={`h-4 w-4 ${
            variant === 'cyber' ? 'text-cyan-400' : 'text-muted-foreground'
          }`} />
          <Select value={statusFilter} onValueChange={(value: ArticleStatus | 'all') => setStatusFilter(value)}>
            <SelectTrigger 
              variant={variant === 'cyber' ? 'cyber' : 'default'}
              className="w-40"
            >
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent variant={variant === 'cyber' ? 'cyber' : 'default'}>
              <SelectItem value="all">All Status</SelectItem>
              {availableStatuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status.replace('_', ' ').toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Articles Grid/List */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className={`text-lg ${
            variant === 'cyber' ? 'text-cyan-300/70' : 'text-muted-foreground'
          }`}>
            {searchTerm || statusFilter !== 'all' 
              ? 'No articles match your filters.' 
              : 'No articles found.'}
          </p>
          {(searchTerm || statusFilter !== 'all') && (
            <Button
              variant={variant === 'cyber' ? 'cyber' : 'outline'}
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('all')
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
            : 'space-y-4'
        }>
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.articleId}
              article={article}
              variant={variant}
              onView={onViewArticle}
              className={viewMode === 'list' ? 'max-w-none' : ''}
            />
          ))}
        </div>
      )}

      {/* Results Summary */}
      {filteredArticles.length > 0 && (
        <div className="flex items-center justify-center pt-4">
          <Badge variant={variant === 'cyber' ? 'cyber' : 'secondary'}>
            Showing {filteredArticles.length} articles
          </Badge>
        </div>
      )}
    </div>
  )
}