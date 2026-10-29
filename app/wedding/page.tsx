import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import WeddingContent from './WeddingContent'
import AnswerCapsule from '@/components/seo/AnswerCapsule'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema, eventSchema } from '@/lib/schema'
import { WEDDING } from '@/lib/wedding'

export const metadata: Metadata = pageMetadata({
  title: 'Wedding Celebration — Ata & Taku',
  description: `${WEDDING.coupleNames} were united in holy matrimony on ${WEDDING.dateDisplay} at Prayer House Ministry International, Solution Center, Mile 4 Limbe.`,
  path: WEDDING.path,
  image: WEDDING.featuredImage,
})

export default function WeddingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Wedding Celebration', path: WEDDING.path },
          ]),
          eventSchema({
            name: `Holy Matrimony of ${WEDDING.coupleNames}`,
            startDate: `${WEDDING.dateIso}T10:00:00+01:00`,
            locationName: WEDDING.location,
          }),
        ]}
      />
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Holy Matrimony"
          title="Wedding"
          highlight="Celebration"
          subtitle={`${WEDDING.coupleNames} · ${WEDDING.dateDisplay} · ${WEDDING.location}`}
          bgImage={WEDDING.featuredImage}
        />
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Wedding Celebration', href: WEDDING.path },
          ]}
        />
        <AnswerCapsule>
          <p>
            On <strong>{WEDDING.dateDisplay}</strong>,{' '}
            <strong>{WEDDING.coupleNames}</strong> entered Christian marriage at{' '}
            <strong>Prayer House Ministry International (Solution Center)</strong> in Mile 4,
            Limbe. The ceremony was officiated by <strong>{WEDDING.officiantFull}</strong>. Explore
            photos and moments from their day of covenant and celebration.
          </p>
        </AnswerCapsule>
        <WeddingContent />
      </main>
      <Footer />
    </>
  )
}
