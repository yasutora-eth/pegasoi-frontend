# Project Architecture & Structure

This document provides a comprehensive overview of the Pegasoi Frontend architecture, folder structure, and design patterns for effective collaboration.

## 🏗️ High-Level Architecture

### Current Architecture (Phase 1)
```
┌─────────────────────────────────────────────────────────────────┐
│                    Pegasoi Frontend (Next.js 14)                │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   App Router    │  │   Components    │  │   State Mgmt    │  │
│  │   (Pages)       │  │   (Shadcn/UI)   │  │   (React)       │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   API Client    │  │   Utilities     │  │   TypeScript    │  │
│  │   (Backend)     │  │   (Helpers)     │  │   (Types)       │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Backend API (FastAPI)                       │
│                  Railway Deployment                             │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│              Academic Data Sources                               │
│        ArXiv • DOAJ • Crossref • Getty Museum                   │
└─────────────────────────────────────────────────────────────────┘
```

### Future Architecture (Phase 2 - Web3 Integration)
```
┌─────────────────────────────────────────────────────────────────┐
│                Pegasoi Frontend + Web3 Layer                    │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Next.js App   │  │   Web3 Provider │  │   Wallet Mgmt   │  │
│  │   Router        │  │   (Wagmi)       │  │   (RainbowKit)  │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Smart         │  │   IPFS Client   │  │   Token Mgmt    │  │
│  │   Contracts     │  │   (Storage)     │  │   (ERC-20/721)  │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                    │                           │
                    ▼                           ▼
┌──────────────────────┐              ┌──────────────────────┐
│   Blockchain Layer   │              │   Decentralized      │
│   Ethereum/Polygon   │              │   Storage (IPFS)     │
│   Smart Contracts    │              │   Research Papers    │
└──────────────────────┘              └──────────────────────┘
```

## 📁 Project Structure

### Root Directory Structure
```
pegasoi-frontend/
├── 📁 app/                     # Next.js 14 App Router
├── 📁 components/              # Reusable UI components
├── 📁 lib/                     # Utilities, helpers, and configurations
├── 📁 public/                  # Static assets
├── 📁 docs/                    # Project documentation
├── 📁 .github/                 # GitHub workflows and templates
├── 📁 .vscode/                 # VS Code workspace settings
├── 📄 package.json             # Dependencies and scripts
├── 📄 tsconfig.json            # TypeScript configuration
├── 📄 tailwind.config.js       # Tailwind CSS configuration
├── 📄 next.config.js           # Next.js configuration
└── 📄 README.md                # Project overview
```

### App Directory (Next.js 14 App Router)
```
app/
├── 📄 layout.tsx               # Root layout with providers
├── 📄 page.tsx                 # Home page
├── 📄 globals.css              # Global styles and Tailwind imports
├── 📄 loading.tsx              # Global loading UI
├── 📄 error.tsx                # Global error boundary
├── 📄 not-found.tsx            # 404 page
│
├── 📁 (auth)/                  # Authentication route group
│   ├── 📄 layout.tsx           # Auth-specific layout
│   ├── 📁 login/               # Login page
│   └── 📁 register/            # Registration page
│
├── 📁 dashboard/               # User dashboard
│   ├── 📄 layout.tsx           # Dashboard layout with navigation
│   ├── 📄 page.tsx             # Dashboard home
│   ├── 📁 my-articles/         # User's articles
│   ├── 📁 in-review/           # Articles under review
│   ├── 📁 published/           # Published articles
│   └── 📁 publish/             # Publishing interface
│
├── 📁 research-gallery/        # Main search interface
│   ├── 📄 page.tsx             # Search page with multi-source
│   └── 📄 loading.tsx          # Search loading states
│
├── 📁 articles/                # Article management
│   ├── 📄 page.tsx             # Articles listing
│   └── 📁 [id]/               # Individual article pages
│       ├── 📄 page.tsx         # Article detail view
│       └── 📄 edit/            # Article editing
│
├── 📁 submit-article/          # Article submission
│   └── 📄 page.tsx             # Submission form
│
├── 📁 system-check/            # System status monitoring
│   └── 📄 page.tsx             # Backend health monitoring
│
├── 📁 api-test/                # API testing interface
│   └── 📄 page.tsx             # API testing dashboard
│
├── 📁 web3/                    # Web3-specific pages (Phase 2)
│   ├── 📄 layout.tsx           # Web3 layout with wallet provider
│   ├── 📁 wallet/              # Wallet management
│   ├── 📁 profile/             # User Web3 profile
│   ├── 📁 nfts/               # Research NFT management
│   └── 📁 governance/          # DAO governance interface
│
└── 📁 api/                     # API route handlers
    ├── 📁 auth/                # Authentication endpoints
    ├── 📁 articles/            # Article CRUD operations
    └── 📁 web3/                # Web3-related API routes
```

