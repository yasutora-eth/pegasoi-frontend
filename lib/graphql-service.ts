import { apolloClient } from './apollo-client'
import {
  GET_ARTICLES,
  GET_ARTICLE_BY_ID,
  SEARCH_PAPERS,
  GET_HEALTH_STATUS,
} from './graphql/queries'
import {
  CREATE_ARTICLE,
  UPDATE_ARTICLE_STATUS,
  DELETE_ARTICLE,
} from './graphql/mutations'
import type { Article, ArticleCreate, HealthStatus } from './api'

export class GraphQLService {
  // Article Operations
  async getArticles(status?: string, limit = 100): Promise<Article[]> {
    try {
      const { data } = await apolloClient.query({
        query: GET_ARTICLES,
        variables: { status, limit },
        fetchPolicy: 'cache-first', // Use cache for better performance
      })
      return data.articles
    } catch (error) {
      console.error('GraphQL getArticles error:', error)
      throw new Error('Failed to fetch articles via GraphQL')
    }
  }

  async getArticle(id: string): Promise<Article> {
    try {
      const { data } = await apolloClient.query({
        query: GET_ARTICLE_BY_ID,
        variables: { id },
        fetchPolicy: 'cache-first',
      })
      return data.article
    } catch (error) {
      console.error('GraphQL getArticle error:', error)
      throw new Error(`Failed to fetch article ${id} via GraphQL`)
    }
  }

  async createArticle(article: ArticleCreate): Promise<Article> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_ARTICLE,
        variables: { input: article },
        // Update cache after creation
        refetchQueries: [{ query: GET_ARTICLES }],
      })
      return data.createArticle
    } catch (error) {
      console.error('GraphQL createArticle error:', error)
      throw new Error('Failed to create article via GraphQL')
    }
  }

  async updateArticleStatus(id: string, status: string): Promise<Article> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_ARTICLE_STATUS,
        variables: { id, status },
        // Optimistic update
        optimisticResponse: {
          updateArticleStatus: {
            __typename: 'Article',
            articleId: id,
            status,
            updatedAt: new Date().toISOString(),
          },
        },
      })
      return data.updateArticleStatus
    } catch (error) {
      console.error('GraphQL updateArticleStatus error:', error)
      throw new Error(`Failed to update article ${id} status via GraphQL`)
    }
  }

  async deleteArticle(
    id: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_ARTICLE,
        variables: { id },
        // Remove from cache
        update: (cache) => {
          cache.evict({ id: `Article:${id}` })
          cache.gc()
        },
      })
      return data.deleteArticle
    } catch (error) {
      console.error('GraphQL deleteArticle error:', error)
      throw new Error(`Failed to delete article ${id} via GraphQL`)
    }
  }

  // Search Operations
  async searchPapers(query: string, sources?: string[], limit = 20) {
    try {
      const { data } = await apolloClient.query({
        query: SEARCH_PAPERS,
        variables: { query, sources, limit },
        fetchPolicy: 'no-cache', // Always fetch fresh search results
      })
      return data.searchPapers
    } catch (error) {
      console.error('GraphQL searchPapers error:', error)
      throw new Error('Failed to search papers via GraphQL')
    }
  }

  // Health Check
  async getHealthStatus(): Promise<HealthStatus> {
    try {
      const { data } = await apolloClient.query({
        query: GET_HEALTH_STATUS,
        fetchPolicy: 'no-cache', // Always get fresh health status
      })
      return data.health
    } catch (error) {
      console.error('GraphQL getHealthStatus error:', error)
      throw new Error('Failed to get health status via GraphQL')
    }
  }

  // Cache Management
  async clearCache(): Promise<void> {
    try {
      await apolloClient.clearStore()
    } catch (error) {
      console.error('Failed to clear GraphQL cache:', error)
    }
  }

  async refetchArticles(): Promise<void> {
    try {
      await apolloClient.refetchQueries({
        include: [GET_ARTICLES],
      })
    } catch (error) {
      console.error('Failed to refetch articles:', error)
    }
  }
}

// Export singleton instance
export const graphqlService = new GraphQLService()
