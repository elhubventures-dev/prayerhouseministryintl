import type { Viewport } from 'next'
import '../styles/globals.css'
import PWARegister from '@/components/ui/PWARegister'
import WhatsAppWidget from '@/components/ui/WhatsAppWidget'
import GoogleAnalytics from '@/components/seo/GoogleAnalytics'
import JsonLd from '@/components/seo/JsonLd'
import { defaultMetadata } from '@/lib/seo'
import { globalGraphSchema } from '@/lib/schema'
import { cinzel, playfair, inter, montserrat, garamond } from './fonts'

export const viewport: Viewport = {
  themeColor: '#C9A84C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata = defaultMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${cinzel.variable} ${playfair.variable} ${inter.variable} ${montserrat.variable} ${garamond.variable}`}
    >
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <GoogleAnalytics />
        <JsonLd data={globalGraphSchema()} />
        {children}
        <PWARegister />
        <WhatsAppWidget />
      </body>
    </html>
  )
}
