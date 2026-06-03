'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, fadeUp } from '@/lib/animations'

const categories = ['All', 'Worship', 'Events', 'Community', 'Outreach']

const images = [
  { src: '/images/phmi-5.jpeg', category: 'Worship', caption: 'Sunday Prophetic Service' },
  { src: '/images/phmi-6.jpeg', category: 'Events', caption: 'Annual Revival Conference' },
  { src: '/images/phmi-7.jpeg', category: 'Community', caption: 'Community Fellowship' },
  { src: '/images/phmi-8.jpeg', category: 'Worship', caption: 'Choir Ministry in Action' },
  { src: '/images/phmi-9.jpeg', category: 'Events', caption: 'Youth Empowerment Night' },
  { src: '/images/phmi-10.jpeg', category: 'Community', caption: 'Prayer Group Session' },
  { src: '/images/phmi-11.jpg', category: 'Outreach', caption: 'Community Outreach Program' },
  { src: '/images/phmi-13.jpeg', category: 'Worship', caption: 'All Night Service Worship' },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  const filtered = activeCategory === 'All' ? images : images.filter((img) => img.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => lightboxIndex !== null && setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
  const nextImage = () => lightboxIndex !== null && setLightboxIndex((lightboxIndex + 1) % filtered.length)

  return (
    <section id="gallery" className="relative py-24 lg:py-32 bg-background overflow-hidden">
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">Life at Solution Center</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Our <span className="text-gold-gradient">Gallery</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-montserrat text-xs font-semibold px-5 py-2 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gold text-background border-gold'
                  : 'bg-transparent text-muted-foreground border-white/10 hover:border-gold/50 hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          layout
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence>
            {filtered.map((image, i) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="break-inside-avoid mb-4 relative group cursor-pointer rounded-xl overflow-hidden"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col items-center justify-center gap-2">
                  <ZoomIn className="w-8 h-8 text-gold" />
                  <p className="font-montserrat text-foreground text-xs text-center px-3 font-medium">{image.caption}</p>
                </div>
                {/* Category badge */}
                <span className="absolute top-2 right-2 font-montserrat text-[9px] bg-gold/80 text-background px-2 py-0.5 rounded-full font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-montserrat text-sm font-semibold text-gold hover:text-gold-light transition-colors group"
          >
            View Full Gallery
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].caption}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <p className="text-center font-playfair text-foreground/80 italic mt-4 text-sm">
                {filtered[lightboxIndex].caption}
              </p>

              {/* Controls */}
              <button onClick={closeLightbox} className="absolute -top-12 right-0 text-muted-foreground hover:text-gold transition-colors">
                <X className="w-7 h-7" />
              </button>
              <button onClick={prevImage} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 bg-background-alt border border-gold/20 rounded-full flex items-center justify-center text-muted-foreground hover:text-gold transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImage} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 bg-background-alt border border-gold/20 rounded-full flex items-center justify-center text-muted-foreground hover:text-gold transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
