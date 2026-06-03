'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ZoomIn, X, ChevronLeft, ChevronRight, Send, CheckCircle2 } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const categories = ['All', 'Worship', 'Events', 'Community', 'Outreach', 'Leadership']

const images = [
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', category: 'Worship', caption: 'Sunday Prophetic Service' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', category: 'Events', caption: 'Annual Revival Conference 2024' },
  { src: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=800&q=80', category: 'Community', caption: 'Community Fellowship Hour' },
  { src: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80', category: 'Worship', caption: 'Choir Ministry in Action' },
  { src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80', category: 'Events', caption: 'Youth Empowerment Night' },
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', category: 'Community', caption: 'Prayer Group Session' },
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', category: 'Outreach', caption: 'Community Outreach Program' },
  { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', category: 'Worship', caption: 'All Night Service Worship' },
  { src: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=800&q=80', category: 'Events', caption: 'Women\'s Empowerment Seminar' },
  { src: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&q=80', category: 'Leadership', caption: 'Leadership Summit 2024' },
  { src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', category: 'Worship', caption: 'Bible Study Wednesday' },
  { src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80', category: 'Outreach', caption: 'Street Evangelism — Limbe' },
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
      <section className="py-24 bg-navy atmos-bg">
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
                    ? 'bg-gold text-navy-dark border-gold'
                    : 'bg-transparent text-silver border-white/10 hover:border-gold/50 hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Count */}
          <p className="text-center font-inter text-silver/40 text-xs mb-8">
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
                  <div className="absolute inset-0 bg-navy-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col items-center justify-center gap-2 p-4">
                    <ZoomIn className="w-7 h-7 text-gold" />
                    <p className="font-inter text-ivory text-xs text-center font-medium">{image.caption}</p>
                    <span className="font-montserrat text-[9px] bg-gold/80 text-navy-dark px-2 py-0.5 rounded-full font-bold uppercase">{image.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Testimony Submission */}
      <section className="py-20 bg-navy-dark">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Share Your Story</p>
          <h2 className="section-title mb-4">Submit a <span className="text-gold-gradient">Testimony</span></h2>
          <div className="gold-divider" />
          <p className="font-inter text-silver mb-10 leading-relaxed">
            Has God done something powerful in your life through PHMI? Your testimony can ignite faith in someone else. Share it with us.
          </p>

          {!testimonySubmitted ? (
            <form
              onSubmit={(e) => { e.preventDefault(); setTestimonySubmitted(true) }}
              className="glass-card p-8 text-left space-y-5 relative"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-2xl" />
              <div>
                <label className="font-montserrat text-xs text-silver uppercase tracking-wider mb-2 block">Your Name</label>
                <input
                  type="text"
                  value={testimonyForm.name}
                  onChange={(e) => setTestimonyForm({ ...testimonyForm, name: e.target.value })}
                  placeholder="First name or initials"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="font-montserrat text-xs text-silver uppercase tracking-wider mb-2 block">Your Testimony *</label>
                <textarea
                  required
                  rows={6}
                  value={testimonyForm.testimony}
                  onChange={(e) => setTestimonyForm({ ...testimonyForm, testimony: e.target.value })}
                  placeholder="Share what God has done in your life..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
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
              <h4 className="font-cinzel text-xl text-ivory font-bold mb-3">Testimony Received!</h4>
              <p className="font-inter text-silver text-sm">Thank you for sharing what God has done. Your testimony will encourage and ignite faith in others. To God be all the glory!</p>
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
            className="fixed inset-0 z-[200] flex items-center justify-center bg-navy-dark/97 backdrop-blur-xl p-4"
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
                <p className="font-playfair text-ivory/70 italic text-sm">{filtered[lightboxIndex].caption}</p>
                <span className="font-montserrat text-xs text-silver/50">{lightboxIndex + 1} / {filtered.length}</span>
              </div>

              <button onClick={closeLightbox} className="absolute -top-10 right-0 text-silver hover:text-gold transition-colors">
                <X className="w-7 h-7" />
              </button>
              <button onClick={prevImage} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 bg-navy/80 border border-gold/20 rounded-full flex items-center justify-center text-silver hover:text-gold transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImage} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 bg-navy/80 border border-gold/20 rounded-full flex items-center justify-center text-silver hover:text-gold transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
