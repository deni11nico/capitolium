import { Link } from 'react-router-dom'
import { MapPin, Phone } from '@phosphor-icons/react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { BRAND_DESCRIPTOR, BRAND_FULL, BRAND_NAME } from '../brand.js'
import { units } from '../data/units.js'
import { contactChannels } from '../contactChannels.js'

export default function Footer() {
  const { lang, t } = useLanguage()
  const year = new Date().getFullYear()
  // Shared with the contact page and the strip above, so the address only
  // ever has to be filled in once.
  const email = contactChannels(t).find((channel) => channel.key === 'email')

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              to="/"
              className="flex w-fit flex-col leading-none transition-opacity hover:opacity-70"
            >
              <span className="font-display text-[32px] tracking-[0.14em] uppercase">
                {BRAND_NAME}
              </span>
              <span className="mt-2 flex items-center gap-2 text-[9px] font-medium tracking-[0.34em] uppercase text-white/45">
                <span className="h-px w-4 bg-current opacity-60" />
                {BRAND_DESCRIPTOR}
                <span className="h-px w-4 bg-current opacity-60" />
              </span>
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
              {t.contact.reach}
            </p>
            {/* Secondary on purpose: the hero drives enquiries through the
                qualifying form, this is here for anyone who prefers to call. */}
            <a
              href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
              className="mt-6 flex w-fit items-center gap-2.5 text-[17px] text-white/80 transition-colors duration-200 hover:text-brass-300"
            >
              <Phone size={17} weight="light" />
              {t.contact.phone}
            </a>
            <p className="mt-3 text-[15px] leading-relaxed text-white/60">
              {t.contact.emailLabel}:{' '}
              {email.href ? (
                <a
                  href={email.href}
                  className="transition-colors duration-200 hover:text-brass-300"
                >
                  {email.value}
                </a>
              ) : (
                email.value
              )}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 rounded-3xl bg-white/5 px-7 py-6 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {BRAND_FULL}. {t.footer.rights}
          </p>
          <p className="max-w-md sm:text-right">{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
