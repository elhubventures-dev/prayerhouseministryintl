'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Flame, Music2, Users, Heart, Globe, Mic2, ArrowRight } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const ministries = [
  {
    icon: Flame,
    name: 'Prayer Ministry',
    description: 'The heartbeat of Solution Center. A dedicated team of intercessors who hold the spiritual gates of this house through fasting, prayer, and prophetic intercession.',
    color: 'from-orange-500/20 to-red-500/10',
  },
  {
    icon: Music2,
    name: 'Worship Ministry',
    description: 'Gifted musicians and worshipers who usher the congregation into the tangible presence of God every service through Spirit-led, anointed worship.',
    color: 'from-blue-500/20 to-indigo-500/10',
  },
  {
    icon: Users,
    name: 'Youth Ministry',
    description: 'Raising a generation of passionate, purpose-driven young people who know their identity in Christ and are equipped to lead in their world.',
    color: 'from-green-500/20 to-emerald-500/10',
  },
  {
    icon: Heart,
    name: 'Women Ministry',
    description: 'Empowering women to walk in their God-given destiny — through fellowship, discipleship, and spiritual development in a safe and nurturing community.',
    color: 'from-pink-500/20 to-rose-500/10',
  },
  {
    icon: Globe,
    name: 'Outreach Ministry',
    description: 'Taking the love and power of God beyond the four walls of the church — into communities, streets, and nations through evangelism and social action.',
    color: 'from-teal-500/20 to-cyan-500/10',
  },
  {
    icon: Mic2,
    name: 'Choir Ministry',
    description: 'A harmonious choir that prepares hearts and voices to minister and glorify God in worship, celebrating His greatness through songs and hymns.',
    color: 'from-purple-500/20 to-violet-500/10',
  },
]

export default function Ministries() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="ministries" className="relative py-24 lg:py-32 bg-navy overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(201,168,76,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">Ministry Arms</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Our <span className="text-gold-gradient">Ministries</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
          <motion.p variants={fadeUp} className="font-inter text-silver max-w-lg mx-auto">
            Every ministry arm is a divine expression of our mandate. Find your place, fulfill your purpose.
          </motion.p>
        </motion.div>

        {/* Ministry cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ministries.map((ministry) => {
            const Icon = ministry.icon
            return (
              <motion.div
                key={ministry.name}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass-card p-8 flex flex-col gap-5 relative overflow-hidden group cursor-default"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

                {/* BG gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${ministry.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                {/* Icon */}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold/50 group-hover:shadow-gold transition-all duration-300">
                  <Icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div className="relative z-10 flex-1">
                  <h3 className="font-playfair text-xl text-ivory font-semibold mb-3 group-hover:text-gold-light transition-colors">
                    {ministry.name}
                  </h3>
                  <p className="font-inter text-silver text-sm leading-relaxed">{ministry.description}</p>
                </div>

                {/* Learn More */}
                <Link
                  href="/ministries"
                  className="relative z-10 inline-flex items-center gap-1.5 font-montserrat text-xs font-semibold text-gold/70 hover:text-gold transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
