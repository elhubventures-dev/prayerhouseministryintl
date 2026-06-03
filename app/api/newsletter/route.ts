import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory store for demo (replace with DB or email service)
const subscribers = new Set<string>()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    // Basic email validation
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

    // ── Option A: Mailchimp ──────────────────────────────────────────────
    // npm install @mailchimp/mailchimp_marketing
    // Set MAILCHIMP_API_KEY and MAILCHIMP_LIST_ID in .env.local
    //
    // const mailchimp = await import('@mailchimp/mailchimp_marketing')
    // mailchimp.default.setConfig({
    //   apiKey: process.env.MAILCHIMP_API_KEY,
    //   server: 'us1', // prefix from your API key
    // })
    // await mailchimp.default.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
    //   email_address: normalizedEmail,
    //   status: 'subscribed',
    //   tags: ['Website Signup', 'Church Updates'],
    // })

    // ── Option B: ConvertKit ─────────────────────────────────────────────
    // Set CONVERTKIT_API_KEY and CONVERTKIT_FORM_ID in .env.local
    //
    // await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ api_key: process.env.CONVERTKIT_API_KEY, email: normalizedEmail }),
    // })

    // ── Option C: Resend Audience ────────────────────────────────────────
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.contacts.create({
    //   email: normalizedEmail,
    //   audienceId: process.env.RESEND_AUDIENCE_ID!,
    //   unsubscribed: false,
    // })

    // ── Send welcome email ───────────────────────────────────────────────
    // await resend.emails.send({
    //   from: 'PHMI <updates@prayerhouseministryintl.org>',
    //   to: [normalizedEmail],
    //   subject: '🙏 Welcome to the Solution Center Family!',
    //   html: buildWelcomeEmailHtml(),
    // })

    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Newsletter subscriber: ${normalizedEmail}`)
      console.log(`Total subscribers: ${subscribers.size}`)
    }

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
  // Admin endpoint — returns subscriber count (protect this in production)
  return NextResponse.json({ count: subscribers.size })
}

function buildWelcomeEmailHtml() {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Georgia, serif; background: #06091A; color: #F5F0E8; padding: 32px; max-width: 600px; margin: 0 auto;">
  <div style="border-top: 3px solid #C9A84C; padding-top: 24px; margin-bottom: 24px; text-align: center;">
    <h1 style="color: #C9A84C; font-size: 26px; margin-bottom: 8px;">Welcome to the Family! 🙏</h1>
    <p style="color: #A8A8C0;">Prayer House Ministry International — Solution Center</p>
  </div>

  <p style="color: #F5F0E8; line-height: 1.9;">
    You are now part of the Solution Center newsletter community! You'll be the first to receive:
  </p>

  <ul style="color: #F5F0E8; line-height: 2.2; padding-left: 20px;">
    <li>📅 Upcoming events and conference announcements</li>
    <li>🎤 New sermon releases and devotionals</li>
    <li>🙏 Corporate prayer points and declarations</li>
    <li>✨ Testimonies and community updates</li>
  </ul>

  <div style="margin-top: 28px; padding: 20px; text-align: center; border: 1px solid rgba(201,168,76,0.2); border-radius: 8px;">
    <p style="color: #C9A84C; font-style: italic; font-size: 16px; margin: 0;">
      "Raising Lives Through Prayer, Worship & The Word"
    </p>
  </div>

  <div style="margin-top: 24px; text-align: center;">
    <a href="https://prayerhouseministryintl.org/sermons"
       style="display: inline-block; background: linear-gradient(135deg, #C9A84C, #F4A832); color: #06091A; font-weight: bold; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 14px;">
      Watch Latest Sermon
    </a>
  </div>

  <p style="color: #A8A8C0; font-size: 13px; margin-top: 28px; text-align: center;">
    Opposite Wotutu Okada Park, Mile 4 Limbe, Cameroon<br>
    📞 653 270 752
  </p>
</body>
</html>
  `.trim()
}
