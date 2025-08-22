import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { 
  GET_ARTICLES, 
  GET_ARTICLE_BY_ID, 
  GET_ARTICLES_BY_STATUS,
  SEARCH_ARTICLES_BY_KEYWORDS 
} from '../graphql/queries'
import { 
  CREATE_ARTICLE, 
  UPDATE_ARTICLE_STATUS, 
  DELETE_ARTICLE,
  ADD_KEYWORDS_TO_ARTICLE 
} from '../graphql/mutations'
import type { Article, ArticleCreate, ArticleStatus } from '@/types/graphql'

// Query Hooks
export function useArticles(status?: string, limit = 100) {
  return useQuery<{ articles: Article[] }>(GET_ARTICLES, {
    variables: { status, limit },
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    // Add fallback for development
    fetchPolicy: 'cache-first',
    onError: (error) => {
      console.warn('GraphQL query failed, using fallback data:', error.message)
    }
  })
}

export function useArticle(id: string) {
  return useQuery<{ article: Article }>(GET_ARTICLE_BY_ID, {
    variables: { id },
    errorPolicy: 'all',
    skip: !id,
  })
}

export function useArticlesByStatus(status: ArticleStatus, limit = 50) {
  return useQuery<{ articlesByStatus: Article[] }>(GET_ARTICLES_BY_STATUS, {
    variables: { status, limit },
    errorPolicy: 'all',
  })
}

export function useSearchArticles(keywords: string, limit = 20) {
  return useQuery<{ searchArticlesByKeywords: Article[] }>(SEARCH_ARTICLES_BY_KEYWORDS, {
    variables: { keywords, limit },
    errorPolicy: 'all',
    skip: !keywords || keywords.trim().length === 0,
  })
}

// Mutation Hooks
export function useCreateArticle() {
  const [createArticleMutation, { loading, error }] = useMutation<
    { createArticle: Article },
    { input: ArticleCreate }
  >(CREATE_ARTICLE, {
    refetchQueries: [{ query: GET_ARTICLES }],
    awaitRefetchQueries: true,
  })

  const createArticle = async (input: ArticleCreate) => {
    try {
      const result = await createArticleMutation({ variables: { input } })
      return { success: true, data: result.data?.createArticle }
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to create article' 
      }
    }
  }

  return { createArticle, loading, error }
}

export function useUpdateArticleStatus() {
  const [updateStatusMutation, { loading, error }] = useMutation<
    { updateArticleStatus: Article },
    { id: string; status: string }
  >(UPDATE_ARTICLE_STATUS, {
    refetchQueries: [{ query: GET_ARTICLES }],
  })

  const updateStatus = async (id: string, status: ArticleStatus) => {
    try {
      const result = await updateStatusMutation({ variables: { id, status } })
      return { success: true, data: result.data?.updateArticleStatus }
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to update article status' 
      }
    }
  }

  return { updateStatus, loading, error }
}

export function useDeleteArticle() {
  const client = useApolloClient()
  const [deleteArticleMutation, { loading, error }] = useMutation<
    { deleteArticle: { success: boolean; message?: string } },
    { id: string }
  >(DELETE_ARTICLE)

  const deleteArticle = async (id: string) => {
    try {
      const result = await deleteArticleMutation({ variables: { id } })
      return { 
        success: result.data?.deleteArticle.success ?? false,
        message: result.data?.deleteArticle.message 
      }
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to delete article' 
      }
    }
  }

  return { deleteArticle, loading, error }
}

export function useAddKeywords() {
  const [addKeywordsMutation, { loading, error }] = useMutation<
    { addKeywordsToArticle: Article },
    { id: string; keywords: string[] }
  >(ADD_KEYWORDS_TO_ARTICLE)

  const addKeywords = async (id: string, keywords: string[]) => {
    try {
      const result = await addKeywordsMutation({ variables: { id, keywords } })
      return { success: true, data: result.data?.addKeywordsToArticle }
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to add keywords' 
      }
    }
  }

  return { addKeywords, loading, error }
}

// Utility Hooks
export function useRefetchArticles() {
  const client = useApolloClient()

  const refetchArticles = async () => {
    try {
      await client.refetchQueries({
        include: [GET_ARTICLES, GET_ARTICLES_BY_STATUS],
      })
      return { success: true }
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to refetch articles' 
      }
    }
  }

  return { refetchArticles }
}