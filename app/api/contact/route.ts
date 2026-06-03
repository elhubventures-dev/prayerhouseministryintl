import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message, isPrayer } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const emailLabel = isPrayer ? '🙏 PRAYER REQUEST' : '📬 Contact Form'

    // ── Option A: Resend (recommended) ──────────────────────────────────
    // Install: npm install resend
    // Set RESEND_API_KEY in .env.local
    //
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'PHMI Website <noreply@prayerhouseministryintl.org>',
    //   to: ['info@prayerhouseministryintl.org'],
    //   replyTo: email,
    //   subject: `${emailLabel}: ${subject}`,
    //   html: buildEmailHtml({ name, email, phone, subject, message, isPrayer }),
    // })

    // ── Option B: Nodemailer / SMTP ─────────────────────────────────────
    // Install: npm install nodemailer @types/nodemailer
    // Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local
    //
    // const nodemailer = await import('nodemailer')
    // const transporter = nodemailer.createTransporter({
    //   host: process.env.SMTP_HOST,
    //   port: 587,
    //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // })
    // await transporter.sendMail({
    //   from: `"PHMI Website" <${process.env.SMTP_USER}>`,
    //   to: 'info@prayerhouseministryintl.org',
    //   replyTo: email,
    //   subject: `${emailLabel}: ${subject}`,
    //   html: buildEmailHtml({ name, email, phone, subject, message, isPrayer }),
    // })

    // ── Option C: WhatsApp API (for immediate notification) ─────────────
    // Use the wa.me link on the client side — no server needed

    // ── Log to console in dev ────────────────────────────────────────────
    if (process.env.NODE_ENV === 'development') {
      console.log(`\n${emailLabel}`)
      console.log(`From: ${name} <${email}>`)
      console.log(`Phone: ${phone || 'N/A'}`)
      console.log(`Subject: ${subject}`)
      console.log(`Message:\n${message}\n`)
    }

    return NextResponse.json(
      { success: true, message: 'Message received. We will be in touch soon.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}

function buildEmailHtml(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  isPrayer?: boolean
}) {
  const { name, email, phone, subject, message, isPrayer } = data
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>${subject}</title></head>
<body style="font-family: Georgia, serif; background: #06091A; color: #F5F0E8; padding: 32px; max-width: 600px; margin: 0 auto;">
  <div style="border-top: 3px solid #C9A84C; padding-top: 24px; margin-bottom: 24px;">
    <h1 style="font-family: serif; color: #C9A84C; font-size: 22px; margin: 0 0 4px;">
      ${isPrayer ? '🙏 Prayer Request' : '📬 Contact Message'}
    </h1>
    <p style="color: #A8A8C0; font-size: 13px; margin: 0;">Prayer House Ministry International — Solution Center</p>
  </div>

  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; color: #A8A8C0; font-size: 13px; width: 100px;">Name</td>
        <td style="padding: 8px 0; color: #F5F0E8;">${name}</td></tr>
    <tr><td style="padding: 8px 0; color: #A8A8C0; font-size: 13px;">Email</td>
        <td style="padding: 8px 0; color: #F5F0E8;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td></tr>
    ${phone ? `<tr><td style="padding: 8px 0; color: #A8A8C0; font-size: 13px;">Phone</td>
        <td style="padding: 8px 0; color: #F5F0E8;">${phone}</td></tr>` : ''}
    <tr><td style="padding: 8px 0; color: #A8A8C0; font-size: 13px;">Subject</td>
        <td style="padding: 8px 0; color: #F5F0E8;">${subject}</td></tr>
  </table>

  <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(201,168,76,0.2); border-radius: 8px;">
    <p style="color: #A8A8C0; font-size: 12px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
    <p style="color: #F5F0E8; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
  </div>

  <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08);">
    <p style="color: #A8A8C0; font-size: 11px; margin: 0;">
      Reply directly to this email to respond to ${name}.<br>
      Sent from prayerhouseministryintl.org
    </p>
  </div>
</body>
</html>
  `.trim()
}