### Components Directory
```
components/
├── 📁 ui/                      # Shadcn/UI base components
│   ├── 📄 button.tsx           # Button component
│   ├── 📄 input.tsx            # Input component
│   ├── 📄 card.tsx             # Card component
│   ├── 📄 badge.tsx            # Badge component
│   ├── 📄 tabs.tsx             # Tabs component
│   ├── 📄 dialog.tsx           # Modal dialog
│   ├── 📄 dropdown-menu.tsx    # Dropdown menu
│   ├── 📄 scroll-area.tsx      # Scroll area
│   ├── 📄 select.tsx           # Select component
│   ├── 📄 textarea.tsx         # Textarea component
│   ├── 📄 alert.tsx            # Alert component
│   └── 📄 tooltip.tsx          # Tooltip component
│
├── 📁 layout/                  # Layout components
│   ├── 📄 Navigation.tsx       # Main navigation
│   ├── 📄 Header.tsx           # Page header
│   ├── 📄 Footer.tsx           # Page footer
│   ├── 📄 Sidebar.tsx          # Dashboard sidebar
│   └── 📄 ThemeToggle.tsx      # Dark/light mode toggle
│
├── 📁 forms/                   # Form components
│   ├── 📄 LoginForm.tsx        # Authentication forms
│   ├── 📄 ArticleForm.tsx      # Article submission
│   └── 📄 SearchForm.tsx       # Search interface
│
├── 📁 search/                  # Search-related components
│   ├── 📄 EnhancedMultiSourceSearch.tsx  # Main search interface
│   ├── 📄 SearchResults.tsx    # Search results display
│   ├── 📄 FilterPanel.tsx      # Search filters
│   └── 📄 ResultCard.tsx       # Individual result card
│
├── 📁 articles/                # Article-related components
│   ├── 📄 ArticleCard.tsx      # Article preview card
│   ├── 📄 ArticleList.tsx      # List of articles
│   ├── 📄 ArticleEditor.tsx    # Rich text editor
│   └── 📄 PublishingFlow.tsx   # Publishing workflow
│
├── 📁 dashboard/               # Dashboard components
│   ├── 📄 DashboardStats.tsx   # Statistics cards
│   ├── 📄 RecentActivity.tsx   # Activity feed
│   └── 📄 QuickActions.tsx     # Action buttons
│
├── 📁 web3/                    # Web3-specific components (Phase 2)
│   ├── 📁 wallet/              # Wallet components
│   │   ├── 📄 WalletConnectButton.tsx
│   │   ├── 📄 WalletInfo.tsx
│   │   └── 📄 NetworkSwitcher.tsx
│   ├── 📁 transactions/        # Transaction components
│   │   ├── 📄 TransactionHistory.tsx
│   │   ├── 📄 TransactionStatus.tsx
│   │   └── 📄 GasEstimator.tsx
│   ├── 📁 nfts/               # NFT components
│   │   ├── 📄 NFTCard.tsx
│   │   ├── 📄 MintingFlow.tsx
│   │   └── 📄 NFTGallery.tsx
│   └── 📁 tokens/             # Token components
│       ├── 📄 TokenBalance.tsx
│       ├── 📄 TokenRewards.tsx
│       └── 📄 StakingInterface.tsx
│
├── 📄 SystemStatus.tsx         # System health monitoring
├── 📄 ErrorBoundary.tsx        # Error boundary component
├── 📄 PrivateRoute.tsx         # Route protection
└── 📄 LoadingSpinner.tsx       # Loading indicators
```

