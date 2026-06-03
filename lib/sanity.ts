import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
}

export const sanityClient = createClient(sanityConfig)

// Image URL builder
const builder = imageUrlBuilder(sanityClient)
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ── Typed fetch helpers ──────────────────────────────────────────────────

export async function getSermons(limit = 12) {
  return sanityClient.fetch(`
    *[_type == "sermon"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      speaker,
      publishedAt,
      duration,
      series,
      thumbnail,
      youtubeId,
      description,
      tags,
      "audioUrl": audioFile.asset->url
    }
  `, { limit })
}

export async function getSermonBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "sermon" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      speaker,
      publishedAt,
      duration,
      series,
      thumbnail,
      youtubeId,
      description,
      tags,
      notes,
      scripture,
      "audioUrl": audioFile.asset->url,
      "relatedSermons": *[_type == "sermon" && series == ^.series && slug.current != $slug][0..2] {
        _id, title, slug, speaker, publishedAt, duration, thumbnail
      }
    }
  `, { slug })
}

export async function getEvents(onlyUpcoming = true) {
  const filter = onlyUpcoming
    ? `*[_type == "event" && dateTime(startDate) > dateTime(now())]`
    : `*[_type == "event"]`
  return sanityClient.fetch(`
    ${filter} | order(startDate asc) {
      _id,
      title,
      slug,
      eventType,
      startDate,
      endDate,
      time,
      location,
      description,
      image,
      registrationOpen,
      capacity,
      tags,
      featured
    }
  `)
}

export async function getBlogPosts(limit = 9) {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      author,
      publishedAt,
      excerpt,
      mainImage,
      categories,
      estimatedReadingTime,
      featured
    }
  `, { limit })
}

export async function getBlogPostBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      author,
      publishedAt,
      excerpt,
      mainImage,
      body,
      categories,
      estimatedReadingTime,
      scripture,
      "relatedPosts": *[_type == "post" && slug.current != $slug][0..2] {
        _id, title, slug, publishedAt, mainImage, excerpt
      }
    }
  `, { slug })
}

// ── TypeScript types ─────────────────────────────────────────────────────

export interface Sermon {
  _id: string
  title: string
  slug: { current: string }
  speaker: string
  publishedAt: string
  duration: string
  series: string
  thumbnail: SanityImageSource
  youtubeId?: string
  description?: string
  tags?: string[]
  notes?: PortableTextBlock[]
  scripture?: string
  audioUrl?: string
  relatedSermons?: Sermon[]
}

export interface Event {
  _id: string
  title: string
  slug: { current: string }
  eventType: string
  startDate: string
  endDate?: string
  time: string
  location: string
  description: string
  image?: SanityImageSource
  registrationOpen: boolean
  capacity?: string
  tags?: string[]
  featured: boolean
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  author: string
  publishedAt: string
  excerpt: string
  mainImage?: SanityImageSource
  body?: PortableTextBlock[]
  categories?: string[]
  estimatedReadingTime?: number
  featured?: boolean
  scripture?: string
  relatedPosts?: BlogPost[]
}

export interface PortableTextBlock {
  _type: string
  _key: string
  children?: Array<{ _key: string; _type: string; marks?: string[]; text: string }>
  markDefs?: Array<{ _key: string; _type: string; href?: string }>
  style?: string
  listItem?: string
}
