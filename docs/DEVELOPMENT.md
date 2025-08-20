# Development Environment Setup

This guide provides detailed setup instructions for both Next.js and Web3 development environments for the Pegasoi Frontend project.

## 🚀 Quick Start

### System Requirements

- **Node.js**: >= 18.0.0 (LTS recommended)
- **Package Manager**: npm >= 9.0.0 (included with Node.js)
- **Git**: Latest version
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/yasutora-eth/pegasoi-frontend.git
cd pegasoi-frontend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env.local

# Start development server
npm run dev
```

## 🔵 Next.js Development Setup

### IDE/Editor Configuration

#### VS Code (Recommended)
Install these essential extensions:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json"
  ]
}
```

#### VS Code Settings
Add to your workspace settings (`.vscode/settings.json`):

```json
{
  "typescript.preferences.preferTypeOnlyAutoImports": true,
  "typescript.suggest.autoImports": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### TypeScript Configuration

Our TypeScript setup uses:
- **Strict mode** for better type safety
- **Path mapping** for clean imports
- **Next.js plugin** for optimized compilation

Key tsconfig.json features:
```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/app/*": ["./app/*"]
    }
  }
}
```

### Development Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run dev:turbo        # Start with Turbopack (experimental)

# Building
npm run build            # Production build
npm run build:analyze    # Build with bundle analyzer

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix auto-fixable issues
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier

# Testing
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
```

### Performance Optimization Tools

#### Bundle Analyzer
```bash
# Add to package.json scripts
"analyze": "cross-env ANALYZE=true next build"

# Install analyzer
npm install -D @next/bundle-analyzer cross-env
```

#### Core Web Vitals Monitoring
```bash
# Lighthouse CI for performance testing
npm install -D @lhci/cli

# Web Vitals reporting
npm install web-vitals
```

### Debugging Configuration

#### VS Code Launch Configuration
Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

## 🟣 Web3 Development Setup

### Wallet Setup for Development

#### MetaMask Configuration
1. Install MetaMask browser extension
2. Create a development wallet
3. Add test networks:

```javascript
// Polygon Mumbai Testnet
{
  chainId: '0x13881',
  chainName: 'Polygon Mumbai',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com/']
}

// Sepolia Testnet
{
  chainId: '0xaa36a7',
  chainName: 'Sepolia',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://sepolia.infura.io/v3/YOUR_PROJECT_ID'],
  blockExplorerUrls: ['https://sepolia.etherscan.io']
}
```

#### Development Wallet Security
- **Never use real funds** in development wallets
- Use **testnet tokens** only
- Keep separate wallets for **development and personal use**

### Web3 Development Tools

#### Essential Web3 Packages
```bash
# Core Web3 libraries
npm install wagmi viem @tanstack/react-query

# Wallet connectors
npm install @wagmi/connectors @walletconnect/ethereum-provider

# UI libraries
npm install @rainbow-me/rainbowkit connectkit

# Development tools
npm install -D @foundry-rs/easy-foundryup hardhat @nomiclabs/hardhat-ethers
```

#### Local Blockchain Setup

**Option 1: Hardhat Network**
```bash
# Install Hardhat
npm install -D hardhat

# Initialize Hardhat
npx hardhat

# Start local network
npx hardhat node
```

**Option 2: Anvil (Foundry)**
```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Start local blockchain
anvil
```

### Web3 Environment Configuration

#### Development Environment Variables
```bash
# .env.local for Web3 development

# RPC URLs (get from Infura, Alchemy, or QuickNode)
NEXT_PUBLIC_MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/YOUR_PROJECT_ID
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID

# WalletConnect Project ID (get from walletconnect.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Contract addresses (update when deploying)
NEXT_PUBLIC_RESEARCH_NFT_CONTRACT=0x...
NEXT_PUBLIC_TOKEN_CONTRACT=0x...

# IPFS configuration (get from Pinata, Infura, or run local node)
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
PINATA_API_KEY=your_api_key
PINATA_SECRET_KEY=your_secret_key

# Local development
NEXT_PUBLIC_LOCAL_RPC_URL=http://localhost:8545
```

#### Web3 Provider Setup
Create `lib/web3/config.ts`:

```typescript
import { createConfig, http } from 'wagmi'
import { mainnet, polygon, sepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, polygon, sepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    }),
  ],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL),
    [polygon.id]: http(process.env.NEXT_PUBLIC_POLYGON_RPC_URL),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
  },
})
```

### Smart Contract Development

#### Directory Structure for Contracts
```
contracts/
├── src/
│   ├── ResearchNFT.sol
│   ├── PegasoiToken.sol
│   └── interfaces/
├── test/
│   ├── ResearchNFT.test.js
│   └── PegasoiToken.test.js
├── scripts/
│   ├── deploy.js
│   └── verify.js
├── hardhat.config.js
└── README.md
```

#### Web3 Development Scripts
```bash
# Smart contract development
npm run contracts:compile   # Compile contracts
npm run contracts:test      # Run contract tests
npm run contracts:deploy    # Deploy to testnet
npm run contracts:verify    # Verify on block explorer

# IPFS operations
npm run ipfs:upload         # Upload files to IPFS
npm run ipfs:pin           # Pin files for persistence

# Web3 testing
npm run test:web3          # Test Web3 integrations
npm run test:wallet        # Test wallet connections
```

## 🛠️ Development Workflow

### Git Workflow for Teams

#### Branch Naming Convention
```bash
# Next.js features
feature/nextjs-performance-optimization
feature/nextjs-ssr-enhancement
fix/nextjs-hydration-error

# Web3 features
feature/web3-wallet-connection
feature/web3-nft-minting
fix/web3-network-switching

# Shared features
feature/ui-component-library
feature/api-integration
```

#### Pre-commit Hooks Setup
We use Husky for git hooks:

```bash
# Install Husky
npm install -D husky lint-staged

# Setup hooks
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg "npx commitlint --edit $1"
```

### Code Quality Tools

#### ESLint Configuration
Our `.eslintrc.json` includes:
- Next.js specific rules
- React hooks rules
- TypeScript rules
- Accessibility rules
- Web3 security rules

#### Prettier Configuration
Consistent code formatting with:
- 2-space indentation
- Single quotes
- Semicolons
- Trailing commas
- Tailwind CSS class sorting

### Testing Strategy

#### Unit Testing Setup
```bash
# Install testing dependencies
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D jest-environment-jsdom @testing-library/user-event

# Web3 testing mocks
npm install -D @wagmi/core/test
```

#### Test File Structure
```
__tests__/
├── components/
│   ├── ui/
│   └── web3/
├── lib/
│   ├── utils.test.ts
│   └── web3/
├── pages/
└── integration/
```

### Environment-Specific Configuration

#### Development Environment
- Hot reload enabled
- Source maps enabled
- Verbose error messages
- Development-only debugging tools

#### Staging Environment
- Production build
- Test data
- Analytics disabled
- Testnet blockchain connections

#### Production Environment
- Optimized build
- Error tracking enabled
- Analytics enabled
- Mainnet blockchain connections

## 📊 Monitoring and Analytics

### Performance Monitoring
```bash
# Core Web Vitals
npm install web-vitals

# Bundle analysis
npm install -D @next/bundle-analyzer

# Performance profiling
npm install -D @next/profiler
```

### Error Tracking
```bash
# Error monitoring (choose one)
npm install @sentry/nextjs
# or
npm install @bugsnag/js @bugsnag/plugin-react
```

### Web3 Monitoring
```bash
# Transaction monitoring
npm install @web3-onboard/core @web3-onboard/injected-wallets

# Gas tracking
npm install gas-price-oracle
```

## 🔧 Troubleshooting

### Common Next.js Issues

**Hydration Errors**
- Check server/client rendering differences
- Ensure consistent state between SSR and client
- Use `suppressHydrationWarning` sparingly

**Build Errors**
- Clear `.next` folder and rebuild
- Check TypeScript errors
- Verify all imports are correct

### Common Web3 Issues

**Wallet Connection Failures**
- Check network configuration
- Verify RPC URLs are accessible
- Ensure wallet is unlocked and connected

**Transaction Failures**
- Check gas limits and prices
- Verify contract addresses
- Ensure sufficient balance

**CORS Issues with RPC**
- Use server-side API routes for sensitive calls
- Configure CORS properly
- Use authenticated RPC endpoints

### Getting Help

1. **Check existing issues** on GitHub
2. **Search documentation** for similar problems
3. **Create detailed issue** with reproduction steps
4. **Join discussions** for architecture questions

---

**Happy coding!** 🚀 Your expertise in Next.js and Web3 helps build the future of academic research on the blockchain.
