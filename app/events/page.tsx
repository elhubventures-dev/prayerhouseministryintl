import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import EventsContent from './EventsContent'
import AnswerCapsule from '@/components/seo/AnswerCapsule'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema, eventSchema } from '@/lib/schema'

export const metadata: Metadata = pageMetadata({
  title: 'Church Events in Limbe',
  description:
    'See upcoming services, conferences, crusades, and special gatherings at Prayer House Ministry International, Solution Center, Limbe.',
  path: '/events',
})

export default function EventsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Events', path: '/events' },
          ]),
          eventSchema({
            name: 'Sunday Prophetic Service',
            startDate: '2026-08-23T09:00:00+01:00',
          }),
        ]}
      />
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Mark Your Calendar"
          title="Upcoming"
          highlight="Events"
          subtitle="Don't miss what God is doing at Solution Center. Every gathering is a divine appointment."
        />
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Events', href: '/events' },
          ]}
        />
        <AnswerCapsule>
          <p>
            Weekly life at PHMI includes Sunday Prophetic Service at 9:00 AM, Wednesday Bible
            Study at 6:00 PM, and special conferences as announced. Check this page before you
            travel to Limbe so you can plan around the next gathering.
          </p>
        </AnswerCapsule>
        <EventsContent />
      </main>
      <Footer />
    </>
  )
}
