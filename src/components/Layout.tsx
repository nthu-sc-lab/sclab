import { useEffect, useState, type ReactNode } from 'react'
import {
  ArrowUpRight,
  GitBranch,
  Mail,
  Menu,
  X,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router'

const navigation = [
  { to: '/', zh: '首頁', en: 'Home', end: true },
  { to: '/research', zh: '研究', en: 'Research' },
  { to: '/people', zh: '成員', en: 'People' },
  { to: '/publications', zh: '論文', en: 'Publications' },
  { to: '/highlights', zh: '亮點', en: 'Highlights' },
  { to: '/archive', zh: '典藏', en: 'Archive' },
  { to: '/join', zh: '加入我們', en: 'Join' },
  { to: '/contact', zh: '聯絡', en: 'Contact' },
]

function CircuitMark() {
  return (
    <svg
      aria-hidden="true"
      className="brand-mark"
      viewBox="0 0 44 44"
      fill="none"
    >
      <rect x="1" y="1" width="42" height="42" rx="12" />
      <path d="M11 14h8l4 4h10M11 30h8l4-4h10M14 11v22M30 11v22" />
      <circle cx="14" cy="14" r="2" />
      <circle cx="30" cy="30" r="2" />
      <circle cx="23" cy="22" r="3" />
    </svg>
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
      <a className="skip-link" href="#main-content">
        跳到主要內容 Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <NavLink className="brand" to="/" aria-label="NTHU VLSI/CAD Lab home" onClick={() => setMenuOpen(false)}>
            <CircuitMark />
            <span className="brand-copy">
              <strong>VLSI/CAD LAB</strong>
              <small>NATIONAL TSING HUA UNIVERSITY</small>
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
            {menuOpen ? <X /> : <Menu />}
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
                end={item.end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={() => setMenuOpen(false)}
              >
                <span>{item.zh}</span>
                <small>{item.en}</small>
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
              <CircuitMark />
              <span className="brand-copy">
                <strong>VLSI/CAD LAB</strong>
                <small>NTHU · HSINCHU, TAIWAN</small>
              </span>
            </div>
            <p>
              連結智慧系統與晶片設計
              <br />
              <span lang="en">Bridging intelligent systems and silicon design.</span>
            </p>
          </div>
          <div>
            <p className="footer-label">CONTACT</p>
            <a href="mailto:scchang@cs.nthu.edu.tw">
              <Mail size={16} /> scchang@cs.nthu.edu.tw
            </a>
            <a href="https://www.cs.nthu.edu.tw/~scchang/" target="_blank" rel="noreferrer">
              <ArrowUpRight size={16} /> Professor's official site
            </a>
          </div>
          <div>
            <p className="footer-label">SOURCE</p>
            <a href="https://github.com/nthu-sc-lab/sclab" target="_blank" rel="noreferrer">
              <GitBranch size={16} /> GitHub repository
            </a>
            <p className="archive-note">歷史資料均標示來源與年代。</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NTHU VLSI/CAD Laboratory</span>
          <span>Built as an open academic archive.</span>
        </div>
      </footer>
    </div>
  )
}
