'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ZoomIn, X, ChevronLeft, ChevronRight, Send, CheckCircle2 } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const categories = ['All', 'Worship', 'Events', 'Community', 'Outreach', 'Leadership']

const images = [
  { src: '/images/phmi-21.jpeg', category: 'Worship', caption: 'Sunday Prophetic Service' },
  { src: '/images/phmi-22.jpeg', category: 'Events', caption: 'Annual Revival Conference 2024' },
  { src: '/images/phmi-1.jpeg', category: 'Events', caption: 'Youth Empowerment Night' },
  { src: '/images/phmi-2.jpg', category: 'Community', caption: 'Prayer Group Session' },
  { src: '/images/phmi-4.jpeg', category: 'Outreach', caption: 'Community Outreach Program' },
  { src: '/images/phmi-5.jpeg', category: 'Worship', caption: 'All Night Service Worship' },
  { src: '/images/phmi-6.jpeg', category: 'Events', caption: 'Women\'s Empowerment Seminar' },
  { src: '/images/phmi-7.jpeg', category: 'Leadership', caption: 'Leadership Summit 2024' },
  { src: '/images/phmi-8.jpeg', category: 'Worship', caption: 'Bible Study Wednesday' },
  { src: '/images/phmi-9.jpeg', category: 'Outreach', caption: 'Street Evangelism — Limbe' },
  { src: '/images/phmi-25.jpeg', category: 'Worship', caption: 'Solution Center Worship' },
  { src: '/images/phmi-26.jpeg', category: 'Events', caption: 'Church Gathering — June 2026' },
  { src: '/images/phmi-27.jpeg', category: 'Community', caption: 'Fellowship at Solution Center' },
  { src: '/images/phmi-28.jpeg', category: 'Worship', caption: 'Praise & Worship Ministry' },
  { src: '/images/phmi-29.jpeg', category: 'Events', caption: 'Special Service Celebration' },
  { src: '/images/phmi-30.jpeg', category: 'Community', caption: 'Community in Unity' },
  { src: '/images/phmi-31.jpeg', category: 'Outreach', caption: 'Reaching Our Community' },
  { src: '/images/phmi-32.jpeg', category: 'Worship', caption: 'Lifting Voices in Praise' },
  { src: '/images/phmi-33.jpeg', category: 'Leadership', caption: 'Ministry Leadership' },
  { src: '/images/phmi-34.jpeg', category: 'Events', caption: 'Solution Center Event' },
  { src: '/images/phmi-35.jpeg', category: 'Worship', caption: 'Sunday Service Moments' },
  { src: '/images/phmi-36.jpeg', category: 'Community', caption: 'Brothers & Sisters in Christ' },
  { src: '/images/phmi-37.jpeg', category: 'Outreach', caption: 'Serving the Community' },
  { src: '/images/phmi-38.jpeg', category: 'Events', caption: 'Gathering of the Saints' },
  { src: '/images/phmi-39.jpeg', category: 'Worship', caption: 'Worship in Spirit & Truth' },
  { src: '/images/phmi-40.jpeg', category: 'Community', caption: 'Life at Solution Center' },
  { src: '/images/phmi-41.jpeg', category: 'Events', caption: 'Church Family Together' },
  { src: '/images/phmi-42.jpeg', category: 'Worship', caption: 'Prophetic Worship Session' },
  { src: '/images/phmi-43.jpeg', category: 'Leadership', caption: 'Shepherds of the Flock' },
  { src: '/images/phmi-44.jpeg', category: 'Community', caption: 'Fellowship & Prayer' },
  { src: '/images/phmi-45.jpeg', category: 'Outreach', caption: 'Community Impact' },
  { src: '/images/phmi-46.jpeg', category: 'Worship', caption: 'Glory to God' },
]

export default function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [testimonyForm, setTestimonyForm] = useState({ name: '', testimony: '' })
  const [testimonySubmitted, setTestimonySubmitted] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const filtered = activeCategory === 'All' ? images : images.filter((img) => img.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => lightboxIndex !== null && setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
  const nextImage = () => lightboxIndex !== null && setLightboxIndex((lightboxIndex + 1) % filtered.length)

  return (
    <>
      <section className="py-24 bg-background-alt atmos-bg">
        <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-montserrat text-xs font-semibold px-5 py-2 rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gold text-background border-gold'
                    : 'bg-transparent text-muted-foreground border-white/10 hover:border-gold/50 hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Count */}
          <p className="text-center font-inter text-muted-foreground/40 text-xs mb-8">
            {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Grid */}
          <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            <AnimatePresence>
              {filtered.map((image, i) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="break-inside-avoid mb-3 relative group cursor-pointer rounded-xl overflow-hidden"
                  onClick={() => openLightbox(i)}
                >
                  <img src={image.src} alt={image.caption} className="w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col items-center justify-center gap-2 p-4">
                    <ZoomIn className="w-7 h-7 text-gold" />
                    <p className="font-inter text-foreground text-xs text-center font-medium">{image.caption}</p>
                    <span className="font-montserrat text-[9px] bg-gold/80 text-background px-2 py-0.5 rounded-full font-bold uppercase">{image.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Testimony Submission */}
      <section className="py-20 bg-background">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Share Your Story</p>
          <h2 className="section-title mb-4">Submit a <span className="text-gold-gradient">Testimony</span></h2>
          <div className="gold-divider" />
          <p className="font-inter text-muted-foreground mb-10 leading-relaxed">
            Has God done something powerful in your life through PHMI? Your testimony can ignite faith in someone else. Share it with us.
          </p>

          {!testimonySubmitted ? (
            <form
              onSubmit={(e) => { e.preventDefault(); setTestimonySubmitted(true) }}
              className="glass-card p-8 text-left space-y-5 relative"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-2xl" />
              <div>
                <label className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Your Name</label>
                <input
                  type="text"
                  value={testimonyForm.name}
                  onChange={(e) => setTestimonyForm({ ...testimonyForm, name: e.target.value })}
                  placeholder="First name or initials"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Your Testimony *</label>
                <textarea
                  required
                  rows={6}
                  value={testimonyForm.testimony}
                  onChange={(e) => setTestimonyForm({ ...testimonyForm, testimony: e.target.value })}
                  placeholder="Share what God has done in your life..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                />
              </div>
              <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2 text-sm">
                <Send className="w-4 h-4" /> Submit Testimony
              </button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-12 text-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7 text-gold" />
              </div>
              <h4 className="font-cinzel text-xl text-foreground font-bold mb-3">Testimony Received!</h4>
              <p className="font-inter text-muted-foreground text-sm">Thank you for sharing what God has done. Your testimony will encourage and ignite faith in others. To God be all the glory!</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/97 backdrop-blur-xl p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].caption}
                className="w-full max-h-[78vh] object-contain rounded-2xl"
              />
              <div className="flex items-center justify-between mt-4 px-2">
                <p className="font-playfair text-foreground/70 italic text-sm">{filtered[lightboxIndex].caption}</p>
                <span className="font-montserrat text-xs text-muted-foreground/50">{lightboxIndex + 1} / {filtered.length}</span>
              </div>

              <button onClick={closeLightbox} className="absolute -top-10 right-0 text-muted-foreground hover:text-gold transition-colors">
                <X className="w-7 h-7" />
              </button>
              <button onClick={prevImage} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 bg-background-alt/80 border border-gold/20 rounded-full flex items-center justify-center text-muted-foreground hover:text-gold transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImage} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 bg-background-alt/80 border border-gold/20 rounded-full flex items-center justify-center text-muted-foreground hover:text-gold transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
