import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import Newsletter from '@/components/ui/Newsletter'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import AboutContent from './AboutContent'
import AnswerCapsule from '@/components/seo/AnswerCapsule'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema, personSchema } from '@/lib/schema'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'About Our Church in Limbe',
  description:
    'Learn the vision, mission, history, and leadership of Prayer House Ministry International — Solution Center in Mile 4, Limbe, Cameroon.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
          personSchema(SITE.founders[0]),
          personSchema(SITE.founders[1]),
        ]}
      />
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Our Story"
          title="About Prayer House"
          highlight="Ministry International"
          subtitle="A Spirit-filled prophetic ministry established in Limbe, Cameroon, raising lives through prayer, worship, and the Word of God."
        />
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'About', href: '/about' },
          ]}
        />
        <AnswerCapsule>
          <p>
            Prayer House Ministry International was founded in Limbe in 2009 by Rev. Apostle
            E.S. Hugo. Today the Solution Center is a prophetic, Bible-teaching church family
            co-led with Prophetess Ekwalla Calista, serving Mile 4 and the South West Region
            through prayer, worship, and the Word.
          </p>
        </AnswerCapsule>
        <p className="max-w-7xl mx-auto px-6 lg:px-8 pb-2 font-inter text-xs text-muted-foreground">
          Last updated: 20 August 2026
        </p>
        <AboutContent />
        <Newsletter variant="section" />
      </main>
      <Footer />
    </>
  )
}
