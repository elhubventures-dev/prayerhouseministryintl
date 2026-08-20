'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Play, ChevronDown, ArrowRight } from 'lucide-react'
import { staggerContainer, heroText } from '@/lib/animations'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background layer ── */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
      >
        {/* Desktop Image */}
        <Image
          src="/images/hero-stage.png"
          alt="Congregation at Prayer House Ministry International Solution Center, Limbe Cameroon"
          fill
          priority
          className="object-cover object-center hidden md:block"
        />
        {/* Mobile Image */}
        <Image
          src="/images/4.png"
          alt="Worship gathering at Solution Center church in Limbe"
          fill
          priority
          className="object-cover object-center block md:hidden"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background/90" />
      {/* Center scrim — keeps hero text readable over the background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_42%,rgba(6,9,26,0.92)_0%,rgba(6,9,26,0.55)_45%,transparent_75%)]" />

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
            className="font-cinzel text-4xl md:text-5xl lg:text-7xl text-foreground leading-[1.15] font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
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
            className="font-playfair text-foreground/90 text-lg md:text-xl italic max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
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


    </section>
  )
}
