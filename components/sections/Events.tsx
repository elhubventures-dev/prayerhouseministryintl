'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'
import { staggerContainer, fadeUp, fadeLeft, fadeRight } from '@/lib/animations'
import CountdownTimer from '@/components/ui/CountdownTimer'

const featuredEvent = {
  title: 'Annual Revival & Prophetic Conference 2025',
  date: 'August 15–17, 2025',
  time: '6:00 PM daily',
  location: 'Solution Center, Mile 4 Limbe',
  description: 'Three nights of powerful worship, prophetic ministry, healing, and breakthrough. Speakers from across Cameroon and beyond will join us for this transformational conference.',
  targetDate: new Date('2025-08-15T18:00:00'),
  image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
}

const upcomingEvents = [
  {
    month: 'JUL',
    day: '25',
    title: 'All-Night Prayer & Praise',
    description: 'Last Friday of the month. Come for a night of intercession and breakthrough.',
    time: '9:00 PM',
    location: 'Solution Center',
  },
  {
    month: 'AUG',
    day: '03',
    title: 'Youth Sunday & Commissioning',
    description: 'A special service celebrating and commissioning our youth for God\'s service.',
    time: '9:00 AM',
    location: 'Solution Center',
  },
  {
    month: 'AUG',
    day: '10',
    title: 'Women\'s Empowerment Seminar',
    description: 'A powerful day of teaching, testimony, and fellowship for the women of PHMI.',
    time: '10:00 AM',
    location: 'Solution Center Hall',
  },
]

export default function Events() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="events" className="relative py-24 lg:py-32 bg-navy-dark overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(201,168,76,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">What's Coming Up</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Upcoming <span className="text-gold-gradient">Events</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
        </motion.div>

        {/* Featured event */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="glass-card overflow-hidden mb-10 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative overflow-hidden min-h-[280px]">
              <img
                src={featuredEvent.image}
                alt={featuredEvent.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/80 lg:from-transparent to-navy-dark/20" />
              <div className="absolute inset-0 bg-navy-dark/30" />
              <span className="absolute top-4 left-4 font-montserrat text-[11px] bg-gold text-navy-dark px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                🔥 Featured Event
              </span>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="font-cinzel text-xl lg:text-2xl text-ivory font-bold leading-snug mb-4">
                {featuredEvent.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-silver mb-5">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold" /> {featuredEvent.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gold" /> {featuredEvent.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold" /> {featuredEvent.location}
                </span>
              </div>
              <p className="font-inter text-silver text-sm leading-relaxed mb-6">
                {featuredEvent.description}
              </p>

              {/* Countdown */}
              <div className="mb-6">
                <p className="font-montserrat text-xs text-gold/70 uppercase tracking-wider mb-3">
                  Event starts in:
                </p>
                <CountdownTimer targetDate={featuredEvent.targetDate} />
              </div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <button className="btn-gold text-sm w-fit flex items-center gap-2">
                  Register Now <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming events list */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="glass-card p-6 flex gap-5 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              {/* Date badge */}
              <div className="flex-shrink-0 w-14 flex flex-col items-center justify-center bg-gold/10 border border-gold/20 rounded-xl py-3 group-hover:bg-gold/20 transition-colors">
                <span className="font-montserrat text-[10px] text-gold uppercase font-semibold">{event.month}</span>
                <span className="font-cinzel text-2xl text-gold font-bold">{event.day}</span>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-playfair text-base text-ivory font-semibold mb-1.5 leading-snug group-hover:text-gold-light transition-colors">
                  {event.title}
                </h4>
                <p className="font-inter text-silver text-xs leading-relaxed mb-3">{event.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-silver">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gold" /> {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gold" /> {event.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-montserrat text-sm font-semibold text-gold hover:text-gold-light transition-colors group"
          >
            View All Events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
