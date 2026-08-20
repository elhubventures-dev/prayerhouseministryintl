'use client'

import { useState } from 'react'
import { Check, Copy, Smartphone } from 'lucide-react'
import { MOMO_DISPLAY, MOMO_NETWORK, MOMO_NUMBER } from '@/lib/giving'

export default function MomoGiveCard({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false)

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(MOMO_NUMBER)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  if (compact) {
    return (
      <p className="font-inter text-muted-foreground text-sm">
        {MOMO_NETWORK}:{' '}
        <span className="text-gold font-semibold tracking-wide">{MOMO_DISPLAY}</span>
      </p>
    )
  }

  return (
    <div className="glass-card w-full p-6 sm:p-8 relative text-left h-full">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-2xl" />
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
          <Smartphone className="w-5 h-5 text-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-montserrat text-[11px] uppercase tracking-[0.16em] text-gold mb-1">
            Give via Mobile Money
          </p>
          <h3 className="font-playfair text-xl text-foreground font-semibold mb-1">
            {MOMO_NETWORK}
          </h3>
          <p className="font-cinzel text-2xl sm:text-3xl text-gold tracking-widest mb-2">
            {MOMO_DISPLAY}
          </p>
          <p className="font-inter text-muted-foreground text-xs leading-relaxed">
            Send your tithe, offering, or seed directly to this MTN Mobile Money number.
            Use the number <span className="text-foreground font-medium">{MOMO_NUMBER}</span> in MoMo.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={copyNumber}
        className="btn-gold w-full mt-6 flex items-center justify-center gap-2 text-sm"
        aria-live="polite"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Number copied' : 'Copy MoMo number'}
      </button>
    </div>
  )
}
