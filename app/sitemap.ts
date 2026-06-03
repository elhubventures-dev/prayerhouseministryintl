import { MetadataRoute } from 'next'

const BASE_URL = 'https://prayerhouseministryintl.org'

// Static sermon slugs (replace with Sanity fetch in production)
const sermonSlugs = [
  'the-power-of-prevailing-prayer',
  'walking-in-prophetic-authority',
  'revival-fire-are-you-ready',
  'the-healing-virtue-of-christ',
  'kingdom-keys-unlocking-destiny',
  'hearing-the-voice-of-god',
  'breaking-every-chain',
  'the-woman-of-great-worth',
  'when-god-shows-up',
]

const blogSlugs = [
  'the-secret-place-of-prayer',
  'walking-in-prophetic-purpose',
  'from-broken-to-blessed',
  '7-daily-declarations-for-breakthrough',
  'understanding-the-tithe',
  'raising-spirit-filled-children',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/ministries`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/sermons`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/events`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
  ]

  // Sermon detail pages
  const sermonPages: MetadataRoute.Sitemap = sermonSlugs.map((slug) => ({
    url: `${BASE_URL}/sermons/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Blog detail pages
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...sermonPages, ...blogPages]
}
