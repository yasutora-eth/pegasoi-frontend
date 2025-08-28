/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint in production builds
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checking in production builds
  },

  // Image optimization
  images: {
    domains: ['placeholder.svg', 'arxiv.org', 'doaj.org'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: false, // Enable optimization for better performance
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Performance optimizations
  experimental: {
    missingSuspenseWithCSRBailout: false,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
  // Web3/IPFS compatibility
  trailingSlash: true,
  // output: 'export', // Temporarily disabled until auth pages are fixed
  // distDir: 'out',

  // Webpack configuration to fix caching issues
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Disable webpack caching in development to prevent file system errors
      config.cache = false
    }
    return config
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
    ]
  },
}

export default nextConfig
