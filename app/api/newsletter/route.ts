import { NextRequest } from 'next/server'
import { getResendApiKey, getResendClient, notifyAdminAndUser } from '@/lib/resend'
import { newsletterStaffEmail, newsletterWelcomeEmail } from '@/lib/email-templates'
import { jsonResponse, optionsResponse } from '@/lib/api-cors'
import { formApiError } from '@/lib/form-api-error'

const subscribers = new Set<string>()

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function POST(req: NextRequest) {
  try {
    if (!getResendApiKey()) {
      console.error('Newsletter API: RESEND_API_KEY is missing')
      return jsonResponse(
        req,
        { error: 'Email is temporarily unavailable. Please try again later.' },
        503
      )
    }

    const body = await req.json()
    const { email } = body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return jsonResponse(req, { error: 'Please provide a valid email address.' }, 400)
    }

    const normalizedEmail = email.toLowerCase().trim()

    if (subscribers.has(normalizedEmail)) {
      return jsonResponse(req, {
        success: true,
        message: 'You are already subscribed. God bless you!',
      })
    }

    subscribers.add(normalizedEmail)

    const resend = getResendClient()
    const audienceId = process.env.RESEND_AUDIENCE_ID?.trim()

    if (resend && audienceId && audienceId !== 'your-audience-id') {
      const { error: contactError } = await resend.contacts.create({
        email: normalizedEmail,
        audienceId,
        unsubscribed: false,
      })

      if (contactError) {
        console.error('Resend audience error:', contactError)
      }
    }

    await notifyAdminAndUser({
      admin: {
        replyTo: normalizedEmail,
        subject: `New newsletter subscriber: ${normalizedEmail}`,
        html: newsletterStaffEmail(normalizedEmail),
      },
      user: {
        to: normalizedEmail,
        subject: 'Welcome to the Solution Center family',
        html: newsletterWelcomeEmail(),
      },
    })

    return jsonResponse(req, {
      success: true,
      message: 'You are now subscribed! Welcome to the family.',
    })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return formApiError(req, error)
  }
}

export async function GET(req: NextRequest) {
  return jsonResponse(req, { count: subscribers.size })
}
