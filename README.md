# 🧬 Pegasoi Frontend

> **Web3-Ready Academic Research Platform Frontend**

A Next.js-powered frontend for the Pegasoi Research Platform, designed for Web3 integration and academic paper discovery. This application provides a modern, responsive interface for researchers to explore academic literature across multiple sources.

[![Built with Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![Powered by Shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-blue)](https://ui.shadcn.com/)
[![Web3 Ready](https://img.shields.io/badge/Web3-Ready-orange)](https://web3.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)

## 🌟 Features

### 🔍 **Multi-Source Academic Search**

- **ArXiv Integration** - Physics, Mathematics, Computer Science papers
- **DOAJ Support** - Open Access journals and articles
- **Crossref API** - DOI metadata and citation information
- **Getty Vocabulary** - Cultural and art history resources

### 🎨 **Modern UI/UX**

- **Shadcn/ui Components** - Beautiful, accessible design system
- **Dark/Light Mode** - Theme switching with next-themes
- **Responsive Design** - Mobile-first approach
- **Loading States** - Smooth user experience

### 🔐 **Authentication & Security**

- **Clerk Integration** - Secure user authentication
- **Role-based Access** - Admin and researcher roles
- **Session Management** - Persistent login state

### 🚀 **Web3 Ready Architecture**

- **Blockchain Integration Ready** - Prepared for wallet connections
- **Decentralized Identity** - Compatible with Web3 auth patterns
- **Future-Proof Design** - Built with Web3 principles in mind

## 🏗️ **Architecture**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │───▶│   Backend API    │───▶│   Data Sources  │
│   (This Repo)   │    │   (Railway)      │    │   (ArXiv, DOAJ) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

- **Frontend**: Next.js 14 with TypeScript and Shadcn/ui
- **Backend**: FastAPI with Redis (deployed on Railway)
- **Data**: Multiple academic APIs (ArXiv, DOAJ, Crossref, Getty)
- **Auth**: Clerk for user management
- **Future**: Web3 wallet integration

## 🚀 **Getting Started**

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** (included with Node.js)
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yasutora-eth/pegasoi-frontend.git
cd pegasoi-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Clerk Authentication (get from clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_secret_here
```

4. **Start the development server**

```bash
npm run dev
```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 **Project Structure**

```
pegasoi-frontend/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication routes
│   ├── dashboard/         # User dashboard
│   ├── research-gallery/  # Main search interface
│   └── api/              # API routes
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/ui components
│   └── custom/          # Custom components
├── lib/                 # Utilities and configurations
├── public/             # Static assets
├── styles/            # Global styles
└── types/            # TypeScript type definitions
```

## 🔗 **Backend Integration**

This frontend connects to a FastAPI backend that provides:

### Key Endpoints

- `GET /api/v1/search/papers` - Search academic papers
- `GET /api/v1/articles` - Get all articles
- `GET /api/v1/health` - Health check

## 🎨 **Design System**

Built with **Shadcn/ui** for consistent, accessible components:

- **Colors**: CSS variables for easy theming
- **Components**: Pre-built, customizable UI elements
- **Icons**: Lucide React icon library
- **Typography**: Tailwind CSS utility classes

## 🌐 **Web3 Integration (Coming Soon)**

Prepared for Web3 integration with:

- **Wallet Connection** - MetaMask, WalletConnect support
- **Blockchain Storage** - Research citations on-chain
- **Decentralized Identity** - Web3 authentication options
- **Token Incentives** - Reward researchers for contributions

## 🛠️ **Development**

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Check TypeScript types
```

### Code Quality

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **Husky** - Git hooks for quality checks

## 🚀 **Deployment**

Recommended platforms:

- **Vercel** (Primary) - Optimized for Next.js
- **Netlify** - Alternative option
- **Railway** - Full-stack deployment

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

## 🤝 **Contributing**

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 **License**

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 **Links**

- **Frontend Repository**: [yasutora-eth/pegasoi-frontend](https://github.com/yasutora-eth/pegasoi-frontend)

---

**Built with ❤️ for the academic research community**
