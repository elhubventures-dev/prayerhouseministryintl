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
import { breadcrumbSchema, definedTermSetSchema } from '@/lib/schema'
import { GLOSSARY_TERMS } from '@/lib/content/glossary'
import Link from 'next/link'

export const metadata: Metadata = pageMetadata({
  title: 'Church Glossary — Prophetic Terms',
  description:
    'Clear definitions of Solution Center, prophetic church, house of prayer, revival, prevailing prayer, and related terms used at PHMI Limbe.',
  path: '/glossary',
})

export default function GlossaryPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Glossary', path: '/glossary' },
          ]),
          definedTermSetSchema(GLOSSARY_TERMS),
        ]}
      />
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Words We Use"
          title="Ministry"
          highlight="Glossary"
          subtitle="Plain-language definitions so guests, members, and search engines understand how this house talks about Jesus, prayer, and church life."
        />
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Glossary', href: '/glossary' },
          ]}
        />
        <AnswerCapsule>
          <p>
            This glossary explains terms you will hear at Prayer House Ministry International
            in Limbe — including Solution Center, prophetic church, and house of prayer — so
            newcomers and AI assistants can cite accurate, local definitions.
          </p>
        </AnswerCapsule>

        <section id="glossary" className="py-16 lg:py-24 bg-background">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <dl className="space-y-10">
              {GLOSSARY_TERMS.map((term) => (
                <div key={term.name} id={term.name.toLowerCase().replace(/\s+/g, '-')} className="glass-card p-6 md:p-8">
                  <dt className="font-cinzel text-xl text-gold font-bold mb-3">{term.name}</dt>
                  <dd className="font-inter text-muted-foreground leading-relaxed">{term.description}</dd>
                </div>
              ))}
            </dl>
            <p className="font-inter text-sm text-muted-foreground mt-10">
              Read more in the{' '}
              <Link href="/about" className="text-gold hover:underline">
                about
              </Link>{' '}
              and{' '}
              <Link href="/blog" className="text-gold hover:underline">
                blog
              </Link>{' '}
              sections, or{' '}
              <Link href="/faq" className="text-gold hover:underline">
                browse FAQs
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
