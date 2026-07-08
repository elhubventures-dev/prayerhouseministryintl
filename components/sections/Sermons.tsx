'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Play, Clock, Calendar, ArrowRight } from 'lucide-react'
import { staggerContainer, fadeUp, fadeLeft, fadeRight } from '@/lib/animations'

const sermons = [
  {
    title: 'The Power of Prevailing Prayer',
    speaker: 'Rev. Apostle E.S. Hugo',
    date: 'July 14, 2025',
    duration: '52 min',
    series: 'Prayer & Power',
    thumbnail: '/images/phmi-26.jpeg',
    featured: true,
  },
  {
    title: 'Walking in Prophetic Authority',
    speaker: 'Prophetess Ekwalla Calista',
    date: 'July 7, 2025',
    duration: '45 min',
    series: 'Prophetic Series',
    thumbnail: '/images/phmi-47.jpg',
    thumbnailPosition: '60% 28%',
    featured: false,
  },
  {
    title: 'Revival Fire — Are You Ready?',
    speaker: 'Rev. Apostle E.S. Hugo',
    date: 'June 30, 2025',
    duration: '48 min',
    series: 'Revival Season',
    thumbnail: '/images/phmi-29.jpeg',
    thumbnailPosition: 'center 8%',
    featured: false,
  },
  {
    title: 'The Healing Virtue of Christ',
    speaker: 'Prophetess Ekwalla Calista',
    date: 'June 22, 2025',
    duration: '39 min',
    series: 'Healing & Miracles',
    thumbnail: '/images/phmi-19.jpeg',
    featured: false,
  },
]

function PlayButton({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = { sm: 'w-10 h-10', md: 'w-14 h-14', lg: 'w-20 h-20' }
  const iconDims = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-8 h-8' }
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`${dims[size]} rounded-full bg-gold flex items-center justify-center shadow-gold cursor-pointer flex-shrink-0`}
    >
      <Play className={`${iconDims[size]} text-background fill-navy-dark ml-0.5`} />
    </motion.div>
  )
}

export default function Sermons() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })
  const featured = sermons[0]
  const rest = sermons.slice(1)

  return (
    <section id="sermons" className="relative py-24 lg:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,168,76,0.07)_0%,transparent_60%)] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">The Word of God</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Watch <span className="text-gold-gradient">Sermons</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
          <motion.p variants={fadeUp} className="font-inter text-muted-foreground max-w-lg mx-auto">
            Be strengthened, edified, and transformed by anointed messages from our pulpit.
          </motion.p>
        </motion.div>

        {/* Featured sermon */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-10"
        >
          <motion.div
            variants={fadeUp}
            className="glass-card overflow-hidden group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Thumbnail */}
              <div className="lg:col-span-3 relative overflow-hidden">
                <div className="lg:aspect-auto min-h-[260px] relative">
                  <img
                    src={featured.thumbnail}
                    alt={featured.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                    <PlayButton size="lg" />
                  </div>
                  {/* Series badge */}
                  <span className="absolute top-4 left-4 font-montserrat text-[10px] bg-gold text-background px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    {featured.series}
                  </span>
                  {/* Featured badge */}
                  <span className="absolute top-4 right-4 font-montserrat text-[10px] bg-white/10 backdrop-blur text-foreground px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">
                    Featured
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                <p className="font-montserrat text-[11px] text-gold uppercase tracking-widest mb-3">Latest Message</p>
                <h3 className="font-playfair text-2xl lg:text-3xl text-foreground font-bold leading-tight mb-4">
                  {featured.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground text-sm">
                  <span className="font-inter">{featured.speaker}</span>
                  <span className="flex items-center gap-1.5 font-inter">
                    <Calendar className="w-3.5 h-3.5 text-gold" /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-inter">
                    <Clock className="w-3.5 h-3.5 text-gold" /> {featured.duration}
                  </span>
                </div>
                <p className="font-inter text-muted-foreground text-sm leading-relaxed mb-8">
                  In this powerful message, be inspired to take your prayer life to a new level. Discover the biblical
                  keys to answered prayer and supernatural breakthrough.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <button className="btn-gold text-sm flex items-center gap-2 w-fit">
                    <Play className="w-4 h-4 fill-navy-dark" /> Watch Now
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Sermon grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {rest.map((sermon) => (
            <motion.div
              key={sermon.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  style={{ objectPosition: (sermon as { thumbnailPosition?: string }).thumbnailPosition ?? 'center 30%' }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayButton size="md" />
                </div>
                <span className="absolute top-3 left-3 font-montserrat text-[10px] bg-gold text-background px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  {sermon.series}
                </span>
              </div>

              {/* Card body */}
              <div className="p-6">
                <h4 className="font-playfair text-lg text-foreground font-semibold mb-3 leading-snug group-hover:text-gold-light transition-colors">
                  {sermon.title}
                </h4>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="font-inter">{sermon.speaker}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gold" /> {sermon.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gold" /> {sermon.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All */}
        <div className="text-center">
          <Link
            href="/sermons"
            className="inline-flex items-center gap-2 font-montserrat text-sm font-semibold text-gold hover:text-gold-light transition-colors group"
          >
            View All Sermons
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
