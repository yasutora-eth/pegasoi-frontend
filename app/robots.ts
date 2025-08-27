import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pegasoi.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/research-gallery',
          '/articles',
          '/information',
          '/submit',
          '/submit-article',
        ],
        disallow: [
          '/api/',
          '/dashboard/',
          '/login',
          '/api-test/',
          '/api-testing/',
          '/search-test/',
          '/nav-test/',
          '/archive/',
          '/web3/',
          '/graphql-dashboard',
          '/system-check',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/research-gallery',
          '/articles',
          '/information',
          '/submit',
          '/submit-article',
        ],
        disallow: [
          '/api/',
          '/dashboard/',
          '/login',
          '/api-test/',
          '/api-testing/',
          '/search-test/',
          '/nav-test/',
          '/archive/',
          '/web3/',
          '/graphql-dashboard',
          '/system-check',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
