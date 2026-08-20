'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import MomoGiveCard from '@/components/ui/MomoGiveCard'
import BankGiveCard from '@/components/ui/BankGiveCard'
import { BANK_WHATSAPP_MESSAGE, MOMO_WHATSAPP_MESSAGE } from '@/lib/giving'

interface GiveModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GiveModal({ isOpen, onClose }: GiveModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="give-modal-title"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full max-w-3xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-card p-6 sm:p-8 relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-2xl" />
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-gold transition-colors"
                aria-label="Close giving details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8 pr-8">
                <p className="section-label mb-2">Partner With Us</p>
                <h3 id="give-modal-title" className="font-cinzel text-2xl text-foreground font-bold mb-2">
                  Ways to Give
                </h3>
                <p className="font-inter text-muted-foreground text-sm">
                  Sow your tithe, offering, or seed by Mobile Money or bank transfer.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <MomoGiveCard />
                <BankGiveCard />
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={`https://wa.me/237653270752?text=${encodeURIComponent(MOMO_WHATSAPP_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass text-sm flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" /> Confirm MoMo on WhatsApp
                </a>
                <a
                  href={`https://wa.me/237653270752?text=${encodeURIComponent(BANK_WHATSAPP_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass text-sm flex items-center gap-2"
                >
                  Confirm bank transfer on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
