'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { WEDDING } from '@/lib/wedding'

export default function WeddingTeaser() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="wedding" className="relative py-24 lg:py-32 bg-background-alt overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(201,168,76,0.07)_0%,transparent_55%)] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">
            Recent Celebration
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            United in <span className="text-gold-gradient">Holy Matrimony</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="glass-card overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
            <div className="grid grid-cols-3 gap-1 min-h-[240px] sm:min-h-[300px]">
              {WEDDING.teaserImages.map((src, i) => (
                <div
                  key={src}
                  className={`relative overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                >
                  <img
                    src={src}
                    alt={
                      i === 0
                        ? `${WEDDING.coupleNames} wedding portrait`
                        : `Wedding moment at Solution Center ${i + 1}`
                    }
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center text-left">
              <p className="font-montserrat text-[11px] uppercase tracking-[0.16em] text-gold mb-2">
                {WEDDING.headline}
              </p>
              <h3 className="font-cinzel text-xl lg:text-2xl text-foreground font-bold leading-snug mb-4">
                {WEDDING.coupleNames}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold" />
                  {WEDDING.dateDisplay}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold" />
                  {WEDDING.locationShort}
                </span>
              </div>
              <p className="font-inter text-muted-foreground text-sm leading-relaxed mb-8">
                {WEDDING.teaserBlurb}
              </p>
              <Link
                href={WEDDING.path}
                className="btn-gold inline-flex items-center justify-center gap-2 text-sm w-full sm:w-auto self-start"
              >
                View wedding story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
