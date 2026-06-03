'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Clock, Calendar, Search, Youtube, Facebook } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const allSermons = [
  { title: 'The Power of Prevailing Prayer', speaker: 'Rev. Apostle E.S. Hugo', date: 'July 14, 2025', duration: '52 min', series: 'Prayer & Power', thumbnail: '/images/phmi-14.jpg' },
  { title: 'Walking in Prophetic Authority', speaker: 'Prophetess Ekwalla Calista', date: 'July 7, 2025', duration: '45 min', series: 'Prophetic Series', thumbnail: '/images/phmi-16.jpeg' },
  { title: 'Revival Fire — Are You Ready?', speaker: 'Rev. Apostle E.S. Hugo', date: 'June 30, 2025', duration: '48 min', series: 'Revival Season', thumbnail: '/images/phmi-17.png' },
  { title: 'The Healing Virtue of Christ', speaker: 'Prophetess Ekwalla Calista', date: 'June 22, 2025', duration: '39 min', series: 'Healing & Miracles', thumbnail: '/images/phmi-18.jpeg' },
  { title: 'Kingdom Keys — Unlocking Destiny', speaker: 'Rev. Apostle E.S. Hugo', date: 'June 15, 2025', duration: '55 min', series: 'Kingdom Series', thumbnail: '/images/phmi-19.jpeg' },
  { title: 'Hearing the Voice of God', speaker: 'Prophetess Ekwalla Calista', date: 'June 8, 2025', duration: '41 min', series: 'Prophetic Series', thumbnail: '/images/phmi-20.jpeg' },
  { title: 'Breaking Every Chain', speaker: 'Rev. Apostle E.S. Hugo', date: 'June 1, 2025', duration: '50 min', series: 'Prayer & Power', thumbnail: '/images/phmi-21.jpeg' },
  { title: 'The Woman of Great Worth', speaker: 'Prophetess Ekwalla Calista', date: 'May 25, 2025', duration: '44 min', series: 'Women of God', thumbnail: '/images/phmi-22.jpeg' },
  { title: 'When God Shows Up', speaker: 'Rev. Apostle E.S. Hugo', date: 'May 18, 2025', duration: '47 min', series: 'Revival Season', thumbnail: '/images/phmi-23.png' },
]

const speakers = ['All Speakers', 'Rev. Apostle E.S. Hugo', 'Prophetess Ekwalla Calista']
const series = ['All Series', 'Prayer & Power', 'Prophetic Series', 'Revival Season', 'Healing & Miracles', 'Kingdom Series', 'Women of God']

export default function SermonsContent() {
  const [selectedSpeaker, setSelectedSpeaker] = useState('All Speakers')
  const [selectedSeries, setSelectedSeries] = useState('All Series')
  const [search, setSearch] = useState('')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const filtered = allSermons.filter((s) => {
    const speakerMatch = selectedSpeaker === 'All Speakers' || s.speaker === selectedSpeaker
    const seriesMatch = selectedSeries === 'All Series' || s.series === selectedSeries
    const searchMatch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.speaker.toLowerCase().includes(search.toLowerCase())
    return speakerMatch && seriesMatch && searchMatch
  })

  return (
    <section className="py-24 bg-background-alt atmos-bg">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Livestream CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="glass-card p-6 mb-12 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="flex items-center gap-3">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-montserrat text-xs text-red-400 font-bold uppercase tracking-wider">Live Every Sunday</span>
          </div>
          <p className="font-inter text-muted-foreground text-sm flex-1 text-center md:text-left">
            Join us live every Sunday at <strong className="text-foreground">9:00 AM</strong> for the Prophetic Service.
          </p>
          <div className="flex gap-3">
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#FF0000]/10 border border-[#FF0000]/30 text-[#FF0000] hover:bg-[#FF0000]/20 transition-all px-4 py-2.5 rounded-lg font-montserrat text-xs font-semibold"
            >
              <Youtube className="w-4 h-4" /> YouTube Live
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-all px-4 py-2.5 rounded-lg font-montserrat text-xs font-semibold"
            >
              <Facebook className="w-4 h-4" /> Facebook Live
            </a>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sermons..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>

          {/* Speaker filter */}
          <select
            value={selectedSpeaker}
            onChange={(e) => setSelectedSpeaker(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-muted-foreground text-sm font-inter focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
          >
            {speakers.map((s) => <option key={s} value={s} className="bg-background-alt text-muted-foreground">{s}</option>)}
          </select>

          {/* Series filter */}
          <select
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-muted-foreground text-sm font-inter focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
          >
            {series.map((s) => <option key={s} value={s} className="bg-background-alt text-muted-foreground">{s}</option>)}
          </select>
        </motion.div>

        {/* Result count */}
        <p className="font-inter text-muted-foreground/50 text-xs mb-6">
          Showing <span className="text-gold">{filtered.length}</span> sermon{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Sermon grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedSpeaker}-${selectedSeries}-${search}`}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.length === 0 ? (
              <motion.div variants={fadeUp} className="col-span-full text-center py-20">
                <p className="font-playfair text-xl text-muted-foreground/50 italic">No sermons found for that filter.</p>
              </motion.div>
            ) : (
              filtered.map((sermon) => (
                <motion.div
                  key={sermon.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="glass-card overflow-hidden group cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">
                    <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-auto block group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-gold"
                      >
                        <Play className="w-5 h-5 text-background fill-navy-dark ml-0.5" />
                      </motion.div>
                    </div>
                    <span className="absolute top-3 left-3 font-montserrat text-[10px] bg-gold text-background px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                      {sermon.series}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h4 className="font-playfair text-base text-foreground font-semibold mb-2 leading-snug group-hover:text-gold-light transition-colors">
                      {sermon.title}
                    </h4>
                    <p className="font-inter text-gold/80 text-xs mb-3">{sermon.speaker}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground/70">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-gold/50" /> {sermon.duration}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-gold/50" /> {sermon.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
