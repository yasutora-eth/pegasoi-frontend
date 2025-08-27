# Pegasoi Frontend - Project Structure

## Root Directory Structure

```
pegasoi-frontend/
├── .github/              # GitHub workflows and templates
├── .husky/               # Git hooks configuration
├── .serena/              # Serena MCP configuration
├── app/                  # Next.js 14 App Router (main application)
├── components/           # Reusable React components
├── docs/                 # Project documentation
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
├── public/               # Static assets
├── scripts/              # Build and utility scripts
├── styles/               # Global styles (if any)
├── types/                # TypeScript type definitions
├── .env.example          # Environment variables template
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Git ignore rules
├── .prettierrc           # Prettier configuration
├── components.json       # Shadcn/ui configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## App Directory (Next.js App Router)

```
app/
├── (auth)/               # Authentication routes (route groups)
├── api-test/             # API testing pages
├── api-testing/          # API testing utilities
├── archive/              # Archive functionality
├── articles/             # Article management
├── dashboard/            # User dashboard
│   ├── in-review/        # Articles in review
│   ├── my-articles/      # User's articles
│   ├── publish/          # Publishing interface
│   └── published/        # Published articles
├── graphql-dashboard/    # GraphQL testing interface
├── information/          # Information pages
├── login/                # Login page
├── research-gallery/     # Main search interface
├── submit/               # Article submission
├── submit-article/       # Article submission (alternative)
├── system-check/         # System status page
├── error.tsx             # Global error page
├── globals.css           # Global styles
├── layout.tsx            # Root layout
├── loading.tsx           # Global loading page
├── not-found.tsx         # 404 page
└── page.tsx              # Home page
```

## Components Directory

```
components/
├── ui/                   # Shadcn/ui base components
│   ├── alert.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── enhanced-background.tsx
│   ├── error.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── loading.tsx
│   └── ... (other UI components)
├── web3/                 # Web3-specific components
│   ├── nfts/
│   └── wallet/
├── ArticleCard.tsx       # Article display component
├── ArticleManager.tsx    # Article management
├── EnhancedMultiSourceSearch.tsx  # Main search component
├── Header.tsx            # Site header
├── Footer.tsx            # Site footer
├── DevAuthProvider.tsx   # Development authentication
├── ErrorBoundary.tsx     # Error boundary component
└── ... (other components)
```

## Lib Directory

```
lib/
├── graphql/              # GraphQL queries and mutations
├── hooks/                # Custom React hooks
├── web3/                 # Web3 utilities (prepared)
├── analytics.ts          # Analytics utilities
├── api.ts                # API client
├── apollo-client.ts      # Apollo GraphQL client
├── theme.ts              # Theme configuration
└── utils.ts              # General utilities
```

## Types Directory

```
types/
├── article.ts            # Article-related types
├── graphql.ts            # GraphQL types
└── ... (other type definitions)
```

## Key Configuration Files

- **next.config.mjs**: Next.js configuration with dynamic rendering
- **tailwind.config.ts**: Tailwind with custom cyber/web3 theme
- **tsconfig.json**: TypeScript configuration with path aliases
- **components.json**: Shadcn/ui configuration
- **.eslintrc.json**: ESLint rules for Next.js and TypeScript