### Lib Directory
```
lib/
├── 📄 utils.ts                 # General utility functions
├── 📄 api.ts                   # Backend API client
├── 📄 auth.ts                  # Authentication utilities
├── 📄 constants.ts             # App constants
├── 📄 types.ts                 # Shared TypeScript types
├── 📄 validations.ts           # Form validation schemas
│
├── 📁 hooks/                   # Custom React hooks
│   ├── 📄 useApi.ts            # API interaction hooks
│   ├── 📄 useAuth.ts           # Authentication hooks
│   ├── 📄 useLocalStorage.ts   # Local storage hooks
│   └── 📄 useDebounce.ts       # Debouncing hook
│
├── 📁 web3/                    # Web3 utilities (Phase 2)
│   ├── 📄 config.ts            # Wagmi configuration
│   ├── 📄 chains.ts            # Blockchain network configs
│   ├── 📄 contracts.ts         # Contract addresses and ABIs
│   ├── 📄 utils.ts             # Web3 utility functions
│   ├── 📄 types.ts             # Web3 TypeScript types
│   │
│   ├── 📁 hooks/               # Web3 React hooks
│   │   ├── 📄 useWallet.ts     # Wallet connection hook
│   │   ├── 📄 useContract.ts   # Contract interaction hook
│   │   ├── 📄 useTokens.ts     # Token management hook
│   │   └── 📄 useNFT.ts        # NFT operations hook
│   │
│   └── 📁 providers/           # Web3 context providers
│       ├── 📄 WagmiProvider.tsx
│       ├── 📄 RainbowKitProvider.tsx
│       └── 📄 Web3Provider.tsx
│
└── 📁 stores/                  # State management
    ├── 📄 authStore.ts         # Authentication state
    ├── 📄 articleStore.ts      # Article state
    └── 📄 web3Store.ts         # Web3 state (Phase 2)
```

## 🎨 Design Patterns & Conventions

### Component Architecture

#### 1. Atomic Design Principles
```
Atoms (Basic UI elements)
├── Button, Input, Badge, Avatar
│
Molecules (Simple combinations)
├── SearchBox, ArticleCard, WalletInfo
│
Organisms (Complex UI sections)
├── Navigation, SearchResults, ArticleList
│
Templates (Page layouts)
├── DashboardLayout, AuthLayout
│
Pages (Complete views)
└── Dashboard, SearchPage, ArticlePage
```

#### 2. Component Structure Pattern
```typescript
// components/ExampleComponent.tsx
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ExampleComponentProps {
  title: string
  children?: React.ReactNode
  className?: string
  onAction?: () => void
}

export function ExampleComponent({ 
  title, 
  children, 
  className,
  onAction 
}: ExampleComponentProps) {
  const [state, setState] = useState(false)
  
  useEffect(() => {
    // Side effects
  }, [])
  
  return (
    <div className={cn("base-classes", className)}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

### State Management Patterns

#### 1. Local State (useState)
```typescript
// For component-specific state
const [isOpen, setIsOpen] = useState(false)
const [formData, setFormData] = useState({})
```

#### 2. Server State (React Query/SWR)
```typescript
// For API data fetching
import { useQuery } from '@tanstack/react-query'

const { data, isLoading, error } = useQuery({
  queryKey: ['articles'],
  queryFn: () => apiService.getArticles()
})
```

#### 3. Global State (Context + useReducer)
```typescript
// For app-wide state
interface AppState {
  user: User | null
  theme: 'light' | 'dark'
  web3: Web3State
}

const AppContext = createContext<AppState | null>(null)
```

### API Integration Patterns

#### 1. API Client Structure
```typescript
// lib/api.ts
class ApiService {
  private baseURL = process.env.NEXT_PUBLIC_API_URL
  
  async get<T>(endpoint: string): Promise<T> {
    // GET implementation
  }
  
  async post<T>(endpoint: string, data: any): Promise<T> {
    // POST implementation
  }
  
