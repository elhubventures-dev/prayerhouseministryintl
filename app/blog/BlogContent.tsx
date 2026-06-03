'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const categories = ['All', 'Devotional', 'Teaching', 'Testimony', 'Prayer Points', 'Prophecy', 'Kingdom Living']

const posts = [
  {
    slug: 'the-secret-place-of-prayer',
    title: 'The Secret Place: Why Your Private Prayer Life Changes Everything',
    author: 'Rev. Apostle E.S. Hugo',
    publishedAt: '2025-07-14',
    excerpt: 'Jesus consistently withdrew to pray alone. Not because He needed to impress God, but because He understood that the source of all public power is private communion. What happens in your secret place determines what happens in your life.',
    mainImage: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=800&q=80',
    categories: ['Devotional', 'Prayer Points'],
    estimatedReadingTime: 5,
    scripture: 'Matthew 6:6',
    featured: true,
  },
  {
    slug: 'walking-in-prophetic-purpose',
    title: 'Walking in Prophetic Purpose: Knowing the Season You Are In',
    author: 'Prophetess Ekwalla Calista',
    publishedAt: '2025-07-07',
    excerpt: 'There is a season for every purpose under heaven. The prophetic believer does not just live in time — they understand time. Discerning your season is the difference between striving and flowing, between frustration and fruitfulness.',
    mainImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    categories: ['Prophecy', 'Teaching'],
    estimatedReadingTime: 7,
    scripture: 'Ecclesiastes 3:1',
    featured: false,
  },
  {
    slug: 'from-broken-to-blessed',
    title: 'From Broken to Blessed: My Testimony of Restoration',
    author: 'PHMI Editorial Team',
    publishedAt: '2025-06-30',
    excerpt: 'I walked into Solution Center with nothing but questions and a broken spirit. Two years later, I walk in knowing exactly who God says I am. This is the story of how the house of prayer became the birthplace of my destiny.',
    mainImage: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=800&q=80',
    categories: ['Testimony'],
    estimatedReadingTime: 6,
    scripture: 'Joel 2:25',
    featured: false,
  },
  {
    slug: '7-daily-declarations-for-breakthrough',
    title: '7 Daily Declarations for Supernatural Breakthrough',
    author: 'Prophetess Ekwalla Calista',
    publishedAt: '2025-06-22',
    excerpt: 'Death and life are in the power of the tongue. What you declare daily shapes the atmosphere around you. Here are seven power-packed declarations rooted in Scripture that you can pray every morning to activate breakthrough in every area of your life.',
    mainImage: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80',
    categories: ['Prayer Points', 'Kingdom Living'],
    estimatedReadingTime: 4,
    scripture: 'Proverbs 18:21',
    featured: false,
  },
  {
    slug: 'understanding-the-tithe',
    title: 'Understanding the Tithe: Kingdom Economics That Work',
    author: 'Rev. Apostle E.S. Hugo',
    publishedAt: '2025-06-15',
    excerpt: 'Tithing is not a religious obligation — it is a kingdom economic principle that connects your earthly resources to divine supply. When you understand what the tithe truly is, giving becomes not a sacrifice but a strategy.',
    mainImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    categories: ['Teaching', 'Kingdom Living'],
    estimatedReadingTime: 8,
    scripture: 'Malachi 3:10',
    featured: false,
  },
  {
    slug: 'raising-spirit-filled-children',
    title: 'Raising Spirit-Filled Children in a Digital World',
    author: 'PHMI Editorial Team',
    publishedAt: '2025-06-08',
    excerpt: 'The greatest ministry assignment for most believers is not the pulpit — it is the home. How do you raise children who love God, know the Word, and walk in the Spirit when the world is louder than ever? Here is a practical, biblical framework.',
    mainImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    categories: ['Kingdom Living', 'Teaching'],
    estimatedReadingTime: 6,
    scripture: 'Proverbs 22:6',
    featured: false,
  },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState('All')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.categories.includes(activeCategory))

  const featured = posts.find((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured || activeCategory !== 'All')

  return (
    <section className="py-24 lg:py-32 bg-navy atmos-bg">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-wrap gap-2 mb-12 justify-center"
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

        {/* Featured post — only on "All" */}
        {activeCategory === 'All' && featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-12"
          >
            <Link href={`/blog/${featured.slug}`} className="glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-2 group block">
              <div className="relative overflow-hidden min-h-[280px]">
                <img src={featured.mainImage} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-navy-dark/40" />
                <span className="absolute top-4 left-4 font-montserrat text-[11px] bg-gold text-navy-dark px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                  ✨ Featured
                </span>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featured.categories.map((cat) => (
                    <span key={cat} className="font-montserrat text-[10px] border border-gold/30 text-gold px-2.5 py-1 rounded-full uppercase tracking-wider">{cat}</span>
                  ))}
                </div>
                <h2 className="font-playfair text-2xl lg:text-3xl text-ivory font-bold leading-snug mb-4 group-hover:text-gold-light transition-colors">
                  {featured.title}
                </h2>
                <div className="glass-card p-4 mb-4 border-l-2 border-gold/60 rounded-l-none">
                  <p className="font-garamond italic text-silver text-sm">{featured.scripture}</p>
                </div>
                <p className="font-inter text-silver text-sm leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-silver/60 mb-5">
                  <span className="font-inter">{featured.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-gold/50" /> {formatDate(featured.publishedAt)}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-gold/50" /> {featured.estimatedReadingTime} min read</span>
                </div>
                <span className="inline-flex items-center gap-2 font-montserrat text-sm font-semibold text-gold group-hover:text-gold-light transition-colors">
                  Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Posts grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(activeCategory === 'All' ? rest : filtered).map((post) => (
              <motion.div key={post.slug} variants={fadeUp} whileHover={{ y: -6 }}>
                <Link href={`/blog/${post.slug}`} className="glass-card overflow-hidden group flex flex-col h-full block">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={post.mainImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-navy-dark/30" />
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex flex-wrap gap-1.5">
                      {post.categories.slice(0, 2).map((cat) => (
                        <span key={cat} className="font-montserrat text-[9px] bg-gold/10 text-gold px-2 py-0.5 rounded-full uppercase tracking-wider border border-gold/20">{cat}</span>
                      ))}
                    </div>
                    <h3 className="font-playfair text-base text-ivory font-semibold leading-snug group-hover:text-gold-light transition-colors flex-1">
                      {post.title}
                    </h3>
                    <p className="font-inter text-silver/70 text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-silver/50 pt-2 border-t border-white/5">
                      <span className="font-inter truncate">{post.author}</span>
                      <span className="flex items-center gap-1 flex-shrink-0"><Clock className="w-3 h-3" /> {post.estimatedReadingTime} min</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-gold/30 mx-auto mb-4" />
            <p className="font-playfair text-xl text-silver/50 italic">No posts in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
