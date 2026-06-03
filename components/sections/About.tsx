'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { staggerContainer, fadeLeft, fadeRight, fadeUp } from '@/lib/animations'

const stats = [
  { value: '15+', label: 'Years of Ministry' },
  { value: '500+', label: 'Souls Transformed' },
  { value: '4', label: 'Weekly Services' },
  { value: '6', label: 'Ministry Arms' },
]

const highlights = [
  'Spirit-filled prophetic worship',
  'Deep biblical teaching every week',
  'Active prayer and intercession ministry',
  'Community outreach and evangelism',
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-background-alt atmos-bg overflow-hidden">
      {/* Background cross watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none select-none">
        <span className="font-cinzel text-[30vw] text-gold leading-none">✝</span>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.p variants={fadeLeft} className="section-label mb-3">About The Ministry</motion.p>
            <motion.h2 variants={fadeLeft} className="section-title mb-6">
              A House of Prayer<br />
              <span className="text-gold-gradient">For All Nations</span>
            </motion.h2>
            <motion.div variants={fadeLeft} className="w-12 h-0.5 bg-gold mb-8" />

            <motion.p variants={fadeLeft} className="font-inter text-muted-foreground leading-relaxed mb-5">
              Prayer House Ministry International — known as the <strong className="text-foreground">Solution Center</strong> — is a prophetic revival ministry
              established in Limbe, Cameroon, under the apostolic leadership of Rev. Apostle E.S. Hugo and
              Prophetess Ekwalla Calista.
            </motion.p>
            <motion.p variants={fadeLeft} className="font-inter text-muted-foreground leading-relaxed mb-5">
              Our mandate is to raise up a generation of Spirit-filled believers who walk in the fullness of God's
              power — transformed by the Word, sustained by prayer, and sent forth in worship and service.
            </motion.p>
            <motion.p variants={fadeLeft} className="font-inter text-muted-foreground leading-relaxed mb-8">
              We believe every person who enters these walls carries a divine solution, and our ministry exists
              to unlock that potential through encounter, discipleship, and community.
            </motion.p>

            {/* Highlights */}
            <motion.ul variants={staggerContainer} className="space-y-3 mb-10">
              {highlights.map((h) => (
                <motion.li key={h} variants={fadeLeft} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="font-inter text-muted-foreground text-sm">{h}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeLeft}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-montserrat text-sm font-semibold text-gold hover:text-gold-light transition-colors group"
              >
                Read Our Full Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                className="glass-card p-8 text-center relative card-gold-top"
              >
                <motion.p
                  className="font-cinzel text-5xl font-bold text-gold-gradient mb-2"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: i * 0.1 + 0.4, duration: 0.5, ease: 'backOut' }}
                >
                  {stat.value}
                </motion.p>
                <p className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent rounded-b-2xl" />
              </motion.div>
            ))}

            {/* Scripture quote card */}
            <motion.div
              variants={fadeUp}
              className="glass-card col-span-2 p-8 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <p className="font-garamond text-foreground/90 text-lg italic leading-relaxed">
                "My house shall be called a house of prayer"
              </p>
              <p className="font-montserrat text-gold/70 text-xs mt-3 tracking-widest uppercase">— Matthew 21:13</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
