import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import Newsletter from '@/components/ui/Newsletter'
import BlogContent from './BlogContent'
import AnswerCapsule from '@/components/seo/AnswerCapsule'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = pageMetadata({
  title: 'Christian Blog & Devotionals',
  description:
    'Devotionals, prophetic insights, and kingdom teaching from Prayer House Ministry International — written for believers in Limbe and beyond.',
  path: '/blog',
})

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Faith & Inspiration"
          title="Blog &"
          highlight="Devotionals"
          subtitle="Weekly articles, devotionals, prayer points, and prophetic insights to strengthen your walk with God."
        />
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: '/blog' },
          ]}
        />
        <AnswerCapsule>
          <p>
            The PHMI blog gathers devotionals and teaching from Solution Center on prayer,
            prophetic purpose, family, and generous living. Start with the latest article, then
            explore related sermons for the same themes.
          </p>
        </AnswerCapsule>
        <BlogContent />
        <Newsletter variant="section" />
      </main>
      <Footer />
    </>
  )
}
