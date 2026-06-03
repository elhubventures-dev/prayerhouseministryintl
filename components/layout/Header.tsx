'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Cross } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Sermons', href: '/sermons' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-md bg-background/90 border-b border-gold/10 shadow-glass'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img src="/images/logo.png" alt="PHMI Logo" className="w-full h-full object-contain" />
              </div>
              <div className="leading-tight">
                <p className="font-cinzel text-xs font-bold text-gold tracking-wider">PHMI</p>
                <p className="font-montserrat text-[10px] text-muted-foreground tracking-widest uppercase">Solution Center</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">

              <Link
                href="/#contact"
                className="btn-gold text-sm px-5 py-2.5 rounded-lg"
              >
                Join Us
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-gold transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-background-alt/95 border-l border-gold/10 p-8 flex flex-col"
            >
              {/* Close */}
              <button
                onClick={() => setMenuOpen(false)}
                className="self-end w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-gold transition-colors mb-8"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Logo in menu */}
              <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gold/10">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src="/images/logo.png" alt="PHMI Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="font-cinzel text-sm font-bold text-gold">PHMI</p>
                  <p className="font-montserrat text-[10px] text-muted-foreground tracking-widest uppercase">Solution Center</p>
                </div>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 py-3 px-4 rounded-lg font-montserrat text-sm font-medium text-muted-foreground hover:text-gold hover:bg-gold/5 transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTAs */}
              <div className="flex flex-col gap-3 pt-6 border-t border-gold/10">

                <Link
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="btn-gold text-sm text-center py-3 rounded-lg"
                >
                  Join Us This Sunday
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
