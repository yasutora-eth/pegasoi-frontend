const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Backend uses camelCase - match exactly
export interface Article {
  articleId: string
  title: string
  content: string
  authors: string[]
  abstract: string
  keywords: string[]
  publicationDate: string
  status: string
  createdAt: string
  updatedAt: string
  doi?: string | null
  journal?: string | null
}

// Match backend CreateArticleDTO exactly
export interface ArticleCreate {
  title: string
  authors: string[]
  abstract: string
  content: string
  publicationDate: string // ISO format - backend expects camelCase
  keywords?: string[]
  doi?: string
  journal?: string
}

// Backend only supports status updates via PATCH
export interface ArticleUpdate {
  status: string // Backend UpdateArticleDTO only has status field
}

// Search source data interfaces
export interface ArxivData {
  title: string
  authors: string[]
  abstract: string
  url: string
  publishedDate: string
  categories: string[]
}

export interface DoajData {
  title: string
  authors: string[]
  abstract: string
  url: string
  journal: string
  publishedDate: string
}

export interface CrossrefData {
  title: string
  authors: string[]
  abstract: string
  doi: string
  journal: string
  publishedDate: string
}

export interface GettyData {
  title: string
  description: string
  url: string
  imageUrl?: string
}

export interface SearchResult {
  arxiv?: { ok: boolean; data: ArxivData[]; error?: string }
  doaj?: { ok: boolean; data: DoajData[]; error?: string }
  crossref?: { ok: boolean; data: CrossrefData[]; error?: string }
  getty?: { ok: boolean; data: GettyData[]; error?: string }
}

export interface ConnectionTestResult {
  message: string
  status: 'healthy' | 'error'
  timestamp: string
}

export interface SingleSourceSearchResult {
  papers: ArxivData[] | DoajData[] | CrossrefData[]
  totalCount: number
  nextPage?: string
}

export interface HealthStatus {
  status: string
  timestamp: string
  services: {
    redis: string
  }
  environment: string
  version: string
}

class ApiService {
  private useGraphQL = process.env.NEXT_PUBLIC_USE_GRAPHQL === 'true'

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = endpoint.startsWith('/api')
      ? endpoint
      : `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(
          `API Error: ${response.status} ${response.statusText} - ${errorText}`
        )
      }

      // Handle empty responses (like DELETE)
      if (response.status === 204) {
        return {} as T
      }

      return response.json()
    } catch (error) {
      // Enhanced error handling
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(
          `Network error: Unable to connect to ${url}. Make sure the backend is running.`
        )
      }
      throw error
    }
  }

  // Article CRUD - Match backend endpoints exactly
  async getArticles(status?: string): Promise<Article[]> {
    if (status) {
      // Use backend's status endpoint: /api/v1/articles/status/{status}
      return this.request<Article[]>(`/api/v1/articles/status/${status}`)
    }
    return this.request<Article[]>(`/api/v1/articles`)
  }

  async getArticle(id: string): Promise<Article> {
    return this.request<Article>(`/api/v1/articles/${id}`)
  }

  async createArticle(article: ArticleCreate): Promise<Article> {
    return this.request<Article>(`/api/v1/articles`, {
      method: 'POST',
      body: JSON.stringify(article),
    })
  }

  // Backend only supports status updates via PATCH
  async updateArticleStatus(id: string, status: string): Promise<Article> {
    return this.request<Article>(`/api/v1/articles/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
  }

  // General update method for article updates
  async updateArticle(id: string, data: ArticleUpdate): Promise<Article> {
    return this.updateArticleStatus(id, data.status)
  }

  async deleteArticle(id: string): Promise<{ message?: string }> {
    return this.request<{ message?: string }>(`/api/v1/articles/${id}`, {
      method: 'DELETE',
    })
  }

  // New methods to match backend capabilities
  async addKeywordsToArticle(id: string, keywords: string[]): Promise<Article> {
    return this.request<Article>(`/api/v1/articles/${id}/keywords`, {
      method: 'POST',
      body: JSON.stringify({ keywords }),
    })
  }

  async searchArticlesByKeywords(keywords: string): Promise<Article[]> {
    return this.request<Article[]>(
      `/api/v1/articles/search/keywords?keywords=${encodeURIComponent(keywords)}`
    )
  }

  // Multi-source search - Enhanced with error handling
  async searchAllSources(
    query: string,
    limit: number = 10
  ): Promise<SearchResult> {
    try {
      return this.request<SearchResult>(
        `/api/v1/search/papers?query=${encodeURIComponent(query)}&limit=${limit}`
      )
    } catch (error) {
      // Return fallback structure with proper error handling
      throw new Error(
        `Search service unavailable: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  async searchSingleSource(
    query: string,
    source: 'arxiv' | 'doaj' | 'crossref',
    limit: number = 10
  ): Promise<SingleSourceSearchResult> {
    return this.request<SingleSourceSearchResult>(
      `/api/v1/search/papers?query=${encodeURIComponent(query)}&sources=${source}&limit=${limit}`
    )
  }

  // Health check - Backend alignment
  async healthCheck(): Promise<HealthStatus> {
    return this.request<HealthStatus>(`/api/v1/health`)
  }

  // Test connection
  async testConnection(): Promise<ConnectionTestResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      return response.json()
    } catch (error) {
      throw new Error(
        `Backend connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  // Batch operations - Push to limits
  async batchCreateArticles(articles: ArticleCreate[]): Promise<Article[]> {
    const promises = articles.map((article) => this.createArticle(article))
    return Promise.all(promises)
  }

  async batchUpdateArticles(
    updates: { id: string; data: ArticleUpdate }[]
  ): Promise<Article[]> {
    const promises = updates.map(({ id, data }) => this.updateArticle(id, data))
    return Promise.all(promises)
  }

  async batchDeleteArticles(ids: string[]): Promise<void> {
    const promises = ids.map((id) => this.deleteArticle(id))
    await Promise.all(promises)
  }
}

export const apiService = new ApiService()
