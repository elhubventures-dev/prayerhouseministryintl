import { Resend } from 'resend'

const PLACEHOLDER_KEY = 're_your_resend_key'
const DEFAULT_FROM =
  'Prayer House Ministry International (Solution Center) <noreply@prayerhouseministryintl.org>'
const RETIRED_INFO_EMAIL = 'info@prayerhouseministryintl.org'
const PLACEHOLDER_GMAIL = 'your.email@gmail.com'

export function getResendApiKey(): string | null {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey || apiKey === PLACEHOLDER_KEY) {
    return null
  }
  return apiKey
}

export function getResendClient(): Resend | null {
  const apiKey = getResendApiKey()
  if (!apiKey) return null
  return new Resend(apiKey)
}

export function getResendFrom(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM
}

function isUsableEmail(email?: string | null): email is string {
  if (!email) return false
  const value = email.trim().toLowerCase()
  return (
    value.includes('@') &&
    value !== PLACEHOLDER_GMAIL &&
    value !== RETIRED_INFO_EMAIL &&
    !value.includes('your-') &&
    !value.startsWith('re_your')
  )
}

function firstUsable(raw?: string | null): string | null {
  if (!raw) return null
  for (const part of raw.split(',')) {
    const email = part.trim()
    if (isUsableEmail(email)) return email
  }
  return null
}

export function getOfficialContactEmail(): string | null {
  return (
    firstUsable(process.env.RESEND_TO_EMAIL) ||
    firstUsable(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ||
    firstUsable(process.env.RESEND_REPLY_TO)
  )
}

export function getResendTo(): string[] {
  const inbox = getOfficialContactEmail()
  if (!inbox) {
    throw new Error('Official Gmail is not configured. Set RESEND_TO_EMAIL to your Gmail address.')
  }
  return [inbox]
}

export function getResendReplyTo(): string | undefined {
  return firstUsable(process.env.RESEND_REPLY_TO) || getOfficialContactEmail() || undefined
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

type SendEmailInput = {
  to?: string[]
  replyTo?: string
  subject: string
  html: string
}

export async function sendResendEmail(input: SendEmailInput) {
  const resend = getResendClient()
  if (!resend) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  const destination = input.to ?? getResendTo()
  if (destination.some((email) => email.toLowerCase() === RETIRED_INFO_EMAIL)) {
    throw new Error('info@ is disabled. Notifications must go to the official Gmail inbox.')
  }

  const replyTo = input.replyTo ?? getResendReplyTo()

  const { error, data } = await resend.emails.send({
    from: getResendFrom(),
    to: destination,
    ...(replyTo ? { replyTo } : {}),
    subject: input.subject,
    html: input.html,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

type DualNotificationInput = {
  admin: {
    subject: string
    html: string
    replyTo?: string
  }
  user?: {
    to: string
    subject: string
    html: string
  } | null
}

export async function notifyAdminAndUser({ admin, user }: DualNotificationInput) {
  const jobs: Array<{ kind: 'admin' | 'user'; run: Promise<unknown> }> = []
  const adminInbox = getOfficialContactEmail()

  if (adminInbox) {
    jobs.push({
      kind: 'admin',
      run: sendResendEmail({
        to: [adminInbox],
        replyTo: admin.replyTo,
        subject: admin.subject,
        html: admin.html,
      }),
    })
  } else {
    console.warn('Admin Gmail is not configured yet. Staff notification skipped.')
  }

  if (user?.to) {
    jobs.push({
      kind: 'user',
      run: sendResendEmail({
        to: [user.to],
        replyTo: getResendReplyTo(),
        subject: user.subject,
        html: user.html,
      }),
    })
  }

  if (!jobs.length) {
    throw new Error('No email destination available')
  }

  const results = await Promise.allSettled(jobs.map((job) => job.run))

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`${jobs[index].kind} notification failed:`, result.reason)
    }
  })

  if (results.some((result) => result.status === 'rejected')) {
    throw new Error('Could not send all email notifications')
  }
}