  // Specific methods
  async getArticles(): Promise<Article[]> {
    return this.get('/api/v1/articles')
  }
  
  async searchPapers(query: string): Promise<SearchResult> {
    return this.get(`/api/v1/search/papers?query=${query}`)
  }
}

export const apiService = new ApiService()
```

#### 2. Error Handling Pattern
```typescript
try {
  const result = await apiService.getArticles()
  setData(result)
} catch (error) {
  if (error instanceof ApiError) {
    setError(error.message)
  } else {
    setError('An unexpected error occurred')
  }
}
```

### Web3 Integration Patterns (Phase 2)

#### 1. Wallet Connection Pattern
```typescript
// components/web3/WalletConnectButton.tsx
import { useConnect, useAccount } from 'wagmi'

export function WalletConnectButton() {
  const { connect, connectors } = useConnect()
  const { isConnected } = useAccount()
  
  if (isConnected) {
    return <WalletInfo />
  }
  
  return (
    <div>
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          Connect {connector.name}
        </Button>
      ))}
    </div>
  )
}
```

#### 2. Smart Contract Interaction Pattern
```typescript
// hooks/useResearchNFT.ts
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import { researchNFTABI } from '@/lib/web3/contracts'

export function useResearchNFT() {
  const { data, write, isLoading } = useContractWrite({
    address: process.env.NEXT_PUBLIC_RESEARCH_NFT_CONTRACT,
    abi: researchNFTABI,
    functionName: 'mintResearchNFT'
  })
  
  const { isLoading: isConfirming } = useWaitForTransaction({
    hash: data?.hash,
  })
  
  return {
    mintNFT: write,
    isLoading: isLoading || isConfirming,
    txHash: data?.hash
  }
}
```

## 🚀 Routing & Navigation

### App Router Structure
```typescript
// app/layout.tsx - Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Web3Provider>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Route Groups & Layouts
```
app/
├── (auth)/                     # Auth routes with special layout
│   ├── layout.tsx              # Auth-specific layout
│   ├── login/page.tsx
│   └── register/page.tsx
├── dashboard/                  # Dashboard with sidebar
│   ├── layout.tsx              # Dashboard layout
│   └── [...routes]
└── web3/                       # Web3 routes with wallet provider
    ├── layout.tsx              # Web3-specific layout
    └── [...routes]
```

## 🎯 Performance Optimization

### Code Splitting Strategy
```typescript
// Dynamic imports for large components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})

// Route-based splitting (automatic with App Router)
const Web3Dashboard = dynamic(() => import('./web3/Dashboard'))
```

### Image Optimization
```typescript
import Image from 'next/image'

// Optimized images with Next.js
<Image
  src="/research-hero.jpg"
  alt="Academic Research"
  width={800}
  height={400}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Caching Strategy
```typescript
// API Route caching
export async function GET() {
  const data = await fetchData()
  
  return Response.json(data, {
    headers: {
      'Cache-Control': 'max-age=3600, stale-while-revalidate=86400'
    }
  })
}

// Client-side caching with React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})
```

## 🔐 Security Considerations

### Environment Variables
```bash
# Public variables (exposed to client)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=abc123

# Private variables (server-side only)
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret123
PRIVATE_KEY=0x...
```

### API Security
```typescript
// Rate limiting
import { rateLimiter } from '@/lib/rate-limiter'

export async function POST(request: Request) {
  const identifier = getClientIP(request)
  const { success } = await rateLimiter.limit(identifier)
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 })
  }
  
  // Process request
}
```

### Web3 Security
```typescript
// Never expose private keys
// Use environment variables for sensitive data
// Validate all contract interactions
// Implement proper error handling for failed transactions
```

## 📊 Monitoring & Analytics

### Error Tracking
```typescript
// Error boundary integration
import * as Sentry from '@sentry/nextjs'

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary fallback={ErrorFallback}>
      {children}
    </Sentry.ErrorBoundary>
  )
}
```

### Performance Monitoring
```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // Send to your analytics service
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

---

This architecture provides a solid foundation for collaborative development between Next.js and Web3 experts, with clear separation of concerns and well-defined patterns for future expansion.
