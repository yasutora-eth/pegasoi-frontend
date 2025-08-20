# Contributing to Pegasoi Frontend

Welcome to the Pegasoi Frontend project! We're excited to have you contribute to our Web3-ready academic research platform. This guide will help you get started based on your expertise area.

## 👥 Our Team Structure

We have a collaborative team with specialized expertise:

- **Frontend/Next.js Expert** - UI/UX, performance, Next.js features
- **Web3 Expert** - Blockchain integration, wallet connectivity, smart contracts
- **Project Lead** - Architecture, backend integration, project coordination

## 🚀 Quick Start for Contributors

### Prerequisites

- Node.js >= 18.0.0
- npm (included with Node.js)
- Git
- GitHub CLI (optional but recommended)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/yasutora-eth/pegasoi-frontend.git
cd pegasoi-frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

## 🎯 Expertise-Specific Guidelines

### 🔵 For Next.js Experts

**Your Focus Areas:**
- Performance optimization and Core Web Vitals
- App Router architecture and routing strategies
- Component architecture and reusability
- SSR/SSG optimization
- Bundle size optimization
- Accessibility improvements
- TypeScript enhancements

**Key Directories:**
```
app/                    # App Router pages and layouts
├── (dashboard)/       # Dashboard routes
├── research-gallery/  # Main search interface
├── globals.css       # Global styles
└── layout.tsx        # Root layout

components/            # Reusable components
├── ui/               # Shadcn/ui base components
├── forms/           # Form components
├── search/          # Search-related components
└── layout/          # Layout components

lib/                  # Utilities and hooks
├── utils.ts         # General utilities
├── api.ts          # API client
└── hooks/          # Custom React hooks
```

**Next.js Specific Tasks:**
- [ ] Implement advanced caching strategies
- [ ] Add Server Components where beneficial
- [ ] Optimize image loading and performance
- [ ] Implement proper error boundaries
- [ ] Add loading states and skeletons
- [ ] Optimize SEO with metadata API
- [ ] Implement advanced routing patterns

**Development Workflow:**
```bash
# Next.js specific commands
npm run dev              # Development with fast refresh
npm run build            # Production build
npm run analyze          # Bundle analyzer (to be added)
npm run lighthouse       # Performance testing (to be added)
```

### 🟣 For Web3 Experts

**Your Focus Areas:**
- Wallet connection and management
- Smart contract integration
- Blockchain data fetching
- Web3 authentication patterns
- Token integration
- Decentralized storage (IPFS)
- Gas optimization strategies

**Key Directories:**
```
lib/web3/             # Web3 utilities (to be created)
├── providers/       # Web3 providers and context
├── hooks/          # Web3 React hooks
├── contracts/      # Smart contract ABIs and addresses
├── utils/          # Web3 utility functions
└── types/          # Web3 TypeScript types

components/web3/      # Web3-specific components (to be created)
├── wallet/         # Wallet connection components
├── transactions/   # Transaction handling
├── tokens/        # Token display and management
└── modals/        # Web3 modal components

app/web3/            # Web3-specific pages (to be created)
├── wallet/         # Wallet management
├── profile/        # User Web3 profile
└── transactions/   # Transaction history
```

**Web3 Integration Roadmap:**
- [ ] Wallet connection (MetaMask, WalletConnect)
- [ ] User authentication via wallet signatures
- [ ] Research citation NFTs
- [ ] Token rewards for contributions
- [ ] Decentralized identity integration
- [ ] IPFS for research paper storage
- [ ] DAO governance features

**Development Workflow:**
```bash
# Web3 specific commands (to be added)
npm run web3:dev         # Development with Web3 tools
npm run web3:test        # Web3 integration tests
npm run contracts:deploy # Smart contract deployment
npm run ipfs:upload      # IPFS file uploads
```

## 🏗️ Architecture Overview

### Current Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │───▶│   Backend API    │───▶│   Data Sources  │
│   (Next.js 14)  │    │   (FastAPI)      │    │   (Academic)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Future Web3 Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │───▶│   Backend API    │───▶│   Data Sources  │
│   + Web3 Layer  │    │   + Blockchain   │    │   + IPFS        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Wallet        │    │   Smart          │    │   Decentralized │
│   Integration   │    │   Contracts      │    │   Storage       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🔄 Development Workflow

