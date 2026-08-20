import { escapeHtml } from '@/lib/resend'

const NAVY = '#06091A'
const GOLD = '#C9A84C'
const GOLD_DARK = '#8A6A1F'
const CREAM = '#F5F0E8'
const MUTED = '#A8A8C0'
const CARD = '#0E1228'

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL || 'https://prayerhouseministryintl.org').replace(/\/$/, '')
}

function getLogoUrl() {
  return `${getSiteUrl()}/images/logo.png`
}

function withBreaks(value: string) {
  return escapeHtml(value).replace(/\r\n/g, '\n').replace(/\n/g, '<br>')
}

type EmailButton = {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

type EmailLayoutInput = {
  preheader: string
  eyebrow: string
  title: string
  bodyHtml: string
  buttons?: EmailButton[]
}

function renderButtons(buttons: EmailButton[] = []) {
  if (!buttons.length) return ''

  const rows = buttons
    .map((button) => {
      const isPrimary = button.variant !== 'secondary'
      const bg = isPrimary ? GOLD : CARD
      const color = isPrimary ? NAVY : GOLD
      const border = GOLD
      return `
        <tr>
          <td align="center" style="padding:0 0 10px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="${bg}" style="background-color:${bg}; border:1px solid ${border}; border-radius:8px;">
                  <a href="${button.href}"
                     style="display:inline-block; padding:13px 28px; font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:700; letter-spacing:0.04em; text-decoration:none; color:${color};">
                    ${escapeHtml(button.label)}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>`
    })
    .join('')

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:28px auto 8px;">
      ${rows}
    </table>`
}

function renderLayout({ preheader, eyebrow, title, bodyHtml, buttons = [] }: EmailLayoutInput) {
  const logoUrl = getLogoUrl()
  const siteUrl = getSiteUrl()

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0; padding:0; background-color:${NAVY};">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${NAVY};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;">
          <tr>
            <td align="center" style="padding:8px 0 24px;">
              <a href="${siteUrl}" style="text-decoration:none;">
                <img src="${logoUrl}" alt="Prayer House Ministry International" width="96" height="96" style="display:block; width:96px; height:96px; border:0;">
              </a>
              <p style="margin:12px 0 0; font-family:Georgia, 'Times New Roman', serif; font-size:13px; letter-spacing:0.18em; text-transform:uppercase; color:${GOLD};">
                Prayer House Ministry International
              </p>
              <p style="margin:4px 0 0; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:${MUTED};">
                Solution Center · Mile 4 Limbe
              </p>
            </td>
          </tr>
          <tr>
            <td style="height:3px; background-color:${GOLD}; font-size:0; line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="background-color:${CARD}; padding:36px 32px 32px;">
              <p style="margin:0 0 8px; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:${GOLD};">
                ${escapeHtml(eyebrow)}
              </p>
              <h1 style="margin:0 0 20px; font-family:Georgia, 'Times New Roman', serif; font-size:26px; line-height:1.3; color:${CREAM}; font-weight:normal;">
                ${escapeHtml(title)}
              </h1>
              ${bodyHtml}
              ${renderButtons(buttons)}
            </td>
          </tr>
          <tr>
            <td style="height:1px; background-color:${GOLD_DARK}; font-size:0; line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td align="center" style="padding:28px 24px 8px;">
              <p style="margin:0 0 10px; font-family:Georgia, 'Times New Roman', serif; font-size:14px; font-style:italic; color:${GOLD};">
                “Raising Lives Through Prayer, Worship &amp; The Word”
              </p>
              <p style="margin:0 0 4px; font-family:Arial, Helvetica, sans-serif; font-size:12px; line-height:1.7; color:${MUTED};">
                Opposite Wotutu Okada Park, Mile 4 Limbe, Cameroon
              </p>
              <p style="margin:0 0 16px; font-family:Arial, Helvetica, sans-serif; font-size:12px; color:${MUTED};">
                <a href="tel:+237653270752" style="color:${GOLD}; text-decoration:none;">+237 653 270 752</a>
                &nbsp;·&nbsp;
                <a href="${siteUrl}" style="color:${GOLD}; text-decoration:none;">prayerhouseministryintl.org</a>
              </p>
              <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#6E6E86;">
                You received this email because you used a form on the PHMI website.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

function detailTable(rows: Array<[string, string]>) {
  const html = rows
    .filter(([, value]) => Boolean(value))
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:${MUTED}; width:110px; border-bottom:1px solid rgba(201,168,76,0.15);">
            ${escapeHtml(label)}
          </td>
          <td style="padding:10px 12px; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:${CREAM}; border-bottom:1px solid rgba(201,168,76,0.15);">
            ${value}
          </td>
        </tr>`
    )
    .join('')

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 20px; background-color:${NAVY}; border:1px solid rgba(201,168,76,0.25); border-radius:8px;">
      ${html}
    </table>`
}

function quoteBlock(label: string, content: string) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 8px; background-color:${NAVY}; border-left:3px solid ${GOLD};">
      <tr>
        <td style="padding:18px 20px;">
          <p style="margin:0 0 8px; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:${GOLD};">
            ${escapeHtml(label)}
          </p>
          <p style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-size:15px; line-height:1.75; color:${CREAM};">
            ${withBreaks(content)}
          </p>
        </td>
      </tr>
    </table>`
}

