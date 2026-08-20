import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import SermonsContent from './SermonsContent'
import AnswerCapsule from '@/components/seo/AnswerCapsule'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = pageMetadata({
  title: 'Sermons from Solution Center',
  description:
    'Watch anointed messages from Rev. Apostle E.S. Hugo and Prophetess Ekwalla Calista. Be strengthened by the Word from our Limbe pulpit.',
  path: '/sermons',
})

export default function SermonsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Sermons', path: '/sermons' },
        ])}
      />
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="The Word of God"
          title="Sermons &"
          highlight="Messages"
          subtitle="Be strengthened, edified, and transformed by anointed messages from our pulpit. Faith comes by hearing the Word of God."
        />
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Sermons', href: '/sermons' },
          ]}
        />
        <AnswerCapsule>
          <p>
            PHMI sermons are biblical messages preached at Solution Center in Limbe. Use this
            archive to revisit teaching on prayer, prophetic living, healing, and discipleship
            if you missed a service or worship from the diaspora.
          </p>
        </AnswerCapsule>
        <SermonsContent />
      </main>
      <Footer />
    </>
  )
}
