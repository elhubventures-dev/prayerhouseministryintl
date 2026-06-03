import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import Contact from '@/components/sections/Contact'
import Newsletter from '@/components/ui/Newsletter'

export const metadata: Metadata = {
  title: 'Contact Us | Prayer House Ministry International',
  description:
    'Get in touch with Solution Center. Visit us at Mile 4 Limbe, call us at 653 270 752, or submit a prayer request. We\'d love to connect with you.',
}

export default function ContactPage() {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="Get In Touch"
          title="Contact"
          highlight="Solution Center"
          subtitle="We would love to hear from you. Reach out for prayer, directions, ministry inquiries, or simply to say hello."
        />
        <Contact />
        <Newsletter variant="section" />
      </main>
      <Footer />
    </>
  )
}
