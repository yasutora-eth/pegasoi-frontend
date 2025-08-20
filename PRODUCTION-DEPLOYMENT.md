# 🚀 Pegasoi Frontend - Production Deployment Guide

## 📋 Overview

Complete deployment guide for the Pegasoi Research Platform frontend with full Redis + GraphQL + REST API integration.

## ✅ Current Status: PRODUCTION READY

### 🎯 Integration Complete

- ✅ **Backend API**: Fully integrated with camelCase schema
- ✅ **GraphQL**: Apollo Client configured with caching
- ✅ **Redis**: Optimized search and caching
- ✅ **Authentication**: Clerk integration ready
- ✅ **Performance**: Optimized builds and monitoring
- ✅ **Real-time**: GraphQL subscriptions infrastructure

## 🏗️ Architecture

```
Frontend (Next.js 14)     Backend (FastAPI)      Database (Redis)
├── React 18              ├── GraphQL Endpoint   ├── Persistent Storage
├── Apollo Client         ├── REST API           ├── Search Indexing
├── Tailwind CSS          ├── Multi-source       ├── Caching Layer
├── shadcn/ui             │   Search             └── Session Storage
└── Clerk Auth            └── CORS Configured
```

## 🚀 Quick Deploy

### Railway (Recommended)

```bash
# 1. Connect to Railway
railway login
railway link

# 2. Set environment variables
railway variables set NEXT_PUBLIC_API_URL=https://pegasoibackend-production.up.railway.app
railway variables set NEXT_PUBLIC_GRAPHQL_URL=https://pegasoibackend-production.up.railway.app/graphql
railway variables set NEXT_PUBLIC_USE_GRAPHQL=true

# 3. Deploy
railway up
```

### Vercel

```bash
# 1. Install and deploy
npm i -g vercel
vercel --prod

# 2. Set environment variables in Vercel dashboard
```

## 🔧 Environment Variables

### Required Production Variables

```bash
NEXT_PUBLIC_API_URL=https://pegasoibackend-production.up.railway.app
NEXT_PUBLIC_GRAPHQL_URL=https://pegasoibackend-production.up.railway.app/graphql
NEXT_PUBLIC_USE_GRAPHQL=true
NEXT_PUBLIC_ENABLE_REDIS_CACHE=true
NEXT_PUBLIC_ENABLE_REAL_TIME=true
```

### Authentication (Set in deployment platform)

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

## 📊 Performance Metrics

### Current Build Stats

- **Bundle Size**: 158KB (GraphQL Dashboard)
- **Build Time**: ~30 seconds
- **Pages**: 20 routes
- **Performance Score**: Optimized

### Target Performance

- **API Response**: < 200ms
- **Redis Hit Rate**: > 80%
- **GraphQL Cache**: > 70%
- **Error Rate**: < 1%

## 🔍 Health Checks

### Automated Checks

1. **Backend API**: `GET /api/v1/health`
2. **GraphQL**: Introspection query
3. **Redis**: Via backend health endpoint
4. **Frontend**: Build success + runtime checks

### Manual Verification

1. ✅ Article CRUD operations
2. ✅ Multi-source search
3. ✅ GraphQL queries/mutations
4. ✅ Real-time updates
5. ✅ Authentication flow

## 🛡️ Security

### Production Security

- ✅ HTTPS enforced
- ✅ Environment variables secured
- ✅ CORS properly configured
- ✅ API keys protected
- ✅ CSP headers enabled

## 🔧 Troubleshooting

### Common Issues & Solutions

**GraphQL Connection Failed**

```bash
# Check environment
echo $NEXT_PUBLIC_GRAPHQL_URL
# Test endpoint
curl -X POST https://pegasoibackend-production.up.railway.app/graphql
```

**Build Failures**

```bash
# Local testing
npm run build
npm run type-check
```

**API Integration Issues**

```bash
# Test backend
curl https://pegasoibackend-production.up.railway.app/api/v1/health
```

## 📈 Monitoring

### Built-in Monitoring

- **Performance Monitor**: `/graphql-dashboard` → Performance tab
- **System Status**: `/system-check`
- **API Testing**: `/api-testing`

### External Monitoring (Optional)

- **Uptime**: Pingdom, UptimeRobot
- **Errors**: Sentry
- **Analytics**: Google Analytics, PostHog

## 🎯 Success Criteria

### Deployment Checklist

- [ ] Build completes successfully
- [ ] All environment variables set
- [ ] Backend connectivity verified
- [ ] Authentication working
- [ ] CRUD operations functional
- [ ] Search functionality working
- [ ] Performance metrics acceptable
- [ ] Mobile responsive
- [ ] Error handling working

### Post-Deployment Tests

1. **Create Article**: Submit new article via form
2. **Search Papers**: Multi-source search working
3. **GraphQL Operations**: Dashboard functionality
4. **Real-time Updates**: Live data changes
5. **Performance**: Page load < 3 seconds

## 📞 Support Resources

### Documentation

- **Backend API**: https://pegasoibackend-production.up.railway.app/docs
- **GraphQL Playground**: https://pegasoibackend-production.up.railway.app/graphql
- **Frontend Docs**: This repository

### Key Endpoints

- **Health Check**: `/api/v1/health`
- **Articles API**: `/api/v1/articles`
- **Search API**: `/api/v1/search/papers`
- **GraphQL**: `/graphql`

## 🚀 Next Steps

### Phase 4: Advanced Features (Optional)

1. **Real-time Subscriptions**: WebSocket integration
2. **Advanced Analytics**: Custom metrics dashboard
3. **A/B Testing**: Feature flag system
4. **Internationalization**: Multi-language support
5. **PWA Features**: Offline functionality

---

**Status**: ✅ **PRODUCTION READY**
**Last Updated**: 2025-08-20
**Version**: 1.0.0
**Backend Integration**: Complete
**Performance**: Optimized
**Security**: Configured
