'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Eye, Heart, Zap, Globe, BookOpen } from 'lucide-react'
import { staggerContainer, fadeUp, fadeLeft, fadeRight } from '@/lib/animations'

const values = [
  { icon: BookOpen, title: 'The Word', desc: 'We are a Bible-believing, Bible-teaching ministry. The Scripture is our final authority in all matters of faith and practice.' },
  { icon: Zap, title: 'Prayer & Power', desc: 'We believe in the present-day ministry of the Holy Spirit and the power of fervent, persistent prayer to change circumstances.' },
  { icon: Heart, title: 'Love & Community', desc: 'We are a family. Every person who walks through our doors is welcomed with love, dignity, and spiritual care.' },
  { icon: Globe, title: 'Kingdom Mandate', desc: 'We carry a global mandate. Our vision extends beyond Limbe — to Cameroon, Africa, and the nations of the earth.' },
  { icon: Target, title: 'Excellence', desc: 'We pursue excellence in every department of ministry — in worship, in teaching, in service, and in administration.' },
  { icon: Eye, title: 'Prophetic Vision', desc: 'We are a prophetic house. We listen for the voice of God and declare His word with accuracy, boldness, and love.' },
]

const milestones = [
  { year: '2024', event: 'Prayer House Ministry International founded by Rev. Apostle E.S. Hugo in Limbe.' },
  { year: '2024', event: 'Solution Center established at Mile 4, Limbe — the house opens for worship and prayer.' },
  { year: '2024', event: 'Prophetess Ekwalla Calista joins co-leadership, bringing prophetic depth.' },
  { year: '2024', event: 'Six ministry arms officially launched — Prayer, Worship, Youth, Women, Outreach, and Choir.' },
  { year: '2025', event: 'Online ministry launched, reaching members across Cameroon and the diaspora.' },
]

