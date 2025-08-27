import { gql } from '@apollo/client'

// Article Queries
export const GET_ARTICLES = gql`
  query GetArticles($status: String, $limit: Int = 100, $offset: Int = 0) {
    articles(status: $status, limit: $limit, offset: $offset) {
      articleId
      title
      content
      authors
      abstract
      keywords
      publicationDate
      status
      createdAt
      updatedAt
      doi
      journal
    }
  }
`

export const GET_ARTICLE_BY_ID = gql`
  query GetArticleById($id: ID!) {
    article(id: $id) {
      articleId
      title
      content
      authors
      abstract
      keywords
      publicationDate
      status
      createdAt
      updatedAt
      doi
      journal
    }
  }
`

export const GET_ARTICLES_BY_STATUS = gql`
  query GetArticlesByStatus($status: String!, $limit: Int = 50) {
    articles(status: $status, limit: $limit) {
      articleId
      title
      authors
      abstract
      publicationDate
      status
      createdAt
      updatedAt
      journal
    }
  }
`

export const SEARCH_ARTICLES_BY_KEYWORDS = gql`
  query SearchArticlesByKeywords($keywords: String!, $limit: Int = 20) {
    searchArticles(keywords: $keywords) {
      articleId
      title
      authors
      abstract
      keywords
      publicationDate
      status
      journal
      doi
    }
  }
`

// Multi-source Search Queries - Updated to match backend GraphQL schema
export const SEARCH_PAPERS = gql`
  query SearchArticles($query: String!, $sources: [String!], $limit: Int) {
    search(query: $query, sources: $sources, limit: $limit) {
      title
      authors
      abstract
      source
      url
      publicationDate
      doi
      journal
      keywords
      relevanceScore
    }
  }
`

// SEARCH_SINGLE_SOURCE query removed - not supported by backend
// Use SEARCH_PAPERS with specific sources instead

// Health and System Queries
export const GET_HEALTH_STATUS = gql`
  query GetHealthStatus {
    health
  }
`

// User Queries (for when auth is implemented)
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
`

export const GET_USER_ARTICLES = gql`
  query GetUserArticles($userId: ID!, $status: String) {
    userArticles(userId: $userId, status: $status) {
      articleId
      title
      authors
      abstract
      status
      createdAt
      updatedAt
      publicationDate
    }
  }
`