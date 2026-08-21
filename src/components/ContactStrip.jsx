import Reveal from './Reveal.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { contactChannels } from '../contactChannels.js'

/**
 * Closes every page with the three ways to reach us, immediately above the
 * footer. Deliberately the details only: the form itself stays on /contact,
 * so there is one place to fill it in rather than one per page.
 *
 * Rendered once in App rather than per page, which is what keeps it identical
 * everywhere including the unit pages.
 */
export default function ContactStrip() {
  const { t } = useLanguage()
  const channels = contactChannels(t)

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20">
        <Reveal>
          {/* A tinted card, so the block reads as its own thing whatever the
              page above it happens to end on. */}
          <div className="rounded-[2rem] bg-stone-warm px-7 py-10 sm:px-12 sm:py-12">
            <div className="max-w-2xl">
              <h2 className="font-display text-[2rem] leading-tight sm:text-[2.5rem]">
                {t.contact.reach}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/60 sm:text-base">
                {t.contact.pageLead}
              </p>
            </div>

            <dl className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {channels.map(({ key, icon: Icon, label, value, href, external }) => (
                <div key={key} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-forest-700">
                    <Icon size={19} weight="light" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[11px] font-medium tracking-[0.2em] uppercase text-ink/40">
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-ink/85">
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                          className="-my-2 inline-block py-2 transition-colors duration-200 hover:text-forest-700"
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
