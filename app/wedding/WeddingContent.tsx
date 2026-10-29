'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Calendar,
  MapPin,
  Church,
  Quote,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Heart,
} from 'lucide-react'
import { WEDDING, weddingPhotos } from '@/lib/wedding'
import { fadeUp, staggerContainer } from '@/lib/animations'

const WHATSAPP_MARRIAGE =
  'https://wa.me/237653270752?text=' +
  encodeURIComponent(
    'Hello Solution Center. I would like to ask about Christian marriage counselling or wedding ceremonies at PHMI.'
  )

export default function WeddingContent() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () =>
    lightboxIndex !== null &&
    setLightboxIndex((lightboxIndex - 1 + weddingPhotos.length) % weddingPhotos.length)
  const nextImage = () =>
    lightboxIndex !== null && setLightboxIndex((lightboxIndex + 1) % weddingPhotos.length)

  return (
    <>
      <section className="relative py-20 lg:py-28 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(201,168,76,0.08)_0%,transparent_55%)] pointer-events-none" />

        <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-20"
          >
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl min-h-[320px] lg:min-h-[420px]">
              <img
                src={WEDDING.featuredImage}
                alt={`${WEDDING.coupleNames} on their wedding day`}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-montserrat text-[10px] uppercase tracking-[0.18em] text-gold mb-1">
                  Holy Matrimony
                </p>
                <p className="font-playfair text-xl sm:text-2xl text-foreground font-semibold leading-snug">
                  {WEDDING.coupleNames}
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="section-label mb-3">A Covenant Celebration</p>
              <h2 className="section-title mb-4">
                Two Lives, <span className="text-gold-gradient">One Faith</span>
              </h2>
              <div className="gold-divider !mx-0 mb-6" />

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold" />
                  {WEDDING.dateDisplay}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold" />
                  {WEDDING.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Church className="w-4 h-4 text-gold" />
                  Officiated by {WEDDING.officiant}
                </span>
              </div>

              <div className="space-y-4 font-inter text-muted-foreground leading-relaxed">
                {WEDDING.story.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <blockquote className="mt-8 pl-5 border-l-2 border-gold/60">
                <Quote className="w-5 h-5 text-gold mb-2" />
                <p className="font-playfair text-foreground/90 italic text-lg leading-snug">
                  &ldquo;{WEDDING.scripture.text}&rdquo;
                </p>
                <cite className="font-montserrat text-xs uppercase tracking-wider text-gold not-italic mt-2 block">
                  {WEDDING.scripture.reference}
                </cite>
              </blockquote>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="text-center mb-10"
          >
            <p className="section-label mb-3">Moments from the Day</p>
            <h2 className="section-title">
              Wedding <span className="text-gold-gradient">Gallery</span>
            </h2>
            <div className="gold-divider" />
            <p className="font-inter text-muted-foreground text-sm mt-4 max-w-xl mx-auto">
              {weddingPhotos.length} ceremony photos from a day of worship, vows, and celebration
              at Solution Center.
            </p>
          </motion.div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {weddingPhotos.map((image, i) => (
              <button
                key={image.src}
                type="button"
                className="break-inside-avoid mb-3 relative group block w-full text-left rounded-xl overflow-hidden"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col items-center justify-center gap-2 p-4">
                  <ZoomIn className="w-7 h-7 text-gold" />
                  <p className="font-inter text-foreground text-xs text-center font-medium leading-snug">
                    {image.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background-alt border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Heart className="w-8 h-8 text-gold mx-auto mb-4" />
          <h3 className="font-cinzel text-xl sm:text-2xl text-foreground font-bold mb-3">
            Planning a Christian wedding?
          </h3>
          <p className="font-inter text-muted-foreground text-sm leading-relaxed mb-8">
            Solution Center is glad to walk with couples through counselling, prayer, and ceremony.
            Reach out to the pastoral team — we would love to stand with you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={WHATSAPP_MARRIAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 text-sm"
            >
              WhatsApp the church
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-montserrat font-semibold text-gold border border-gold/40 px-6 py-3 rounded-full hover:bg-gold/10 transition-colors"
            >
              Contact form
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/97 backdrop-blur-xl p-4"
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
                src={weddingPhotos[lightboxIndex].src}
                alt={weddingPhotos[lightboxIndex].caption}
                className="w-full max-h-[78vh] object-contain rounded-2xl"
              />
              <div className="flex items-center justify-between mt-4 px-2 gap-4">
                <p className="font-playfair text-foreground/70 italic text-sm leading-snug">
                  {weddingPhotos[lightboxIndex].caption}
                </p>
                <span className="font-montserrat text-xs text-muted-foreground/50 shrink-0">
                  {lightboxIndex + 1} / {weddingPhotos.length}
                </span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="absolute -top-10 right-0 text-muted-foreground hover:text-gold transition-colors"
                aria-label="Close"
              >
                <X className="w-7 h-7" />
              </button>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 bg-background-alt/80 border border-gold/20 rounded-full flex items-center justify-center text-muted-foreground hover:text-gold transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 bg-background-alt/80 border border-gold/20 rounded-full flex items-center justify-center text-muted-foreground hover:text-gold transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
