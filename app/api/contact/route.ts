import { NextRequest, NextResponse } from 'next/server'
import { getResendApiKey, notifyAdminAndUser } from '@/lib/resend'
import { contactConfirmationEmail, contactStaffEmail } from '@/lib/email-templates'

export async function POST(req: NextRequest) {
  try {
    if (!getResendApiKey()) {
      console.error('Contact API: RESEND_API_KEY is missing')
      return NextResponse.json(
        { error: 'Email is temporarily unavailable. Please WhatsApp us or try again later.' },
        { status: 503 }
      )
    }

    const body = await req.json()
    const { name, email, phone, subject, message, isPrayer } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
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

    return NextResponse.json(
      { success: true, message: 'Message received. We will be in touch soon.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Could not send your message. Please try again.' },
      { status: 500 }
    )
  }
}
