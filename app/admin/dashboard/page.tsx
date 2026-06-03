'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Megaphone, Calendar, BookOpen, Users,
  LogOut, Plus, Trash2, Eye, EyeOff, Edit2, Save, X,
  TrendingUp, Mail, Play, Heart, Cross, CheckCircle2, AlertCircle
} from 'lucide-react'

type Tab = 'overview' | 'announcements' | 'events' | 'prayers'

interface AdminData {
  stats: { totalVisits: number; prayerRequestsThisMonth: number; newsletterSubscribers: number; sermonsWatched: number }
  announcements: Array<{ id: string; text: string; link: string; linkLabel: string; active: boolean; createdAt: string }>
  events: Array<{ id: string; title: string; type: string; dates: string; time: string; location: string; published: boolean }>
  prayerRequests: Array<{ id: string; name: string; request: string; anonymous: boolean; createdAt: string; handled: boolean }>
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'prayers', label: 'Prayer Requests', icon: Heart },
]

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('overview')
  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [newAnn, setNewAnn] = useState({ text: '', link: '', linkLabel: 'Learn More' })
  const [showAnnForm, setShowAnnForm] = useState(false)
  const router = useRouter()

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin')
      if (res.status === 401) { router.push('/admin/login'); return }
      const json = await res.json()
      setData(json)
    } catch { showToast('Failed to load data', 'error') }
    finally { setLoading(false) }
  }, [router])

  useEffect(() => { fetchData() }, [fetchData])

  const adminAction = async (action: string, payload: Record<string, any> = {}) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...payload }),
      })
      if (!res.ok) throw new Error()
      await fetchData()
      return true
    } catch {
      showToast('Action failed', 'error')
      return false
    }
  }

  const handleLogout = async () => {
    await adminAction('logout')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          <p className="font-inter text-silver text-sm">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = data?.stats
  const statCards = [
    { label: 'Total Visits', value: stats?.totalVisits?.toLocaleString() || '0', icon: TrendingUp, color: 'text-blue-400' },
    { label: 'Prayer Requests', value: stats?.prayerRequestsThisMonth || '0', icon: Heart, color: 'text-red-400' },
    { label: 'Newsletter Subs', value: stats?.newsletterSubscribers || '0', icon: Mail, color: 'text-green-400' },
    { label: 'Sermons Watched', value: stats?.sermonsWatched || '0', icon: Play, color: 'text-gold' },
  ]

  return (
    <div className="min-h-screen bg-navy-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy border-r border-gold/10 flex flex-col fixed top-0 left-0 bottom-0 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-gold/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
              <Cross className="w-4 h-4 text-gold" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-cinzel text-xs font-bold text-gold">PHMI Admin</p>
              <p className="font-inter text-[10px] text-silver/50">Solution Center</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-montserrat text-xs font-semibold transition-all duration-200 ${
                tab === id
                  ? 'bg-gold/10 text-gold border border-gold/20'
                  : 'text-silver hover:text-gold hover:bg-gold/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        {/* Links */}
        <div className="p-4 border-t border-gold/10 space-y-2">
          <a href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-montserrat text-xs text-silver hover:text-gold hover:bg-gold/5 transition-all">
            <Eye className="w-4 h-4" /> View Website
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-montserrat text-xs text-silver hover:text-red-400 hover:bg-red-400/5 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8 min-h-screen">
        <AnimatePresence mode="wait">

          {/* ── OVERVIEW ── */}
          {tab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h1 className="font-cinzel text-2xl text-ivory font-bold mb-2">Dashboard Overview</h1>
              <p className="font-inter text-silver/60 text-sm mb-8">Welcome back. Here's what's happening at Solution Center.</p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {statCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <div key={card.label} className="glass-card p-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                      <div className="flex items-start justify-between mb-4">
                        <Icon className={`w-5 h-5 ${card.color}`} />
                        <span className="font-montserrat text-[10px] text-silver/40 uppercase tracking-wider">This Month</span>
                      </div>
                      <p className="font-cinzel text-3xl font-bold text-ivory mb-1">{card.value}</p>
                      <p className="font-inter text-silver/60 text-xs">{card.label}</p>
                    </div>
                  )
                })}
              </div>

              {/* Quick actions */}
              <h2 className="font-cinzel text-base text-gold font-bold mb-5 uppercase tracking-wider">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Add Announcement', icon: Megaphone, action: () => { setTab('announcements'); setShowAnnForm(true) } },
                  { label: 'View Prayer Requests', icon: Heart, action: () => setTab('prayers') },
                  { label: 'Manage Events', icon: Calendar, action: () => setTab('events') },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <button key={item.label} onClick={item.action}
                      className="glass-card p-5 flex items-center gap-4 hover:border-gold/40 transition-all group text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <span className="font-montserrat text-sm font-semibold text-silver group-hover:text-ivory transition-colors">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ── ANNOUNCEMENTS ── */}
          {tab === 'announcements' && (
            <motion.div key="announcements" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="font-cinzel text-2xl text-ivory font-bold">Announcements</h1>
                  <p className="font-inter text-silver/60 text-sm mt-1">Manage the banner shown at the top of every page.</p>
                </div>
                <button onClick={() => setShowAnnForm(!showAnnForm)} className="btn-gold text-xs flex items-center gap-2 py-2.5 px-4">
                  <Plus className="w-4 h-4" /> New Announcement
                </button>
              </div>

              {/* New announcement form */}
              <AnimatePresence>
                {showAnnForm && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="glass-card p-6 mb-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
                    <h3 className="font-cinzel text-base text-gold font-bold mb-5">Create Announcement</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="md:col-span-3">
                        <label className="font-montserrat text-xs text-silver uppercase tracking-wider mb-2 block">Announcement Text *</label>
                        <input type="text" value={newAnn.text} onChange={(e) => setNewAnn({ ...newAnn, text: e.target.value })}
                          placeholder="e.g. 🔥 Annual Conference — August 15–17, 2025"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-montserrat text-xs text-silver uppercase tracking-wider mb-2 block">Link URL</label>
                        <input type="text" value={newAnn.link} onChange={(e) => setNewAnn({ ...newAnn, link: e.target.value })}
                          placeholder="/events"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-montserrat text-xs text-silver uppercase tracking-wider mb-2 block">Link Label</label>
                        <input type="text" value={newAnn.linkLabel} onChange={(e) => setNewAnn({ ...newAnn, linkLabel: e.target.value })}
                          placeholder="Learn More"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm font-inter placeholder-silver/30 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={async () => {
                        if (!newAnn.text) return showToast('Announcement text is required', 'error')
                        const ok = await adminAction('create-announcement', { ...newAnn })
                        if (ok) { setNewAnn({ text: '', link: '', linkLabel: 'Learn More' }); setShowAnnForm(false); showToast('Announcement created!') }
                      }} className="btn-gold text-xs px-5 py-2.5 flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save
                      </button>
                      <button onClick={() => setShowAnnForm(false)} className="btn-glass text-xs px-5 py-2.5">Cancel</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Announcements list */}
              <div className="space-y-4">
                {(data?.announcements || []).map((ann) => (
                  <div key={ann.id} className={`glass-card p-5 flex items-start gap-4 ${!ann.active ? 'opacity-50' : ''}`}>
                    <div className="flex-1 min-w-0">
                      <p className="font-inter text-ivory text-sm mb-1">{ann.text}</p>
                      {ann.link && <p className="font-inter text-silver/50 text-xs">Link: {ann.link} → "{ann.linkLabel}"</p>}
                      <p className="font-inter text-silver/30 text-xs mt-1">Created {new Date(ann.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => { adminAction('toggle-announcement', { id: ann.id }); showToast(ann.active ? 'Announcement hidden' : 'Announcement shown') }}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${ann.active ? 'bg-gold/10 text-gold hover:bg-gold/20' : 'bg-white/5 text-silver/40 hover:text-silver'}`}
                        title={ann.active ? 'Hide' : 'Show'}
                      >
                        {ann.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => { adminAction('delete-announcement', { id: ann.id }); showToast('Announcement deleted') }}
                        className="w-8 h-8 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 flex items-center justify-center transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {(data?.announcements || []).length === 0 && (
                  <div className="glass-card p-10 text-center">
                    <Megaphone className="w-10 h-10 text-gold/30 mx-auto mb-3" />
                    <p className="font-inter text-silver/50 text-sm">No announcements yet. Create one above.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── EVENTS ── */}
          {tab === 'events' && (
            <motion.div key="events" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="font-cinzel text-2xl text-ivory font-bold">Events</h1>
                  <p className="font-inter text-silver/60 text-sm mt-1">Manage upcoming services and special events.</p>
                </div>
                <a href="/events" target="_blank" className="btn-glass text-xs flex items-center gap-2 py-2.5 px-4">
                  <Eye className="w-4 h-4" /> View Live Page
                </a>
              </div>
              <div className="space-y-4">
                {(data?.events || []).map((evt) => (
                  <div key={evt.id} className="glass-card p-5 flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-playfair text-ivory text-base font-semibold">{evt.title}</p>
                        <span className={`font-montserrat text-[9px] px-2 py-0.5 rounded-full uppercase font-bold ${evt.published ? 'bg-green-400/10 text-green-400' : 'bg-silver/10 text-silver/50'}`}>
                          {evt.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="font-inter text-silver/60 text-xs">{evt.dates} · {evt.time} · {evt.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { adminAction('delete-event', { id: evt.id }); showToast('Event deleted') }}
                        className="w-8 h-8 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 flex items-center justify-center transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {(data?.events || []).length === 0 && (
                  <div className="glass-card p-10 text-center">
                    <Calendar className="w-10 h-10 text-gold/30 mx-auto mb-3" />
                    <p className="font-inter text-silver/50 text-sm">No events. Add events through Sanity CMS for full management.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── PRAYER REQUESTS ── */}
          {tab === 'prayers' && (
            <motion.div key="prayers" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="mb-8">
                <h1 className="font-cinzel text-2xl text-ivory font-bold">Prayer Requests</h1>
                <p className="font-inter text-silver/60 text-sm mt-1">Review and respond to submitted prayer requests.</p>
              </div>
              <div className="space-y-4">
                {(data?.prayerRequests || []).map((prayer) => (
                  <div key={prayer.id} className={`glass-card p-6 relative ${prayer.handled ? 'opacity-60' : ''}`}>
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent rounded-t-2xl" />
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-montserrat text-xs font-bold text-gold uppercase tracking-wider">
                            {prayer.anonymous ? 'Anonymous' : prayer.name}
                          </p>
                          {prayer.handled && (
                            <span className="font-montserrat text-[9px] bg-green-400/10 text-green-400 px-2 py-0.5 rounded-full uppercase font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Handled
                            </span>
                          )}
                        </div>
                        <p className="font-inter text-silver text-sm leading-relaxed">{prayer.request}</p>
                        <p className="font-inter text-silver/30 text-xs mt-2">{new Date(prayer.createdAt).toLocaleDateString()}</p>
                      </div>
                      {!prayer.handled && (
                        <button onClick={() => { adminAction('handle-prayer', { id: prayer.id }); showToast('Marked as handled') }}
                          className="btn-glass text-xs px-4 py-2 flex items-center gap-1.5 flex-shrink-0"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Mark Handled
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {(data?.prayerRequests || []).length === 0 && (
                  <div className="glass-card p-10 text-center">
                    <Heart className="w-10 h-10 text-gold/30 mx-auto mb-3" />
                    <p className="font-inter text-silver/50 text-sm">No prayer requests yet. They will appear here when submitted.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`fixed bottom-6 left-1/2 z-[999] flex items-center gap-2 px-5 py-3 rounded-full font-montserrat text-xs font-semibold shadow-lg ${
              toast.type === 'success'
                ? 'bg-gold text-navy-dark'
                : 'bg-red-400 text-white'
            }`}
          >
            {toast.type === 'success'
              ? <CheckCircle2 className="w-4 h-4" />
              : <AlertCircle className="w-4 h-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
