import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { SEARCH_PAPERS } from '../graphql/queries'
import type { SearchResult } from '@/types/graphql'

export function useSearchPapers() {
  const [searchPapers, { loading, error, data }] = useLazyQuery<
    { search: SearchResult[] },
    { query: string; sources?: string[]; limit?: number }
  >(SEARCH_PAPERS, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache', // Always fetch fresh search results
  })

  const search = async (query: string, sources?: string[], limit = 10) => {
    if (!query.trim()) {
      return { success: false, error: 'Search query cannot be empty' }
    }

    try {
      const result = await searchPapers({ variables: { query, sources, limit } })
      return {
        success: true,
        data: result.data?.search,
        loading: result.loading
      }
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Search failed'
      }
    }
  }

  return {
    search,
    loading,
    error,
    data: data?.search
  }
}

// useSearchSingleSource removed - not supported by backend
// Use useSearchPapers with specific sources instead

// Hook for real-time search with debouncing
export function useSearchWithDebounce(
  query: string, 
  sources?: string[], 
  delay = 500
) {
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, delay)

    return () => clearTimeout(timer)
  }, [query, delay])

  return useQuery<
    { search: SearchResult[] },
    { query: string; sources?: string[]; limit?: number }
  >(SEARCH_PAPERS, {
    variables: { query: debouncedQuery, sources, limit: 10 },
    skip: !debouncedQuery || debouncedQuery.trim().length < 3,
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  })
}