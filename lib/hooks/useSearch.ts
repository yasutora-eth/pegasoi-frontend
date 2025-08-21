import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { SEARCH_PAPERS, SEARCH_SINGLE_SOURCE } from '../graphql/queries'
import type { SearchResult } from '@/types/graphql'

export function useSearchPapers() {
  const [searchPapers, { loading, error, data }] = useLazyQuery<
    { searchPapers: SearchResult },
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
        data: result.data?.searchPapers,
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
    data: data?.searchPapers 
  }
}

export function useSearchSingleSource() {
  const [searchSingleSource, { loading, error, data }] = useLazyQuery<
    { 
      searchSingleSource: {
        papers: any[]
        totalCount: number
        nextPage?: string
      }
    },
    { query: string; source: string; limit?: number }
  >(SEARCH_SINGLE_SOURCE, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  })

  const search = async (query: string, source: 'arxiv' | 'doaj' | 'crossref', limit = 10) => {
    if (!query.trim()) {
      return { success: false, error: 'Search query cannot be empty' }
    }

    try {
      const result = await searchSingleSource({ variables: { query, source, limit } })
      return { 
        success: true, 
        data: result.data?.searchSingleSource,
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
    data: data?.searchSingleSource 
  }
}

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
    { searchPapers: SearchResult },
    { query: string; sources?: string[]; limit?: number }
  >(SEARCH_PAPERS, {
    variables: { query: debouncedQuery, sources, limit: 10 },
    skip: !debouncedQuery || debouncedQuery.trim().length < 3,
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  })
}