'use client'

import { useEffect } from 'react'

export function usePWA() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator)) return

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        })

        reg.addEventListener('updatefound', () => {
          const newSW = reg.installing
          if (!newSW) return
          newSW.addEventListener('statechange', () => {
            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available — optionally show a refresh prompt
              console.log('[PWA] New version available. Refresh to update.')
            }
          })
        })

        console.log('[PWA] Service worker registered:', reg.scope)
      } catch (err) {
        console.warn('[PWA] Service worker registration failed:', err)
      }
    }

    // Register after page load to not block critical resources
    if (document.readyState === 'complete') {
      register()
    } else {
      window.addEventListener('load', register)
    }

    return () => window.removeEventListener('load', register)
  }, [])
}

// Push notification permission request
export async function requestPushPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false

  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

// Check if running as installed PWA
export function isPWA(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && (window.navigator as any).standalone === true)
  )
}
