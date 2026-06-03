import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import Newsletter from '@/components/ui/Newsletter'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About Us | Prayer House Ministry International — Solution Center',
  description:
    'Learn about the vision, mission, history, and leadership of Prayer House Ministry International (Solution Center) in Limbe, Cameroon.',
}

export default function AboutPage() {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Our Story"
          title="About Prayer House"
          highlight="Ministry International"
          subtitle="A Spirit-filled prophetic ministry established in Limbe, Cameroon, raising lives through prayer, worship, and the Word of God."
          bgImage="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80"
        />
        <AboutContent />
        <Newsletter variant="section" />
      </main>
      <Footer />
    </>
  )
}
