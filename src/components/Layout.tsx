import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, Mail, Menu, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router'

const navigation = [
  { to: '/research', label: 'Research' },
  { to: '/people', label: 'Members' },
  { to: '/awards', label: 'Awards' },
  { to: '/publications', label: 'Publications' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

function LabMark() {
  return (
    <span className="lab-mark" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  )
}

function ScrollManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="site-shell">
      <ScrollManager />
      <a className="skip-link" href="#main-content">跳到主要內容 Skip to content</a>

      <header className="site-header">
        <div className="header-inner">
          <NavLink className="brand" to="/" aria-label="NTHU VLSI/CAD Lab home" onClick={() => setMenuOpen(false)}>
            <LabMark />
            <span className="brand-copy">
              <strong>SC<span>LAB</span></strong>
              <small>VLSI / CAD · NTHU</small>
            </span>
          </NavLink>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? '關閉選單 Close menu' : '開啟選單 Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav
            id="primary-navigation"
            aria-label="Primary navigation"
            className={menuOpen ? 'primary-nav is-open' : 'primary-nav'}
          >
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={() => setMenuOpen(false)}
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="brand footer-brand">
              <LabMark />
              <span className="brand-copy">
                <strong>SC<span>LAB</span></strong>
                <small>NATIONAL TSING HUA UNIVERSITY</small>
              </span>
            </div>
            <p className="footer-description">VLSI / CAD research group<br />Department of Computer Science, NTHU</p>
          </div>
          <div>
            <p className="footer-label">CONTACT</p>
            <a href="mailto:scchang@cs.nthu.edu.tw"><Mail size={15} /> scchang@cs.nthu.edu.tw</a>
            <a href="https://www.cs.nthu.edu.tw/~scchang/" target="_blank" rel="noreferrer">
              <ArrowUpRight size={15} /> Professor profile
            </a>
          </div>
          <div>
            <p className="footer-label">EXPLORE</p>
            <NavLink to="/archive"><ArrowUpRight size={15} /> Archive</NavLink>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NTHU VLSI/CAD Laboratory</span>
          <span>Hsinchu, Taiwan · Open academic archive</span>
        </div>
      </footer>
    </div>
  )
}
