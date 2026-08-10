import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Reveal from './Reveal.jsx'

/**
 * Masthead for an inner page. Carries the top padding that clears the fixed
 * header, so pages never have to remember it themselves.
 *
 * Plain by default: eyebrow, title, lead, and a single quiet rule closing it
 * off. Pass `framed` for the bordered green panel, which only the property page
 * uses. It is the one place on the site that carries a real CSS border.
 */
export function PageHeader({ eyebrow, title, lead, tone = 'dark', framed = false }) {
  const light = tone === 'light'

  if (framed) {
    return (
      <header className={light ? 'text-white' : 'text-ink'}>
        <div className="mx-auto max-w-[1400px] px-5 pb-4 pt-28 sm:px-8 sm:pt-36">
          <Reveal>
            <div
              className={`relative overflow-hidden rounded-[2.5rem] border-2 px-8 py-12 sm:px-14 sm:py-16 ${
                light ? 'border-brass-300/45 bg-white/5' : 'border-forest-700 bg-forest-50/50'
              }`}
            >
              {/* Soft wash so the panel is not a flat fill. Clipped by the
                  panel's own overflow, so it never leaks onto the page. */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute -right-28 -top-36 h-[460px] w-[460px] rounded-full blur-3xl ${
                  light
                    ? 'bg-gradient-to-br from-brass-300/25 via-forest-700/30 to-transparent'
                    : 'bg-gradient-to-br from-forest-200/70 via-brass-300/30 to-transparent'
                }`}
              />

              <div className="relative grid gap-9 lg:grid-cols-12 lg:items-end lg:gap-14">
                <div className="lg:col-span-7">
                  <span
                    className={`inline-flex items-center gap-2.5 rounded-full py-2 pl-3.5 pr-4 text-[11px] font-medium tracking-[0.22em] uppercase ${
                      light ? 'bg-white/10 text-brass-300' : 'bg-forest-700 text-white'
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brass-300" />
                    {eyebrow}
                  </span>

                  <h1 className="mt-7 font-display text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-[4.25rem]">
                    {title}
                  </h1>
                </div>

                {lead && (
                  <div className="lg:col-span-5">
                    <div className={`h-px w-16 ${light ? 'bg-brass-300/60' : 'bg-forest-600/50'}`} />
                    <p
                      className={`mt-5 max-w-md text-base leading-[1.75] sm:text-[17px] ${
                        light ? 'text-white/70' : 'text-ink/65'
                      }`}
                    >
                      {lead}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </header>
    )
  }

  return (
    <header className={light ? 'text-white' : 'text-ink'}>
      <div className="mx-auto max-w-[1400px] px-5 pt-32 sm:px-8 sm:pt-40">
        <Reveal>
          <span
            className={`text-[11px] font-medium tracking-[0.28em] uppercase ${
              light ? 'text-brass-300' : 'text-forest-600'
            }`}
          >
            {eyebrow}
          </span>

          <h1 className="mt-5 max-w-4xl font-display text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-[4.5rem]">
            {title}
          </h1>

          {lead && (
            <p
              className={`mt-7 max-w-2xl text-base leading-[1.75] sm:text-lg ${
                light ? 'text-white/70' : 'text-ink/60'
              }`}
            >
              {lead}
            </p>
          )}

          <div
            className={`mt-12 h-px w-full ${light ? 'bg-white/15' : 'bg-forest-700/20'}`}
          />
        </Reveal>
      </div>
    </header>
  )
}

/**
 * Wraps a route's content. Sends the window to the top on navigation and
 * plays a short fade so moving between pages does not feel like a reload.
 */
export function Page({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  )
}
