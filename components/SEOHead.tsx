import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function SEOHead({
  title = 'Pegasoi Research Platform - Academic Research Discovery',
  description = 'Discover academic research papers across multiple sources including ArXiv, DOAJ, Crossref, and Getty Vocabulary. Web3-ready platform for researchers.',
  keywords = [
    'academic research',
    'research papers',
    'arxiv',
    'doaj',
    'crossref',
    'web3',
    'blockchain',
    'academic discovery',
  ],
  image = '/pegasoi-logo-1024.png',
  url = 'https://pegasoi.com',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Pegasoi Research Platform',
  section = 'Research',
  tags = [],
}: SEOHeadProps) {
  const fullTitle = title.includes('Pegasoi')
    ? title
    : `${title} | Pegasoi Research Platform`
  const keywordString = [...keywords, ...tags].join(', ')

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordString} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Pegasoi Research Platform" />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific Open Graph tags */}
      {type === 'article' && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          <meta property="article:author" content={author} />
          <meta property="article:section" content={section} />
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@pegasoi" />
      <meta name="twitter:creator" content="@pegasoi" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0f172a" />
      <meta name="msapplication-TileColor" content="#0f172a" />
      <meta name="application-name" content="Pegasoi Research Platform" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Favicon and Icons */}
      <link rel="icon" href="/pegasoi-favicon-32.png" />
      <link rel="apple-touch-icon" sizes="192x192" href="/pegasoi-logo-1024.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/pegasoi-favicon-32.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/pegasoi-logo-1024.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/pegasoi-logo-1024.png" />

      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />

      {/* Structured Data for Research Platform */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Pegasoi Research Platform',
            description: description,
            url: url,
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${url}/research-gallery?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Pegasoi',
              logo: {
                '@type': 'ImageObject',
                url: `${url}/pegasoi-logo-1024.png`,
              },
            },
          }),
        }}
      />

      {/* Research Article Structured Data (when type is article) */}
      {type === 'article' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ScholarlyArticle',
              headline: title,
              description: description,
              image: image,
              datePublished: publishedTime,
              dateModified: modifiedTime || publishedTime,
              author: {
                '@type': 'Person',
                name: author,
              },
              publisher: {
                '@type': 'Organization',
                name: 'Pegasoi Research Platform',
                logo: {
                  '@type': 'ImageObject',
                  url: `${url}/pegasoi-logo-1024.png`,
                },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': url,
              },
            }),
          }}
        />
      )}
    </Head>
  )
}
