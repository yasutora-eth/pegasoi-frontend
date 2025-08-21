// GraphQL Types for Research Portal
export interface Article {
  articleId: string
  title: string
  content: string
  authors: string[]
  articleAbstract: string
  keywords: string[]
  publicationDate: string
  status: ArticleStatus
  createdAt: string
  updatedAt: string
  doi?: string | null
  journal?: string | null
}

export type ArticleStatus = 
  | 'draft'
  | 'in_review' 
  | 'published'
  | 'archived'
  | 'rejected'

export interface ArticleCreate {
  title: string
  authors: string[]
  articleAbstract: string
  content: string
  publicationDate: string
  keywords?: string[]
  doi?: string
  journal?: string
}

export interface ArticleUpdate {
  status: ArticleStatus
}

// Search Result Types
export interface SearchResult {
  arxiv?: SearchSourceResult<ArxivData>
  doaj?: SearchSourceResult<DoajData>
  crossref?: SearchSourceResult<CrossrefData>
  getty?: SearchSourceResult<GettyData>
}

export interface SearchSourceResult<T> {
  ok: boolean
  data: T[]
  error?: string
}

export interface ArxivData {
  title: string
  authors: string[]
  paperAbstract: string
  url: string
  publishedDate: string
  categories: string[]
}

export interface DoajData {
  title: string
  authors: string[]
  paperAbstract: string
  url: string
  journal: string
  publishedDate: string
}

export interface CrossrefData {
  title: string
  authors: string[]
  paperAbstract: string
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

// User and Authentication Types
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt?: string
  updatedAt?: string
}

export type UserRole = 'user' | 'publisher' | 'admin'

// System Health Types
export interface HealthStatus {
  status: string
  timestamp: string
  services: {
    redis: string
    database?: string
    graphql?: string
  }
  environment: string
  version: string
}

// GraphQL Query/Mutation Response Types
export interface GraphQLResponse<T> {
  data?: T
  errors?: GraphQLError[]
  loading: boolean
}

export interface GraphQLError {
  message: string
  locations?: Array<{
    line: number
    column: number
  }>
  path?: string[]
  extensions?: Record<string, any>
}

// Pagination Types
export interface PaginationInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string
  endCursor?: string
  totalCount?: number
}

export interface Connection<T> {
  edges: Array<{
    node: T
    cursor: string
  }>
  pageInfo: PaginationInfo
}

// Filter and Sort Types
export interface ArticleFilters {
  status?: ArticleStatus[]
  authors?: string[]
  keywords?: string[]
  dateRange?: {
    start: string
    end: string
  }
  journal?: string[]
}

export interface SortOptions {
  field: 'createdAt' | 'updatedAt' | 'publicationDate' | 'title'
  direction: 'ASC' | 'DESC'
}

// Mutation Result Types
export interface MutationResult<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}