'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Play, Clock, Calendar, Share2, Copy, CheckCheck,
  BookOpen, ChevronRight, Facebook, Youtube, Download
} from 'lucide-react'
import { staggerContainer, fadeUp, fadeLeft, fadeRight } from '@/lib/animations'

interface SermonNote {
  heading: string
  body: string
}

interface RelatedSermon {
  slug: string
  title: string
  speaker: string
  duration: string
  thumbnail: string
}

interface Sermon {
  title: string
  speaker: string
  publishedAt: string
  duration: string
  series: string
  description: string
  youtubeId?: string
  scripture: string
  thumbnail: string
  notes: SermonNote[]
  tags: string[]
  relatedSermons: RelatedSermon[]
}

interface Props {
  sermon: Sermon | undefined
  slug: string
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function SermonDetailContent({ sermon, slug }: Props) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'notes' | 'transcript'>('notes')

  if (!sermon) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-cinzel text-4xl text-gold/30 mb-4">404</p>
          <h2 className="font-playfair text-2xl text-foreground mb-4">Sermon Not Found</h2>
          <Link href="/sermons" className="btn-gold text-sm">← Back to Sermons</Link>
        </div>
      </div>
    )
  }

  const shareUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://prayerhouseministryintl.org/sermons/${slug}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Video hero */}
      <div className="relative bg-background pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.12)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs font-inter text-muted-foreground/50 mb-8"
          >
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/sermons" className="hover:text-gold transition-colors">Sermons</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold truncate max-w-[200px]">{sermon.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main — Video + Info */}
            <div className="lg:col-span-2">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Video player */}
                <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
                  {sermon.youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${sermon.youtubeId}?rel=0&modestbranding=1`}
                      title={sermon.title}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background-alt"
                      style={{ backgroundImage: `url('${sermon.thumbnail}')`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                      <div className="absolute inset-0 bg-background/60" />
                      <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-gold-lg">
                          <Play className="w-8 h-8 text-background fill-navy-dark ml-1" />
                        </div>
                        <p className="font-inter text-muted-foreground text-sm">Video coming soon</p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Series badge + title */}
                <motion.div variants={fadeUp}>
                  <span className="font-montserrat text-[11px] bg-gold text-background px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    {sermon.series}
                  </span>
                  <h1 className="font-cinzel text-2xl lg:text-3xl text-foreground font-bold mt-4 mb-3 leading-snug">
                    {sermon.title}
                  </h1>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground mb-4">
                    <span className="font-inter font-medium text-gold">{sermon.speaker}</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold/60" />
                      {formatDate(sermon.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold/60" />
                      {sermon.duration}
                    </span>
                  </div>

                  {/* Scripture */}
                  <div className="glass-card p-5 border-l-2 border-gold/60 rounded-l-none mb-5">
                    <p className="font-garamond italic text-foreground text-base leading-relaxed">{sermon.scripture}</p>
                  </div>

                  <p className="font-inter text-muted-foreground leading-relaxed">{sermon.description}</p>
                </motion.div>

                {/* Tags */}
                <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                  {sermon.tags.map((tag) => (
                    <span key={tag} className="font-montserrat text-[10px] border border-gold/20 text-muted-foreground/70 px-3 py-1 rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </motion.div>

                {/* Share row */}
                <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/5">
                  <span className="font-montserrat text-xs text-muted-foreground/50 uppercase tracking-wider flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" /> Share this message
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-montserrat font-semibold text-muted-foreground hover:text-gold transition-colors bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg"
                  >
                    {copied ? <><CheckCheck className="w-3.5 h-3.5 text-gold" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Link</>}
                  </button>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-montserrat font-semibold text-blue-400 hover:text-blue-300 transition-colors bg-blue-400/10 border border-blue-400/20 px-3 py-1.5 rounded-lg"
                  >
                    <Facebook className="w-3.5 h-3.5" /> Facebook
                  </a>
                  <a href={`https://wa.me/?text=${encodeURIComponent(`Watch this powerful sermon: ${sermon.title} — ${shareUrl}`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-montserrat font-semibold text-[#25D366] hover:text-[#25D366]/80 transition-colors bg-[#25D366]/10 border border-[#25D366]/20 px-3 py-1.5 rounded-lg"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </motion.div>

                {/* Tabs — Notes / Transcript */}
                <motion.div variants={fadeUp}>
                  <div className="flex gap-1 mb-6 bg-white/5 rounded-xl p-1 w-fit">
                    {(['notes', 'transcript'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`font-montserrat text-xs font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 capitalize ${
                          activeTab === tab
                            ? 'bg-gold text-background'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {tab === 'notes' ? '📝 Sermon Notes' : '📄 Transcript'}
                      </button>
                    ))}
                  </div>

                  {activeTab === 'notes' && (
                    <div className="space-y-5">
                      {sermon.notes.map((note, i) => (
                        <div key={i} className="glass-card p-6 relative">
                          <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-gradient-to-b from-gold to-transparent rounded-l-2xl" />
                          <h4 className="font-playfair text-base text-gold font-semibold mb-3">{note.heading}</h4>
                          <p className="font-inter text-muted-foreground text-sm leading-relaxed">{note.body}</p>
                        </div>
                      ))}
                      <button className="flex items-center gap-2 font-montserrat text-xs font-semibold text-gold hover:text-gold-light transition-colors">
                        <Download className="w-4 h-4" /> Download Full Notes (PDF)
                      </button>
                    </div>
                  )}

                  {activeTab === 'transcript' && (
                    <div className="glass-card p-8 text-center">
                      <BookOpen className="w-10 h-10 text-gold/40 mx-auto mb-4" />
                      <p className="font-inter text-muted-foreground/60 text-sm">Full transcript coming soon.</p>
                      <p className="font-inter text-muted-foreground/40 text-xs mt-2">Subscribe to our newsletter to be notified when transcripts are available.</p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Related sermons */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h3 className="font-cinzel text-base text-gold font-bold mb-4 uppercase tracking-wider">
                  Related Messages
                </h3>
                <div className="space-y-4">
                  {sermon.relatedSermons.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/sermons/${rel.slug}`}
                      className="glass-card p-4 flex gap-4 items-start group hover:border-gold/40 transition-colors"
                    >
                      <div className="relative w-24 flex-shrink-0 rounded-lg overflow-hidden flex items-center bg-background-alt">
                        <img src={rel.thumbnail} alt={rel.title} className="w-full h-auto block group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-4 h-4 text-gold fill-gold" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-playfair text-sm text-foreground font-semibold leading-snug group-hover:text-gold-light transition-colors line-clamp-2">{rel.title}</p>
                        <p className="font-inter text-muted-foreground/60 text-xs mt-1">{rel.speaker}</p>
                        <p className="font-inter text-muted-foreground/40 text-xs flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {rel.duration}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/sermons" className="mt-4 inline-flex items-center gap-1.5 font-montserrat text-xs font-semibold text-gold hover:text-gold-light transition-colors group">
                  View All Sermons <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>

              {/* Prayer request CTA */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="glass-card p-6 relative overflow-hidden text-center"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <div className="text-3xl mb-3">🙏</div>
                <h4 className="font-cinzel text-base text-foreground font-bold mb-2">Need Prayer?</h4>
                <p className="font-inter text-muted-foreground text-xs leading-relaxed mb-5">
                  This message touched your heart? Our prayer team is here for you.
                </p>
                <a href="/#prayer-request" className="btn-gold text-xs px-6 py-3 block text-center">
                  Submit Prayer Request
                </a>
              </motion.div>

              {/* Subscribe CTA */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="glass-card p-6 relative"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                <div className="flex items-center gap-2 mb-3">
                  <Youtube className="w-5 h-5 text-[#FF0000]" />
                  <h4 className="font-cinzel text-sm text-foreground font-bold">Subscribe for More</h4>
                </div>
                <p className="font-inter text-muted-foreground text-xs leading-relaxed mb-4">
                  Never miss a message. Subscribe to our YouTube channel for weekly sermons.
                </p>
                <a href="#" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#FF0000]/10 border border-[#FF0000]/30 text-[#FF0000] hover:bg-[#FF0000]/20 transition-all px-4 py-2.5 rounded-lg font-montserrat text-xs font-semibold w-full"
                >
                  <Youtube className="w-4 h-4" /> Subscribe on YouTube
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
