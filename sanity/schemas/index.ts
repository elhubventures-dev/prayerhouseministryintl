// sanity/schemas/index.ts
// Run: npx sanity init --env .env.local (in /sanity subfolder)
// Then import these schemas into your sanity.config.ts

// ── SERMON SCHEMA ─────────────────────────────────────────────────────────
export const sermonSchema = {
  name: 'sermon',
  title: 'Sermons',
  type: 'document',
  icon: () => '🎤',
  fields: [
    { name: 'title', title: 'Sermon Title', type: 'string', validation: (R: any) => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (R: any) => R.required() },
    { name: 'speaker', title: 'Speaker', type: 'string', options: { list: ['Rev. Apostle E.S. Hugo', 'Prophetess Ekwalla Calista', 'Guest Speaker'] }, validation: (R: any) => R.required() },
    { name: 'publishedAt', title: 'Date Preached', type: 'datetime', validation: (R: any) => R.required() },
    { name: 'series', title: 'Sermon Series', type: 'string' },
    { name: 'duration', title: 'Duration (e.g. 45 min)', type: 'string' },
    { name: 'scripture', title: 'Key Scripture', type: 'string', placeholder: 'e.g. John 3:16' },
    { name: 'description', title: 'Short Description', type: 'text', rows: 3 },
    { name: 'youtubeId', title: 'YouTube Video ID', type: 'string', description: 'The ID after ?v= in the YouTube URL' },
    { name: 'thumbnail', title: 'Thumbnail Image', type: 'image', options: { hotspot: true } },
    { name: 'audioFile', title: 'Audio File (MP3)', type: 'file', options: { accept: 'audio/*' } },
    { name: 'notes', title: 'Sermon Notes', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } },
    { name: 'featured', title: 'Featured Sermon?', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { title: 'title', subtitle: 'speaker', media: 'thumbnail' },
    prepare: ({ title, subtitle, media }: any) => ({ title, subtitle: `Speaker: ${subtitle}`, media }),
  },
  orderings: [{ title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
}

// ── EVENT SCHEMA ──────────────────────────────────────────────────────────
export const eventSchema = {
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: () => '📅',
  fields: [
    { name: 'title', title: 'Event Title', type: 'string', validation: (R: any) => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'eventType', title: 'Event Type', type: 'string', options: { list: ['Conference', 'Special Service', 'Seminar', 'Outreach', 'Youth Event', 'All-Night Service', 'Monthly Service'] } },
    { name: 'startDate', title: 'Start Date & Time', type: 'datetime', validation: (R: any) => R.required() },
    { name: 'endDate', title: 'End Date & Time', type: 'datetime' },
    { name: 'time', title: 'Display Time (e.g. 6:00 PM daily)', type: 'string' },
    { name: 'location', title: 'Location', type: 'string', initialValue: 'Solution Center, Mile 4 Limbe' },
    { name: 'description', title: 'Description', type: 'text', rows: 4 },
    { name: 'image', title: 'Event Banner Image', type: 'image', options: { hotspot: true } },
    { name: 'registrationOpen', title: 'Registration Open?', type: 'boolean', initialValue: true },
    { name: 'capacity', title: 'Capacity / Who Can Attend', type: 'string', placeholder: 'e.g. Open to all / Women only' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } },
    { name: 'featured', title: 'Featured Event?', type: 'boolean', initialValue: false },
    { name: 'published', title: 'Published?', type: 'boolean', initialValue: true },
  ],
  preview: {
    select: { title: 'title', subtitle: 'startDate', media: 'image' },
    prepare: ({ title, subtitle, media }: any) => ({
      title,
      subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'Date TBD',
      media,
    }),
  },
}

// ── BLOG POST SCHEMA ──────────────────────────────────────────────────────
export const postSchema = {
  name: 'post',
  title: 'Blog / Devotionals',
  type: 'document',
  icon: () => '📝',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (R: any) => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'author', title: 'Author', type: 'string', options: { list: ['Rev. Apostle E.S. Hugo', 'Prophetess Ekwalla Calista', 'PHMI Editorial Team'] }, initialValue: 'PHMI Editorial Team' },
    { name: 'publishedAt', title: 'Publish Date', type: 'datetime', validation: (R: any) => R.required() },
    { name: 'mainImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'excerpt', title: 'Excerpt (short summary)', type: 'text', rows: 3, validation: (R: any) => R.max(200) },
    { name: 'scripture', title: 'Key Scripture', type: 'string' },
    { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }], options: { list: ['Devotional', 'Teaching', 'Testimony', 'Prayer Points', 'Prophecy', 'Announcement', 'Kingdom Living'] } },
    { name: 'body', title: 'Article Body', type: 'array', of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'H2', value: 'h2' }, { title: 'H3', value: 'h3' }, { title: 'Quote', value: 'blockquote' }], marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }, { title: 'Underline', value: 'underline' }], annotations: [{ name: 'link', type: 'object', title: 'Link', fields: [{ name: 'href', type: 'url', title: 'URL' }] }] } }, { type: 'image', options: { hotspot: true } }] },
    { name: 'estimatedReadingTime', title: 'Reading Time (mins)', type: 'number' },
    { name: 'featured', title: 'Featured Post?', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { title: 'title', subtitle: 'author', media: 'mainImage' },
    prepare: ({ title, subtitle, media }: any) => ({ title, subtitle: `By ${subtitle}`, media }),
  },
  orderings: [{ title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
}

// ── GALLERY ITEM SCHEMA ───────────────────────────────────────────────────
export const galleryItemSchema = {
  name: 'galleryItem',
  title: 'Gallery Photos',
  type: 'document',
  icon: () => '📸',
  fields: [
    { name: 'caption', title: 'Caption', type: 'string', validation: (R: any) => R.required() },
    { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true }, validation: (R: any) => R.required() },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Worship', 'Events', 'Community', 'Outreach', 'Leadership'] } },
    { name: 'takenAt', title: 'Date Taken', type: 'date' },
    { name: 'featured', title: 'Featured?', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { title: 'caption', subtitle: 'category', media: 'image' },
  },
}

// ── TESTIMONIAL SCHEMA ────────────────────────────────────────────────────
export const testimonialSchema = {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: () => '✨',
  fields: [
    { name: 'name', title: 'Name (or initials)', type: 'string', validation: (R: any) => R.required() },
    { name: 'role', title: 'Member Since / Role', type: 'string' },
    { name: 'testimony', title: 'Testimony', type: 'text', rows: 5, validation: (R: any) => R.required().min(50).max(500) },
    { name: 'approved', title: 'Approved for Display?', type: 'boolean', initialValue: false },
    { name: 'featured', title: 'Featured?', type: 'boolean', initialValue: false },
    { name: 'submittedAt', title: 'Submitted At', type: 'datetime' },
  ],
  preview: {
    select: { title: 'name', subtitle: 'testimony' },
    prepare: ({ title, subtitle }: any) => ({ title, subtitle: subtitle?.substring(0, 80) + '...' }),
  },
}

// ── EXPORT ALL SCHEMAS ────────────────────────────────────────────────────
export const schemaTypes = [sermonSchema, eventSchema, postSchema, galleryItemSchema, testimonialSchema]