function scriptureBlock(text: string) {
  return `
    <p style="margin:24px 0 0; text-align:center; font-family:Georgia, 'Times New Roman', serif; font-size:14px; font-style:italic; line-height:1.6; color:${GOLD};">
      ${escapeHtml(text)}
    </p>`
}

function paragraph(text: string) {
  return `<p style="margin:0 0 14px; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.75; color:${CREAM};">${text}</p>`
}

const WHATSAPP = 'https://wa.me/237653270752'
const MAPS = 'https://maps.google.com/?q=Mile+4+Limbe+Cameroon'

export function contactStaffEmail(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  isPrayer?: boolean
}) {
  const siteUrl = getSiteUrl()
  const eyebrow = data.isPrayer ? 'Prayer request' : 'Contact form'
  const title = data.isPrayer ? 'A new prayer request was submitted' : 'A new message arrived from the website'
  const buttons: EmailButton[] = [
    { label: 'Reply by email', href: `mailto:${data.email}`, variant: 'primary' },
    { label: 'Open contact page', href: `${siteUrl}/contact`, variant: 'secondary' },
  ]
  if (data.phone) {
    buttons.splice(1, 0, {
      label: 'Call visitor',
      href: `tel:${data.phone.replace(/\s+/g, '')}`,
      variant: 'secondary',
    })
  }

  return renderLayout({
    preheader: `${data.name} sent a ${data.isPrayer ? 'prayer request' : 'contact message'}: ${data.subject}`,
    eyebrow,
    title,
    bodyHtml: `
      ${paragraph('A visitor submitted the form on prayerhouseministryintl.org. Reply directly to this email to reach them.')}
      ${detailTable([
        ['Name', escapeHtml(data.name)],
        ['Email', `<a href="mailto:${escapeHtml(data.email)}" style="color:${GOLD}; text-decoration:none;">${escapeHtml(data.email)}</a>`],
        ['Phone', data.phone ? escapeHtml(data.phone) : ''],
        ['Subject', escapeHtml(data.subject)],
      ])}
      ${quoteBlock('Message', data.message)}
    `,
    buttons,
  })
}

