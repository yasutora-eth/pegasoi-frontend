import { gql } from '@apollo/client'

// Article Mutations - Match backend schema exactly
export const CREATE_ARTICLE = gql`
  mutation CreateArticle($input: ArticleCreateInput!) {
    createArticle(input: $input) {
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

export const UPDATE_ARTICLE_STATUS = gql`
  mutation UpdateArticleStatus($id: ID!, $status: String!) {
    updateArticleStatus(id: $id, status: $status) {
      articleId
      status
      updatedAt
    }
  }
`

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      success
      message
    }
  }
`

// Bulk Operations
export const BULK_UPDATE_ARTICLES = gql`
  mutation BulkUpdateArticles($ids: [ID!]!, $updates: ArticleUpdateInput!) {
    bulkUpdateArticles(ids: $ids, updates: $updates) {
      success
      updated_count
      errors {
        article_id
        message
      }
    }
  }
`

export const BULK_DELETE_ARTICLES = gql`
  mutation BulkDeleteArticles($ids: [ID!]!) {
    bulkDeleteArticles(ids: $ids) {
      success
      deleted_count
      errors {
        article_id
        message
      }
    }
  }
`

// User Management (if backend supports)
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UserUpdateInput!) {
    updateUserProfile(input: $input) {
      id
      email
      name
      role
      updated_at
    }
  }
`

export const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($userId: ID!, $role: String!) {
    updateUserRole(userId: $userId, role: $role) {
      id
      role
      updated_at
    }
  }
`
