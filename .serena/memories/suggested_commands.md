# Pegasoi Frontend - Suggested Commands

## Development Commands

### Core Development

```bash
npm run dev              # Start development server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run dev:turbo        # Start with Turbopack (experimental)
```

### Code Quality

```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix auto-fixable ESLint issues
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check if code is formatted
```

### Testing (Planned)

```bash
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run test:components  # Test components only
npm run test:pages       # Test pages only
npm run test:e2e         # End-to-end tests
```

### Build Analysis

```bash
npm run build:analyze    # Build with bundle analyzer
npm run build:standalone # Build and export static files
```

### Dependency Management

```bash
npm run deps:check       # Check for outdated dependencies
npm run deps:update      # Update dependencies
npm run deps:audit       # Security audit
npm run deps:fix         # Fix security vulnerabilities
```

### Maintenance

```bash
npm run clean            # Clean .next and cache
npm run clean:all        # Clean everything and reinstall
```

### Git Hooks (Automatic)

```bash
# These run automatically via Husky
npm run prepare          # Setup Husky hooks
# Pre-commit: lint-staged runs ESLint and Prettier
```

## Windows-Specific Commands

### File Operations

```cmd
dir                      # List directory contents (equivalent to ls)
cd <directory>           # Change directory
copy <source> <dest>     # Copy files
del <file>               # Delete files
mkdir <directory>        # Create directory
rmdir /s <directory>     # Remove directory recursively
```

### Process Management

```cmd
tasklist                 # List running processes
taskkill /f /pid <pid>   # Kill process by PID
netstat -an              # Show network connections
```

### Git Commands

```bash
git status               # Check repository status
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push origin develop  # Push to develop branch
git pull origin develop  # Pull latest changes
git branch               # List branches
git checkout -b <branch> # Create and switch to new branch
```

## Environment Setup

```bash
# Copy environment template
copy .env.example .env.local

# Edit environment file (Windows)
notepad .env.local
```

## Troubleshooting Commands

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rmdir /s node_modules
del package-lock.json
npm install

# Check Node.js and npm versions
node --version
npm --version

# Check port usage (if 3000 is busy)
netstat -ano | findstr :3000
```
