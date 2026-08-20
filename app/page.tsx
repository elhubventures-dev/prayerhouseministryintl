import { preload } from 'react-dom'
import type { Metadata } from 'next'
import HomeContent from './HomeContent'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Church in Limbe, Cameroon',
  description:
    'Join Prayer House Ministry International (Solution Center) in Mile 4, Limbe — Sunday 9 AM prophetic service, prayer, worship, and Bible teaching.',
  path: '/',
  keywords: [
    'church in Limbe',
    'Solution Center Limbe',
    'Prayer House Ministry International Cameroon',
  ],
})

export default function Home() {
  preload('/images/hero-stage.png', { as: 'image' })
  preload('/images/4.png', { as: 'image' })

  return <HomeContent />
}
