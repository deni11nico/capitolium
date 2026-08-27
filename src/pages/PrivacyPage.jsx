import { PageHeader } from '../components/Page.jsx'
import Reveal from '../components/Reveal.jsx'
import { Section } from '../components/Section.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * The privacy policy, in whichever language the toggle is set to, at one URL.
 *
 * Long-form legal text rather than presentation, so it is set narrow and
 * generously leaded: a measure of about 70 characters, which is where a wall
 * of text stays readable.
 */
export default function PrivacyPage() {
  const { t } = useLanguage()

  return (
    <>
      <PageHeader
        eyebrow={t.privacy.eyebrow}
        title={t.privacy.title}
        lead={t.privacy.updated}
      />

      <Section id="privacy" tightTop>
        <div className="flex max-w-3xl flex-col gap-14">
          {t.privacy.sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 40}>
              <h2 className="font-display text-2xl leading-snug sm:text-[26px]">
                {/* Numbered from the array, so inserting a section never
                    leaves the numbering to be corrected by hand. */}
                <span className="mr-3 text-forest-600">{index + 1}.</span>
                {section.title}
              </h2>

              {section.intro && (
                <p className="mt-5 text-[15px] leading-[1.8] text-ink/65 sm:text-base">
                  {section.intro}
                </p>
              )}

              {section.lines && (
                <div className="mt-4 flex flex-col gap-1.5 text-[15px] leading-[1.8] text-ink/65 sm:text-base">
                  {section.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
              )}

              {section.list && (
                <ul className="mt-4 flex flex-col gap-2.5">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-[1.8] text-ink/65 sm:text-base"
                    >
                      <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-forest-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.outro && (
                <p className="mt-4 text-[15px] leading-[1.8] text-ink/65 sm:text-base">
                  {section.outro}
                </p>
              )}

              {section.email && (
                <p className="mt-2 text-[15px] leading-[1.8] sm:text-base">
                  {section.emailLabel && (
                    <span className="text-ink/65">{section.emailLabel} </span>
                  )}
                  <a
                    href={`mailto:${section.email}`}
                    className="text-forest-700 transition-colors duration-200 hover:text-forest-800"
                  >
                    {section.email}
                  </a>
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
