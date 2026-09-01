import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, ChevronDown, Mail, Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router";

const REVEAL_SELECTOR = [
  ":scope > section",
  "article",
  "figure",
  ".milestone",
  ".timeline-item",
  ".stat-card",
  ".profile-card",
].join(", ");

const REVEAL_VARIANTS = [
  "scroll-reveal-up",
  "scroll-reveal-left",
  "scroll-reveal-right",
  "scroll-reveal-scale",
] as const;

const navigation = [
  {
    id: "about",
    label: "About",
    items: [
      { to: "/about/advisor", label: "Advisor", note: "指導教授" },
      { to: "/about/members", label: "Members", note: "團隊成員" },
    ],
  },
  {
    id: "research",
    label: "Research",
    items: [
      { to: "/research", label: "Research Areas", note: "研究方向" },
      { to: "/awards", label: "Awards", note: "獎項榮譽" },
      { to: "/publications", label: "Publications", note: "研究成果" },
    ],
  },
  {
    id: "lab",
    label: "Lab",
    items: [
      { to: "/gallery", label: "Gallery", note: "實驗室照片" },
      { to: "/contact", label: "Contact", note: "聯絡資訊" },
    ],
  },
] as const;

function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function RevealManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    const registered = new Set<HTMLElement>();
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer =
      !prefersReducedMotion && "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer?.unobserve(entry.target);
              });
            },
            { threshold: 0.06, rootMargin: "0px 0px -7% 0px" },
          )
        : null;

    const registerTargets = () => {
      main.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((target) => {
        if (registered.has(target)) return;

        const index = registered.size;
        target.classList.add(
          "scroll-reveal",
          REVEAL_VARIANTS[index % REVEAL_VARIANTS.length],
        );
        target.style.setProperty("--reveal-delay", `${(index % 3) * 55}ms`);
        registered.add(target);

        if (observer) observer.observe(target);
        else target.classList.add("is-visible");
      });
    };

    registerTargets();

    const mutationObserver =
      "MutationObserver" in window
        ? new MutationObserver(registerTargets)
        : null;
    mutationObserver?.observe(main, { childList: true, subtree: true });

    return () => {
      mutationObserver?.disconnect();
      observer?.disconnect();
      registered.forEach((target) => {
        target.classList.remove(
          "scroll-reveal",
          "scroll-reveal-up",
          "scroll-reveal-left",
          "scroll-reveal-right",
          "scroll-reveal-scale",
          "is-visible",
        );
        target.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { pathname } = useLocation();

  const closeNavigation = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <div className="site-shell">
      <ScrollManager />
      <RevealManager />
      <a className="skip-link" href="#main-content">
        跳到主要內容 Skip to content
      </a>

      <header className="site-header">
        <div className="header-inner">
          <NavLink
            className="brand"
            to="/"
            aria-label="NTHU VLSI/CAD Lab home"
            onClick={closeNavigation}
          >
            <img
              className="header-logo"
              src={`${import.meta.env.BASE_URL}sclab-logo.png`}
              alt="National Tsing Hua University VLSI/CAD Laboratory"
            />
          </NavLink>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? "關閉選單 Close menu" : "開啟選單 Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav
            id="primary-navigation"
            aria-label="Primary navigation"
            className={menuOpen ? "primary-nav is-open" : "primary-nav"}
          >
            {navigation.map((group) => (
              <div
                className={`nav-group${group.items.some((item) => item.to === pathname) ? " active" : ""}${openDropdown === group.id ? " is-open" : ""}`}
                key={group.id}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setOpenDropdown(null);
                }}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="nav-group-trigger"
                  type="button"
                  aria-expanded={openDropdown === group.id}
                  aria-controls={`nav-submenu-${group.id}`}
                  onClick={() =>
                    setOpenDropdown((current) =>
                      current === group.id ? null : group.id,
                    )
                  }
                >
                  {group.label}
                  <ChevronDown size={14} aria-hidden="true" />
                </button>
                <div className="nav-submenu" id={`nav-submenu-${group.id}`}>
                  {group.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        isActive ? "active" : undefined
                      }
                      onClick={closeNavigation}
                    >
                      <span>{item.label}</span>
                      <small>{item.note}</small>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="brand footer-brand">
              <img
                className="footer-logo"
                src={`${import.meta.env.BASE_URL}sclab-logo.png`}
                alt="National Tsing Hua University VLSI/CAD Laboratory"
              />
            </div>
            <p className="footer-description">
              Department of Computer Science, NTHU
            </p>
          </div>
          <div>
            <p className="footer-label">CONTACT</p>
            <a href="mailto:scchang@cs.nthu.edu.tw">
              <Mail size={15} /> scchang@cs.nthu.edu.tw
            </a>
            <a
              href="https://www.cs.nthu.edu.tw/~scchang/"
              target="_blank"
              rel="noreferrer"
            >
              <ArrowUpRight size={15} /> Professor profile
            </a>
          </div>
          <div>
            <p className="footer-label">EXPLORE</p>
            <NavLink to="/about/advisor">
              <ArrowUpRight size={15} /> Advisor
            </NavLink>
            <NavLink to="/about/members">
              <ArrowUpRight size={15} /> Members
            </NavLink>
            <NavLink to="/publications">
              <ArrowUpRight size={15} /> Publications
            </NavLink>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NTHU VLSI/CAD Laboratory</span>
          <span>Hsinchu, Taiwan · VLSI / CAD research group</span>
        </div>
      </footer>
    </div>
  );
}
