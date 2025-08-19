# Contributing to Pegasoi Frontend

Thank you for your interest in contributing to the Pegasoi Frontend! This document outlines the process for contributing to this Web3-ready academic research platform.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Git

### Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/pegasoi-frontend.git`
3. Install dependencies: `pnpm install`
4. Copy environment file: `cp .env.example .env.local`
5. Start development server: `pnpm dev`

## 📝 Development Process

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `web3/description` - Web3 integration work

### Commit Messages
We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat: add wallet connection functionality
fix: resolve API timeout issue
docs: update setup instructions
style: improve button hover effects
refactor: optimize search performance
web3: integrate MetaMask connection
```

### Pull Request Process
1. Create a new branch from `develop`
2. Make your changes
3. Add/update tests if applicable
4. Ensure all checks pass: `pnpm run lint && pnpm run type-check`
5. Update documentation if needed
6. Submit a pull request to `develop` branch

## 🧪 Testing

### Running Tests
```bash
# Type checking
pnpm run type-check

# Linting
pnpm run lint

# Build test
pnpm run build
```

### Testing Guidelines
- Write tests for new features
- Update tests when modifying existing functionality
- Test Web3 functionality with different wallets when applicable
- Ensure mobile responsiveness

## 🎨 Code Style

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` types

### React/Next.js
- Use functional components with hooks
- Follow React best practices
- Optimize for performance (lazy loading, memoization)

### Styling
- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure dark/light mode compatibility
- Consider Web3 UI patterns

### File Structure
```
app/                 # Next.js app router
├── (auth)/         # Authentication routes
├── dashboard/      # User dashboard
├── api/           # API routes
└── globals.css    # Global styles

components/         # Reusable components
├── ui/            # Shadcn/ui components
└── custom/        # Custom components

lib/               # Utilities and configurations
types/            # TypeScript type definitions
```

## 🌐 Web3 Considerations

### Wallet Integration
- Support multiple wallet types (MetaMask, WalletConnect)
- Handle connection errors gracefully
- Test on different networks

### Blockchain Interactions
- Use proper error handling
- Consider gas optimization
- Implement loading states
- Handle network switching

### Security
- Never expose private keys
- Validate all inputs
- Follow Web3 security best practices

## 🔄 Backend Integration

### API Guidelines
- Use the existing backend endpoints: `https://pegasoibackend-production.up.railway.app`
- Handle API errors appropriately
- Implement proper loading states
- Cache responses when appropriate

### Endpoint Usage
- `/api/v1/search/papers` - Academic paper search
- `/api/v1/articles` - Article management
- `/api/v1/health` - Health checks

## 📚 Documentation

### What to Document
- New features and components
- API changes
- Web3 integration steps
- Setup and deployment instructions

### Where to Document
- README.md - Main project information
- Code comments - Complex logic
- JSDoc - Function/component documentation
- Pull requests - Change descriptions

## 🐛 Bug Reports

When reporting bugs, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (browser, wallet, etc.)
- Screenshots if applicable
- Console logs

## 💡 Feature Requests

For feature requests, provide:
- Problem description
- Proposed solution
- Use cases and benefits
- Web3 considerations
- Impact on academic workflows

## 📋 Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to docs
- `web3` - Web3-related functionality
- `ui/ux` - User interface improvements
- `performance` - Performance related
- `backend` - Backend integration
- `help wanted` - Extra attention needed
- `good first issue` - Good for newcomers

## 🏆 Recognition

Contributors will be:
- Listed in the project README
- Mentioned in release notes
- Invited to join the core team (for significant contributions)

## ❓ Questions

- Create a [GitHub Issue](https://github.com/yasutora-eth/pegasoi-frontend/issues)
- Check existing issues and discussions
- Review the README and documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to the future of academic research on Web3!** 🚀
