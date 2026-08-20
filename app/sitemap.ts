import { MetadataRoute } from 'next'
import { SITE, absoluteUrl } from '@/lib/site'
import { sanityClient } from '@/lib/sanity'

const fallbackSermonSlugs = [
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

const fallbackBlogSlugs = [
  'the-secret-place-of-prayer',
  'walking-in-prophetic-purpose',
  'from-broken-to-blessed',
  '7-daily-declarations-for-breakthrough',
  'understanding-the-tithe',
  'raising-spirit-filled-children',
]

async function fetchSanitySlugs(type: 'sermon' | 'post'): Promise<string[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId || projectId === 'your-project-id') return []
  try {
    const slugs = await sanityClient.fetch<string[]>(
      `*[_type == $type && defined(slug.current)].slug.current`,
      { type }
    )
    return Array.isArray(slugs) ? slugs.filter(Boolean) : []
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: absoluteUrl('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/visit'), lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: absoluteUrl('/ministries'), lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: absoluteUrl('/sermons'), lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: absoluteUrl('/events'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/gallery'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: absoluteUrl('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: absoluteUrl('/faq'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/glossary'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const [sanitySermons, sanityPosts] = await Promise.all([
    fetchSanitySlugs('sermon'),
    fetchSanitySlugs('post'),
  ])

  const sermonSlugs = sanitySermons.length ? sanitySermons : fallbackSermonSlugs
  const blogSlugs = sanityPosts.length ? sanityPosts : fallbackBlogSlugs

  const sermonPages: MetadataRoute.Sitemap = sermonSlugs.map((slug) => ({
    url: absoluteUrl(`/sermons/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: absoluteUrl(`/blog/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...staticPages, ...sermonPages, ...blogPages]
}
