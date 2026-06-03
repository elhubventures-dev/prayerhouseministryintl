import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import Newsletter from '@/components/ui/Newsletter'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'Blog & Devotionals | Prayer House Ministry International',
  description:
    'Daily devotionals, prophetic insights, teaching articles, and kingdom living content from Solution Center — Limbe, Cameroon.',
}

export default function BlogPage() {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Faith & Inspiration"
          title="Blog &"
          highlight="Devotionals"
          subtitle="Weekly articles, devotionals, prayer points, and prophetic insights to strengthen your walk with God."
        />
        <BlogContent />
        <Newsletter variant="section" />
      </main>
      <Footer />
    </>
  )
}