export function contactConfirmationEmail(name: string) {
  const siteUrl = getSiteUrl()
  const safeName = escapeHtml(name)
  return renderLayout({
    preheader: 'We received your message and will respond within 24–48 hours.',
    eyebrow: 'Message received',
    title: `Thank you, ${name}`,
    bodyHtml: `
      ${paragraph(`Dear ${safeName},`)}
      ${paragraph('Thank you for reaching out to Prayer House Ministry International — Solution Center. Our team has received your message and will respond within <strong style="color:' + GOLD + ';">24–48 hours</strong>.')}
      ${paragraph('If your need is urgent, please WhatsApp us and a team member will attend to you as soon as possible.')}
      ${scriptureBlock('“My house shall be called a house of prayer for all peoples.” — Isaiah 56:7')}
    `,
    buttons: [
      { label: 'WhatsApp us', href: `${WHATSAPP}?text=${encodeURIComponent('Hello Solution Center, I just sent a message on the website.')}` },
      { label: 'Watch sermons', href: `${siteUrl}/sermons`, variant: 'secondary' },
      { label: 'Get directions', href: MAPS, variant: 'secondary' },
    ],
  })
}

export function prayerStaffEmail(data: {
  displayName: string
  email?: string
  request: string
  anonymous: boolean
}) {
  const siteUrl = getSiteUrl()
  const buttons: EmailButton[] = [
    { label: 'Open website', href: siteUrl, variant: 'secondary' },
  ]
  if (data.email && !data.anonymous) {
    buttons.unshift({ label: 'Reply to sender', href: `mailto:${data.email}` })
  }
  buttons.push({
    label: 'WhatsApp team',
    href: `${WHATSAPP}?text=${encodeURIComponent(`Prayer request from ${data.displayName}`)}`,
    variant: 'secondary',
  })

  return renderLayout({
    preheader: `New prayer request from ${data.displayName}`,
    eyebrow: 'Prayer team alert',
    title: 'A new prayer request needs covering',
    bodyHtml: `
      ${paragraph('Please stand in agreement with this request before the Lord.')}
      ${detailTable([
        ['From', escapeHtml(data.displayName) + (data.anonymous ? ' <span style="color:' + MUTED + ';">(anonymous)</span>' : '')],
        [
          'Email',
          data.email && !data.anonymous
            ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${GOLD}; text-decoration:none;">${escapeHtml(data.email)}</a>`
            : '',
        ],
      ])}
      ${quoteBlock('Prayer request', data.request)}
      ${scriptureBlock('“The effective, fervent prayer of a righteous man avails much.” — James 5:16')}
    `,
    buttons,
  })
}

export function prayerConfirmationEmail(name: string) {
  const siteUrl = getSiteUrl()
  const safeName = escapeHtml(name)
  return renderLayout({
    preheader: 'Our prayer team has received your request and is standing in agreement with you.',
    eyebrow: 'Prayer received',
    title: `We are praying with you, ${name}`,
    bodyHtml: `
      ${paragraph(`Dear ${safeName},`)}
      ${paragraph('Thank you for trusting us with your prayer need. Our dedicated prayer team has received your request and will be standing in agreement with you before the throne of God.')}
      ${paragraph('Stay expectant. God hears every prayer. If you need to speak with someone, reply to this email or WhatsApp the prayer team.')}
      ${scriptureBlock('“Call to me and I will answer you.” — Jeremiah 33:3')}
    `,
    buttons: [
      { label: 'WhatsApp prayer team', href: `${WHATSAPP}?text=${encodeURIComponent('Hello prayer team, I submitted a prayer request on the website.')}` },
      { label: 'Join a service', href: `${siteUrl}/events`, variant: 'secondary' },
      { label: 'Watch sermons', href: `${siteUrl}/sermons`, variant: 'secondary' },
    ],
  })
}

export function newsletterStaffEmail(email: string) {
  const siteUrl = getSiteUrl()
  return renderLayout({
    preheader: `${email} subscribed to the Solution Center newsletter.`,
    eyebrow: 'Newsletter',
    title: 'A new subscriber joined the family',
    bodyHtml: `
      ${paragraph('Someone just subscribed to the Solution Center newsletter from the website.')}
      ${detailTable([
        ['Email', `<a href="mailto:${escapeHtml(email)}" style="color:${GOLD}; text-decoration:none;">${escapeHtml(email)}</a>`],
      ])}
    `,
    buttons: [
      { label: 'Email subscriber', href: `mailto:${email}` },
      { label: 'View website', href: siteUrl, variant: 'secondary' },
    ],
  })
}

export function newsletterWelcomeEmail() {
  const siteUrl = getSiteUrl()
  return renderLayout({
    preheader: 'Welcome to the Solution Center family — sermons, events, and prayer updates.',
    eyebrow: 'You are subscribed',
    title: 'Welcome to the family',
    bodyHtml: `
      ${paragraph('You are now part of the Solution Center newsletter community. You will be among the first to receive:')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 16px;">
        <tr><td style="padding:6px 0; font-family:Arial, Helvetica, sans-serif; font-size:15px; color:${CREAM};">• Upcoming events and conference announcements</td></tr>
        <tr><td style="padding:6px 0; font-family:Arial, Helvetica, sans-serif; font-size:15px; color:${CREAM};">• New sermon releases and devotionals</td></tr>
        <tr><td style="padding:6px 0; font-family:Arial, Helvetica, sans-serif; font-size:15px; color:${CREAM};">• Corporate prayer points and declarations</td></tr>
        <tr><td style="padding:6px 0; font-family:Arial, Helvetica, sans-serif; font-size:15px; color:${CREAM};">• Testimonies and community updates</td></tr>
      </table>
      ${scriptureBlock('“Raising Lives Through Prayer, Worship & The Word”')}
    `,
    buttons: [
      { label: 'Watch latest sermon', href: `${siteUrl}/sermons` },
      { label: 'Upcoming events', href: `${siteUrl}/events`, variant: 'secondary' },
      { label: 'Plan your visit', href: `${siteUrl}/contact`, variant: 'secondary' },
    ],
  })
}

export function testimonyStaffEmail(data: {
  name: string
  testimony: string
  email?: string
}) {
  const siteUrl = getSiteUrl()
  const buttons: EmailButton[] = [
    { label: 'View gallery', href: `${siteUrl}/gallery` },
  ]
  if (data.email) {
    buttons.unshift({ label: 'Thank the sender', href: `mailto:${data.email}` })
  }

  return renderLayout({
    preheader: `${data.name} shared a testimony from the gallery page.`,
    eyebrow: 'Testimony',
    title: 'A new testimony was submitted',
    bodyHtml: `
      ${paragraph('A visitor shared what God has done. Review this testimony for possible publication on the website.')}
      ${detailTable([
        ['Name', escapeHtml(data.name)],
        [
          'Email',
          data.email
            ? `<a href="mailto:${escapeHtml(data.email)}" style="color:${GOLD}; text-decoration:none;">${escapeHtml(data.email)}</a>`
            : '',
        ],
      ])}
      ${quoteBlock('Testimony', data.testimony)}
      ${scriptureBlock('“They overcame him by the blood of the Lamb and by the word of their testimony.” — Revelation 12:11')}
    `,
    buttons,
  })
}

export function testimonyConfirmationEmail(name: string) {
  const siteUrl = getSiteUrl()
  const safeName = escapeHtml(name)
  return renderLayout({
    preheader: 'Thank you for sharing your testimony with Solution Center.',
    eyebrow: 'Testimony received',
    title: `To God be the glory, ${name}`,
    bodyHtml: `
      ${paragraph(`Dear ${safeName},`)}
      ${paragraph('Thank you for sharing what God has done. Your testimony has been received by the Solution Center team and may be used to encourage others in the faith.')}
      ${paragraph('We celebrate this victory with you. Stay rooted in prayer, worship, and the Word.')}
      ${scriptureBlock('“They overcame him by the blood of the Lamb and by the word of their testimony.” — Revelation 12:11')}
    `,
    buttons: [
      { label: 'Watch sermons', href: `${siteUrl}/sermons` },
      { label: 'Join a service', href: `${siteUrl}/events`, variant: 'secondary' },
      { label: 'WhatsApp us', href: `${WHATSAPP}?text=${encodeURIComponent('Hello Solution Center, I just shared a testimony on the website.')}`, variant: 'secondary' },
    ],
  })
}
