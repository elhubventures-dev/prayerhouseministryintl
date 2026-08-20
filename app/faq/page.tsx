import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import Newsletter from '@/components/ui/Newsletter'
import AnswerCapsule from '@/components/seo/AnswerCapsule'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema'
import { CHURCH_FAQS } from '@/lib/content/faqs'
import Link from 'next/link'

export const metadata: Metadata = pageMetadata({
  title: 'Church FAQ — Limbe Services',
  description:
    'Answers about Sunday service times, location in Mile 4 Limbe, prayer requests, ministries, and what to expect at Prayer House Ministry International.',
  path: '/faq',
})

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
          faqPageSchema(CHURCH_FAQS),
        ]}
      />
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Questions & Answers"
          title="Frequently Asked"
          highlight="Questions"
          subtitle="Straight answers about visiting Solution Center, service times, prayer, and church life in Limbe."
        />
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'FAQ', href: '/faq' },
          ]}
        />
        <AnswerCapsule>
          <p>
            Prayer House Ministry International meets in Mile 4, Limbe, Cameroon. Sunday
            Prophetic Service is 9:00 AM. Use this page for location, times, first-visit
            guidance, and how to request prayer — then come worship with us.
          </p>
        </AnswerCapsule>

        <section id="faq" className="py-16 lg:py-24 bg-background">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-6">
            {CHURCH_FAQS.map((faq) => (
              <article key={faq.question} className="glass-card p-6 md:p-8">
                <h2 className="font-cinzel text-lg md:text-xl text-foreground font-bold mb-3">
                  {faq.question}
                </h2>
                <p className="font-inter text-muted-foreground leading-relaxed">{faq.answer}</p>
              </article>
            ))}
            <p className="font-inter text-sm text-muted-foreground pt-4">
              Still need help?{' '}
              <Link href="/contact" className="text-gold hover:underline">
                Contact the church
              </Link>{' '}
              or{' '}
              <Link href="/visit" className="text-gold hover:underline">
                plan your visit
              </Link>
              .
            </p>
          </div>
        </section>
        <Newsletter variant="section" />
      </main>
      <Footer />
    </>
  )
}
