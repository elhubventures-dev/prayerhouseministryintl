import type { JsonLd } from '@/lib/schema'

export default function JsonLd({ data }: { data: JsonLd | JsonLd[] }) {
  const payload = Array.isArray(data) ? data : [data]
  return (
    <>
      {payload.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
