'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '@/lib/animations'

const leaders = [
  {
    name: 'Rev. Apostle E.S. Hugo',
    title: 'Senior Apostle & Founder',
    bio: 'Rev. Apostle E.S. Hugo is the founding visionary of Prayer House Ministry International. Carrying a prophetic and apostolic mandate, he has devoted his life to building a house of prayer that transforms communities and raises godly generations across Cameroon and beyond.',
    initial: 'AH',
    accentColor: 'from-gold/30 to-gold/5',
  },
  {
    name: 'Prophetess Ekwalla Calista',
    title: 'Prophetess & Co-Leader',
    bio: "Prophetess Ekwalla Calista moves in a powerful prophetic anointing, ministering healing, deliverance, and divine direction to the body of Christ. Her ministry of intercession and worship has been a cornerstone of the Solution Center's spiritual atmosphere.",
    initial: 'EC',
    accentColor: 'from-blue-400/20 to-gold/10',
  },
]

export default function Leadership() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="leadership" className="relative py-24 lg:py-32 bg-navy-dark overflow-hidden">
      {/* Radial glow backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">Anointed Leadership</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">Meet The <span className="text-gold-gradient">Leadership</span></motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
          <motion.p variants={fadeUp} className="font-inter text-silver max-w-xl mx-auto leading-relaxed">
            Under the anointed covering of our apostolic and prophetic leadership, Solution Center has grown
            into a house of power, prayer, and transformation.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {leaders.map((leader) => (
            <motion.div
              key={leader.name}
              variants={fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card p-10 flex flex-col items-center text-center relative overflow-hidden group cursor-default"
            >
              {/* Top gold bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

              {/* Background gradient glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-b ${leader.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

              {/* Avatar circle */}
              <div className="relative z-10 mb-6">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gold/20 to-navy border-2 border-gold/40 flex items-center justify-center group-hover:border-gold transition-colors duration-300 shadow-gold">
                  <span className="font-cinzel text-2xl font-bold text-gold">{leader.initial}</span>
                </div>
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-gold/20"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              <div className="relative z-10">
                <h3 className="font-playfair text-xl font-bold text-ivory mb-1">{leader.name}</h3>
                <p className="font-montserrat text-xs text-gold uppercase tracking-[0.2em] mb-5">{leader.title}</p>
                <div className="w-10 h-0.5 bg-gold/40 mx-auto mb-5" />
                <p className="font-inter text-silver text-sm leading-relaxed">{leader.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom scripture */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center font-garamond text-silver/50 italic mt-12 text-sm"
        >
          "Where there is no vision, the people perish." — Proverbs 29:18
        </motion.p>
      </div>
    </section>
  )
}
