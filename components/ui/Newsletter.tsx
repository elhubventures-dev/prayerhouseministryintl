'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import { postForm } from '@/lib/submit-form'

interface NewsletterProps {
  variant?: 'inline' | 'section'
}

export default function Newsletter({ variant = 'inline' }: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setError('')
    setSubmitting(true)
    try {
      await postForm('/api/newsletter', { email })
      setSubmitted(true)
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not subscribe. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (variant === 'section') {
    return (
      <section className="relative py-20 bg-background-alt overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.1)_0%,transparent_65%)] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p className="section-label mb-3">Stay Connected</p>
          <h2 className="font-cinzel text-3xl text-foreground font-bold mb-4">
            Join Our <span className="text-gold-gradient">Newsletter</span>
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="font-inter text-muted-foreground mb-10 leading-relaxed">
            Receive event alerts, sermon updates, devotionals, and prophetic words straight to your inbox.
            Be the first to know what God is doing at Solution Center.
          </p>
          <NewsletterForm
            email={email}
            setEmail={setEmail}
            submitted={submitted}
            submitting={submitting}
            error={error}
            onSubmit={handleSubmit}
          />
        </div>
      </section>
    )
  }

  return (
    <NewsletterForm
      email={email}
      setEmail={setEmail}
      submitted={submitted}
      submitting={submitting}
      error={error}
      onSubmit={handleSubmit}
    />
  )
}

function NewsletterForm({
  email,
  setEmail,
  submitted,
  submitting,
  error,
  onSubmit,
}: {
  email: string
  setEmail: (v: string) => void
  submitted: boolean
  submitting: boolean
  error: string
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
    <div className="space-y-3 max-w-md mx-auto">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          placeholder="Enter your email address"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/40 focus:outline-none focus:border-gold/50 transition-colors disabled:opacity-60"
        />
        <motion.button
          whileHover={submitting ? undefined : { scale: 1.03 }}
          whileTap={submitting ? undefined : { scale: 0.97 }}
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="btn-gold text-sm flex items-center justify-center gap-2 px-6 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {submitting ? 'Subscribing...' : 'Subscribe'}
        </motion.button>
      </form>
      {error && (
        <p role="alert" className="font-inter text-sm text-red-400 text-center">
          {error}
        </p>
      )}
    </div>
  )
}
