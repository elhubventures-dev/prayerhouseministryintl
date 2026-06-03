'use client'

import { motion } from 'framer-motion'
import { staggerContainer, heroText } from '@/lib/animations'

interface PageHeroProps {
  label: string
  title: string
  highlight?: string
  subtitle?: string
  bgImage?: string
}

export default function PageHero({ label, title, highlight, subtitle, bgImage }: PageHeroProps) {
  const bgUrl = bgImage || 'https://images.unsplash.com/photo-1438232992991-995b671e4b8d?w=1920&q=80'

  return (
    <section className="relative min-h-[52vh] flex items-end pb-16 overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/60 via-navy-dark/80 to-navy-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.18)_0%,transparent_65%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={heroText} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gold" />
            <span className="section-label">{label}</span>
          </motion.div>
          <motion.h1 variants={heroText} className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-ivory font-bold leading-tight mb-6">
            {title}
            {highlight && (
              <>
                {' '}<span className="text-gold-gradient">{highlight}</span>
              </>
            )}
          </motion.h1>
          {subtitle && (
            <motion.p variants={heroText} className="font-playfair text-silver italic text-lg lg:text-xl leading-relaxed max-w-2xl">
              {subtitle}
            </motion.p>
          )}
          <motion.div variants={heroText} className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mt-8" />
        </motion.div>
      </div>
    </section>
  )
}
