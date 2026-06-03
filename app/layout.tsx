import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'
import PWARegister from '@/components/ui/PWARegister'
import WhatsAppWidget from '@/components/ui/WhatsAppWidget'

const BASE_URL = 'https://prayerhouseministryintl.org'

export const viewport: Viewport = {
  themeColor: '#C9A84C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Prayer House Ministry International | Solution Center — Limbe, Cameroon',
    template: '%s | PHMI Solution Center',
  },
  description:
    'Prayer House Ministry International (Solution Center) is a Spirit-filled prophetic ministry in Limbe, Cameroon, dedicated to prayer, revival, worship, and biblical teaching under Rev. Apostle E.S. Hugo and Prophetess Ekwalla Calista.',
  keywords: [
    'church in Limbe', 'prayer ministry Cameroon', 'prophetic church',
    'Christian church Limbe', 'worship center Cameroon', 'Bible teaching church',
    'Solution Center Limbe', 'revival church Cameroon', 'Prayer House Ministry International',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Solution Center',
    startupImage: ['/icons/apple-splash-2048-2732.jpg'],
  },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    title: 'Prayer House Ministry International | Solution Center',
    description: 'Experience the power of God\'s presence. A Spirit-filled prophetic ministry in Limbe, Cameroon.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Prayer House Ministry International' }],
    locale: 'en_US',
    siteName: 'Prayer House Ministry International',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prayer House Ministry International | Limbe',
    description: 'Raising Lives Through Prayer, Worship & The Word.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  icons: {
    icon: [
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/icons/icon-192x192.png' }],
    shortcut: '/favicon.ico',
  },
  alternates: { canonical: BASE_URL },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  name: 'Prayer House Ministry International',
  alternateName: 'Solution Center',
  description: 'A Spirit-filled prophetic ministry in Limbe, Cameroon dedicated to prayer, worship, and the Word.',
  url: BASE_URL,
  telephone: '+237653270752',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Opposite Wotutu Okada Park, Mile 4',
    addressLocality: 'Limbe',
    addressCountry: 'CM',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 4.0167, longitude: 9.2167 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '18:00', closes: '20:00', name: 'Bible Study' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '16:00', closes: '18:00', name: 'Choir Rehearsal' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '09:00', closes: '12:00', name: 'Prophetic Service' },
  ],
  founder: [
    { '@type': 'Person', name: 'Rev. Apostle E.S. Hugo', jobTitle: 'Senior Apostle & Founder' },
    { '@type': 'Person', name: 'Prophetess Ekwalla Calista', jobTitle: 'Prophetess & Co-Leader' },
  ],
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href={BASE_URL} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-navy-dark text-ivory antialiased">
        {children}
        <PWARegister />
        <WhatsAppWidget />
      </body>
    </html>
  )
}
