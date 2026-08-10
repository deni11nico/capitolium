import { Link } from 'react-router-dom'
import { MapPin } from '@phosphor-icons/react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { units } from '../data/units.js'

export default function Footer() {
  const { lang, t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="font-display text-4xl transition-opacity hover:opacity-70">
              Capitolium
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-white/55">{t.footer.tagline}</p>
            <p className="mt-7 flex items-start gap-2.5 text-sm text-white/45">
              <MapPin size={17} weight="light" className="mt-0.5 shrink-0" />
              {t.contact.address}
            </p>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/35">
              {t.nav.units}
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {units.map((unit) => (
                <li key={unit.slug}>
                  <Link
                    to={unit.href}
                    className="text-[15px] text-white/60 transition-colors duration-200 hover:text-brass-300"
                  >
                    {unit.name[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/35">
              {t.nav.contact}
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-white/60">
              {t.contact.phoneLabel}: {t.contact.placeholder}
              <br />
              {t.contact.emailLabel}: {t.contact.placeholder}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 rounded-3xl bg-white/5 px-7 py-6 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} Capitolium. {t.footer.rights}
          </p>
          <p className="max-w-md sm:text-right">{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
