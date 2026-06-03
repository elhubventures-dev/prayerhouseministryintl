import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import MinistriesContent from './MinistriesContent'

export const metadata: Metadata = {
  title: 'Our Ministries | Prayer House Ministry International',
  description:
    'Explore the six ministry arms of Solution Center — Prayer, Worship, Youth, Women, Outreach, and Choir Ministry. Find your place and fulfill your purpose.',
}

export default function MinistriesPage() {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Ministry Arms"
          title="Our"
          highlight="Ministries"
          subtitle="Every ministry arm is a divine expression of our mandate. Find your place, discover your gifts, and fulfill your God-given purpose."
        />
        <MinistriesContent />
      </main>
      <Footer />
    </>
  )
}
