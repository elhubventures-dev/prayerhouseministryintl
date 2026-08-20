'use client'

import { useState } from 'react'
import { Building2, Check, Copy } from 'lucide-react'
import { BANK_ACCOUNT_NUMBER, BANK_NAME } from '@/lib/giving'

export default function BankGiveCard() {
  const [copied, setCopied] = useState(false)

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(`${BANK_NAME}\n${BANK_ACCOUNT_NUMBER}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="glass-card w-full p-6 sm:p-8 relative text-left h-full">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-2xl" />
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
          <Building2 className="w-5 h-5 text-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-montserrat text-[11px] uppercase tracking-[0.16em] text-gold mb-1">
            Give via Bank Transfer
          </p>
          <h3 className="font-playfair text-lg sm:text-xl text-foreground font-semibold mb-3 leading-snug">
            {BANK_NAME}
          </h3>
          <dl className="space-y-2">
            <div>
              <dt className="font-montserrat text-[10px] uppercase tracking-wider text-muted-foreground">
                Account number
              </dt>
              <dd className="font-cinzel text-xl text-gold tracking-widest">{BANK_ACCOUNT_NUMBER}</dd>
            </div>
          </dl>
        </div>
      </div>
      <button
        type="button"
        onClick={copyAccount}
        className="btn-gold w-full mt-6 flex items-center justify-center gap-2 text-sm"
        aria-live="polite"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Details copied' : 'Copy bank details'}
      </button>
    </div>
  )
}
