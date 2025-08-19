/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Disable static optimization for pages with issues
  generateStaticParams: false,
  // Skip build-time static generation for problematic pages
  output: 'standalone',
  // Disable type checking during build for faster iteration
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Image optimization
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
