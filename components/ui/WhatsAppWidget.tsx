'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { X, ChevronDown } from 'lucide-react'

// ── Phone number ─────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '237653270752'

// ── Page-context messages ─────────────────────────────────────────────────────
// Each entry matches a pathname pattern and provides a tailored greeting
const contextMessages: Array<{
  match: (path: string) => boolean
  label: string        // shown as quick-reply chip label
  message: string      // pre-filled WhatsApp message
}> = [
  {
    match: (p) => p === '/',
    label: 'General enquiry',
    message: `Hello Solution Center 👋 I visited your website and would love to connect with your ministry.`,
  },
  {
    match: (p) => p.startsWith('/sermons'),
    label: 'About a sermon',
    message: `Hello PHMI 🙏 I was watching your sermons online and I have a question or comment I'd love to share.`,
  },
  {
    match: (p) => p.startsWith('/events'),
    label: 'Register for an event',
    message: `Hello Solution Center 📅 I'd like to register for one of your upcoming events. Can you help me?`,
  },
  {
    match: (p) => p.startsWith('/ministries'),
    label: 'Join a ministry',
    message: `Hello PHMI 🙌 I'm interested in joining one of your ministry teams. Can someone get in touch with me?`,
  },
  {
    match: (p) => p.startsWith('/about'),
    label: 'Learn more',
    message: `Hello Solution Center 🕊️ I visited your About page and I'd love to learn more about the ministry and how to get involved.`,
  },
  {
    match: (p) => p.startsWith('/blog') || p.startsWith('/devotionals'),
    label: 'Share a thought',
    message: `Hello PHMI ✍️ I was reading one of your blog articles and I'd love to share a response or ask a question.`,
  },
  {
    match: (p) => p.startsWith('/gallery'),
    label: 'About a photo',
    message: `Hello Solution Center 📸 I came across your gallery and would love to know more about your community and services.`,
  },
  {
    match: (p) => p.startsWith('/contact'),
    label: 'General contact',
    message: `Hello PHMI 👋 I filled out your contact form and just wanted to follow up via WhatsApp as well.`,
  },
  {
    match: (p) => p.startsWith('/give') || p.includes('give'),
    label: 'About giving',
    message: `Hello Solution Center 💛 I'd like to give. I can send via MTN MoMo: 653270752 or bank transfer to FINASDDEE CREDIT LINE CAMEROON S. A. Please confirm.`,
  },
  // Prayer request shortcut
  {
    match: (p) => p.includes('prayer'),
    label: 'Prayer request',
    message: `Hello PHMI 🙏 I have a prayer request I'd like to submit. Please pray with me.`,
  },
]

// Quick-reply chip messages — always shown
const quickReplies = [
  { label: '💛 Give / MoMo', message: `Hello PHMI 💛 I would like to give. I will send via MTN MoMo: 653270752. Please confirm.` },
  { label: '🏦 Bank transfer', message: `Hello PHMI 💛 I would like to give by bank transfer to FINASDDEE CREDIT LINE CAMEROON S. A. Please confirm the account number.` },
  { label: '🙏 Prayer Request', message: `Hello PHMI — I have a prayer request I'd like to share. Please pray with me.` },
  { label: '📅 Service Times', message: `Hello Solution Center — Can you tell me your weekly service schedule and location?` },
  { label: '📺 Watch Live', message: `Hello PHMI — How can I watch your services online? Do you livestream?` },
  { label: '🤝 Get Involved', message: `Hello Solution Center — I'd like to get involved with the church. How can I connect?` },
]

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function getContextMessage(pathname: string) {
  return contextMessages.find((c) => c.match(pathname)) || contextMessages[0]
}

