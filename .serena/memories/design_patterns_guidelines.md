# Pegasoi Frontend - Design Patterns & Guidelines

## Component Architecture Patterns

### 1. Component Composition Pattern
```typescript
// Preferred: Composable components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>

// Avoid: Monolithic components with many props
<ComplexCard title="Title" content="Content" showHeader={true} />
```

### 2. Custom Hook Pattern
```typescript
// Extract logic into custom hooks
function useArticleSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  const search = useCallback(async (query: string) => {
    setLoading(true)
    // Search logic
    setLoading(false)
  }, [])
  
  return { results, loading, search }
}
```

### 3. Error Boundary Pattern
```typescript
// Wrap components with error boundaries
<ErrorBoundary fallback={<ErrorFallback />}>
  <SearchComponent />
</ErrorBoundary>
```

## State Management Patterns

### 1. Local State (useState)
- Use for component-specific state
- Form inputs, UI toggles, local loading states

### 2. Apollo Client (GraphQL)
- Use for server state management
- Caching, optimistic updates, error handling

### 3. Context Pattern (Sparingly)
- Use only for truly global state
- Theme, authentication status, user preferences

## Styling Patterns

### 1. Utility-First with Tailwind
```typescript
// Preferred: Tailwind utilities
<div className="flex items-center justify-between p-4 bg-card rounded-lg">

// Avoid: Custom CSS classes unless necessary
<div className="custom-card-layout">
```

### 2. Component Variants with CVA
```typescript
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
      },
    },
  }
)
```

### 3. CSS Variables for Theming
```css
/* Use CSS variables for consistent theming */
:root {
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
}
```

## API Integration Patterns

### 1. GraphQL with Apollo
```typescript
// Use Apollo hooks for GraphQL
const { data, loading, error } = useQuery(GET_ARTICLES)
const [createArticle] = useMutation(CREATE_ARTICLE)
```

### 2. REST API with Custom Hooks
```typescript
// Wrap API calls in custom hooks
function useApiCall<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Implementation
  return { data, loading, error, refetch }
}
```

## Error Handling Patterns

### 1. Component-Level Error Boundaries
```typescript
// Wrap risky components
<ErrorBoundary>
  <SearchResults />
</ErrorBoundary>
```

### 2. Async Error Handling
```typescript
// Always handle async errors
try {
  const result = await apiCall()
  setData(result)
} catch (error) {
  setError(error.message)
  // Log error for monitoring
  console.error('API call failed:', error)
}
```

### 3. User-Friendly Error Messages
```typescript
// Provide helpful error messages
const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred. Please try again.'
}
```

## Performance Patterns

### 1. Code Splitting
```typescript
// Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Use with Suspense
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### 2. Memoization
```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])

// Memoize callbacks
const handleClick = useCallback(() => {
  // Handle click
}, [dependency])
```

### 3. Virtualization for Large Lists
```typescript
// Use virtualization for large datasets
// (To be implemented when needed)
```

## Accessibility Patterns

### 1. Semantic HTML
```typescript
// Use semantic elements
<main>
  <section>
    <h1>Page Title</h1>
    <article>Content</article>
  </section>
</main>
```

### 2. ARIA Labels
```typescript
// Provide ARIA labels for screen readers
<button aria-label="Search articles">
  <SearchIcon />
</button>
```

### 3. Keyboard Navigation
```typescript
// Ensure keyboard accessibility
<div 
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Interactive element
</div>
```

## Testing Patterns (Future)

### 1. Component Testing
```typescript
// Test component behavior, not implementation
test('should display search results', () => {
  render(<SearchResults results={mockResults} />)
  expect(screen.getByText('Result 1')).toBeInTheDocument()
})
```

### 2. Custom Hook Testing
```typescript
// Test custom hooks with renderHook
test('should handle search state', () => {
  const { result } = renderHook(() => useSearch())
  // Test hook behavior
})
```