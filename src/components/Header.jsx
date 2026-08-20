import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { BRAND_DESCRIPTOR, BRAND_NAME } from '../brand.js'
import { ROUTES } from '../routes.js'

function LanguageToggle() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      className="flex items-center gap-0.5 rounded-full bg-black/5 p-1"
      role="group"
      aria-label={t.a11y.switchTo}
    >
      {['ro', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase transition-colors duration-200 ${
            lang === code ? 'bg-forest-700 text-white' : 'text-current/70 hover:text-current'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

export default function Header() {
  const { t } = useLanguage()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Only the home page has a full-bleed hero for the bar to sit over.
  const onHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const solid = scrolled || !onHome || menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-white/92 py-3 text-ink shadow-[0_1px_24px_rgba(26,28,25,0.08)] backdrop-blur-xl'
          : 'bg-transparent py-6 text-white'
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          to="/"
          aria-label={t.a11y.home}
          className="flex shrink-0 flex-col leading-none transition-opacity duration-200 hover:opacity-70"
        >
          {/* Set as a wordmark: the address line in letterspaced caps, the
              descriptor beneath it between two rules. */}
          <span className="font-display text-[22px] font-medium tracking-[0.16em] uppercase sm:text-[25px]">
            {BRAND_NAME}
          </span>
          <span
            className={`mt-1.5 flex items-center gap-2 text-[9px] font-medium tracking-[0.34em] uppercase transition-colors duration-500 ${
              solid ? 'text-forest-600' : 'text-white/70'
            }`}
          >
            <span className="h-px w-4 bg-current opacity-60" />
            {BRAND_DESCRIPTOR}
            <span className="h-px w-4 bg-current opacity-60" />
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {ROUTES.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              end={route.path === '/'}
              className={({ isActive }) =>
                `relative text-[13px] transition-all duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:rounded-full after:transition-all after:duration-300 ${
                  isActive
                    ? `font-semibold after:w-full ${solid ? 'text-forest-700 after:bg-forest-700' : 'text-brass-300 after:bg-brass-300'}`
                    : 'font-medium opacity-70 after:w-0 after:bg-current hover:opacity-100 hover:after:w-full'
                }`
              }
            >
              {t.nav[route.key]}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LanguageToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.close : t.nav.menu}
            className="rounded-full bg-black/5 p-2.5 transition-colors duration-200 hover:bg-black/10 lg:hidden"
          >
            {menuOpen ? <X size={18} weight="light" /> : <List size={18} weight="light" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mt-3 max-h-[calc(100svh-6rem)] overflow-y-auto bg-white px-5 pb-8 pt-4 lg:hidden">
          <div className="mx-auto flex max-w-[1500px] flex-col">
            {ROUTES.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                end={route.path === '/'}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 font-display text-2xl transition-colors duration-200 ${
                    isActive ? 'bg-forest-50 text-forest-700' : 'text-ink hover:bg-stone-warm'
                  }`
                }
              >
                {t.nav[route.key]}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
