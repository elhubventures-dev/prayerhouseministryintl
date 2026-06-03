'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Play, ChevronDown, ArrowRight } from 'lucide-react'
import { staggerContainer, heroText } from '@/lib/animations'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background layer ── */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/phmi-14.jpg')`,
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/75 to-background/95" />

      {/* Gold ray from top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.22)_0%,transparent_65%)]" />

      {/* Floating orbs */}
      <motion.div
        className="orb w-[500px] h-[500px] bg-gold/5 -top-32 -left-32"
        animate={{ y: [0, -25, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb w-96 h-96 bg-blue-900/20 -bottom-24 -right-24"
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >

          {/* Welcome label */}
          <motion.div variants={heroText} className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-gold" />
            <span className="section-label text-xs">Welcome to Solution Center</span>
            <div className="w-8 h-0.5 bg-gold" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={heroText}
            className="font-cinzel text-4xl md:text-5xl lg:text-7xl text-foreground leading-[1.15] font-bold"
          >
            Raising Lives<br />
            <span className="text-gold-gradient">Through Prayer,</span><br />
            Worship & The Word
          </motion.h1>

          {/* Divider */}
          <motion.div variants={heroText} className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* Subtext */}
          <motion.p
            variants={heroText}
            className="font-playfair text-muted-foreground text-lg md:text-xl italic max-w-2xl leading-relaxed"
          >
            Experience the power of God's presence at Solution Center.
            Join a community of believers seeking revival, healing, and transformation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={heroText}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            {/* Primary */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/#contact" className="btn-gold flex items-center gap-2 text-sm font-semibold">
                Join Us This Sunday
                <ArrowRight className="w-4 h-4" />
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </span>
              </Link>
            </motion.div>

            {/* Secondary */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/sermons" className="btn-glass flex items-center gap-2 text-sm font-semibold">
                <Play className="w-4 h-4 fill-gold text-gold" />
                Watch Online
              </Link>
            </motion.div>

            {/* Ghost */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/#prayer-request"
                className="font-montserrat text-sm font-semibold text-muted-foreground/80 hover:text-gold transition-colors flex items-center gap-2 py-4 px-4"
              >
                🙏 Request Prayer
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Scripture tag */}
          <motion.p
            variants={heroText}
            className="font-garamond text-muted-foreground/50 text-sm italic mt-4"
          >
            "For this house shall be called a house of prayer for all peoples." — Isaiah 56:7
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-montserrat text-[10px] text-muted-foreground/50 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-gold/60" />
      </motion.div>
    </section>
  )
}
