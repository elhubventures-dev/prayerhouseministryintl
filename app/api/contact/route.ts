import { NextRequest, NextResponse } from 'next/server'
import { getResendApiKey, notifyAdminAndUser } from '@/lib/resend'
import { contactConfirmationEmail, contactStaffEmail } from '@/lib/email-templates'
import { jsonResponse, optionsResponse } from '@/lib/api-cors'
import { formApiError } from '@/lib/form-api-error'

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function POST(req: NextRequest) {
  try {
    if (!getResendApiKey()) {
      console.error('Contact API: RESEND_API_KEY is missing')
      return jsonResponse(
        req,
        { error: 'Email is temporarily unavailable. Please WhatsApp us or try again later.' },
        503
      )
    }

    const body = await req.json()
    const { name, email, phone, subject, message, isPrayer } = body

    if (!name || !email || !subject || !message) {
      return jsonResponse(req, { error: 'Missing required fields' }, 400)
    }

    const emailLabel = isPrayer ? 'Prayer Request' : 'Contact Form'

    await notifyAdminAndUser({
      admin: {
        replyTo: email,
        subject: `${emailLabel}: ${subject}`,
        html: contactStaffEmail({ name, email, phone, subject, message, isPrayer }),
      },
      user: {
        to: email,
        subject: 'We received your message — Solution Center',
        html: contactConfirmationEmail(name),
      },
    })

    return jsonResponse(req, {
      success: true,
      message: 'Message received. We will be in touch soon.',
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return formApiError(req, error)
  }
}
