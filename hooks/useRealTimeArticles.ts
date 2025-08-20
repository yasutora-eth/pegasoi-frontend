import { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import { ARTICLE_UPDATES, ARTICLE_CREATED } from '@/lib/graphql/subscriptions'
import type { Article } from '@/lib/api'

interface ArticleUpdate {
  articleId: string
  title: string
  status: string
  updatedAt: string
}

interface ArticleCreated {
  articleId: string
  title: string
  authors: string[]
  status: string
  createdAt: string
}

export function useRealTimeArticles(initialArticles: Article[] = []) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [notifications, setNotifications] = useState<string[]>([])

  // Subscribe to article updates
  const { data: updateData } = useSubscription<{ articleUpdated: ArticleUpdate }>(
    ARTICLE_UPDATES,
    {
      onSubscriptionData: ({ subscriptionData }) => {
        if (subscriptionData.data?.articleUpdated) {
          const updated = subscriptionData.data.articleUpdated
          
          // Update articles list
          setArticles(prev => 
            prev.map(article => 
              article.articleId === updated.articleId 
                ? { ...article, status: updated.status, updatedAt: updated.updatedAt }
                : article
            )
          )

          // Add notification
          setNotifications(prev => [
            ...prev,
            `Article "${updated.title}" status changed to ${updated.status}`
          ])
        }
      }
    }
  )

  // Subscribe to new articles
  const { data: createData } = useSubscription<{ articleCreated: ArticleCreated }>(
    ARTICLE_CREATED,
    {
      onSubscriptionData: ({ subscriptionData }) => {
        if (subscriptionData.data?.articleCreated) {
          const newArticle = subscriptionData.data.articleCreated
          
          // Add to articles list (if it's a full Article object)
          // Note: This would need the full article data from the subscription
          
          // Add notification
          setNotifications(prev => [
            ...prev,
            `New article created: "${newArticle.title}" by ${newArticle.authors.join(', ')}`
          ])
        }
      }
    }
  )

  // Clear notification
  const clearNotification = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index))
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])
  }

  // Update articles from external source
  const updateArticles = (newArticles: Article[]) => {
    setArticles(newArticles)
  }

  return {
    articles,
    notifications,
    clearNotification,
    clearAllNotifications,
    updateArticles,
    hasUpdates: updateData?.articleUpdated || createData?.articleCreated,
  }
}
