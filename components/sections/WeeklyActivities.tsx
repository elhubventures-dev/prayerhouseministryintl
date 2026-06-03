'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Music, Mic, Moon } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const services = [
  {
    day: 'Wednesday',
    name: 'Bible Study',
    time: '6:00 PM',
    icon: BookOpen,
    description: 'Deep dive into the Scriptures. Build your foundation in the Word of God.',
    featured: false,
  },
  {
    day: 'Saturday',
    name: 'Choir Rehearsal',
    time: '4:00 PM',
    icon: Music,
    description: 'Preparing hearts and voices to usher in God\'s presence through worship.',
    featured: false,
  },
  {
    day: 'Sunday',
    name: 'Prophetic Service',
    time: '9:00 AM',
    icon: Mic,
    description: 'Experience the prophetic anointing. Receive a fresh word and encounter God\'s power.',
    featured: false,
  },
  {
    day: 'Last Friday',
    name: 'All Night Service',
    time: '9:00 PM',
    icon: Moon,
    description: 'A night of intense intercession, worship, and breakthrough. Come expecting a miracle.',
    featured: true,
  },
]

export default function WeeklyActivities() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-navy overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-transparent to-navy-dark pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">Join Us Every Week</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Weekly <span className="text-gold-gradient">Activities</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
          <motion.p variants={fadeUp} className="font-inter text-silver max-w-lg mx-auto">
            Every service is an opportunity to encounter God, grow in faith, and build community. You are always welcome.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.name}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`relative glass-card p-8 flex flex-col gap-4 overflow-hidden group cursor-default ${
                  service.featured ? 'border-gold/40' : ''
                }`}
              >
                {/* Top gold accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

                {/* Featured badge */}
                {service.featured && (
                  <span className="absolute top-4 right-4 font-montserrat text-[10px] text-navy-dark bg-gold px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">
                    Special
                  </span>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  service.featured
                    ? 'bg-gold/20 group-hover:bg-gold/30'
                    : 'bg-gold/10 group-hover:bg-gold/20'
                }`}>
                  <Icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                </div>

                {/* Day */}
                <p className="font-montserrat text-[11px] text-gold uppercase tracking-[0.2em]">{service.day}</p>

                {/* Service name */}
                <h3 className="font-playfair text-xl text-ivory font-semibold leading-tight">{service.name}</h3>

                {/* Time */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-gold/50" />
                  <p className="font-montserrat text-sm text-gold-light font-medium">{service.time}</p>
                </div>

                {/* Description */}
                <p className="font-inter text-silver text-sm leading-relaxed">{service.description}</p>

                {/* Bottom glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Address note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="font-inter text-silver/60 text-sm">
            📍 Opposite Wotutu Okada Park, Mile 4 Limbe
            <span className="mx-3 text-gold/30">|</span>
            📞 <a href="tel:+237653270752" className="hover:text-gold transition-colors">653 270 752</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
