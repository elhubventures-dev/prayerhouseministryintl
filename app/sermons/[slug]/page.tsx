import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import SermonDetailContent from './SermonDetailContent'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema, videoObjectSchema } from '@/lib/schema'

// Fallback static sermon data (replace with Sanity fetch in production)
const sermonData: Record<string, any> = {
  'the-power-of-prevailing-prayer': {
    title: 'The Power of Prevailing Prayer',
    speaker: 'Rev. Apostle E.S. Hugo',
    publishedAt: '2025-07-14',
    duration: '52 min',
    series: 'Prayer & Power',
    description: 'In this powerful message, be inspired to take your prayer life to a new level. Discover the biblical keys to answered prayer and supernatural breakthrough. This sermon will challenge and equip you to pray with authority, consistency, and expectation.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with real YouTube ID
    scripture: 'James 5:16 — "The effective, fervent prayer of a righteous man avails much."',
    thumbnail: '/images/phmi-26.jpeg',
    notes: [
      { heading: '1. What is Prevailing Prayer?', body: 'Prevailing prayer is prayer that continues until breakthrough comes. It is not a one-time event but a lifestyle of persistent communion with God that refuses to take "not yet" as a final answer.' },
      { heading: '2. Biblical Examples', body: 'Elijah prayed seven times before the rain came (1 Kings 18:41-45). Jacob wrestled with the angel until he received his blessing (Genesis 32:26). The widow persisted before the unjust judge until justice came (Luke 18:1-8).' },
      { heading: '3. Keys to Prevailing Prayer', body: 'Righteousness positions you for answered prayer. Fervency is the intensity that moves heaven. Faith is the substance of things hoped for. Persistence outlasts every opposition.' },
      { heading: '4. Your Assignment This Week', body: 'Choose one specific prayer need. Pray over it every day this week at a set time. Journal what happens. Come back and testify.' },
    ],
    tags: ['Prayer', 'Breakthrough', 'Faith', 'Intercession'],
    relatedSermons: [
      { slug: 'breaking-every-chain', title: 'Breaking Every Chain', speaker: 'Rev. Apostle E.S. Hugo', duration: '50 min', thumbnail: '/images/phmi-1.jpeg' },
      { slug: 'revival-fire-are-you-ready', title: 'Revival Fire — Are You Ready?', speaker: 'Rev. Apostle E.S. Hugo', duration: '48 min', thumbnail: '/images/phmi-29.jpeg' },
    ],
  },
}

type Props = { params: { slug: string } }

const sermonTitles: Record<string, string> = {
  'the-power-of-prevailing-prayer': 'The Power of Prevailing Prayer',
  'walking-in-prophetic-authority': 'Walking in Prophetic Authority',
  'revival-fire-are-you-ready': 'Revival Fire — Are You Ready?',
  'the-healing-virtue-of-christ': 'The Healing Virtue of Christ',
  'kingdom-keys-unlocking-destiny': 'Kingdom Keys: Unlocking Destiny',
  'hearing-the-voice-of-god': 'Hearing the Voice of God',
  'breaking-every-chain': 'Breaking Every Chain',
  'the-woman-of-great-worth': 'The Woman of Great Worth',
  'when-god-shows-up': 'When God Shows Up',
}

export function generateStaticParams() {
  return Object.keys(sermonTitles).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sermon = sermonData[params.slug]
  const title = sermon?.title || sermonTitles[params.slug] || 'Sermon'
  const description =
    sermon?.description ||
    `Listen to “${title}” from Prayer House Ministry International, Solution Center, Limbe.`
  return pageMetadata({
    title: title.slice(0, 52),
    description: description.slice(0, 160),
    path: `/sermons/${params.slug}`,
    image: sermon?.thumbnail,
  })
}

export default function SermonDetailPage({ params }: Props) {
  const sermon = sermonData[params.slug]
  const videoLd =
    sermon &&
    videoObjectSchema({
      name: sermon.title,
      description: sermon.description,
      thumbnail: sermon.thumbnail,
      uploadDate: sermon.publishedAt,
      youtubeId: sermon.youtubeId || '',
    })

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Sermons', path: '/sermons' },
            { name: sermon?.title || sermonTitles[params.slug] || 'Sermon', path: `/sermons/${params.slug}` },
          ]),
          ...(videoLd ? [videoLd] : []),
        ]}
      />
      <AnnouncementBanner />
      <Header />
      <main>
        <SermonDetailContent sermon={sermon} slug={params.slug} />
      </main>
      <Footer />
    </>
  )
}
