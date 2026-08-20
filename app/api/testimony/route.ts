import { NextRequest } from 'next/server'
import { getResendApiKey, notifyAdminAndUser } from '@/lib/resend'
import { testimonyConfirmationEmail, testimonyStaffEmail } from '@/lib/email-templates'
import { jsonResponse, optionsResponse } from '@/lib/api-cors'
import { formApiError } from '@/lib/form-api-error'

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function POST(req: NextRequest) {
  try {
    if (!getResendApiKey()) {
      console.error('Testimony API: RESEND_API_KEY is missing')
      return jsonResponse(
        req,
        { error: 'Email is temporarily unavailable. Please try again later.' },
        503
      )
    }

    const body = await req.json()
    const { name, testimony, email } = body

    if (!testimony || testimony.trim().length < 20) {
      return jsonResponse(
        req,
        { error: 'Please share a little more detail in your testimony.' },
        400
      )
    }

    if (!email) {
      return jsonResponse(
        req,
        { error: 'Please provide an email so we can send your confirmation.' },
        400
      )
    }

    const displayName = (name || 'Friend').trim() || 'Friend'

    await notifyAdminAndUser({
      admin: {
        replyTo: email,
        subject: `New testimony from ${displayName}`,
        html: testimonyStaffEmail({
          name: displayName,
          testimony: testimony.trim(),
          email,
        }),
      },
      user: {
        to: email,
        subject: 'Your testimony was received — Solution Center',
        html: testimonyConfirmationEmail(displayName),
      },
    })

    return jsonResponse(req, {
      success: true,
      message: 'Testimony received. To God be all the glory!',
    })
  } catch (error) {
    console.error('Testimony API error:', error)
    return formApiError(req, error)
  }
}
