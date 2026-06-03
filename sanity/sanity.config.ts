import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'phmi-studio',
  title: 'PHMI — Solution Center CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content Manager')
          .items([
            S.listItem().title('📢 Sermons').schemaType('sermon').child(S.documentTypeList('sermon').title('All Sermons')),
            S.listItem().title('📅 Events').schemaType('event').child(S.documentTypeList('event').title('All Events')),
            S.listItem().title('✍️ Blog & Devotionals').schemaType('post').child(S.documentTypeList('post').title('All Posts')),
            S.listItem().title('📸 Gallery').schemaType('galleryItem').child(S.documentTypeList('galleryItem').title('All Photos')),
            S.listItem().title('✨ Testimonials').schemaType('testimonial').child(S.documentTypeList('testimonial').title('All Testimonials')),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})
