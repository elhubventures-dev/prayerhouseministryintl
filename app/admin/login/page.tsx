'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, Cross } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password }),
      })

      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        const data = await res.json()
        setError(data.error || 'Invalid password. Please try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.08)_0%,transparent_65%)]" />
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="font-cinzel text-[50vw] text-gold leading-none">✝</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md p-10 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-2xl" />

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mb-4">
            <Cross className="w-7 h-7 text-gold" strokeWidth={1.5} />
          </div>
          <h1 className="font-cinzel text-xl text-ivory font-bold">Admin Portal</h1>
          <p className="font-inter text-silver/60 text-xs mt-1">Prayer House Ministry International</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="font-montserrat text-xs text-silver uppercase tracking-wider mb-2 block">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-silver/40" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-3.5 text-ivory text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-silver/40 hover:text-silver transition-colors"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-inter text-red-400 text-xs flex items-center gap-2"
            >
              ⚠️ {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full text-sm py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-navy-dark/30 border-t-navy-dark rounded-full animate-spin" /> Signing in...</>
            ) : (
              <><Lock className="w-4 h-4" /> Sign In to Admin</>
            )}
          </button>
        </form>

        <p className="text-center font-inter text-silver/30 text-xs mt-8">
          Set ADMIN_PASSWORD in your .env.local file<br />
          Default: <span className="text-silver/50">phmi-admin-2025</span>
        </p>
      </motion.div>
    </div>
  )
}
