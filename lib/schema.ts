import { SITE, absoluteUrl } from '@/lib/site'

export type JsonLd = Record<string, unknown>

const churchId = `${SITE.url}/#church`
const websiteId = `${SITE.url}/#website`
const logoId = `${SITE.url}/#logo`

export function churchOrganizationSchema(): JsonLd {
  return {
    '@type': 'Church',
    '@id': churchId,
    name: SITE.name,
    alternateName: [SITE.alternateName, SITE.shortName],
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.telephone,
    image: absoluteUrl(SITE.ogImage),
    logo: { '@id': logoId },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    hasMap: 'https://maps.google.com/?q=Mile+4+Limbe+Cameroon',
    areaServed: [
      { '@type': 'City', name: 'Limbe' },
      { '@type': 'AdministrativeArea', name: 'South West Region' },
      { '@type': 'Country', name: 'Cameroon' },
    ],
    openingHoursSpecification: SITE.serviceTimes.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.day,
      opens: s.opens,
      closes: s.closes,
      name: s.name,
    })),
    founder: SITE.founders.map((f) => ({
      '@type': 'Person',
      name: f.name,
      jobTitle: f.jobTitle,
    })),
  }
}

export function logoSchema(): JsonLd {
  return {
    '@type': 'ImageObject',
    '@id': logoId,
    url: absoluteUrl(SITE.logo),
    contentUrl: absoluteUrl(SITE.logo),
    caption: SITE.name,
  }
}

export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: SITE.url,
    name: SITE.name,
    alternateName: SITE.alternateName,
    inLanguage: SITE.language,
    publisher: { '@id': churchId },
  }
}

export function globalGraphSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [logoSchema(), churchOrganizationSchema(), websiteSchema()],
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqPageSchema(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function personSchema(person: { name: string; jobTitle: string; path?: string }): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    worksFor: { '@id': churchId },
    url: absoluteUrl(person.path || '/about'),
  }
}

export function articleSchema(input: {
  title: string
  description: string
  path: string
  image?: string
  author: string
  datePublished: string
  dateModified?: string
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    image: absoluteUrl(input.image || SITE.ogImage),
    author: { '@type': 'Person', name: input.author },
    publisher: { '@id': churchId },
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(input.path) },
  }
}

export function videoObjectSchema(input: {
  name: string
  description: string
  thumbnail: string
  uploadDate: string
  youtubeId: string
  duration?: string
}): JsonLd | null {
  if (!input.youtubeId || input.youtubeId === 'dQw4w9WgXcQ') return null
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: input.name,
    description: input.description,
    thumbnailUrl: absoluteUrl(input.thumbnail),
    uploadDate: input.uploadDate,
    embedUrl: `https://www.youtube.com/embed/${input.youtubeId}`,
    publisher: { '@id': churchId },
    ...(input.duration ? { duration: input.duration } : {}),
  }
}

export function eventSchema(input: {
  name: string
  startDate: string
  endDate?: string
  locationName?: string
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: input.name,
    startDate: input.startDate,
    ...(input.endDate ? { endDate: input.endDate } : {}),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: input.locationName || SITE.alternateName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.locality,
        addressCountry: SITE.address.country,
      },
    },
    organizer: { '@id': churchId },
  }
}

export function definedTermSetSchema(
  terms: { name: string; description: string }[]
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: `${SITE.shortName} glossary`,
    hasDefinedTerm: terms.map((term) => ({
      '@type': 'DefinedTerm',
      name: term.name,
      description: term.description,
    })),
  }
}
