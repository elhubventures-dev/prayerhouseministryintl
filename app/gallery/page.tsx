import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import GalleryContent from './GalleryContent'

export const metadata: Metadata = {
  title: 'Gallery | Prayer House Ministry International',
  description:
    'Explore photos from our worship services, conferences, outreach programs, and community events at Solution Center, Limbe.',
}

export default function GalleryPage() {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Life at Solution Center"
          title="Our"
          highlight="Gallery"
          subtitle="A glimpse into our community — moments of worship, fellowship, outreach, and the power of God moving among His people."
          bgImage="/images/phmi-10.jpeg"
        />
        <GalleryContent />
      </main>
      <Footer />
    </>
  )
}
