# Pegasoi Frontend - Code Style & Conventions

## File Naming

- **Components**: PascalCase (e.g., `ArticleCard.tsx`, `MultiSourceSearch.tsx`)
- **Pages**: kebab-case for directories, PascalCase for files (e.g., `research-gallery/page.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`, `api.ts`)
- **Types**: camelCase with descriptive names (e.g., `article.ts`, `graphql.ts`)

## Code Organization

- **App Router Structure**: Using Next.js 14 App Router with `app/` directory
- **Component Structure**: Separate UI components in `components/ui/` and custom components in `components/`
- **Utilities**: Centralized in `lib/` directory
- **Types**: Centralized in `types/` directory

## TypeScript Conventions

- **Strict Mode**: Disabled for flexibility (`"strict": false`)
- **Interface Naming**: Descriptive names without "I" prefix (e.g., `Article`, `SearchResponse`)
- **Type Imports**: Use `import type` for type-only imports
- **Any Usage**: Allowed but discouraged, use proper typing when possible

## Component Conventions

- **Functional Components**: Use arrow functions for components
- **Props Interface**: Define interfaces for component props
- **Default Exports**: Use default exports for page components
- **Named Exports**: Use named exports for utility components

## Styling Conventions

- **Tailwind CSS**: Utility-first approach
- **CSS Variables**: Use for theme colors (e.g., `hsl(var(--primary))`)
- **Component Variants**: Use `class-variance-authority` for component variants
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Import Organization

```typescript
// 1. React and Next.js imports
import React from 'react'
import Link from 'next/link'

// 2. Third-party libraries
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 3. Internal utilities and types
import { cn } from '@/lib/utils'
import type { Article } from '@/types/article'

// 4. Icons (last)
import { Search, BookOpen } from 'lucide-react'
```

## Naming Conventions

- **Variables**: camelCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Components**: PascalCase
- **CSS Classes**: Tailwind utilities, kebab-case for custom classes

## Error Handling

- **Try-catch blocks**: For async operations
- **Error boundaries**: For component-level error handling
- **Type guards**: For runtime type checking
- **Fallback UI**: Always provide fallback states
