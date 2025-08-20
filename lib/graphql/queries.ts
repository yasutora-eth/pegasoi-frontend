import { gql } from '@apollo/client'

// Article Queries - Match backend schema exactly
export const GET_ARTICLES = gql`
  query GetArticles($status: String, $limit: Int, $offset: Int) {
    articles(status: $status, limit: $limit, offset: $offset) {
      articleId
      title
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
      article_id
      title
      content
      authors
      abstract
      keywords
      publication_date
      status
      created_at
      updated_at
      doi
      journal
    }
  }
`

export const GET_ARTICLES_BY_STATUS = gql`
  query GetArticlesByStatus($status: String!, $limit: Int) {
    articlesByStatus(status: $status, limit: $limit) {
      article_id
      title
      authors
      abstract
      status
      created_at
      updated_at
    }
  }
`

// Search Queries
export const SEARCH_PAPERS = gql`
  query SearchPapers($query: String!, $sources: [String!], $limit: Int) {
    searchPapers(query: $query, sources: $sources, limit: $limit) {
      ok
      data {
        entries {
          title
          authors
          abstract
          source
          url
          year
          journal
          doi
          classics_relevance
        }
        total
      }
      error
    }
  }
`

export const SEARCH_MULTI_SOURCE = gql`
  query SearchMultiSource($query: String!, $limit: Int) {
    searchMultiSource(query: $query, limit: $limit) {
      arxiv {
        ok
        data {
          entries {
            title
            authors
            abstract
            url
            source
          }
          total
        }
        error
      }
      doaj {
        ok
        data {
          entries {
            title
            authors
            abstract
            url
            source
          }
          total
        }
        error
      }
      crossref {
        ok
        data {
          entries {
            title
            authors
            abstract
            url
            source
          }
          total
        }
        error
      }
      getty {
        ok
        data {
          entries {
            title
            authors
            abstract
            url
            source
          }
          total
        }
        error
      }
    }
  }
`

// Health Check
export const GET_HEALTH_STATUS = gql`
  query GetHealthStatus {
    health {
      status
      timestamp
      version
      database_status
      redis_status
      services {
        name
        status
        response_time
      }
    }
  }
`

// User Queries (if backend supports user management)
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      name
      role
      created_at
      last_login
    }
  }
`
