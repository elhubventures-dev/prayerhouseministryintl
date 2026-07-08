// Service Worker — Prayer House Ministry International
// Caches key assets for offline access

const CACHE_NAME = 'phmi-v2'
const STATIC_CACHE = 'phmi-static-v2'
const DYNAMIC_CACHE = 'phmi-dynamic-v2'

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/about',
  '/sermons',
  '/events',
  '/ministries',
  '/gallery',
  '/contact',
  '/blog',
  '/manifest.json',
  '/offline.html',
]

// ── Install ────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Pre-caching static assets')
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// ── Activate ───────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// ── Fetch — Stale-While-Revalidate strategy ────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Skip non-GET and API requests
  if (request.method !== 'GET') return
  if (request.url.includes('/api/')) return

  // For navigation — serve from cache, fallback to offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone))
          return res
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('/offline.html'))
        )
    )
    return
  }

  // For assets (images, fonts, scripts) — cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request).then((res) => {
        if (res.status === 200) {
          const clone = res.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone))
        }
        return res
      })
    })
  )
})

// ── Push Notifications (future feature) ────────────────────────────────────
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {}
  const { title = 'PHMI — Solution Center', body = 'You have a new notification', icon = '/icons/icon-192x192.png', url = '/' } = data

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      badge: '/icons/icon-72x72.png',
      data: { url },
      vibrate: [100, 50, 100],
      actions: [
        { action: 'open', title: 'Open App' },
        { action: 'dismiss', title: 'Dismiss' },
      ],
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  if (event.action === 'dismiss') return
  event.waitUntil(clients.openWindow(event.notification.data?.url || '/'))
})
