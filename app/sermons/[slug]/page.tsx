import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import SermonDetailContent from './SermonDetailContent'

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In production: const sermon = await getSermonBySlug(params.slug)
  const sermon = sermonData[params.slug] || { title: 'Sermon', description: 'Watch this message from Solution Center.' }
  return {
    title: `${sermon.title} | PHMI Sermons`,
    description: sermon.description,
    openGraph: {
      title: sermon.title,
      description: sermon.description,
      images: [sermon.thumbnail || '/og-image.jpg'],
      type: 'video.other',
    },
  }
}

export default function SermonDetailPage({ params }: Props) {
  const sermon = sermonData[params.slug]

  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main>
        <SermonDetailContent sermon={sermon} slug={params.slug} />
      </main>
      <Footer />
    </>
  )
}
