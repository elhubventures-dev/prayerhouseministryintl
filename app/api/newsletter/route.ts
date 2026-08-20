import { NextRequest, NextResponse } from 'next/server'
import { getResendApiKey, getResendClient, notifyAdminAndUser } from '@/lib/resend'
import { newsletterStaffEmail, newsletterWelcomeEmail } from '@/lib/email-templates'

const subscribers = new Set<string>()

export async function POST(req: NextRequest) {
  try {
    if (!getResendApiKey()) {
      console.error('Newsletter API: RESEND_API_KEY is missing')
      return NextResponse.json(
        { error: 'Email is temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    const body = await req.json()
    const { email } = body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    if (subscribers.has(normalizedEmail)) {
      return NextResponse.json(
        { success: true, message: 'You are already subscribed. God bless you!' },
        { status: 200 }
      )
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

    return NextResponse.json(
      { success: true, message: 'You are now subscribed! Welcome to the family.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'Could not subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ count: subscribers.size })
}
