import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import GalleryContent from './GalleryContent'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = pageMetadata({
  title: 'Church Photo Gallery',
  description:
    'Photos from worship, conferences, outreach, and community life at Prayer House Ministry International, Solution Center, Limbe.',
  path: '/gallery',
})

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ])}
      />
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Life at Solution Center"
          title="Our"
          highlight="Gallery"
          subtitle="A glimpse into our community — moments of worship, fellowship, outreach, and the power of God moving among His people."
        />
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Gallery', href: '/gallery' },
          ]}
        />
        <GalleryContent />
      </main>
      <Footer />
    </>
  )
}
