import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.08)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] select-none pointer-events-none">
          <span className="font-cinzel text-[40vw] text-gold leading-none">✝</span>
        </div>

        <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
          <p className="font-cinzel text-8xl font-bold text-gold/30 mb-4">404</p>
          <h1 className="font-cinzel text-3xl text-foreground font-bold mb-4">Page Not Found</h1>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
          <p className="font-inter text-muted-foreground leading-relaxed mb-8">
            The page you're looking for doesn't exist or may have been moved.
            But you're not lost — God knows exactly where you are.
          </p>
          <p className="font-garamond italic text-gold/60 text-sm mb-10">
            "I know the plans I have for you, plans to prosper you." — Jeremiah 29:11
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn-gold text-sm px-8">
              Go Home
            </Link>
            <Link href="/contact" className="btn-glass text-sm px-8">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