### Branch Strategy
```
main                 # Production-ready code
├── develop         # Integration branch
├── feature/nextjs-* # Next.js features
├── feature/web3-*   # Web3 features
└── hotfix/*        # Critical fixes
```

### Commit Convention
```
feat(nextjs): add server-side rendering for search page
feat(web3): implement wallet connection with MetaMask
fix(ui): resolve mobile responsiveness issue
docs(readme): update Web3 integration guide
perf(nextjs): optimize bundle size with code splitting
```

### Pull Request Process
1. **Create Feature Branch** from `develop`
2. **Implement Changes** following expertise guidelines
3. **Write Tests** (unit/integration as appropriate)
4. **Update Documentation** if needed
5. **Submit PR** with proper template
6. **Code Review** by relevant expert + project lead
7. **Deploy Preview** for testing
8. **Merge** after approval

## 🧪 Testing Strategy

### Next.js Testing
```bash
# Unit tests for components
npm run test:components

# Integration tests for pages
npm run test:pages

# E2E tests with Playwright
npm run test:e2e

# Performance testing
npm run test:lighthouse
```

### Web3 Testing
```bash
# Smart contract tests
npm run test:contracts

# Web3 integration tests
npm run test:web3

# Wallet connection tests
npm run test:wallet
```

## 📋 Code Standards

### TypeScript
- **Strict mode** enabled
- **Explicit return types** for functions
- **Interface definitions** for all data structures
- **Generic types** where applicable

### React/Next.js
- **Server Components** by default
- **Client Components** only when necessary
- **Custom hooks** for reusable logic
- **Error boundaries** for fault tolerance

### Web3
- **Type-safe** contract interactions
- **Error handling** for network issues
- **Gas optimization** considerations
- **Security** best practices

### Styling
- **Tailwind CSS** for styling
- **CSS variables** for theming
- **Mobile-first** responsive design
- **Dark/light mode** support

## 🚀 Deployment & CI/CD

### Environments
- **Development** - Local development
- **Preview** - Vercel preview deployments
- **Staging** - Pre-production testing
- **Production** - Live application

### Automated Checks
- ✅ TypeScript compilation
- ✅ ESLint + Prettier
- ✅ Unit tests
- ✅ Build verification
- ✅ Security scanning
- 🔄 Web3 integration tests (planned)

## 📞 Communication

### Channels
- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - Architecture discussions
- **Pull Requests** - Code review and collaboration
- **Project Board** - Task tracking and planning

### Meeting Cadence
- **Weekly Sync** - Progress updates and blockers
- **Sprint Planning** - Feature prioritization
- **Code Reviews** - Pair programming sessions
- **Architecture Reviews** - Major design decisions

## 🎯 Current Priorities

### Phase 1: Foundation (Current)
- [x] Next.js application setup
- [x] Component library integration
- [x] Backend API integration
- [ ] Performance optimization
- [ ] Testing framework setup

### Phase 2: Web3 Integration
- [ ] Wallet connection implementation
- [ ] Web3 provider setup
- [ ] Smart contract integration
- [ ] Decentralized authentication

### Phase 3: Advanced Features
- [ ] Research citation NFTs
- [ ] Token reward system
- [ ] DAO governance
- [ ] Advanced Web3 features

## 🆘 Getting Help

### Next.js Questions
- Check Next.js documentation
- Review existing component patterns
- Ask in #nextjs-help discussions

### Web3 Questions
- Reference Web3 integration docs
- Check smart contract examples
- Ask in #web3-help discussions

### General Questions
- Read project README
- Check existing issues
- Create new discussion

## 📚 Resources

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

### Web3 Resources
- [Ethereum Documentation](https://ethereum.org/en/developers/)
- [Wagmi Hooks](https://wagmi.sh)
- [RainbowKit](https://www.rainbowkit.com)
- [Web3Modal](https://web3modal.com)

---

**Thank you for contributing to Pegasoi Frontend!** 🚀

Your expertise helps build the future of academic research discovery on Web3.