export default function AboutContent() {
  const { ref: visionRef, inView: visionInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: valuesRef, inView: valuesInView } = useInView({ triggerOnce: true, threshold: 0.08 })
  const { ref: historyRef, inView: historyInView } = useInView({ triggerOnce: true, threshold: 0.08 })
  const { ref: leadRef, inView: leadInView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <>
      {/* Vision & Mission */}
      <section className="py-24 lg:py-32 bg-background-alt atmos-bg">
        <div ref={visionRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={visionInView ? 'visible' : 'hidden'}
            >
              <motion.div variants={fadeLeft} className="glass-card p-10 relative mb-8">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-2xl" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-cinzel text-gold text-lg font-bold tracking-wide">Our Vision</h3>
                </div>
                <p className="font-playfair text-xl text-foreground italic leading-relaxed">
                  "To raise a generation of Spirit-filled believers who walk in the fullness of God's power
                  — transformed by the Word, sustained by prayer, and sent forth in worship and service to the nations."
                </p>
              </motion.div>

              <motion.div variants={fadeLeft} className="glass-card p-10 relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent rounded-t-2xl" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-cinzel text-gold text-lg font-bold tracking-wide">Our Mission</h3>
                </div>
                <p className="font-inter text-muted-foreground leading-relaxed">
                  Prayer House Ministry International exists to create an atmosphere where broken lives are restored,
                  spiritual gifts are activated, and believers are equipped for works of service. We are committed to
                  prayer, prophetic ministry, biblical teaching, community outreach, and the discipleship of every
                  person God sends through our doors.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={visionInView ? 'visible' : 'hidden'}
            >
              <motion.p variants={fadeRight} className="section-label mb-3">Who We Are</motion.p>
              <motion.h2 variants={fadeRight} className="section-title mb-6">
                More Than a <span className="text-gold-gradient">Church</span>
              </motion.h2>
              <motion.div variants={fadeRight} className="w-12 h-0.5 bg-gold mb-8" />

              <motion.p variants={fadeRight} className="font-inter text-muted-foreground leading-relaxed mb-5">
                We call ourselves the <strong className="text-foreground">Solution Center</strong> — because we believe that
                every person who enters this house carries a God-given solution to a problem in their family,
                community, and generation. Our ministry exists to unlock that potential.
              </motion.p>
              <motion.p variants={fadeRight} className="font-inter text-muted-foreground leading-relaxed mb-5">
                Founded in Limbe, Cameroon, in 2024, under the apostolic leadership of Rev. Apostle E.S. Hugo, PHMI is
                a vibrant, multi-ministry church impacting the lives of families across the South West Region and beyond.
              </motion.p>
              <motion.p variants={fadeRight} className="font-inter text-muted-foreground leading-relaxed mb-8">
                We are a prophetic house, a house of healing, a house of worship, and a family. Whatever season
                of life you are in — you are welcome here.
              </motion.p>

              <motion.div variants={fadeRight} className="glass-card p-6">
                <p className="font-garamond text-lg text-foreground italic leading-relaxed">
                  "For my house shall be called a house of prayer for all peoples."
                </p>
                <p className="font-montserrat text-gold/70 text-xs mt-3 tracking-widest uppercase">— Isaiah 56:7</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div ref={valuesRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="section-label mb-3">What We Stand For</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Our Core <span className="text-gold-gradient">Values</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="gold-divider" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((v) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="glass-card p-8 flex flex-col gap-4 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 group-hover:shadow-gold transition-all duration-300">
                    <Icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-playfair text-xl text-foreground font-semibold">{v.title}</h3>
                  <p className="font-inter text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Leadership Deep Dive */}
      <section className="py-24 bg-background-alt">
        <div ref={leadRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={leadInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="section-label mb-3">Anointed Leadership</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Meet The <span className="text-gold-gradient">Founders</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="gold-divider" />
          </motion.div>

          <div className="space-y-12">
            {[
              {
                name: 'Rev. Apostle E.S. Hugo',
                title: 'Senior Apostle & Founder',
                initial: 'AH',
                image: '/images/leader-hugo.png',
                bio: [
                  'Rev. Apostle E.S. Hugo is the founding visionary and Senior Apostle of Prayer House Ministry International. With a burning passion for souls and a deep prophetic anointing, he has dedicated his life to building a house of prayer that transforms communities and raises godly generations.',
                  'His ministry spans over fifteen years of faithful service in Limbe and the surrounding regions of Cameroon. Under his apostolic leadership, the Solution Center has grown from a small gathering of believers into a thriving church community with six ministry arms and a growing online presence reaching believers across Cameroon and in the diaspora.',
                  'Rev. Apostle Hugo is known for his powerful prophetic preaching, his unwavering faith in God\'s miraculous power, and his genuine love for people. He carries a unique mandate to see revival fire ignite not just in Limbe, but across the African continent.',
                ],
                side: 'left' as const,
              },
              {
                name: 'Prophetess Ekwalla Calista',
                title: 'Prophetess & Co-Leader',
                initial: 'EC',
                image: '/images/leader-calista.png',
                bio: [
                  'Prophetess Ekwalla Calista moves in a distinctive prophetic anointing, characterized by accuracy, compassion, and the authentic power of the Holy Spirit. Her ministry has brought breakthrough, healing, and divine direction to countless lives across Cameroon.',
                  'As co-leader of the Solution Center, she brings a nurturing spiritual presence and a powerful intercessory foundation that undergirds every department of the ministry. Her leadership in the Women\'s Ministry has been particularly transformative, helping women discover their God-given identity and purpose.',
                  'Prophetess Calista is deeply committed to prayer, intercession, and spiritual development. She believes that every believer has the potential to walk in prophetic sensitivity and spiritual power — and her ministry consistently opens that door for those who come into contact with it.',
                ],
                side: 'right' as const,
              },
            ].map((leader) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 40 }}
                animate={leadInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className={`grid grid-cols-1 lg:grid-cols-5 gap-10 items-start ${leader.side === 'right' ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Avatar card */}
                <div className={`lg:col-span-2 ${leader.side === 'right' ? 'lg:order-last' : ''}`}>
                  <div className="glass-card p-10 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold/20 to-background-alt border-2 border-gold/40 flex items-center justify-center mb-6 shadow-gold overflow-hidden">
                      {leader.image ? (
                        <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-cinzel text-3xl font-bold text-gold">{leader.initial}</span>
                      )}
                    </div>
                    <h3 className="font-playfair text-xl text-foreground font-bold mb-1">{leader.name}</h3>
                    <p className="font-montserrat text-xs text-gold uppercase tracking-widest">{leader.title}</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="lg:col-span-3 space-y-4">
                  {leader.bio.map((para, i) => (
                    <p key={i} className="font-inter text-muted-foreground leading-relaxed">{para}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Church History / Timeline */}
      <section className="py-24 bg-background">
        <div ref={historyRef} className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={historyInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="section-label mb-3">Our Journey</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Ministry <span className="text-gold-gradient">Milestones</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="gold-divider" />
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/50 via-gold/20 to-transparent -translate-x-0.5 md:-translate-x-0.5" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={historyInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Year node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background-alt border-2 border-gold flex items-center justify-center z-10 flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-gold" />
                  </div>

                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] glass-card p-6 ${i % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    <p className="font-cinzel text-lg font-bold text-gold mb-2">{m.year}</p>
                    <p className="font-inter text-muted-foreground text-sm leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
