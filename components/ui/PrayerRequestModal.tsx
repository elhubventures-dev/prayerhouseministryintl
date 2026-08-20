'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { postForm } from '@/lib/submit-form'

interface PrayerRequestModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrayerRequestModal({ isOpen, onClose }: PrayerRequestModalProps) {
  const [form, setForm] = useState({ name: '', email: '', request: '', anonymous: false })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await postForm('/api/prayer', form)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit your request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setSubmitted(false)
    setError('')
    setForm({ name: '', email: '', request: '', anonymous: false })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-card w-full max-w-lg p-8 lg:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-2xl" />

            <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-gold transition-colors">
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="text-center mb-8">
                  <div className="text-3xl mb-3">🙏</div>
                  <h3 className="font-cinzel text-xl text-foreground font-bold mb-2">Submit a Prayer Request</h3>
                  <p className="font-inter text-muted-foreground text-sm">
                    Our prayer team will stand in agreement with you. Your request is kept confidential.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-3 p-3 bg-gold/5 border border-gold/20 rounded-lg">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={form.anonymous}
                      onChange={(e) => setForm({ ...form, anonymous: e.target.checked })}
                      className="w-4 h-4 accent-gold"
                    />
                    <label htmlFor="anonymous" className="font-inter text-muted-foreground text-sm cursor-pointer">
                      Submit anonymously
                    </label>
                  </div>

                  {!form.anonymous && (
                    <div>
                      <label className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Your Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  )}

                  <div>
                    <label className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                    <p className="font-inter text-[11px] text-muted-foreground/70 mt-2">
                      We will send a confirmation to this address. {form.anonymous ? 'It will not be shown to the prayer team.' : ''}
                    </p>
                  </div>

                  <div>
                    <label className="font-montserrat text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Your Prayer Request</label>
                    <textarea
                      required
                      value={form.request}
                      onChange={(e) => setForm({ ...form, request: e.target.value })}
                      rows={5}
                      placeholder="Share your prayer need with us..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="font-inter text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                      {error}
                    </p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      aria-busy={submitting}
                      className="btn-gold flex-1 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {submitting ? 'Submitting...' : 'Submit Prayer Request'}
                    </button>
                    <a
                      href={`https://wa.me/237653270752?text=Prayer%20Request:%20${encodeURIComponent(form.request)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-[#25D366]/10 border border-[#25D366]/30 rounded-lg text-[#25D366] hover:bg-[#25D366]/20 transition-all flex-shrink-0"
                      title="Send via WhatsApp"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  </div>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-8 h-8 text-gold" />
                </motion.div>
                <h4 className="font-cinzel text-xl text-foreground font-bold mb-3">Prayer Received!</h4>
                <p className="font-inter text-muted-foreground text-sm leading-relaxed mb-6">
                  Our prayer team has received your request and will be standing in agreement with you.
                  God hears every prayer. Stay expectant for your breakthrough!
                </p>
                <p className="font-garamond text-gold/70 italic text-sm mb-8">
                  "The effective, fervent prayer of a righteous man avails much." — James 5:16
                </p>
                <button onClick={handleClose} className="btn-gold text-sm px-8">
                  Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
