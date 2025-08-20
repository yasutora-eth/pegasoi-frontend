import { gql } from '@apollo/client'

// Real-time subscriptions for live updates
export const ARTICLE_UPDATES = gql`
  subscription ArticleUpdates {
    articleUpdated {
      articleId
      title
      status
      updatedAt
    }
  }
`

export const ARTICLE_CREATED = gql`
  subscription ArticleCreated {
    articleCreated {
      articleId
      title
      authors
      status
      createdAt
    }
  }
`

export const ARTICLE_STATUS_CHANGED = gql`
  subscription ArticleStatusChanged($articleId: ID) {
    articleStatusChanged(articleId: $articleId) {
      articleId
      status
      updatedAt
    }
  }
`

export const SEARCH_RESULTS_UPDATED = gql`
  subscription SearchResultsUpdated($query: String!) {
    searchResultsUpdated(query: $query) {
      query
      results {
        title
        authors
        source
        url
      }
      timestamp
    }
  }
`
