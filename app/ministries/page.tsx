import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import MinistriesContent from './MinistriesContent'
import AnswerCapsule from '@/components/seo/AnswerCapsule'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = pageMetadata({
  title: 'Church Ministries in Limbe',
  description:
    'Explore Prayer, Worship, Youth, Women, Outreach, and Choir ministries at Solution Center in Limbe. Find your place and serve with purpose.',
  path: '/ministries',
})

export default function MinistriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Ministries', path: '/ministries' },
        ])}
      />
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Ministry Arms"
          title="Our"
          highlight="Ministries"
          subtitle="Every ministry arm is a divine expression of our mandate. Find your place, discover your gifts, and fulfill your God-given purpose."
        />
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Ministries', href: '/ministries' },
          ]}
        />
        <AnswerCapsule>
          <p>
            Solution Center runs six ministry arms: Prayer, Worship, Youth, Women, Outreach,
            and Choir. Each exists to equip believers in Limbe to pray, serve, and carry the
            gospel — not to compete with the Sunday gathering, but to strengthen it.
          </p>
        </AnswerCapsule>
        <MinistriesContent />
      </main>
      <Footer />
    </>
  )
}
