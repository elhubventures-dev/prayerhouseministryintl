'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const testimonials = [
  {
    name: 'Sister Grace Ambe',
    role: 'Member since 2019',
    initials: 'GA',
    testimony: 'I came to Solution Center broken and without hope. After three months of prayer and the Word, God completely restored my marriage and my health. This church is truly a house of miracles.',
  },
  {
    name: 'Brother Emmanuel Fokum',
    role: 'Member since 2021',
    initials: 'EF',
    testimony: 'The prophetic ministry here changed my life direction. I had been jobless for two years. After a word was spoken over me and I stood in faith, doors opened supernaturally within weeks.',
  },
  {
    name: 'Pastor Rebecca Ngale',
    role: 'Member since 2018',
    initials: 'RN',
    testimony: 'What strikes me most about PHMI is the authentic atmosphere of prayer and worship. This is not a performance church — it is a house where God genuinely moves and speaks.',
  },
  {
    name: 'Bro. Daniel Etchu',
    role: 'Youth Member',
    initials: 'DE',
    testimony: 'As a young person, I found purpose and identity at Solution Center. The youth ministry helped me discover my gifts and gave me a platform to serve God with everything I have.',
  },
  {
    name: 'Sister Patience Njoh',
    role: 'Member since 2020',
    initials: 'PN',
    testimony: 'I was told by doctors I could never have children. Rev. Apostle Hugo prayed over me and declared life. Today I am holding my miracle baby. To God be all the glory!',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5500)
    return () => clearInterval(timer)
  }, [next])

  const testimonial = testimonials[current]

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 bg-background-alt overflow-hidden">
      {/* Gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">Transformed Lives</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            What God Has <span className="text-gold-gradient">Done</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
        </motion.div>

        {/* Testimonial slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative"
        >
          {/* Large decorative quote */}
          <div className="absolute -top-8 left-6 font-cinzel text-[120px] text-gold/10 leading-none select-none pointer-events-none">
            "
          </div>

          <div className="glass-card p-10 lg:p-14 text-center relative overflow-hidden min-h-[280px] flex flex-col items-center justify-center">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-6"
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 to-background-alt border-2 border-gold/40 flex items-center justify-center shadow-gold">
                  <span className="font-cinzel text-lg font-bold text-gold">{testimonial.initials}</span>
                </div>

                {/* Text */}
                <blockquote className="font-playfair text-xl lg:text-2xl text-foreground italic leading-relaxed max-w-2xl">
                  "{testimonial.testimony}"
                </blockquote>

                {/* Attribution */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-0.5 bg-gold/50 mb-2" />
                  <p className="font-montserrat text-sm font-semibold text-gold">{testimonial.name}</p>
                  <p className="font-inter text-muted-foreground/60 text-xs">{testimonial.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/5 border border-gold/20 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-5 h-2 bg-gold' : 'w-2 h-2 bg-silver/30 hover:bg-gold/50'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white/5 border border-gold/20 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
