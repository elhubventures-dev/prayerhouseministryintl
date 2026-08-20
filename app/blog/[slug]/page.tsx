import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import Newsletter from '@/components/ui/Newsletter'
import BlogDetailContent from './BlogDetailContent'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'

const posts: Record<string, any> = {
  'the-secret-place-of-prayer': {
    title: 'The Secret Place: Why Your Private Prayer Life Changes Everything',
    author: 'Rev. Apostle E.S. Hugo',
    publishedAt: '2025-07-14',
    mainImage: '/images/phmi-10.jpeg',
    categories: ['Devotional', 'Prayer Points'],
    estimatedReadingTime: 5,
    scripture: '"But when you pray, go into your room, close the door and pray to your Father, who is unseen." — Matthew 6:6',
    excerpt: 'Jesus consistently withdrew to pray alone. Not because He needed to impress God, but because He understood that the source of all public power is private communion.',
    body: [
      { type: 'paragraph', text: 'In the ministry of Jesus, there is a pattern that is easy to miss if you only focus on the miracles. Before every major moment — before healing the multitudes, before choosing His disciples, before facing the cross — Jesus withdrew. He went to a solitary place. He prayed.' },
      { type: 'paragraph', text: 'This was not religious discipline for its own sake. It was the refuelling of a life lived fully poured out. Jesus understood something that most of us spend years trying to learn: the depth of your public anointing is always determined by the depth of your private communion.' },
      { type: 'heading', text: 'What Is the Secret Place?' },
      { type: 'paragraph', text: 'The secret place is not a physical location. It is a posture of the heart. It is the intentional, unhurried, consistent space you create between you and God — away from performance, away from noise, away from the need to be seen.' },
      { type: 'paragraph', text: 'In the secret place, you are not a minister, a parent, a professional, or a church member. You are simply a child before the Father. And it is in this naked vulnerability that the most powerful transformations occur.' },
      { type: 'quote', text: '"The secret of the greatest of all is always what happens in the smallest room — the room of prayer."', attribution: 'Rev. Apostle E.S. Hugo' },
      { type: 'heading', text: 'Why Most Believers Struggle Here' },
      { type: 'paragraph', text: 'The honest answer is that we have been shaped by a culture that rewards output and visibility. We are comfortable when we can measure progress. But prayer, especially in the secret place, produces results that are often invisible at first — a shifted perspective, a softened heart, a growing sensitivity to the Spirit.' },
      { type: 'paragraph', text: 'The enemy knows that if he can keep you busy, distracted, or discouraged about prayer, he can neutralize your effectiveness without ever confronting your theology. Many believers have correct doctrine but weak power — and the bridge between them is the secret place.' },
      { type: 'heading', text: 'Three Practices for Your Secret Place' },
      { type: 'paragraph', text: 'First, protect the time. Block it in your schedule as you would a medical appointment. Second, begin with worship before petition. Come into His presence with thanksgiving before you bring your list. Third, cultivate silence. Ask God to speak, then wait. The ability to hear is trained in stillness.' },
      { type: 'paragraph', text: 'Your secret place is the most productive space in your life. Guard it. Invest in it. Let it become the place where heaven and earth intersect in your story.' },
    ],
    relatedPosts: [
      { slug: '7-daily-declarations-for-breakthrough', title: '7 Daily Declarations for Supernatural Breakthrough', mainImage: '/images/phmi-11.jpg', estimatedReadingTime: 4, categories: ['Prayer Points'] },
      { slug: 'walking-in-prophetic-purpose', title: 'Walking in Prophetic Purpose: Knowing the Season You Are In', mainImage: '/images/phmi-13.jpeg', estimatedReadingTime: 7, categories: ['Prophecy'] },
    ],
  },
}

type Props = { params: { slug: string } }

const listingMeta: Record<string, { title: string; excerpt: string; image: string; author: string; date: string }> = {
  'the-secret-place-of-prayer': {
    title: 'The Secret Place: Why Your Private Prayer Life Changes Everything',
    excerpt: 'Jesus withdrew to pray before every major moment. Your public fruit is rooted in private communion with the Father.',
    image: '/images/phmi-10.jpeg',
    author: 'Rev. Apostle E.S. Hugo',
    date: '2025-07-14',
  },
  'walking-in-prophetic-purpose': {
    title: 'Walking in Prophetic Purpose: Knowing the Season You Are In',
    excerpt: 'Discerning your season is the difference between striving and flowing. A prophetic believer understands time.',
    image: '/images/phmi-13.jpeg',
    author: 'Prophetess Ekwalla Calista',
    date: '2025-07-07',
  },
  'from-broken-to-blessed': {
    title: 'From Broken to Blessed: My Testimony of Restoration',
    excerpt: 'A testimony of restoration from Solution Center in Limbe — how the house of prayer became a birthplace of destiny.',
    image: '/images/phmi-5.jpeg',
    author: 'PHMI Editorial Team',
    date: '2025-06-30',
  },
  '7-daily-declarations-for-breakthrough': {
    title: '7 Daily Declarations for Supernatural Breakthrough',
    excerpt: 'Seven Scripture-rooted declarations you can pray each morning to shape the atmosphere of your life.',
    image: '/images/phmi-6.jpeg',
    author: 'Prophetess Ekwalla Calista',
    date: '2025-06-22',
  },
  'understanding-the-tithe': {
    title: 'Understanding the Tithe: Kingdom Economics That Work',
    excerpt: 'Tithing is a kingdom partnership, not a religious tax. Learn how PHMI teaches generous, biblical giving.',
    image: '/images/phmi-7.jpeg',
    author: 'Rev. Apostle E.S. Hugo',
    date: '2025-06-15',
  },
  'raising-spirit-filled-children': {
    title: 'Raising Spirit-Filled Children in a Digital World',
    excerpt: 'A practical biblical framework for parents who want children who love God in a noisy digital age.',
    image: '/images/phmi-8.jpeg',
    author: 'PHMI Editorial Team',
    date: '2025-06-08',
  },
}

export function generateStaticParams() {
  return Object.keys(listingMeta).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const full = posts[params.slug]
  const listing = listingMeta[params.slug]
  if (!full && !listing) return { title: 'Article not found', robots: { index: false, follow: false } }
  return pageMetadata({
    title: (full?.title || listing?.title || '').slice(0, 48),
    description: (full?.excerpt || listing?.excerpt || '').slice(0, 160),
    path: `/blog/${params.slug}`,
    ogType: 'article',
    image: full?.mainImage || listing?.image,
    publishedTime: full?.publishedAt || listing?.date,
  })
}

export default function BlogDetailPage({ params }: Props) {
  const post = posts[params.slug]
  return (
    <>
      {post && (
        <JsonLd
          data={[
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
              { name: post.title, path: `/blog/${params.slug}` },
            ]),
            articleSchema({
              title: post.title,
              description: post.excerpt,
              path: `/blog/${params.slug}`,
              image: post.mainImage,
              author: post.author,
              datePublished: post.publishedAt,
            }),
          ]}
        />
      )}
      <AnnouncementBanner />
      <Header />
      <main>
        <BlogDetailContent post={post} slug={params.slug} />
        <Newsletter variant="section" />
      </main>
      <Footer />
    </>
  )
}
