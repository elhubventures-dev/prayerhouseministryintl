/**
 * Canonical site identity. next.config.js 301s apex → www,
 * so every public URL, canonical, sitemap entry, and schema URL
 * must use the www host.
 */
function normalizeSiteUrl(raw: string) {
  const trimmed = raw.replace(/\/$/, '')
  if (trimmed === 'https://prayerhouseministryintl.org') {
    return 'https://www.prayerhouseministryintl.org'
  }
  return trimmed
}

export const SITE = {
  name: 'Prayer House Ministry International',
  shortName: 'PHMI Solution Center',
  alternateName: 'Solution Center',
  tagline: 'Raising Lives Through Prayer, Worship & The Word',
  description:
    'Prayer House Ministry International (Solution Center) is a Spirit-filled prophetic church in Mile 4, Limbe, Cameroon — dedicated to prayer, revival, worship, and biblical teaching.',
  url: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://www.prayerhouseministryintl.org'
  ),
  locale: 'en_US',
  language: 'en',
  logo: '/images/logo.png',
  ogImage: '/images/og-image.jpg',
  telephone: '+237653270752',
  telephoneDisplay: '653 270 752',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '',
  address: {
    street: 'Opposite Wotutu Okada Park, Mile 4',
    locality: 'Limbe',
    region: 'South West',
    country: 'CM',
    countryName: 'Cameroon',
  },
  geo: { latitude: 4.0167, longitude: 9.2167 },
  founders: [
    { name: 'Rev. Apostle E.S. Hugo', jobTitle: 'Senior Apostle & Founder' },
    { name: 'Prophetess Ekwalla Calista', jobTitle: 'Prophetess & Co-Leader' },
  ],
  serviceTimes: [
    { day: 'Wednesday', name: 'Bible Study', opens: '18:00', closes: '20:00', display: '6:00 PM' },
    { day: 'Saturday', name: 'Choir Rehearsal', opens: '16:00', closes: '18:00', display: '4:00 PM' },
    { day: 'Sunday', name: 'Prophetic Service', opens: '09:00', closes: '12:00', display: '9:00 AM' },
  ],
} as const

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return SITE.url
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
