/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed deprecated experimental.appDir for Next.js 14+
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg'],
    unoptimized: true, // Required for IPFS/Web3 deployments
  },
  // Disable static generation for pages with client-side context
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Web3/IPFS compatibility
  trailingSlash: true,
  // output: 'export', // Temporarily disabled until auth pages are fixed
  // distDir: 'out',
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
