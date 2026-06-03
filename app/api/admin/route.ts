import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// ── Simple session token auth (replace with NextAuth in production) ──────
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'phmi-admin-2025'
const SESSION_TOKEN = process.env.SESSION_SECRET || 'phmi-session-secret-key'

// ── In-memory store (replace with Prisma/Supabase/MongoDB in production) ─
let adminData = {
  announcements: [
    {
      id: 'revival-2025',
      text: '🔥 Annual Revival & Prophetic Conference — October 15–17, 2026 at Solution Center',
      link: '/events',
      linkLabel: 'Learn More',
      active: true,
      createdAt: new Date().toISOString(),
    },
  ],
  events: [
    {
      id: 'evt-001',
      title: 'Annual Revival & Prophetic Conference 2026',
      type: 'Conference',
      dates: 'October 15–17, 2026',
      time: '6:00 PM daily',
      location: 'Solution Center, Mile 4 Limbe',
      description: 'Three nights of powerful worship, prophetic ministry, healing, and breakthrough.',
      targetDate: '2025-08-15T18:00:00',
      featured: true,
      published: true,
    },
  ],
  prayerRequests: [] as Array<{
    id: string; name: string; request: string; anonymous: boolean; createdAt: string; handled: boolean
  }>,
  stats: {
    totalVisits: 1247,
    prayerRequestsThisMonth: 34,
    newsletterSubscribers: 89,
    sermonsWatched: 412,
  },
}

// ── Auth helpers ─────────────────────────────────────────────────────────
function isAuthenticated(req: NextRequest) {
  const token = req.cookies.get('admin-session')?.value
  return token === SESSION_TOKEN
}

// ── LOGIN ─────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action } = body

    // Login
    if (action === 'login') {
      const { password } = body
      if (password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
      }
      const res = NextResponse.json({ success: true })
      res.cookies.set('admin-session', SESSION_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      })
      return res
    }

    // Logout
    if (action === 'logout') {
      const res = NextResponse.json({ success: true })
      res.cookies.delete('admin-session')
      return res
    }

    // Guard all other actions
    if (!isAuthenticated(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Create announcement
    if (action === 'create-announcement') {
      const { text, link, linkLabel } = body
      const newAnnouncement = {
        id: `ann-${Date.now()}`,
        text,
        link: link || '',
        linkLabel: linkLabel || 'Learn More',
        active: true,
        createdAt: new Date().toISOString(),
      }
      adminData.announcements.push(newAnnouncement)
      return NextResponse.json({ success: true, announcement: newAnnouncement })
    }

    // Toggle announcement
    if (action === 'toggle-announcement') {
      const { id } = body
      adminData.announcements = adminData.announcements.map((a) =>
        a.id === id ? { ...a, active: !a.active } : a
      )
      return NextResponse.json({ success: true })
    }

    // Delete announcement
    if (action === 'delete-announcement') {
      const { id } = body
      adminData.announcements = adminData.announcements.filter((a) => a.id !== id)
      return NextResponse.json({ success: true })
    }

    // Create event
    if (action === 'create-event') {
      const newEvent = { id: `evt-${Date.now()}`, ...body.event, published: true }
      adminData.events.push(newEvent)
      return NextResponse.json({ success: true, event: newEvent })
    }

    // Update event
    if (action === 'update-event') {
      const { id, event } = body
      adminData.events = adminData.events.map((e) => (e.id === id ? { ...e, ...event } : e))
      return NextResponse.json({ success: true })
    }

    // Delete event
    if (action === 'delete-event') {
      const { id } = body
      adminData.events = adminData.events.filter((e) => e.id !== id)
      return NextResponse.json({ success: true })
    }

    // Mark prayer request handled
    if (action === 'handle-prayer') {
      const { id } = body
      adminData.prayerRequests = adminData.prayerRequests.map((p) =>
        p.id === id ? { ...p, handled: true } : p
      )
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (error) {
    console.error('Admin API error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// ── GET — fetch admin data ────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({
    announcements: adminData.announcements,
    events: adminData.events,
    prayerRequests: adminData.prayerRequests,
    stats: adminData.stats,
  })
}
