const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface Article {
  article_id: string
  id?: string // Keep for compatibility
  title: string
  content: string
  authors: string[]
  abstract: string
  keywords: string[]
  publication_date: string
  status: "draft" | "in_review" | "published" | "archived" | "rejected"
  created_at: string
  updated_at: string
  doi?: string
  journal?: string
}

export interface ArticleCreate {
  title: string
  authors: string[]
  abstract: string
  content: string
  keywords: string[]
  publication_date: string // ISO format
  doi?: string
  journal?: string
}

export interface ArticleUpdate {
  title?: string
  authors?: string[]
  abstract?: string
  content?: string
  keywords?: string[]
  publication_date?: string
  doi?: string
  journal?: string
  status?: string
}

export interface SearchResult {
  arxiv?: { ok: boolean; data: any; error?: string }
  doaj?: { ok: boolean; data: any; error?: string }
  crossref?: { ok: boolean; data: any; error?: string }
  getty?: { ok: boolean; data: any; error?: string }
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
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = endpoint.startsWith("/api") ? endpoint : `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`)
      }

      // Handle empty responses (like DELETE)
      if (response.status === 204) {
        return {} as T
      }

      return response.json()
    } catch (error) {
      // Enhanced error handling
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(`Network error: Unable to connect to ${url}. Make sure the backend is running.`)
      }
      throw error
    }
  }

  // Article CRUD - Full backend alignment
  async getArticles(status?: string): Promise<Article[]> {
    const params = status ? `?status=${status}` : ""
    return this.request<Article[]>(`/api/v1/articles${params}`)
  }

  async getArticle(id: string): Promise<Article> {
    return this.request<Article>(`/api/v1/articles/${id}`)
  }

  async createArticle(article: ArticleCreate): Promise<Article> {
    return this.request<Article>(`/api/v1/articles/`, {
      method: "POST",
      body: JSON.stringify(article),
    })
  }

  async updateArticle(id: string, article: ArticleUpdate): Promise<Article> {
    return this.request<Article>(`/api/v1/articles/${id}`, {
      method: "PUT",
      body: JSON.stringify(article),
    })
  }

  async deleteArticle(id: string): Promise<void> {
    return this.request<void>(`/api/v1/articles/${id}`, {
      method: "DELETE",
    })
  }

  // Multi-source search - Enhanced with error handling
  async searchAllSources(query: string): Promise<SearchResult> {
    try {
      return this.request<SearchResult>(`/api/v1/search?query=${encodeURIComponent(query)}`)
    } catch (error) {
      console.warn("Backend search failed, using fallback:", error)
      // Return fallback structure
      throw new Error(`Search service unavailable: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async searchSingleSource(query: string, source: "arxiv" | "doaj" | "crossref" | "getty"): Promise<any> {
    return this.request<any>(`/api/v1/search?query=${encodeURIComponent(query)}&source=${source}`)
  }

  // Health check - Backend alignment
  async healthCheck(): Promise<HealthStatus> {
    return this.request<HealthStatus>(`/api/v1/health`)
  }

  // Test connection
  async testConnection(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      return response.json()
    } catch (error) {
      throw new Error(`Backend connection failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  // Batch operations - Push to limits
  async batchCreateArticles(articles: ArticleCreate[]): Promise<Article[]> {
    const promises = articles.map((article) => this.createArticle(article))
    return Promise.all(promises)
  }

  async batchUpdateArticles(updates: { id: string; data: ArticleUpdate }[]): Promise<Article[]> {
    const promises = updates.map(({ id, data }) => this.updateArticle(id, data))
    return Promise.all(promises)
  }

  async batchDeleteArticles(ids: string[]): Promise<void> {
    const promises = ids.map((id) => this.deleteArticle(id))
    await Promise.all(promises)
  }
}

export const apiService = new ApiService()
