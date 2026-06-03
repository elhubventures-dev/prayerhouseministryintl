'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Megaphone } from 'lucide-react'
import Link from 'next/link'

const announcements = [
  {
    id: 'revival-2025',
    text: '🔥 Annual Revival & Prophetic Conference — August 15–17, 2025 at Solution Center',
    link: '/events',
    linkLabel: 'Learn More',
  },
]

export default function AnnouncementBanner() {
  return null
  const [visible, setVisible] = useState(false)
  const announcement = announcements[0]

  useEffect(() => {
    const dismissed = sessionStorage.getItem(`banner-${announcement.id}`)
    if (!dismissed) setVisible(true)
  }, [announcement.id])

  const dismiss = () => {
    sessionStorage.setItem(`banner-${announcement.id}`, 'true')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="relative z-[60] bg-gold overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Megaphone className="w-4 h-4 text-background flex-shrink-0" />
              <p className="font-montserrat text-background text-xs font-semibold truncate">
                {announcement.text}
              </p>
              {announcement.link && (
                <Link
                  href={announcement.link}
                  className="hidden sm:inline font-montserrat text-xs font-bold text-background-alt underline underline-offset-2 hover:text-background transition-colors flex-shrink-0"
                >
                  {announcement.linkLabel} →
                </Link>
              )}
            </div>
            <button
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="w-6 h-6 flex items-center justify-center text-background-alt/60 hover:text-background transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
