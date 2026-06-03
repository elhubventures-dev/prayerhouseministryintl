'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2 } from 'lucide-react'

interface NewsletterProps {
  variant?: 'inline' | 'section'
}

export default function Newsletter({ variant = 'inline' }: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  if (variant === 'section') {
    return (
      <section className="relative py-20 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.1)_0%,transparent_65%)] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p className="section-label mb-3">Stay Connected</p>
          <h2 className="font-cinzel text-3xl text-ivory font-bold mb-4">
            Join Our <span className="text-gold-gradient">Newsletter</span>
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="font-inter text-silver mb-10 leading-relaxed">
            Receive event alerts, sermon updates, devotionals, and prophetic words straight to your inbox.
            Be the first to know what God is doing at Solution Center.
          </p>
          <NewsletterForm email={email} setEmail={setEmail} submitted={submitted} onSubmit={handleSubmit} />
        </div>
      </section>
    )
  }

  return <NewsletterForm email={email} setEmail={setEmail} submitted={submitted} onSubmit={handleSubmit} />
}

function NewsletterForm({
  email, setEmail, submitted, onSubmit
}: {
  email: string
  setEmail: (v: string) => void
  submitted: boolean
  onSubmit: (e: React.FormEvent) => void
}) {
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center gap-3 py-4"
      >
        <CheckCircle2 className="w-5 h-5 text-gold" />
        <p className="font-montserrat text-sm text-gold font-semibold">
          You're subscribed! Welcome to the family. 🙏
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm font-inter placeholder-silver/40 focus:outline-none focus:border-gold/50 transition-colors"
      />
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="btn-gold text-sm flex items-center justify-center gap-2 px-6 py-3"
      >
        <Send className="w-4 h-4" /> Subscribe
      </motion.button>
    </form>
  )
}
