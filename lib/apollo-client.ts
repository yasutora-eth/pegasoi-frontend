import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

// HTTP Link to GraphQL endpoint with timeout support
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  fetch: (uri, options) => {
    // Add timeout support for GraphQL requests
    const controller = new AbortController()
    const timeout = options?.context?.timeout || 60000 // Default 60 seconds
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    return fetch(uri, {
      ...options,
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId))
  },
})

// Auth link to add JWT token to requests
const authLink = setContext((_, { headers }) => {
  // Get token from Clerk or localStorage
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  }
})

// Error link for handling GraphQL errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`)

    // Handle specific error codes
    if ('statusCode' in networkError) {
      switch (networkError.statusCode) {
        case 401:
          // Redirect to login or refresh token
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
          break
        case 403:
          console.error('Access forbidden - insufficient permissions')
          break
        case 500:
          console.error('Server error - please try again later')
          break
      }
    }
  }
})

// Apollo Client instance
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Article: {
        keyFields: ['articleId'], // Backend uses camelCase
      },
      SearchResult: {
        keyFields: false, // Don't cache search results
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

// Helper function to update auth token
export const updateAuthToken = (token: string | null) => {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('auth_token', token)
    } else {
      localStorage.removeItem('auth_token')
    }
    // Reset Apollo cache when auth changes
    apolloClient.resetStore()
  }
}
