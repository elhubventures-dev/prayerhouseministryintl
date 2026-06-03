'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ChevronRight, Copy, CheckCheck, Facebook, ArrowRight } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

interface BodyBlock {
  type: 'paragraph' | 'heading' | 'quote'
  text: string
  attribution?: string
}

interface Post {
  title: string
  author: string
  publishedAt: string
  mainImage: string
  categories: string[]
  estimatedReadingTime: number
  scripture: string
  excerpt: string
  body: BodyBlock[]
  relatedPosts: Array<{
    slug: string
    title: string
    mainImage: string
    estimatedReadingTime: number
    categories: string[]
  }>
}

export default function BlogDetailContent({ post, slug }: { post: Post | undefined; slug: string }) {
  const [copied, setCopied] = useState(false)

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-cinzel text-4xl text-gold/30 mb-4">404</p>
          <h2 className="font-playfair text-2xl text-foreground mb-4">Article Not Found</h2>
          <Link href="/blog" className="btn-gold text-sm">← Back to Blog</Link>
        </div>
      </div>
    )
  }

  const shareUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://prayerhouseministryintl.org/blog/${slug}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="bg-background min-h-screen pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.08)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs font-inter text-muted-foreground/50 mb-10">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gold truncate max-w-[180px]">{post.title}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article */}
          <article className="lg:col-span-2">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
              {/* Category tags */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <span key={cat} className="font-montserrat text-[11px] border border-gold/30 text-gold px-3 py-1 rounded-full uppercase tracking-wider">{cat}</span>
                ))}
              </motion.div>

              {/* Title */}
              <motion.h1 variants={fadeUp} className="font-cinzel text-2xl lg:text-4xl text-foreground font-bold leading-tight">
                {post.title}
              </motion.h1>

              {/* Meta */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground pb-5 border-b border-white/5">
                <span className="font-inter font-medium text-gold">{post.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gold/60" /> {formatDate(post.publishedAt)}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gold/60" /> {post.estimatedReadingTime} min read</span>
              </motion.div>

              {/* Cover image */}
              <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden aspect-video">
                <img src={post.mainImage} alt={post.title} className="w-full h-full object-cover" />
              </motion.div>

              {/* Scripture pull quote */}
              <motion.div variants={fadeUp} className="glass-card p-6 border-l-2 border-gold rounded-l-none relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold via-gold/50 to-transparent" />
                <p className="font-garamond text-foreground italic text-lg leading-relaxed">{post.scripture}</p>
              </motion.div>

              {/* Article body */}
              <motion.div variants={fadeUp} className="prose-custom space-y-5">
                {post.body.map((block, i) => {
                  if (block.type === 'heading') {
                    return (
                      <h2 key={i} className="font-cinzel text-xl text-gold font-bold mt-8 mb-3">
                        {block.text}
                      </h2>
                    )
                  }
                  if (block.type === 'quote') {
                    return (
                      <blockquote key={i} className="glass-card p-8 text-center relative overflow-hidden my-8">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
                        <div className="font-cinzel text-5xl text-gold/20 leading-none mb-4">"</div>
                        <p className="font-playfair text-xl text-foreground italic leading-relaxed mb-4">{block.text}</p>
                        {block.attribution && (
                          <p className="font-montserrat text-xs text-gold/70 uppercase tracking-wider">— {block.attribution}</p>
                        )}
                      </blockquote>
                    )
                  }
                  return (
                    <p key={i} className="font-inter text-muted-foreground leading-[1.9] text-base">
                      {block.text}
                    </p>
                  )
                })}
              </motion.div>

              {/* Share */}
              <motion.div variants={fadeUp} className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-3">
                <span className="font-montserrat text-xs text-muted-foreground/50 uppercase tracking-wider">Share this article:</span>
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-montserrat font-semibold text-muted-foreground hover:text-gold transition-colors bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  {copied ? <><CheckCheck className="w-3.5 h-3.5 text-gold" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Link</>}
                </button>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-montserrat font-semibold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1.5 rounded-lg hover:bg-blue-400/20 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" /> Facebook
                </a>
                <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — ${shareUrl}`)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-montserrat font-semibold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 px-3 py-1.5 rounded-lg hover:bg-[#25D366]/20 transition-colors"
                >
                  WhatsApp
                </a>
              </motion.div>
            </motion.div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Author card */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-2xl" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <span className="font-cinzel text-sm font-bold text-gold">
                    {post.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-playfair text-sm text-foreground font-semibold">{post.author}</p>
                  <p className="font-montserrat text-[10px] text-gold uppercase tracking-wider">Author</p>
                </div>
              </div>
              <p className="font-inter text-muted-foreground text-xs leading-relaxed">
                {post.author === 'Rev. Apostle E.S. Hugo'
                  ? 'Senior Apostle and founder of Prayer House Ministry International. Carrying a prophetic and apostolic mandate to raise Spirit-filled believers.'
                  : post.author === 'Prophetess Ekwalla Calista'
                  ? 'Prophetess and co-leader of Solution Center, moving in accurate prophetic ministry, intercession, and healing.'
                  : 'The editorial team of PHMI — Solution Center, producing content to strengthen your faith and deepen your walk with God.'}
              </p>
            </motion.div>

            {/* Related posts */}
            {post.relatedPosts.length > 0 && (
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <h3 className="font-cinzel text-sm text-gold font-bold mb-4 uppercase tracking-wider">Related Articles</h3>
                <div className="space-y-4">
                  {post.relatedPosts.map((rel) => (
                    <Link key={rel.slug} href={`/blog/${rel.slug}`} className="glass-card p-4 flex gap-4 group hover:border-gold/40 transition-colors block">
                      <div className="w-20 flex-shrink-0 aspect-video rounded-lg overflow-hidden">
                        <img src={rel.mainImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-playfair text-xs text-foreground font-semibold leading-snug group-hover:text-gold-light transition-colors line-clamp-2">{rel.title}</p>
                        <p className="font-inter text-muted-foreground/50 text-xs mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {rel.estimatedReadingTime} min</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/blog" className="mt-4 inline-flex items-center gap-1.5 font-montserrat text-xs font-semibold text-gold hover:text-gold-light transition-colors group">
                  All Articles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            )}

            {/* Prayer CTA */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6 text-center relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent rounded-t-2xl" />
              <div className="text-2xl mb-3">🙏</div>
              <h4 className="font-cinzel text-sm text-foreground font-bold mb-2">Needs Prayer?</h4>
              <p className="font-inter text-muted-foreground text-xs leading-relaxed mb-4">Our team is here for you — whatever you're walking through.</p>
              <a href="/contact" className="btn-gold text-xs px-5 py-2.5 block text-center">Request Prayer</a>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  )
}
