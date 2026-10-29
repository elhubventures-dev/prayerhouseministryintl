export type WeddingPhoto = {
  src: string
  caption: string
  galleryCaption?: string
}

export const WEDDING = {
  groom: 'Agha Pride Ata',
  bride: 'Azah Bertilla Taku',
  coupleNames: 'Agha Pride Ata & Azah Bertilla Taku',
  dateDisplay: '24 October 2026',
  dateIso: '2026-10-24',
  location: 'Solution Center, Mile 4 Limbe',
  locationShort: 'Limbe, Cameroon',
  officiant: 'Rev. Apostle E.S. Hugo',
  officiantFull: 'Pastor Ekwalla Samuel Hugo',
  scripture: {
    text: 'Therefore what God has joined together, let no man separate.',
    reference: 'Mark 10:9',
  },
  headline: 'United in Holy Matrimony',
  teaserBlurb:
    'On 24 October 2026, Agha Pride Ata and Azah Bertilla Taku were joined in holy matrimony at Solution Center, Mile 4 Limbe — a joyful day of worship, covenant, and celebration.',
  story: [
    'Prayer House Ministry International was honoured to host the Christian marriage of Agha Pride Ata and Azah Bertilla Taku on Saturday, 24 October 2026.',
    'In the presence of God, family, and the church, the couple exchanged vows at Solution Center, Mile 4 Limbe. The ceremony was officiated by Rev. Apostle E.S. Hugo (Pastor Ekwalla Samuel Hugo), with the house rejoicing as two lives became one in Christ.',
    'From solemn prayer to joyful praise, the day reflected the heart of Solution Center — a place where covenant is sealed in the Word, and love is celebrated before the Lord.',
  ],
  featuredImage: '/images/wedding/wedding-07.jpg',
  teaserImages: [
    '/images/wedding/wedding-07.jpg',
    '/images/wedding/wedding-03.jpg',
    '/images/wedding/wedding-14.jpg',
  ] as const,
  path: '/wedding',
} as const

export const weddingPhotos: WeddingPhoto[] = [
  {
    src: '/images/wedding/wedding-01.jpg',
    caption: 'Joy fills the sanctuary as the house prepares for a covenant celebration.',
    galleryCaption: 'Wedding day joy at Solution Center',
  },
  {
    src: '/images/wedding/wedding-02.jpg',
    caption: 'A tender moment before the Lord as love is sealed in prayer.',
    galleryCaption: 'Covenant moment — Ata & Taku wedding',
  },
  {
    src: '/images/wedding/wedding-03.jpg',
    caption: 'Standing face to face — vows spoken, hearts joined, Christ at the centre.',
    galleryCaption: 'Exchange of vows at PHMI',
  },
  {
    src: '/images/wedding/wedding-04.jpg',
    caption: 'The bridal party stands with the couple as witnesses of God\'s faithfulness.',
    galleryCaption: 'Bridal party with the couple',
  },
  {
    src: '/images/wedding/wedding-05.jpg',
    caption: 'Family and friends gather to honour what God is joining together.',
    galleryCaption: 'Guests celebrate holy matrimony',
  },
  {
    src: '/images/wedding/wedding-06.jpg',
    caption: 'Sacred stillness in the ceremony — two becoming one.',
    galleryCaption: 'Ceremony at Solution Center',
  },
  {
    src: '/images/wedding/wedding-07.jpg',
    caption: 'Agha Pride Ata and Azah Bertilla Taku — husband and wife in Christ.',
    galleryCaption: 'Mr & Mrs Ata — October 2026',
  },
  {
    src: '/images/wedding/wedding-08.jpg',
    caption: 'Grace and beauty on the wedding aisle at Solution Center.',
    galleryCaption: 'Bride and groom at the altar',
  },
  {
    src: '/images/wedding/wedding-09.jpg',
    caption: 'Smiles that tell the story — a new chapter begins in Limbe.',
    galleryCaption: 'Celebrating covenant love',
  },
  {
    src: '/images/wedding/wedding-10.jpg',
    caption: 'Surrounded by love, the couple receives the blessing of the house.',
    galleryCaption: 'Blessing over the newlyweds',
  },
  {
    src: '/images/wedding/wedding-11.jpg',
    caption: 'Worship rises as heaven and earth rejoice with the couple.',
    galleryCaption: 'Worship during the wedding',
  },
  {
    src: '/images/wedding/wedding-12.jpg',
    caption: 'Hands joined, futures woven — a covenant sealed in faith.',
    galleryCaption: 'United before God',
  },
  {
    src: '/images/wedding/wedding-13.jpg',
    caption: 'The church family witnesses a holy union at Prayer House.',
    galleryCaption: 'Church family as witnesses',
  },
  {
    src: '/images/wedding/wedding-14.jpg',
    caption: 'Dancing before the Lord — joy uncontained after the vows.',
    galleryCaption: 'Celebration dance at PHMI',
  },
  {
    src: '/images/wedding/wedding-15.jpg',
    caption: 'Praise breaks out as the newlyweds step into married life.',
    galleryCaption: 'Praise after the ceremony',
  },
  {
    src: '/images/wedding/wedding-16.jpg',
    caption: 'Every step of the dance declares: God is good.',
    galleryCaption: 'Joyful praise with the couple',
  },
  {
    src: '/images/wedding/wedding-17.jpg',
    caption: 'Celebration fills Solution Center from aisle to altar.',
    galleryCaption: 'Wedding celebration in Limbe',
  },
  {
    src: '/images/wedding/wedding-18.jpg',
    caption: 'Ministry leaders honour the solemn beauty of Christian marriage.',
    galleryCaption: 'Leaders witnessing the vows',
  },
  {
    src: '/images/wedding/wedding-19.jpg',
    caption: 'A house that prays also knows how to rejoice.',
    galleryCaption: 'Rejoicing with the newlyweds',
  },
  {
    src: '/images/wedding/wedding-20.jpg',
    caption: 'Clergy and couple — a portrait of covenant sealed under pastoral covering.',
    galleryCaption: 'With the officiating ministers',
  },
  {
    src: '/images/wedding/wedding-21.jpg',
    caption: 'Bridal attendants stand with Azah Bertilla Taku on her wedding day.',
    galleryCaption: 'Bride with her attendants',
  },
  {
    src: '/images/wedding/wedding-22.jpg',
    caption: 'Pastoral covering over the ceremony — prayer, Word, and blessing.',
    galleryCaption: 'Clergy at the wedding service',
  },
  {
    src: '/images/wedding/wedding-23.jpg',
    caption: 'Honouring the Word as husband and wife are recognised before God.',
    galleryCaption: 'Ministry presence at the altar',
  },
  {
    src: '/images/wedding/wedding-24.jpg',
    caption: 'Eyes closed in worship — the true centre of the day.',
    galleryCaption: 'Worship during holy matrimony',
  },
  {
    src: '/images/wedding/wedding-25.jpg',
    caption: 'Prayer rises over the celebration — Christ remains the foundation.',
    galleryCaption: 'Prayer covering the wedding',
  },
]

export function weddingGalleryItems() {
  return weddingPhotos.map((photo) => ({
    src: photo.src,
    category: 'Weddings' as const,
    caption: photo.galleryCaption ?? photo.caption,
  }))
}
