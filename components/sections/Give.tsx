'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Heart } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'
import GiveModal from '@/components/ui/GiveModal'
import { MOMO_WHATSAPP_MESSAGE } from '@/lib/giving'

const givingTiers = [
  { emoji: '🌱', name: 'Seed Offering', description: 'Plant a seed of faith and trust God for a supernatural harvest.' },
  { emoji: '✝️', name: 'Tithe', description: 'Honor God with the first tenth. "Bring the whole tithe into the storehouse." — Malachi 3:10' },
  { emoji: '🙏', name: 'Mission Offering', description: 'Partner with our outreach efforts to reach the lost across Cameroon and beyond.' },
  { emoji: '🏛️', name: 'Building Fund', description: 'Sow into the expansion of the house of God. Every gift builds His kingdom.' },
]

export default function Give() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [giveOpen, setGiveOpen] = useState(false)

  return (
    <section id="give" className="relative py-24 lg:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.1)_0%,transparent_65%)] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col items-center"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">Partner With Us</motion.p>
          <motion.h2 variants={fadeUp} className="section-title mb-4">
            Give <span className="text-gold-gradient">Online</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
          <motion.p variants={fadeUp} className="font-garamond text-xl text-muted-foreground italic max-w-2xl mb-12 leading-relaxed">
            "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap." — Luke 6:38
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-12"
          >
            {givingTiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="glass-card p-6 text-left flex flex-col gap-3 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                <span className="text-2xl">{tier.emoji}</span>
                <h4 className="font-playfair text-base text-foreground font-semibold group-hover:text-gold-light transition-colors">{tier.name}</h4>
                <p className="font-inter text-muted-foreground text-xs leading-relaxed">{tier.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <button
                type="button"
                onClick={() => setGiveOpen(true)}
                className="btn-gold flex items-center gap-2 text-sm"
              >
                <Heart className="w-4 h-4 fill-navy-dark" /> Give Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a
                href={`https://wa.me/237653270752?text=${encodeURIComponent(MOMO_WHATSAPP_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass text-sm flex items-center gap-2"
              >
                Give via WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <GiveModal isOpen={giveOpen} onClose={() => setGiveOpen(false)} />
    </section>
  )
}
