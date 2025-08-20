import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
}

export function SEO({
  title = 'Research Portal',
  description = 'A comprehensive portal for classical studies research articles and information',
  canonical,
  ogImage = '/og-image.jpg',
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
    </Head>
  )
}
