import { NextRequest } from 'next/server'
import { jsonResponse } from '@/lib/api-cors'

export function formApiError(req: NextRequest, error: unknown) {
  const message = error instanceof Error ? error.message : ''

  if (message === 'ADMIN_EMAIL_MISSING') {
    return jsonResponse(
      req,
      { error: 'Admin Gmail is not configured on the server yet. Set RESEND_TO_EMAIL and RESEND_REPLY_TO, then try again.' },
      503
    )
  }

  return jsonResponse(
    req,
    { error: 'Could not send your message. Please try again or WhatsApp us.' },
    500
  )
}
