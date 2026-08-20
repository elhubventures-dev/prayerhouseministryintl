import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import Contact from '@/components/sections/Contact'
import Newsletter from '@/components/ui/Newsletter'
import AnswerCapsule from '@/components/seo/AnswerCapsule'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = pageMetadata({
  title: 'Contact the Church in Limbe',
  description:
    'Visit Solution Center opposite Wotutu Okada Park, Mile 4 Limbe, call 653 270 752, or send a prayer request. We would love to connect with you.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Get In Touch"
          title="Contact"
          highlight="Solution Center"
          subtitle="We would love to hear from you. Reach out for prayer, directions, ministry inquiries, or simply to say hello."
        />
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Contact', href: '/contact' },
          ]}
        />
        <AnswerCapsule>
          <p>
            Find Prayer House Ministry International at Mile 4, Limbe, opposite Wotutu Okada
            Park. Call 653 270 752, use the contact form below, or visit on Sunday at 9:00 AM
            for Prophetic Service.
          </p>
        </AnswerCapsule>
        <Contact />
        <Newsletter variant="section" />
      </main>
      <Footer />
    </>
  )
}
