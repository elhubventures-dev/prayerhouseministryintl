import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBanner from '@/components/ui/AnnouncementBanner'
import Newsletter from '@/components/ui/Newsletter'
import BlogDetailContent from './BlogDetailContent'

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts[params.slug]
  if (!post) return { title: 'Article Not Found | PHMI Blog' }
  return {
    title: `${post.title} | PHMI Blog`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.mainImage], type: 'article' },
  }
}

export default function BlogDetailPage({ params }: Props) {
  const post = posts[params.slug]
  return (
    <>
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
