import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

export function PageHero({
  eyebrow,
  title,
  english,
  description,
}: {
  eyebrow: string
  title: string
  english: string
  description: string
}) {
  return (
    <section className="page-hero section-pad">
      <div className="page-hero-grid container">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p className="display-english" lang="en">{english}</p>
        </div>
        <p className="page-intro">{description}</p>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  english,
  description,
}: {
  eyebrow?: string
  title: string
  english?: string
  description?: string
}) {
  return (
    <div className="section-heading">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {english && <p className="heading-english" lang="en">{english}</p>}
      {description && <p>{description}</p>}
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
