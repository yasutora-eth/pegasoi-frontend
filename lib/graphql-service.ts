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

  // Search Operations - Try different query formats to find working combination
  async searchPapers(query: string, sources?: string[], limit = 20) {
    const trimmedQuery = query.trim()
    const searchSources = sources || ['crossref', 'arxiv', 'doaj']

    // Try different query formats
    const queryVariations = [
      trimmedQuery,
      `"${trimmedQuery}"`,
      trimmedQuery.split(' ').join(' AND '),
      trimmedQuery.replace(/\s+/g, '+'),
    ]

    for (const [index, queryVariation] of queryVariations.entries()) {
      try {
        console.log(
          `Trying GraphQL query variation ${index + 1}: "${queryVariation}"`
        )

        const { data } = await apolloClient.query({
          query: SEARCH_PAPERS,
          variables: { query: queryVariation, sources: searchSources, limit },
          fetchPolicy: 'no-cache',
          context: {
            timeout: 90000,
          },
        })

        const results = data.search || []
        if (Array.isArray(results) && results.length > 0) {
          console.log(
            `✅ Found working GraphQL query format ${index + 1}! Got ${results.length} results`
          )
          return results
        }
      } catch (error) {
        console.log(`❌ GraphQL query variation ${index + 1} failed:`, error)
        continue
      }
    }

    console.log(
      '❌ All GraphQL query variations failed, returning empty results'
    )
    return []
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
