import { NextRequest, NextResponse } from 'next/server'
import { getResendApiKey, notifyAdminAndUser } from '@/lib/resend'
import { prayerConfirmationEmail, prayerStaffEmail } from '@/lib/email-templates'

export async function POST(req: NextRequest) {
  try {
    if (!getResendApiKey()) {
      console.error('Prayer API: RESEND_API_KEY is missing')
      return NextResponse.json(
        { error: 'Email is temporarily unavailable. Please WhatsApp us or try again later.' },
        { status: 503 }
      )
    }

    const body = await req.json()
    const { name, email, request, anonymous } = body

    if (!request || request.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a prayer request.' },
        { status: 400 }
      )
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Please provide an email so we can send your confirmation.' },
        { status: 400 }
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

    return NextResponse.json(
      { success: true, message: 'Prayer request received. Our team is standing in agreement with you.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Prayer API error:', error)
    return NextResponse.json(
      { error: 'Could not submit your request. Please try again or WhatsApp us directly.' },
      { status: 500 }
    )
  }
}
