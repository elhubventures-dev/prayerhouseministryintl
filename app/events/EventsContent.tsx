'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Clock, MapPin, Users, X, CheckCircle2 } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'
import CountdownTimer from '@/components/ui/CountdownTimer'

const upcomingEvents = [
  {
    id: 1,
    title: 'Annual Revival & Prophetic Conference 2025',
    type: 'Conference',
    dates: 'August 15–17, 2025',
    time: '6:00 PM daily',
    location: 'Solution Center, Mile 4 Limbe',
    description: 'Three nights of powerful worship, prophetic ministry, healing, and breakthrough. Speakers from across Cameroon and beyond will minister under a fresh prophetic anointing. Come expecting transformation.',
    targetDate: new Date('2025-08-15T18:00:00'),
    capacity: 'Open to all',
    image: '/images/phmi-16.jpeg',
    featured: true,
    tags: ['Revival', 'Prophetic', 'Conference'],
  },
  {
    id: 2,
    title: 'All-Night Prayer & Praise',
    type: 'Monthly Service',
    dates: 'July 25, 2025',
    time: '9:00 PM – Dawn',
    location: 'Solution Center',
    description: 'The last Friday of every month. Come for a night of intense intercession, worship, and supernatural breakthrough. Expect God to show up in power.',
    targetDate: new Date('2025-07-25T21:00:00'),
    capacity: 'Open to all',
    image: '/images/phmi-17.png',
    featured: false,
    tags: ['Prayer', 'All-Night'],
  },
  {
    id: 3,
    title: 'Youth Sunday & Commissioning Service',
    type: 'Special Service',
    dates: 'August 3, 2025',
    time: '9:00 AM',
    location: 'Solution Center',
    description: 'A special Sunday service dedicated to celebrating and commissioning our youth generation. Youth-led worship, testimonies, and a powerful word for the next generation.',
    targetDate: new Date('2025-08-03T09:00:00'),
    capacity: 'Open to all',
    image: '/images/phmi-18.jpeg',
    featured: false,
    tags: ['Youth', 'Special Service'],
  },
  {
    id: 4,
    title: 'Women\'s Empowerment Seminar',
    type: 'Seminar',
    dates: 'August 10, 2025',
    time: '10:00 AM – 4:00 PM',
    location: 'Solution Center Hall',
    description: 'A powerful full-day event for the women of PHMI and invited guests. Teaching, testimony, prayer, and fellowship centered on purpose, identity, and spiritual empowerment.',
    targetDate: new Date('2025-08-10T10:00:00'),
    capacity: 'Women only',
    image: '/images/phmi-19.jpeg',
    featured: false,
    tags: ['Women', 'Seminar'],
  },
]

interface RegistrationModalProps {
  event: typeof upcomingEvents[0]
  onClose: () => void
}

function RegistrationModal({ event, onClose }: RegistrationModalProps) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-card w-full max-w-md p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-2xl" />
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-gold transition-colors">
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="mb-6">
              <p className="section-label mb-2">Register for Event</p>
              <h3 className="font-cinzel text-lg text-foreground font-bold leading-snug">{event.title}</h3>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-3">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-gold" /> {event.dates}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-gold" /> {event.time}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Full Name *</label>
                <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Phone Number *</label>
                <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+237 6XX XXX XXX"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Email (optional)</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <button type="submit" className="btn-gold w-full text-sm mt-2">
                Confirm Registration
              </button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-7 h-7 text-gold" />
            </div>
            <h4 className="font-cinzel text-xl text-foreground font-bold mb-3">You're Registered!</h4>
            <p className="font-inter text-muted-foreground text-sm leading-relaxed mb-6">
              Thank you! Your spot is confirmed for <strong className="text-foreground">{event.title}</strong>. We look forward to seeing you!
            </p>
            <p className="font-garamond italic text-gold/70 text-sm mb-6">"Where two or three gather in my name, I am there." — Matthew 18:20</p>
            <button onClick={onClose} className="btn-gold text-sm px-8">Close</button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function EventsContent() {
  const [registering, setRegistering] = useState<typeof upcomingEvents[0] | null>(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const featured = upcomingEvents[0]
  const rest = upcomingEvents.slice(1)

  return (
    <>
      <section className="py-24 lg:py-32 bg-background-alt atmos-bg">
        <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Featured Event */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="glass-card overflow-hidden mb-12 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative overflow-hidden min-h-[300px]">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-background/50" />
                <span className="absolute top-4 left-4 font-montserrat text-[11px] bg-gold text-background px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                  🔥 Featured Event
                </span>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featured.tags.map((t) => (
                    <span key={t} className="font-montserrat text-[10px] border border-gold/30 text-gold px-2.5 py-1 rounded-full uppercase tracking-wider">{t}</span>
                  ))}
                </div>
                <h2 className="font-cinzel text-xl lg:text-2xl text-foreground font-bold mb-5 leading-snug">{featured.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gold" /> {featured.dates}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gold" /> {featured.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gold" /> {featured.location}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-gold" /> {featured.capacity}</span>
                </div>
                <p className="font-inter text-muted-foreground text-sm leading-relaxed mb-6">{featured.description}</p>
                <div className="mb-6">
                  <p className="font-montserrat text-xs text-gold/70 uppercase tracking-wider mb-3">Event starts in:</p>
                  <CountdownTimer targetDate={featured.targetDate} />
                </div>
                <button onClick={() => setRegistering(featured)} className="btn-gold text-sm w-fit">
                  Register Now →
                </button>
              </div>
            </div>
          </motion.div>

          {/* More Events */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {rest.map((event) => (
              <motion.div key={event.id} variants={fadeUp} whileHover={{ y: -6 }} className="glass-card overflow-hidden group">
                <div className="aspect-video relative overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-background/50" />
                  <span className="absolute top-3 left-3 font-montserrat text-[10px] bg-gold/90 text-background px-2.5 py-1 rounded-full font-bold uppercase">{event.type}</span>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="font-playfair text-base text-foreground font-semibold leading-snug group-hover:text-gold-light transition-colors">{event.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-gold" /> {event.dates}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-gold" /> {event.time}</span>
                  </div>
                  <p className="font-inter text-muted-foreground/70 text-xs leading-relaxed line-clamp-2">{event.description}</p>
                  <button
                    onClick={() => setRegistering(event)}
                    className="btn-glass text-xs py-2.5 mt-1 w-full text-center"
                  >
                    Register →
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {registering && <RegistrationModal event={registering} onClose={() => setRegistering(null)} />}
      </AnimatePresence>
    </>
  )
}
