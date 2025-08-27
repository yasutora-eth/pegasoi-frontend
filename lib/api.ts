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

// Unified search result interface matching backend response
export interface SearchPaper {
  title: string
  authors: string[]
  abstract: string
  source: string
  url: string
  relevanceScore: number
  doi?: string
  journal?: string
  publicationDate: string
  keywords?: string[]
}

// Legacy interfaces for backward compatibility
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

// Legacy search result interface for backward compatibility
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
    options: RequestInit = {},
    timeout: number = 30000
  ): Promise<T> {
    const url = endpoint.startsWith('/api')
      ? endpoint
      : `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    config.signal = controller.signal

    try {
      const response = await fetch(url, config)
      clearTimeout(timeoutId)

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
      clearTimeout(timeoutId)
      // Enhanced error handling
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`)
      }
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

  // Multi-source search - Optimized with extended timeout and comprehensive parameter testing
  async searchAllSources(
    query: string,
    limit: number = 10,
    sources: string[] = ['crossref', 'arxiv', 'doaj']
  ): Promise<SearchPaper[]> {
    const trimmedQuery = query.trim()

    // Extended search variations including different approaches
    const searchVariations = [
      // Standard formats
      {
        endpoint: `/api/v1/search/papers?query=${encodeURIComponent(trimmedQuery)}&limit=${limit}&sources=${sources.join(',')}`,
        description: 'Standard multi-source'
      },
      {
        endpoint: `/api/v1/search/papers?query=${encodeURIComponent(trimmedQuery)}&limit=${limit}`,
        description: 'No sources specified'
      },
      {
        endpoint: `/api/v1/search/papers?query=${encodeURIComponent(trimmedQuery)}&limit=${limit}&sources=crossref`,
        description: 'CrossRef only'
      },
      {
        endpoint: `/api/v1/search/papers?query=${encodeURIComponent(trimmedQuery)}&limit=${limit}&sources=arxiv`,
        description: 'ArXiv only'
      },
      {
        endpoint: `/api/v1/search/papers?query=${encodeURIComponent(trimmedQuery)}&limit=${limit}&sources=doaj`,
        description: 'DOAJ only'
      },

      // Different query encodings
      {
        endpoint: `/api/v1/search/papers?query=${trimmedQuery.replace(/\s+/g, '+')}&limit=${limit}&sources=crossref`,
        description: 'Plus encoding'
      },
      {
        endpoint: `/api/v1/search/papers?query=${encodeURIComponent('"' + trimmedQuery + '"')}&limit=${limit}&sources=crossref`,
        description: 'Quoted query'
      },
      {
        endpoint: `/api/v1/search/papers?query=${encodeURIComponent(trimmedQuery.split(' ').join(' AND '))}&limit=${limit}&sources=crossref`,
        description: 'Boolean AND'
      },
      {
        endpoint: `/api/v1/search/papers?query=${encodeURIComponent(trimmedQuery.split(' ').join(' OR '))}&limit=${limit}&sources=crossref`,
        description: 'Boolean OR'
      },

      // Academic-specific formats
      {
        endpoint: `/api/v1/search/papers?query=${encodeURIComponent('title:' + trimmedQuery)}&limit=${limit}&sources=crossref`,
        description: 'Title field search'
      },
      {
        endpoint: `/api/v1/search/papers?query=${encodeURIComponent('abstract:' + trimmedQuery)}&limit=${limit}&sources=crossref`,
        description: 'Abstract field search'
      }
    ]

    console.log(`🔍 Starting comprehensive search for: "${trimmedQuery}"`)

    for (const [index, variation] of searchVariations.entries()) {
      try {
        console.log(`Trying variation ${index + 1}/11: ${variation.description}`)
        console.log(`URL: ${variation.endpoint}`)

        const result = await this.request<SearchPaper[]>(
          variation.endpoint,
          {
            headers: {
              'User-Agent': 'Pegasoi-Research-Platform/1.0',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          },
          120000 // 2 minute timeout for thorough testing
        )

        if (Array.isArray(result) && result.length > 0) {
          console.log(`✅ SUCCESS! Found working format: ${variation.description}`)
          console.log(`✅ Got ${result.length} results from variation ${index + 1}`)
          console.log(`✅ Working URL: ${variation.endpoint}`)
          return result
        } else {
          console.log(`❌ Variation ${index + 1} returned empty results`)
        }
      } catch (error) {
        console.log(`❌ Variation ${index + 1} failed:`, error instanceof Error ? error.message : error)
        continue
      }

      // Small delay between attempts to be respectful
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    console.log('❌ All 11 search variations failed - backend may be experiencing issues with external APIs')
    return []
  }

  async searchSingleSource(
    query: string,
    source: 'arxiv' | 'doaj' | 'crossref',
    limit: number = 10
  ): Promise<SearchPaper[]> {
    return this.request<SearchPaper[]>(
      `/api/v1/search/papers?query=${encodeURIComponent(query.trim())}&sources=${source}&limit=${limit}`,
      {},
      90000 // 90 second timeout for search requests
    )
  }

  // Legacy method for backward compatibility
  async searchAllSourcesLegacy(
    query: string,
    limit: number = 10
  ): Promise<SearchResult> {
    try {
      const papers = await this.searchAllSources(query, limit)
      // Convert unified response back to legacy format for backward compatibility
      return this.convertToLegacyFormat(papers)
    } catch (error) {
      throw new Error(
        `Search service unavailable: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  private convertToLegacyFormat(papers: SearchPaper[]): SearchResult {
    const result: SearchResult = {}

    papers.forEach(paper => {
      if (!result[paper.source as keyof SearchResult]) {
        result[paper.source as keyof SearchResult] = { ok: true, data: [] }
      }

      const sourceData = result[paper.source as keyof SearchResult]
      if (sourceData && sourceData.data) {
        // Convert to legacy format based on source
        if (paper.source === 'arxiv') {
          (sourceData.data as ArxivData[]).push({
            title: paper.title,
            authors: paper.authors,
            abstract: paper.abstract,
            url: paper.url,
            publishedDate: paper.publicationDate,
            categories: paper.keywords || []
          })
        } else if (paper.source === 'doaj') {
          (sourceData.data as DoajData[]).push({
            title: paper.title,
            authors: paper.authors,
            abstract: paper.abstract,
            url: paper.url,
            journal: paper.journal || '',
            publishedDate: paper.publicationDate
          })
        } else if (paper.source === 'crossref') {
          (sourceData.data as CrossrefData[]).push({
            title: paper.title,
            authors: paper.authors,
            abstract: paper.abstract,
            doi: paper.doi || '',
            journal: paper.journal || '',
            publishedDate: paper.publicationDate
          })
        }
      }
    })

    return result
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
