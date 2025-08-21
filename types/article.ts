// Re-export types from API to maintain consistency
export type {
  Article,
  ArticleCreate,
  ArticleUpdate,
  SearchResult,
  HealthStatus,
  ArxivData,
  DoajData,
  CrossrefData,
  GettyData,
} from '@/lib/api'

// Legacy types for backward compatibility
export type ArticleStatus =
  | 'draft'
  | 'in_review'
  | 'published'
  | 'archived'
  | 'rejected'

export interface LegacyArticle {
  id: string
  title: string
  content: string
  author: string
  reference: string
  status: ArticleStatus
  createdAt: string
  updatedAt: string
}