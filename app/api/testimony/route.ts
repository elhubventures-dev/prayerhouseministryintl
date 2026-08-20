import { NextRequest, NextResponse } from 'next/server'
import { getResendApiKey, notifyAdminAndUser } from '@/lib/resend'
import { testimonyConfirmationEmail, testimonyStaffEmail } from '@/lib/email-templates'

export async function POST(req: NextRequest) {
  try {
    if (!getResendApiKey()) {
      console.error('Testimony API: RESEND_API_KEY is missing')
      return NextResponse.json(
        { error: 'Email is temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    const body = await req.json()
    const { name, testimony, email } = body

    if (!testimony || testimony.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please share a little more detail in your testimony.' },
        { status: 400 }
      )
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Please provide an email so we can send your confirmation.' },
        { status: 400 }
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

    return NextResponse.json(
      { success: true, message: 'Testimony received. To God be all the glory!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Testimony API error:', error)
    return NextResponse.json(
      { error: 'Could not submit your testimony. Please try again.' },
      { status: 500 }
    )
  }
}
