import Link from 'next/link'

export type Crumb = { name: string; href: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-inter text-muted-foreground/60">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {last ? (
                <span className="text-gold truncate max-w-[220px]">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-gold transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
