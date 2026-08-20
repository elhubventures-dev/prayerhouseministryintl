export function resolveApiUrl(url: string) {
  if (typeof window === 'undefined' || url.startsWith('http')) return url

  const { protocol, hostname } = window.location
  if (hostname === 'prayerhouseministryintl.org') {
    return `${protocol}//www.prayerhouseministryintl.org${url}`
  }

  return url
}

export async function postForm(url: string, body: unknown) {
  const res = await fetch(resolveApiUrl(url), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = (await res.json().catch(() => ({}))) as {
    error?: string
    message?: string
    success?: boolean
  }

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.')
  }

  return data
}
