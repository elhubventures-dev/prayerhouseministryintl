import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import SermonsContent from './SermonsContent'

export const metadata: Metadata = {
  title: 'Sermons | Prayer House Ministry International',
  description:
    'Watch and listen to anointed messages from Rev. Apostle E.S. Hugo and Prophetess Ekwalla Calista. Be strengthened, edified, and transformed.',
}

export default function SermonsPage() {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="The Word of God"
          title="Sermons &"
          highlight="Messages"
          subtitle="Be strengthened, edified, and transformed by anointed messages from our pulpit. Faith comes by hearing the Word of God."
          bgImage="https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=1920&q=80"
        />
        <SermonsContent />
      </main>
      <Footer />
    </>
  )
}
