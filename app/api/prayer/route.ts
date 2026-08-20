import { NextRequest } from 'next/server'
import { getResendApiKey, notifyAdminAndUser } from '@/lib/resend'
import { prayerConfirmationEmail, prayerStaffEmail } from '@/lib/email-templates'
import { jsonResponse, optionsResponse } from '@/lib/api-cors'
import { formApiError } from '@/lib/form-api-error'

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function POST(req: NextRequest) {
  try {
    if (!getResendApiKey()) {
      console.error('Prayer API: RESEND_API_KEY is missing')
      return jsonResponse(
        req,
        { error: 'Email is temporarily unavailable. Please WhatsApp us or try again later.' },
        503
      )
    }

    const body = await req.json()
    const { name, email, request, anonymous } = body

    if (!request || request.trim().length < 10) {
      return jsonResponse(req, { error: 'Please provide a prayer request.' }, 400)
    }

    if (!email) {
      return jsonResponse(
        req,
        { error: 'Please provide an email so we can send your confirmation.' },
        400
      )
    }

    const displayName = anonymous ? 'Anonymous' : (name || 'Anonymous')

    await notifyAdminAndUser({
      admin: {
        replyTo: anonymous ? undefined : email,
        subject: `New Prayer Request from ${displayName}`,
        html: prayerStaffEmail({
          displayName,
          email: anonymous ? undefined : email,
          request,
          anonymous: Boolean(anonymous),
        }),
      },
      user: {
        to: email,
        subject: 'Your prayer request was received — Solution Center',
        html: prayerConfirmationEmail(anonymous ? 'Friend' : displayName),
      },
    })

    return jsonResponse(req, {
      success: true,
      message: 'Prayer request received. Our team is standing in agreement with you.',
    })
  } catch (error) {
    console.error('Prayer API error:', error)
    return formApiError(req, error)
  }
}
