import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, request, anonymous } = body

    if (!request || request.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a prayer request.' },
        { status: 400 }
      )
    }

    const displayName = anonymous ? 'Anonymous' : (name || 'Anonymous')

    // ── Send to prayer team via Resend ───────────────────────────────────
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'PHMI Prayer System <noreply@prayerhouseministryintl.org>',
    //   to: ['prayers@prayerhouseministryintl.org'],
    //   subject: `🙏 New Prayer Request from ${displayName}`,
    //   html: buildPrayerEmailHtml({ displayName, email, request, anonymous }),
    // })

    // ── Auto-reply to submitter ──────────────────────────────────────────
    // if (!anonymous && email) {
    //   await resend.emails.send({
    //     from: 'PHMI Prayer Team <prayers@prayerhouseministryintl.org>',
    //     to: [email],
    //     subject: '🙏 Your Prayer Request Was Received — Solution Center',
    //     html: buildConfirmationEmailHtml(displayName),
    //   })
    // }

    // ── Store to database (optional) ────────────────────────────────────
    // await db.prayerRequests.create({ name: displayName, email, request, anonymous, createdAt: new Date() })

    if (process.env.NODE_ENV === 'development') {
      console.log(`\n🙏 PRAYER REQUEST`)
      console.log(`From: ${displayName}${email ? ` <${email}>` : ''}`)
      console.log(`Request:\n${request}\n`)
    }

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

function buildPrayerEmailHtml(data: {
  displayName: string
  email?: string
  request: string
  anonymous: boolean
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Georgia, serif; background: #06091A; color: #F5F0E8; padding: 32px; max-width: 600px; margin: 0 auto;">
  <div style="border-top: 3px solid #C9A84C; padding-top: 24px; margin-bottom: 24px;">
    <h1 style="color: #C9A84C; font-size: 22px; margin: 0 0 4px;">🙏 New Prayer Request</h1>
    <p style="color: #A8A8C0; font-size: 13px;">Solution Center Prayer Team</p>
  </div>

  <p style="color: #A8A8C0; font-size: 13px;">From: <span style="color: #F5F0E8;">${data.displayName}</span>
    ${data.anonymous ? ' <em style="color: #A8A8C0;">(submitted anonymously)</em>' : ''}
  </p>
  ${data.email && !data.anonymous ? `<p style="color: #A8A8C0; font-size: 13px;">Email: <a href="mailto:${data.email}" style="color: #C9A84C;">${data.email}</a></p>` : ''}

  <div style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.04); border-left: 3px solid #C9A84C; border-radius: 4px;">
    <p style="color: #F5F0E8; line-height: 1.8; margin: 0; white-space: pre-wrap; font-style: italic; font-size: 15px;">"${data.request}"</p>
  </div>

  <div style="margin-top: 28px; padding: 16px; background: rgba(201,168,76,0.08); border-radius: 8px; text-align: center;">
    <p style="color: #C9A84C; font-size: 13px; margin: 0;">"The effective, fervent prayer of a righteous man avails much." — James 5:16</p>
  </div>
</body>
</html>
  `.trim()
}

function buildConfirmationEmailHtml(name: string) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Georgia, serif; background: #06091A; color: #F5F0E8; padding: 32px; max-width: 600px; margin: 0 auto;">
  <div style="border-top: 3px solid #C9A84C; padding-top: 24px; margin-bottom: 24px; text-align: center;">
    <h1 style="color: #C9A84C; font-size: 24px;">🙏 Prayer Received, ${name}</h1>
    <p style="color: #A8A8C0;">Prayer House Ministry International — Solution Center</p>
  </div>
  <p style="color: #F5F0E8; line-height: 1.8;">
    Thank you for trusting us with your prayer need. Our dedicated prayer team has received your request and
    will be standing in agreement with you before the throne of God.
  </p>
  <p style="color: #F5F0E8; line-height: 1.8;">
    We believe that <strong style="color: #C9A84C;">God hears every prayer</strong>. Stay expectant for your breakthrough.
    If you need to speak with someone, please reply to this email or WhatsApp us at <strong>+237 653 270 752</strong>.
  </p>
  <div style="margin-top: 28px; padding: 20px; text-align: center; border: 1px solid rgba(201,168,76,0.2); border-radius: 8px;">
    <p style="color: #C9A84C; font-style: italic; font-size: 16px; margin: 0;">"Call to me and I will answer you." — Jeremiah 33:3</p>
  </div>
  <p style="color: #A8A8C0; font-size: 13px; margin-top: 24px;">
    Praying for you,<br>
    <strong style="color: #F5F0E8;">The PHMI Prayer Team</strong><br>
    Solution Center, Mile 4 Limbe
  </p>
</body>
</html>
  `.trim()
}
