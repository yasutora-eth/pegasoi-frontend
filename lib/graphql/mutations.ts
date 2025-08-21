import { gql } from '@apollo/client'

// Article Mutations
export const CREATE_ARTICLE = gql`
  mutation CreateArticle($input: ArticleCreateInput!) {
    createArticle(input: $input) {
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

export const UPDATE_ARTICLE_STATUS = gql`
  mutation UpdateArticleStatus($id: ID!, $status: String!) {
    updateArticleStatus(id: $id, status: $status) {
      articleId
      title
      status
      updatedAt
    }
  }
`

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($id: ID!, $input: ArticleUpdateInput!) {
    updateArticle(id: $id, input: $input) {
      articleId
      title
      content
      authors
      abstract
      keywords
      publicationDate
      status
      updatedAt
      doi
      journal
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

export const ADD_KEYWORDS_TO_ARTICLE = gql`
  mutation AddKeywordsToArticle($id: ID!, $keywords: [String!]!) {
    addKeywordsToArticle(id: $id, keywords: $keywords) {
      articleId
      keywords
      updatedAt
    }
  }
`

// Batch Operations
export const BATCH_UPDATE_ARTICLE_STATUS = gql`
  mutation BatchUpdateArticleStatus($updates: [ArticleStatusUpdate!]!) {
    batchUpdateArticleStatus(updates: $updates) {
      success
      updatedCount
      errors {
        articleId
        message
      }
    }
  }
`

export const BATCH_DELETE_ARTICLES = gql`
  mutation BatchDeleteArticles($ids: [ID!]!) {
    batchDeleteArticles(ids: $ids) {
      success
      deletedCount
      errors {
        articleId
        message
      }
    }
  }
`

// User Mutations (for when auth is implemented)
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UserUpdateInput!) {
    updateUserProfile(input: $input) {
      id
      name
      email
      updatedAt
    }
  }
`

export const CHANGE_USER_ROLE = gql`
  mutation ChangeUserRole($userId: ID!, $role: UserRole!) {
    changeUserRole(userId: $userId, role: $role) {
      id
      name
      email
      role
      updatedAt
    }
  }
`