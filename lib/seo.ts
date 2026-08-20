import type { Metadata } from 'next'
import { SITE, absoluteUrl } from '@/lib/site'

type OgType = 'website' | 'article'

type PageMetaInput = {
  title: string
  description: string
  path: string
  ogType?: OgType
  image?: string
  noIndex?: boolean
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
}

export function pageMetadata({
  title,
  description,
  path,
  ogType = 'website',
  image,
  noIndex,
  publishedTime,
  modifiedTime,
  keywords,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)
  const ogImage = image || SITE.ogImage
  const robots = noIndex
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const },
      }

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots,
    openGraph: {
      type: ogType,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(ogType === 'article' && publishedTime ? { publishedTime } : {}),
      ...(ogType === 'article' && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Church in Limbe, Cameroon | PHMI Solution Center',
    template: '%s | PHMI Solution Center',
  },
  description: SITE.description,
  keywords: [
    'church in Limbe',
    'church in Limbe Cameroon',
    'Prayer House Ministry International',
    'Solution Center Limbe',
    'prophetic church Cameroon',
    'Pentecostal church Limbe',
    'Bible study Limbe',
    'Sunday service Mile 4 Limbe',
    'prayer ministry Cameroon',
    'Rev Apostle E.S. Hugo',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE.shortName,
  },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: 'website',
    url: SITE.url,
    title: 'Church in Limbe, Cameroon | PHMI Solution Center',
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: SITE.name,
        type: 'image/jpeg',
      },
    ],
    locale: SITE.locale,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Church in Limbe | PHMI Solution Center',
    description: SITE.tagline,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: SITE.logo, type: 'image/png' },
      { url: SITE.logo, sizes: '32x32', type: 'image/png' },
      { url: SITE.logo, sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: SITE.logo, sizes: '180x180', type: 'image/png' }],
    shortcut: SITE.logo,
  },
  alternates: { canonical: SITE.url },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
}
