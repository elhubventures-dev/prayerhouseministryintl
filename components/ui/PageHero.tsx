'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { staggerContainer, heroText } from '@/lib/animations'

interface PageHeroProps {
  label: string
  title: string
  highlight?: string
  subtitle?: string
  bgImage?: string
}

export default function PageHero({ label, title, highlight, subtitle, bgImage }: PageHeroProps) {
  const bgUrl = bgImage || '/images/hero-bg.png'

  return (
    <section className="relative min-h-[52vh] flex items-end pb-16 overflow-hidden">
      {/* BG */}
      <Image
        src={bgUrl}
        alt={`${title} banner`}
        fill
        priority
        className="object-cover object-center absolute inset-0"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.18)_0%,transparent_65%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-8 flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          <motion.div variants={heroText} className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gold" />
            <span className="section-label">{label}</span>
            <div className="w-8 h-0.5 bg-gold" />
          </motion.div>
          <motion.h1 variants={heroText} className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-foreground font-bold leading-tight mb-6">
            {title}
            {highlight && (
              <>
                {' '}<span className="text-gold-gradient">{highlight}</span>
              </>
            )}
          </motion.h1>
          {subtitle && (
            <motion.p variants={heroText} className="font-playfair text-muted-foreground italic text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </motion.p>
          )}
          <motion.div variants={heroText} className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mt-8" />
        </motion.div>
      </div>
    </section>
  )
}
