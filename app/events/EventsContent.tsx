'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'
import CountdownTimer from '@/components/ui/CountdownTimer'
import { getDynamicEvents } from '@/lib/eventsData'

const upcomingEvents = [
  {
    id: 1,
    title: 'Annual Revival & Prophetic Conference 2026',
    type: 'Conference',
    dates: 'October 15–17, 2026',
    time: '6:00 PM daily',
    location: 'Solution Center, Mile 4 Limbe',
    description: 'Three nights of powerful worship, prophetic ministry, healing, and breakthrough. Speakers from across Cameroon and beyond will minister under a fresh prophetic anointing. Come expecting transformation.',
    targetDate: new Date('2026-10-15T18:00:00'),
    capacity: 'Open to all',
    image: '/images/phmi-26.jpeg',
    featured: true,
    tags: ['Revival', 'Prophetic', 'Conference'],
  }
]

export default function EventsContent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const featured = upcomingEvents[0]
  const [rest, setRest] = useState<any[]>([])

  useEffect(() => {
    setRest(getDynamicEvents())
  }, [])

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
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700" />
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
                <a href="https://wa.me/237653270752?text=I%20want%20to%20register%20for%20the%20upcoming%20event" target="_blank" rel="noopener noreferrer" className="btn-gold text-sm w-fit inline-block">
                  Register Now →
                </a>
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
                  <a
                    href="https://wa.me/237653270752?text=I%20want%20to%20register%20for%20the%20upcoming%20event" target="_blank" rel="noopener noreferrer"
                    className="btn-glass text-xs py-2.5 mt-1 w-full text-center block"
                  >
                    Register →
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


    </>
  )
}
