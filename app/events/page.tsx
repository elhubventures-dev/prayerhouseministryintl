import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import EventsContent from './EventsContent'

export const metadata: Metadata = {
  title: 'Events | Prayer House Ministry International',
  description:
    'Stay up to date with upcoming services, conferences, crusades, and special events at Solution Center in Limbe, Cameroon.',
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: 'Annual Revival & Prophetic Conference 2025',
      startDate: '2025-08-15',
      endDate: '2025-08-17',
      location: {
        '@type': 'Place',
        name: 'Solution Center',
        address: { '@type': 'PostalAddress', streetAddress: 'Opposite Wotutu Okada Park, Mile 4', addressLocality: 'Limbe', addressCountry: 'CM' },
      },
      organizer: { '@type': 'Organization', name: 'Prayer House Ministry International' },
    }),
  },
}

export default function EventsPage() {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Mark Your Calendar"
          title="Upcoming"
          highlight="Events"
          subtitle="Don't miss what God is doing at Solution Center. Every gathering is a divine appointment."
          bgImage="/images/phmi-20.jpeg"
        />
        <EventsContent />
      </main>
      <Footer />
    </>
  )
}
