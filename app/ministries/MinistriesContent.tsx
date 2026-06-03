'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Flame, Music2, Users, Heart, Globe, Mic2 } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const ministries = [
  {
    icon: Flame,
    name: 'Prayer Ministry',
    tagline: 'The Engine Room of Solution Center',
    color: 'from-orange-500/10 to-red-500/5',
    borderColor: 'border-orange-500/30',
    description: 'The Prayer Ministry is the heartbeat of everything we do. A dedicated team of intercessors meet regularly for corporate prayer, holding the spiritual gates of this house through fasting, travailing prayer, and prophetic intercession.',
    activities: [
      'Daily 6 AM prayer chain',
      'Wednesday night intercession',
      'Monthly fasting and prayer',
      'All-night prayer (Last Friday)',
      'Personal prayer request ministry',
    ],
    leader: 'Led by the Senior Leadership',
    joinText: 'If you have a heart for prayer and intercession, the Prayer Ministry is your home.',
  },
  {
    icon: Music2,
    name: 'Worship Ministry',
    tagline: 'Ushering Heaven\'s Presence',
    color: 'from-blue-500/10 to-indigo-500/5',
    borderColor: 'border-blue-500/30',
    description: 'Our Worship Ministry is comprised of gifted musicians, singers, and worship leaders who are dedicated not just to music excellence, but to genuinely ushering the congregation into the tangible presence of God through Spirit-led, anointed worship.',
    activities: [
      'Sunday Prophetic Service worship',
      'Saturday choir rehearsal sessions',
      'Worship nights and soaking sessions',
      'Music mentorship for emerging ministers',
      'Original song writing and recording',
    ],
    leader: 'Worship Director',
    joinText: 'Musicians, singers, and sound technicians are welcome to audition and join.',
  },
  {
    icon: Users,
    name: 'Youth Ministry',
    tagline: 'Raising the Next Generation',
    color: 'from-green-500/10 to-emerald-500/5',
    borderColor: 'border-green-500/30',
    description: 'Our Youth Ministry exists to raise a generation of passionate, purpose-driven young people who know their identity in Christ, are rooted in the Word, and are equipped to lead in their schools, homes, and communities.',
    activities: [
      'Youth Sunday services (monthly)',
      'Bible study for teens and young adults',
      'Youth camps and retreats',
      'Talent showcases and cultural events',
      'Mentorship and career guidance sessions',
    ],
    leader: 'Youth Pastor',
    joinText: 'If you\'re between 13–35 and looking for a Spirit-filled community, you belong here.',
  },
  {
    icon: Heart,
    name: 'Women Ministry',
    tagline: 'Empowered, Purposed, Crowned',
    color: 'from-pink-500/10 to-rose-500/5',
    borderColor: 'border-pink-500/30',
    description: 'The Women\'s Ministry is a safe and powerful space for women to discover their God-given destiny, build meaningful spiritual friendships, and grow into the fullness of who God created them to be — in faith, family, and purpose.',
    activities: [
      'Monthly women\'s fellowship meetings',
      'Annual women\'s empowerment seminar',
      'Prayer and accountability circles',
      'Skilled trades and entrepreneurship training',
      'Marriage and family enrichment sessions',
    ],
    leader: 'Prophetess Ekwalla Calista',
    joinText: 'Every woman — regardless of age, background, or season — is welcome and celebrated.',
  },
  {
    icon: Globe,
    name: 'Outreach Ministry',
    tagline: 'Beyond These Walls',
    color: 'from-teal-500/10 to-cyan-500/5',
    borderColor: 'border-teal-500/30',
    description: 'The Outreach Ministry carries the love and power of God beyond the four walls of the church — into streets, schools, hospitals, prisons, and villages. We believe the Church is not a destination but a movement sent to transform society.',
    activities: [
      'Street evangelism in Limbe communities',
      'Hospital and prison visitation ministry',
      'Community feeding and relief programs',
      'School and campus outreach',
      'Village mission trips across Cameroon',
    ],
    leader: 'Outreach Coordinator',
    joinText: 'If you have a burden for souls and communities, the Outreach Ministry needs you.',
  },
  {
    icon: Mic2,
    name: 'Choir Ministry',
    tagline: 'A Sound of Heaven',
    color: 'from-purple-500/10 to-violet-500/5',
    borderColor: 'border-purple-500/30',
    description: 'The Choir Ministry is a powerful force of musical excellence and spiritual anointing. Our choristers are trained to minister — not merely perform — bringing the congregation into encounters with God through songs of praise, worship, and declaration.',
    activities: [
      'Saturday rehearsals (4:00 PM weekly)',
      'Special choir performances at events',
      'Annual choir concert and showcase',
      'Vocal training and harmony workshops',
      'Recording and original music projects',
    ],
    leader: 'Choir Director',
    joinText: 'We welcome all voice types. Passion for worship is the only requirement.',
  },
]

export default function MinistriesContent() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="py-24 lg:py-32 bg-background-alt atmos-bg">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">Choose Your Place</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Find Your <span className="text-gold-gradient">Ministry Home</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="gold-divider" />
          <motion.p variants={fadeUp} className="font-inter text-muted-foreground max-w-xl mx-auto">
            Every believer has a gift. Every gift has a home. Explore our ministry arms and find where you belong.
          </motion.p>
        </motion.div>

        {ministries.map((ministry, i) => {
          const Icon = ministry.icon
          const isEven = i % 2 === 0

          return (
            <motion.div
              key={ministry.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className={`glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-5 relative`}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

              {/* Icon panel */}
              <div className={`lg:col-span-1 bg-gradient-to-br ${ministry.color} border-r border-white/5 p-10 flex flex-col items-center justify-center gap-4 ${!isEven ? 'lg:order-last lg:border-r-0 lg:border-l border-white/5' : ''}`}>
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center shadow-gold">
                  <Icon className="w-8 h-8 text-gold" strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <h3 className="font-cinzel text-gold text-base font-bold mb-1">{ministry.name}</h3>
                  <p className="font-montserrat text-muted-foreground/60 text-[10px] uppercase tracking-wider">{ministry.tagline}</p>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-4 p-8 lg:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <p className="font-inter text-muted-foreground leading-relaxed mb-5">{ministry.description}</p>
                    <div className="glass-card p-5 bg-gold/5 border-gold/20">
                      <p className="font-garamond text-foreground/80 italic text-sm">{ministry.joinText}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-montserrat text-xs text-gold uppercase tracking-wider mb-4">Activities</p>
                    <ul className="space-y-2.5">
                      {ministry.activities.map((act) => (
                        <li key={act} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-1.5 flex-shrink-0" />
                          <span className="font-inter text-muted-foreground text-sm leading-snug">{act}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 pt-5 border-t border-white/5">
                      <p className="font-montserrat text-xs text-muted-foreground/50 uppercase tracking-wider mb-1">Overseen By</p>
                      <p className="font-inter text-gold text-sm font-medium">{ministry.leader}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="glass-card p-10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="section-label mb-3">Ready to Serve?</p>
          <h3 className="font-cinzel text-2xl text-foreground font-bold mb-4">
            Join a <span className="text-gold-gradient">Ministry Team</span>
          </h3>
          <p className="font-inter text-muted-foreground mb-8 max-w-lg mx-auto">
            Contact us to indicate which ministry you'd like to serve in. We'll connect you with the right leader and get you started.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/contact" className="btn-gold text-sm flex items-center gap-2">
              Get Involved
            </a>
            <a
              href="https://wa.me/237653270752?text=I%20would%20like%20to%20join%20a%20ministry%20team%20at%20Solution%20Center"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass text-sm"
            >
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
