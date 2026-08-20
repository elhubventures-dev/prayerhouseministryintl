'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Leadership from '@/components/sections/Leadership'
import WeeklyActivities from '@/components/sections/WeeklyActivities'
import Sermons from '@/components/sections/Sermons'
import Ministries from '@/components/sections/Ministries'
import Events from '@/components/sections/Events'
import Testimonials from '@/components/sections/Testimonials'
import Gallery from '@/components/sections/Gallery'
import Give from '@/components/sections/Give'
import Contact from '@/components/sections/Contact'
import PrayerRequestModal from '@/components/ui/PrayerRequestModal'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import Newsletter from '@/components/ui/Newsletter'
import AnswerCapsule from '@/components/seo/AnswerCapsule'

export default function HomeContent() {
  const [prayerModalOpen, setPrayerModalOpen] = useState(false)

  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main>
        <Hero />
        <AnswerCapsule>
          <p>
            <strong>Prayer House Ministry International (Solution Center)</strong> is a
            Spirit-filled prophetic church in Mile 4, Limbe, Cameroon. Sunday Prophetic
            Service starts at 9:00 AM opposite Wotutu Okada Park. The house is led by
            Rev. Apostle E.S. Hugo and Prophetess Ekwalla Calista, and exists to raise
            lives through prayer, worship, and the Word.
          </p>
        </AnswerCapsule>
        <About />
        <Leadership />
        <WeeklyActivities />
        <Sermons />
        <Ministries />
        <Events />
        <Testimonials />
        <Gallery />
        <Give />
        <Contact />
        <Newsletter variant="section" />
      </main>
      <Footer />

      <PrayerRequestModal isOpen={prayerModalOpen} onClose={() => setPrayerModalOpen(false)} />

      <button
        onClick={() => setPrayerModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gold text-background font-montserrat text-xs font-bold px-5 py-3 rounded-full shadow-gold-lg flex items-center gap-2 hover:shadow-gold hover:scale-105 transition-all duration-200 animate-glow-pulse"
        aria-label="Request Prayer"
      >
        🙏 Request Prayer
      </button>
    </>
  )
}
