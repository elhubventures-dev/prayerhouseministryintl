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
import { SITE } from '@/lib/site'
import Link from 'next/link'
import { MapPin, Clock, Phone, Shirt, Users, Car } from 'lucide-react'

const visitFaqs = [
  {
    question: 'How do I get to Solution Center in Mile 4 Limbe?',
    answer:
      'The church meets opposite Wotutu Okada Park in Mile 4, Limbe, South West Region, Cameroon. Ask a local rider or taxi for Wotutu Okada Park, Mile 4. Call 653 270 752 if you need a landmark description on the day you visit.',
  },
  {
    question: 'What time should first-time guests arrive?',
    answer:
      'Arrive by 8:45 AM on Sunday so you can be welcomed, find a seat, and enter worship without rush. Midweek Bible Study begins at 6:00 PM on Wednesday.',
  },
  {
    question: 'Is Prayer House Ministry International the same as the Canadian charity of that name?',
    answer:
      'No. This Solution Center is a local church in Limbe, Cameroon, founded in 2009 by Rev. Apostle E.S. Hugo. It is not the Canada-registered charity that shares a similar name.',
  },
]

export const metadata: Metadata = pageMetadata({
  title: 'Plan Your Visit to Limbe',
  description:
    'Directions to Mile 4 Limbe, Sunday 9 AM service times, what to expect, and how to contact Prayer House Ministry International (Solution Center).',
  path: '/visit',
})

const steps = [
  { icon: MapPin, title: 'Find the building', text: `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.countryName}.` },
  { icon: Clock, title: 'Come at service time', text: 'Sunday Prophetic Service 9:00 AM · Wednesday Bible Study 6:00 PM.' },
  { icon: Shirt, title: 'Dress comfortably', text: 'Modest, neat clothing is welcome. You do not need a special outfit to belong here.' },
  { icon: Users, title: 'Expect a family welcome', text: 'Ushers can help with seating. You will not be singled out or pressured to give.' },
  { icon: Phone, title: 'Call if you get lost', text: `${SITE.telephoneDisplay} — we will help you find Mile 4.` },
  { icon: Car, title: 'Local transport', text: 'Okada and taxis know Wotutu Okada Park. Allow extra time on rainy Sundays.' },
]

export default function VisitPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Plan your visit', path: '/visit' },
          ]),
          faqPageSchema(visitFaqs),
        ]}
      />
      <AnnouncementBanner />
      <Header />
      <main>
        <PageHero
          label="First Time Here"
          title="Plan Your"
          highlight="Visit"
          subtitle="Everything a guest needs to find Solution Center in Mile 4, Limbe, and walk in with peace."
        />
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Visit', href: '/visit' },
          ]}
        />
        <AnswerCapsule>
          <p>
            To visit Prayer House Ministry International, come to Mile 4, Limbe, opposite
            Wotutu Okada Park, for Sunday Prophetic Service at 9:00 AM. Call 653 270 752 for
            directions. Guests are welcome without registration.
          </p>
        </AnswerCapsule>

        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-cinzel text-3xl text-foreground font-bold mb-10 text-center">
              How do I visit this <span className="text-gold-gradient">church in Limbe</span>?
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step, index) => (
                <li key={step.title} className="glass-card p-6">
                  <p className="font-montserrat text-gold text-xs tracking-widest uppercase mb-3">
                    Step {index + 1}
                  </p>
                  <step.icon className="w-6 h-6 text-gold mb-3" />
                  <h3 className="font-playfair text-xl text-foreground mb-2">{step.title}</h3>
                  <p className="font-inter text-muted-foreground text-sm leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-16 glass-card overflow-hidden">
              <iframe
                title="Map of Mile 4 Limbe, Cameroon"
                src="https://maps.google.com/maps?q=Mile%204%20Limbe%20Cameroon&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-[360px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <section id="faq" className="mt-16 space-y-6">
              <h2 className="font-cinzel text-2xl text-foreground font-bold">Visit questions</h2>
              {visitFaqs.map((faq) => (
                <article key={faq.question}>
                  <h3 className="font-playfair text-lg text-gold mb-2">{faq.question}</h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </section>

            <p className="mt-10 font-inter text-sm text-muted-foreground">
              Read the full{' '}
              <Link href="/faq" className="text-gold hover:underline">
                church FAQ
              </Link>
              , or{' '}
              <Link href="/contact" className="text-gold hover:underline">
                send a message
              </Link>{' '}
              before you come.
            </p>
          </div>
        </section>
        <Newsletter variant="section" />
      </main>
      <Footer />
    </>
  )
}