export default function WhatsAppWidget() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [hasNotif, setHasNotif] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const context = getContextMessage(pathname)

  // Show notification bubble after 8 seconds on first visit
  useEffect(() => {
    const seen = sessionStorage.getItem('wa-widget-seen')
    if (!seen) {
      timerRef.current = setTimeout(() => {
        setHasNotif(true)
        sessionStorage.setItem('wa-widget-seen', 'true')
      }, 8000)
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  // Clear notification when opened
  useEffect(() => {
    if (open) setHasNotif(false)
  }, [open])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Don't show on admin pages
  if (pathname.startsWith('/admin')) return null

  return (
    <div className="fixed bottom-6 left-6 z-[90] flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-[320px] sm:w-[360px] rounded-2xl overflow-hidden shadow-2xl"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(37,211,102,0.15)' }}
          >
            {/* Header */}
            <div className="bg-[#075E54] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* WhatsApp avatar */}
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-[#128C7E] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  {/* Online dot */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#075E54]" />
                </div>
                <div>
                  <p className="font-montserrat text-white font-semibold text-sm">Solution Center</p>
                  <p className="font-inter text-[#dcf8c6] text-xs">Online · Usually replies in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat area */}
            <div
              className="px-4 py-5 space-y-3"
              style={{ background: '#ECE5DD', backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8b8a2' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
            >
              {/* Greeting bubble */}
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-[#075E54] flex items-center justify-center flex-shrink-0 mb-0.5">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div
                  className="relative bg-white rounded-tr-2xl rounded-b-2xl px-4 py-3 max-w-[240px] shadow-sm"
                  style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.12)' }}
                >
                  {/* Chat tail */}
                  <div className="absolute -left-2 bottom-3 w-0 h-0" style={{ borderRight: '8px solid white', borderTop: '8px solid transparent', borderBottom: '0 solid transparent' }} />
                  <p className="font-inter text-[#111] text-sm leading-relaxed">
                    👋 Hello! Welcome to <strong>Solution Center</strong>.
                  </p>
                  <p className="font-inter text-[#111] text-sm leading-relaxed mt-1.5">
                    How can we help you today? 🙏
                  </p>
                  <p className="font-inter text-[#999] text-[10px] text-right mt-1.5 flex items-center justify-end gap-1">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    <svg className="w-3.5 h-3.5 text-[#34B7F1]" fill="currentColor" viewBox="0 0 16 11">
                      <path d="M11.071.653a.75.75 0 0 1 .006 1.059L4.942 7.94a.75.75 0 0 1-1.065 0L.653 4.706A.75.75 0 1 1 1.719 3.64l2.69 2.8L10.012.66a.75.75 0 0 1 1.059-.006zm2.857 0a.75.75 0 0 1 .006 1.059L7.799 7.94a.75.75 0 0 1-.206.143l.206-.143 5.87-6.228a.75.75 0 0 1 1.059-.006z" />
                    </svg>
                  </p>
                </div>
              </div>

              {/* Context-aware suggested message */}
              <div className="flex justify-end">
                <a
                  href={buildWhatsAppUrl(context.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#dcf8c6] rounded-tl-2xl rounded-b-2xl px-4 py-3 max-w-[240px] shadow-sm relative hover:bg-[#c8f0b0] transition-colors block"
                  style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.12)' }}
                >
                  <div className="absolute -right-2 bottom-3 w-0 h-0" style={{ borderLeft: '8px solid #dcf8c6', borderTop: '8px solid transparent', borderBottom: '0 solid transparent' }} />
                  <p className="font-inter text-[#111] text-sm leading-relaxed">{context.message}</p>
                  <p className="font-inter text-[#999] text-[10px] text-right mt-1.5">Tap to send</p>
                </a>
              </div>
            </div>

            {/* Quick replies */}
            <div className="bg-white border-t border-gray-100 px-4 py-3">
              <p className="font-montserrat text-[10px] text-gray-400 uppercase tracking-wider mb-2.5">
                Quick messages
              </p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <a
                    key={reply.label}
                    href={buildWhatsAppUrl(reply.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter text-xs text-[#075E54] border border-[#075E54]/30 bg-[#075E54]/5 hover:bg-[#075E54]/10 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                  >
                    {reply.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Open in WhatsApp CTA */}
            <a
              href={buildWhatsAppUrl(context.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#22c55e] transition-colors px-5 py-4 font-montserrat text-sm font-bold text-white"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Open in WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <div className="relative">
        {/* Notification bubble */}
        <AnimatePresence>
          {hasNotif && !open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="absolute -top-14 left-0 bg-white rounded-2xl rounded-bl-none px-3.5 py-2.5 shadow-lg flex items-center gap-2 whitespace-nowrap cursor-pointer"
              onClick={() => setOpen(true)}
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
            >
              <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse flex-shrink-0" />
              <p className="font-inter text-[#111] text-xs font-medium">
                Need help? Chat with us 👋
              </p>
              {/* Tail */}
              <div className="absolute -bottom-2 left-4 w-0 h-0" style={{ borderLeft: '8px solid transparent', borderRight: '0 solid transparent', borderTop: '8px solid white' }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label={open ? 'Close WhatsApp chat' : 'Chat with us on WhatsApp'}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-colors"
          style={{
            background: open
              ? '#075E54'
              : 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            boxShadow: open
              ? '0 4px 20px rgba(7,94,84,0.5)'
              : '0 4px 20px rgba(37,211,102,0.45)',
          }}
        >
          {/* Ping ring — only when closed */}
          {!open && (
            <span className="absolute inset-0 rounded-full animate-ping"
              style={{ background: 'rgba(37,211,102,0.3)', animationDuration: '2s' }} />
          )}

          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <ChevronDown className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread dot */}
          {hasNotif && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 border-2 border-muted-dark flex items-center justify-center"
            >
              <span className="font-montserrat text-[8px] text-white font-bold">1</span>
            </motion.span>
          )}
        </motion.button>
      </div>
    </div>
  )
}
