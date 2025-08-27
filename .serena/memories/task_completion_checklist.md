# Pegasoi Frontend - Task Completion Checklist

## Before Committing Code

### 1. Code Quality Checks

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format code
npm run format
```

### 2. Build Verification

```bash
# Ensure production build works
npm run build

# Test production build locally (optional)
npm run start
```

### 3. Manual Testing

- [ ] Test the feature in development mode (`npm run dev`)
- [ ] Verify responsive design on different screen sizes
- [ ] Test dark/light mode switching (if applicable)
- [ ] Check browser console for errors
- [ ] Test with different browsers (Chrome, Firefox, Safari)

### 4. Code Review Self-Check

- [ ] Follow naming conventions (PascalCase for components, camelCase for functions)
- [ ] Use TypeScript properly (avoid `any` when possible)
- [ ] Add proper error handling
- [ ] Include loading states for async operations
- [ ] Ensure accessibility (proper ARIA labels, keyboard navigation)
- [ ] Use Tailwind CSS utilities consistently
- [ ] Follow component structure conventions

### 5. Documentation Updates

- [ ] Update README.md if adding new features
- [ ] Add JSDoc comments for complex functions
- [ ] Update type definitions if needed
- [ ] Document any new environment variables

## Git Workflow

### 1. Pre-commit (Automatic via Husky)

- ESLint runs automatically
- Prettier formats code automatically
- TypeScript compilation check

### 2. Commit Message Format

```bash
# Use conventional commit format
git commit -m "feat: add new search functionality"
git commit -m "fix: resolve authentication issue"
git commit -m "docs: update API documentation"
git commit -m "style: improve button styling"
git commit -m "refactor: optimize search component"
```

### 3. Branch Strategy

- `main`: Production-ready code
- `develop`: Development branch for integration
- `feature/*`: Feature branches
- `fix/*`: Bug fix branches

## Testing Checklist (When Tests Are Added)

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run component tests
npm run test:components

# Run E2E tests
npm run test:e2e
```

## Performance Checklist

- [ ] Check bundle size impact (`npm run build:analyze`)
- [ ] Verify Core Web Vitals in development
- [ ] Test loading performance on slow connections
- [ ] Ensure images are optimized
- [ ] Check for unnecessary re-renders

## Security Checklist

- [ ] No sensitive data in client-side code
- [ ] Environment variables properly configured
- [ ] API endpoints properly secured
- [ ] Input validation implemented
- [ ] XSS prevention measures in place

## Deployment Readiness

- [ ] All environment variables documented
- [ ] Build process works without errors
- [ ] No console errors in production build
- [ ] SEO metadata properly configured
- [ ] Favicon and manifest files updated
