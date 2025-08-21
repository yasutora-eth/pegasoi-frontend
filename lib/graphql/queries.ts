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
    articlesByStatus(status: $status, limit: $limit) {
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
    searchArticlesByKeywords(keywords: $keywords, limit: $limit) {
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

// Multi-source Search Queries
export const SEARCH_PAPERS = gql`
  query SearchPapers($query: String!, $sources: [String!], $limit: Int = 10) {
    searchPapers(query: $query, sources: $sources, limit: $limit) {
      arxiv {
        ok
        data {
          title
          authors
          abstract
          url
          publishedDate
          categories
        }
        error
      }
      doaj {
        ok
        data {
          title
          authors
          abstract
          url
          journal
          publishedDate
        }
        error
      }
      crossref {
        ok
        data {
          title
          authors
          abstract
          doi
          journal
          publishedDate
        }
        error
      }
      getty {
        ok
        data {
          title
          description
          url
          imageUrl
        }
        error
      }
    }
  }
`

export const SEARCH_SINGLE_SOURCE = gql`
  query SearchSingleSource($query: String!, $source: String!, $limit: Int = 10) {
    searchSingleSource(query: $query, source: $source, limit: $limit) {
      papers {
        ... on ArxivData {
          title
          authors
          abstract
          url
          publishedDate
          categories
        }
        ... on DoajData {
          title
          authors
          abstract
          url
          journal
          publishedDate
        }
        ... on CrossrefData {
          title
          authors
          abstract
          doi
          journal
          publishedDate
        }
      }
      totalCount
      nextPage
    }
  }
`

// Health and System Queries
export const GET_HEALTH_STATUS = gql`
  query GetHealthStatus {
    health {
      status
      timestamp
      services {
        redis
        database
        graphql
      }
      environment
      version
    }
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