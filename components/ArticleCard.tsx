'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, BookOpen, ExternalLink } from 'lucide-react'
import type { Article } from '@/types/graphql'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'cyber'
  onView?: (article: Article) => void
  className?: string
}

export function ArticleCard({ 
  article, 
  variant = 'default', 
  onView,
  className 
}: ArticleCardProps) {
  const handleView = () => {
    if (onView) {
      onView(article)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'text-green-400 border-green-400/30'
      case 'in_review':
        return 'text-yellow-400 border-yellow-400/30'
      case 'draft':
        return 'text-blue-400 border-blue-400/30'
      case 'archived':
        return 'text-gray-400 border-gray-400/30'
      case 'rejected':
        return 'text-red-400 border-red-400/30'
      default:
        return 'text-cyan-400 border-cyan-400/30'
    }
  }

  return (
    <Card 
      variant={variant} 
      className={`group transition-all duration-300 hover:scale-[1.02] ${className}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className={`text-lg leading-tight ${
            variant === 'cyber' ? 'text-cyan-400' : ''
          }`}>
            {article.title}
          </CardTitle>
          <Badge 
            variant={variant === 'cyber' ? 'cyber' : 'outline'}
            className={variant === 'cyber' ? getStatusColor(article.status) : ''}
          >
            {article.status.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
        
        <div className={`flex items-center gap-4 text-sm ${
          variant === 'cyber' ? 'text-cyan-300/70' : 'text-muted-foreground'
        }`}>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{article.authors.join(', ')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(article.publicationDate).toLocaleDateString()}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Abstract Preview */}
        <p className={`text-sm leading-relaxed ${
          variant === 'cyber' ? 'text-cyan-300/80' : 'text-muted-foreground'
        }`}>
          {article.articleAbstract?.substring(0, 200)}
          {article.articleAbstract && article.articleAbstract.length > 200 && '...'}
        </p>

        {/* Keywords */}
        {article.keywords && article.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {article.keywords.slice(0, 3).map((keyword, index) => (
              <Badge 
                key={index}
                variant={variant === 'cyber' ? 'cyber' : 'secondary'}
                className="text-xs"
              >
                {keyword}
              </Badge>
            ))}
            {article.keywords.length > 3 && (
              <Badge 
                variant={variant === 'cyber' ? 'cyber' : 'secondary'}
                className="text-xs"
              >
                +{article.keywords.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Journal Info */}
        {article.journal && (
          <div className={`flex items-center gap-1 text-xs ${
            variant === 'cyber' ? 'text-cyan-300/60' : 'text-muted-foreground'
          }`}>
            <BookOpen className="h-3 w-3" />
            <span>{article.journal}</span>
          </div>
        )}

        {/* DOI */}
        {article.doi && (
          <div className={`flex items-center gap-1 text-xs ${
            variant === 'cyber' ? 'text-cyan-300/60' : 'text-muted-foreground'
          }`}>
            <ExternalLink className="h-3 w-3" />
            <span className="font-mono">DOI: {article.doi}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <Button
            variant={variant === 'cyber' ? 'cyber' : 'outline'}
            size="sm"
            onClick={handleView}
            className="w-full gap-2 group-hover:scale-105 transition-transform"
          >
            <BookOpen className="h-3 w-3" />
            {variant === 'cyber' ? 'ACCESS ARTICLE' : 'View Article'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}