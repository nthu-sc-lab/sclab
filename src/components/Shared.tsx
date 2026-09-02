import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="page-hero section-pad">
      <div className="page-hero-grid container">
        <div>
          <p className="eyebrow title-eyebrow">{eyebrow}</p>
          <h1 lang="en">{title}</h1>
        </div>
        <p className="page-intro">{description}</p>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow title-eyebrow">{eyebrow}</p>
      <h2 lang="en">{title}</h2>
      {description && <p className="section-heading-description">{description}</p>}
    </div>
  )
}

export function RouteLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="text-link" to={to}>
      {children} <ArrowUpRight size={17} />
    </Link>
  )
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="text-link" href={href} target="_blank" rel="noreferrer">
      {children} <ArrowUpRight size={17} />
    </a>
  )
}

export function SourceBadge({ href, label = '資料來源 Source' }: { href: string; label?: string }) {
  return (
    <a className="source-badge" href={href} target="_blank" rel="noreferrer">
      {label} <ArrowUpRight size={13} />
    </a>
  )
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="empty-state">{children}</div>
}
