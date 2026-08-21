import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDown,
  ArrowRight,
  ArrowSquareOut,
  ArrowUpRight,
  Buildings,
  CaretDown,
  CheckCircle,
  FileText,
  Info,
  Leaf,
  LockSimple,
  MapPin,
  Stack,
  UserCircle,
} from '@phosphor-icons/react'
import Photo from '../components/Photo.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import Reveal from '../components/Reveal.jsx'
import { REQUEST_ID, useGoToRequest } from '../components/useGoToRequest.js'
import UnitCard from '../components/UnitCard.jsx'
import { Eyebrow, FeatureCard, Section, SectionHeading } from '../components/Section.jsx'
import { icons, investmentIcons } from '../components/icons.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { MAP_EMBED, MAP_LINK, contactChannels } from '../contactChannels.js'
import {
  architecturePhoto,
  courtyard,
  courtyardFeature,
  courtyardGallery,
  courtyardPair,
  entrancePhoto,
  gatePhoto,
  heroPhoto,
  investmentPhoto,
  opportunityPhotos,
  units,
  worksPhotos,
} from '../data/units.js'

/**
 * The content blocks the site is built from. Pages compose these, so a block
 * can move between pages without being rewritten.
 */

export function Hero() {
  const { t } = useLanguage()

  const toOverview = () =>
    document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-[92svh] w-full overflow-hidden bg-ink">
      <Photo
        photo={heroPhoto}
        alt={t.hero.title}
        variant="full"
        eager
        className="absolute inset-0 h-full w-full"
        imgClassName="scale-[1.02]"
      />

      {/* legibility wash, kept soft so the facade stays the subject */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/45" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-[1400px] flex-col justify-end px-5 pb-20 pt-40 sm:px-8 sm:pb-24">
        <Reveal>
          <span className="text-[13px] font-medium tracking-[0.28em] uppercase text-white sm:text-[15px]">
            {t.hero.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-6 max-w-5xl font-display text-[3rem] font-bold leading-[1.02] text-white sm:text-7xl lg:text-[5.75rem]">
            {t.hero.title}
            <br />
            {t.hero.titleAccent}
          </h1>
        </Reveal>

        {/* The qualifying subtitle sits with the title, not tucked away lower
            down: it is what tells a visitor whether this is for them. */}
        <Reveal delay={240}>
          <p className="mt-8 max-w-xl text-[15px] leading-[1.75] text-white/80 sm:text-[17px]">
            {t.hero.lead}
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={toOverview}
              className="flex items-center gap-3.5 rounded-sm bg-brass-400 px-8 py-5 text-[12px] font-medium tracking-[0.16em] uppercase text-forest-900 transition-colors duration-300 hover:bg-brass-300"
            >
              <ArrowDown size={19} weight="light" />
              {t.hero.cta}
            </button>
          </div>
        </Reveal>

        <Reveal delay={440}>
          <p className="mt-6 flex items-center gap-2 text-[12px] text-white/55">
            <LockSimple size={14} weight="light" />
            {t.hero.confidential}
          </p>
        </Reveal>
      </div>

      <button
        type="button"
        onClick={toOverview}
        aria-label={t.hero.scroll}
        className="absolute bottom-8 right-5 hidden rounded-full bg-white/12 p-3.5 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/25 sm:right-8 sm:block"
      >
        <ArrowDown size={18} weight="light" className="animate-bounce" />
      </button>
    </section>
  )
}

const TRUST_ICONS = { units: Buildings, whole: Stack, place: MapPin, owner: UserCircle }

/** Four reassurances directly under the hero, divided by hairlines. */
export function TrustBar() {
  const { t } = useLanguage()

  return (
    <section className="bg-stone-warm">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-8 px-5 py-9 sm:px-8 lg:grid-cols-4 lg:gap-y-0">
        {t.trust.map((item, index) => {
          const Icon = TRUST_ICONS[item.icon]
          return (
            <Reveal
              key={item.label}
              delay={index * 80}
              className={`flex items-center justify-center gap-4 px-4 ${
                index > 0 ? 'lg:[box-shadow:inset_1px_0_0_0_rgba(26,28,25,0.1)]' : ''
              }`}
            >
              <Icon size={30} weight="light" className="shrink-0 text-forest-600" />
              <p className="text-[11px] font-medium leading-[1.5] tracking-[0.14em] uppercase text-ink/70">
                {item.value && (
                  <span className="mr-1.5 font-display text-[26px] tracking-normal text-ink">
                    {item.value}
                  </span>
                )}
                {item.label}
              </p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

/** The four uses the building is positioned for, each with a photograph. */
export function Opportunities({ onOpenPhoto }) {
  const { t } = useLanguage()

  return (
    <Section id="opportunities" tightBottom>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-4">
          <h2 className="font-display text-[2.25rem] leading-[1.12] sm:text-[2.75rem]">
            {t.opportunities.titleLineOne}
            <br />
            {t.opportunities.titleLineTwo}
          </h2>
          <div className="mt-7 h-px w-16 bg-brass-400" />
          <p className="mt-7 max-w-sm text-[15px] leading-[1.75] text-ink/60">
            {t.opportunities.body}
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {t.opportunities.items.map((label, index) => (
              <Reveal key={label} delay={index * 80}>
                <button
                  type="button"
                  onClick={() => onOpenPhoto?.(index)}
                  aria-label={`${t.a11y.openGallery} ${label}`}
                  className="group block w-full overflow-hidden rounded-sm"
                >
                  <Photo
                    photo={opportunityPhotos[index]}
                    alt={label}
                    className="aspect-[4/3] w-full"
                    imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                </button>
                <p className="mt-4 text-center text-[11px] font-medium tracking-[0.16em] uppercase text-ink/60">
                  {label}
                </p>
              </Reveal>
            ))}
          </div>

          {/* These four are renders of what the building could become, not
              photographs of it, and saying so belongs next to them rather
              than in the small print. */}
          <Reveal delay={340}>
            <p className="mt-8 flex items-start gap-3 rounded-2xl bg-stone-warm px-5 py-4 text-[12px] leading-relaxed text-ink/45 sm:text-[13px]">
              <Info size={16} weight="light" className="mt-px shrink-0" />
              {t.opportunities.disclaimer}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/**
 * Answers the three questions that disqualify most enquiries. The qualifying
 * form used to sit beside it; it now lives only behind the hero button, so
 * there is one way in rather than two competing ones.
 */
export function Faq() {
  const { t } = useLanguage()
  // Open by default, as in the approved design, and each one still collapses.
  const [closed, setClosed] = useState(() => new Set())
  const toggle = (index) =>
    setClosed((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })

  return (
    <Section id="faq" tone="warm">
      {/* The heading uses the shared SectionHeading, so the type scale here is
          the same one Prezentare, Arhitectură and Execuție are set in.
          Centred as a column with the list below it, which shares its width:
          left-aligned, the pair left a wide gutter open down the right. */}
      <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} className="mx-auto" />

      <div className="mx-auto mt-14 flex max-w-4xl flex-col gap-4">
        {t.faq.items.map((item, index) => {
          const isOpen = !closed.has(index)
          return (
            <Reveal key={item.q} delay={index * 80}>
              <div className="overflow-hidden rounded-sm bg-white">
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-6 px-8 pt-7 text-left sm:px-9 sm:pt-8"
                  >
                    {/* Same size as every other h3 on the site, the one
                        FeatureCard and the technical blocks use. */}
                    <span className="font-display text-2xl leading-snug sm:text-[26px]">
                      {item.q}
                    </span>
                    <CaretDown
                      size={22}
                      weight="light"
                      className={`shrink-0 text-forest-600 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>

                {isOpen ? (
                  <div
                    id={`faq-panel-${index}`}
                    className="px-8 pb-7 pt-3 sm:px-9 sm:pb-8"
                  >
                    <p className="max-w-2xl text-[15px] leading-relaxed text-ink/60">
                      {item.a}
                    </p>
                  </div>
                ) : (
                  <div className="pb-7 sm:pb-8" />
                )}
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

export function Intro() {
  const { t } = useLanguage()

  return (
    <Section id="overview">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>{t.intro.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-[2.5rem] leading-[1.08] sm:text-6xl lg:text-[4.25rem]">
              {t.intro.title}
            </h2>
          </Reveal>

          {t.intro.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={100 + index * 100}>
              <p className="mt-8 max-w-2xl text-base leading-[1.8] text-ink/65 sm:text-[17px]">
                {paragraph}
              </p>
            </Reveal>
          ))}

          <div className="mt-12 flex flex-wrap gap-3">
            {t.intro.uses.map((use, index) => {
              const Icon = icons[use.icon]
              return (
                <Reveal key={use.label} delay={300 + index * 80}>
                  <span className="flex items-center gap-2.5 rounded-full bg-stone-warm px-5 py-3 text-sm text-ink/75">
                    <Icon size={17} weight="light" className="text-forest-600" />
                    {use.label}
                  </span>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* 4:3 suits the landscape street-sign frame: a 3:4 box would crop the
            house number off the left edge. */}
        <Reveal delay={160} className="lg:col-span-5">
          <Photo
            photo={entrancePhoto}
            alt={t.intro.title}
            variant="full"
            className="aspect-[4/3] w-full rounded-3xl"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </Reveal>
      </div>
    </Section>
  )
}

export function Architecture() {
  const { t } = useLanguage()

  return (
    <Section id="architecture" tone="warm">
      <SectionHeading
        eyebrow={t.architecture.eyebrow}
        title={t.architecture.title}
        body={t.architecture.body}
      />

      <Reveal delay={140} className="mt-16">
        <Photo
          photo={architecturePhoto}
          alt={t.architecture.title}
          variant="full"
          className="aspect-[16/9] w-full rounded-[2rem] sm:aspect-[21/9]"
          sizes="100vw"
        />
      </Reveal>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.architecture.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 90} className="rounded-3xl bg-white p-8 sm:p-9">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[3.25rem] leading-none text-forest-700">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="text-sm font-medium tracking-wide text-forest-600">
                  {stat.unit}
                </span>
              )}
            </div>
            <p className="mt-5 text-[11px] font-medium tracking-[0.2em] uppercase text-ink/45">
              {stat.label}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{stat.note}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function Execution() {
  const { t } = useLanguage()

  return (
    <Section id="execution" tightBottom>
      <SectionHeading
        eyebrow={t.execution.eyebrow}
        title={t.execution.title}
        body={t.execution.body}
      />

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {t.execution.items.map((item, index) => (
          <FeatureCard
            key={item.title}
            icon={icons[item.icon]}
            title={item.title}
            text={item.text}
            delay={index * 90}
          />
        ))}
      </div>

      {/* A grid rather than a flex row: the brands then sit on an even rhythm
          across the full width instead of bunching into the left third, and
          the padding matches the cards above so the left edges line up. */}
      <Reveal delay={220} className="mt-4 rounded-3xl bg-forest-900 p-8 sm:p-9">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {t.execution.brands.map((brand) => (
            <span
              key={brand}
              className="font-display text-xl leading-none text-white/85 sm:text-2xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}

/**
 * Manufacturer page for the wall insulation. The English page is used because
 * Petralana publishes only English and Polish; there is no Romanian edition.
 * Set to an empty string to hide the link rather than leave a dead one.
 */
const PETRALANA_URL = 'https://www.petralana.eu/en/products/petrafas_34'

/** Reference for the ceiling insulation claims. */
const CEILING_SOURCE_URL = 'https://search.app/s6GMBiMySJEf29AA6'

/** Heading shared by every block in the technical section. */
function TechnicalBlockHeading({ icon: Icon, title, compact = false }) {
  return (
    <>
      {Icon && (
        <Icon size={compact ? 26 : 30} weight="light" className="text-forest-600" />
      )}
      <h3
        className={`font-display leading-snug ${
          compact ? 'mt-5 text-xl sm:text-[22px]' : 'mt-7 text-2xl sm:text-[26px]'
        }`}
      >
        {title}
      </h3>
    </>
  )
}

/**
 * The build specifications, sitting under the execution section.
 *
 * Not a uniform card grid: the access and ceiling blocks pair their copy with
 * photography, while the wall block carries a specification and a link to the
 * manufacturer in place of an image. Every pairing is two columns from lg up
 * and stacks below that, so nothing is squeezed on a phone.
 */
export function TechnicalDetails({ onOpenPhoto }) {
  const { t } = useLanguage()

  return (
    // Opens tight because the execution section above it closes tight.
    <Section id="technical" tightTop>
      <SectionHeading
        eyebrow={t.technical.eyebrow}
        title={t.technical.title}
        body={t.technical.body}
      />

      {/* Access: the same pairing as the ceiling block below, mirrored so the
          photograph leads on the left and the copy sits on the right. The
          photo is out of flow because p5 is portrait, and an in-flow portrait
          image imposes its own intrinsic height on the row, which h-full
          cannot rein in while the row height is itself auto. */}
      <div className="mt-16 grid items-stretch gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <button
            type="button"
            onClick={() => onOpenPhoto({ photos: [gatePhoto], index: 0 })}
            aria-label={`${t.a11y.openGallery} ${t.technical.gate.title}`}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl lg:aspect-auto lg:h-full lg:min-h-[520px]"
          >
            {/* p5 is a 1200x1600 portrait. At 300px tall only a 29% band of it
                survived the cover crop, which is why the gate was barely
                readable. 520px shows roughly half the frame. */}
            <Photo
              photo={gatePhoto}
              alt={t.technical.gate.title}
              variant="full"
              className="absolute inset-0 h-full w-full"
              imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </button>
        </Reveal>

        <Reveal
          delay={120}
          className="flex flex-col justify-center rounded-3xl bg-stone-warm p-8 sm:p-10 lg:col-span-5"
        >
          <TechnicalBlockHeading
            icon={icons[t.technical.gate.icon]}
            title={t.technical.gate.title}
          />
          <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
            {t.technical.gate.text}
          </p>
        </Reveal>
      </div>

      {/* Heating and courtyard need no imagery of their own. */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <FeatureCard
          icon={icons[t.technical.heating.icon]}
          title={t.technical.heating.title}
          text={t.technical.heating.text}
        />
        <FeatureCard
          icon={icons[t.technical.courtyard.icon]}
          title={t.technical.courtyard.title}
          text={t.technical.courtyard.text}
          delay={90}
        />
      </div>

      {/* Walls: specification and a manufacturer link instead of a photo. */}
      <Reveal className="mt-4 rounded-3xl bg-stone-warm p-8 sm:p-10">
        <TechnicalBlockHeading icon={icons[t.technical.walls.icon]} title={t.technical.walls.title} />
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink/60">
          {t.technical.walls.text}
        </p>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink/60">
          {t.technical.walls.extra}
        </p>
        {/* Rendered only when there is somewhere to go, so the button can never
            sit on the page looking clickable while doing nothing. */}
        {PETRALANA_URL && (
          <a
            href={PETRALANA_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-[13px] font-medium text-forest-700 transition-colors duration-300 hover:bg-forest-700 hover:text-white"
          >
            {t.technical.walls.linkLabel}
            <ArrowUpRight
              size={15}
              weight="light"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        )}
      </Reveal>

      {/* Ceilings: copy with a footnote link, beside the site photographs. */}
      <div className="mt-4 grid gap-4 lg:grid-cols-12">
        <Reveal className="flex flex-col justify-center rounded-3xl bg-stone-warm p-8 sm:p-10 lg:col-span-5">
          <TechnicalBlockHeading
            icon={icons[t.technical.ceilings.icon]}
            title={t.technical.ceilings.title}
          />
          <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
            {t.technical.ceilings.text}
          </p>
          <p className="mt-5 text-[13px] text-ink/45">
            {t.technical.ceilings.sourceLabel}:{' '}
            <a
              href={CEILING_SOURCE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-forest-700 underline underline-offset-4 transition-colors duration-200 hover:text-forest-800"
            >
              izolatiinaturale.ro
            </a>
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
          {worksPhotos.map((photo, index) => (
            <Reveal key={photo.id} delay={index * 90}>
              <button
                type="button"
                onClick={() => onOpenPhoto({ photos: worksPhotos, index })}
                aria-label={`${t.a11y.openGallery} ${index + 1}`}
                className="group block aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[300px]"
              >
                <Photo
                  photo={photo}
                  alt={t.technical.galleryTitle}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function Technology() {
  const { t } = useLanguage()

  return (
    <Section id="technology" tone="warm">
      <SectionHeading
        eyebrow={t.technology.eyebrow}
        title={t.technology.title}
        body={t.technology.body}
      />

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.technology.items.map((item, index) => (
          <FeatureCard
            key={item.title}
            icon={icons[item.icon]}
            title={item.title}
            text={item.text}
            tone="warm"
            delay={index * 80}
          />
        ))}
      </div>
    </Section>
  )
}

export function Comfort() {
  const { t } = useLanguage()

  return (
    <Section id="comfort">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow={t.comfort.eyebrow}
            title={t.comfort.title}
            body={t.comfort.body}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {t.comfort.items.map((item, index) => (
            <FeatureCard
              key={item.title}
              icon={icons[item.icon]}
              title={item.title}
              text={item.text}
              delay={index * 80}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

export function Energy() {
  const { t } = useLanguage()

  return (
    <section id="energy" className="bg-forest-900 text-white">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-24 lg:py-36">
        <Reveal>
          <Eyebrow tone="light">{t.energy.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-[2.5rem] leading-[1.08] sm:text-6xl">
            {t.energy.title}
          </h2>

          <ul className="mt-10 flex flex-col gap-4">
            {t.energy.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3.5 text-[15px] text-white/70 sm:text-base"
              >
                <CheckCircle size={20} weight="light" className="mt-0.5 shrink-0 text-brass-300" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160} className="flex justify-center lg:justify-end">
          <div className="flex aspect-square w-full max-w-sm flex-col items-center justify-center rounded-[2.5rem] bg-white/6 p-10 text-center">
            <Leaf size={38} weight="light" className="text-brass-300" />
            <p className="mt-8 text-[11px] font-medium tracking-[0.24em] uppercase text-white/55">
              {t.energy.badge}
            </p>
            <span className="mt-2 font-display text-[9rem] leading-none text-brass-300">
              {t.energy.badgeValue}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Exterior({ onOpenPhoto }) {
  const { t } = useLanguage()

  // The viewer on this page browses the whole courtyard set, so each frame
  // opens at its own position within it rather than in a set of its own.
  const openAt = (photo) => {
    if (!onOpenPhoto || !photo) return undefined
    const index = courtyard.findIndex((item) => item.id === photo.id)
    return index === -1 ? undefined : () => onOpenPhoto(index)
  }

  const frame = (photo, ratio, sizes, delay) => {
    const open = openAt(photo)
    const image = (
      <Photo
        photo={photo}
        alt={t.exterior.title}
        variant="full"
        className={`${ratio} w-full`}
        imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        sizes={sizes}
      />
    )

    return (
      <Reveal delay={delay}>
        {open ? (
          <button
            type="button"
            onClick={open}
            aria-label={`${t.a11y.openGallery} ${t.exterior.title}`}
            className="group block w-full overflow-hidden rounded-[2rem]"
          >
            {image}
          </button>
        ) : (
          <div className="overflow-hidden rounded-[2rem]">{image}</div>
        )}
      </Reveal>
    )
  }

  return (
    <Section id="exterior" tone="warm">
      <SectionHeading
        eyebrow={t.exterior.eyebrow}
        title={t.exterior.title}
        body={t.exterior.body}
      />

      <div className="mt-16 grid gap-4 lg:grid-cols-12">
        {/* Lead frame, with the two courtyard sheets side by side beneath it. */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          {frame(courtyardFeature, 'aspect-[4/3]', '(max-width: 1024px) 100vw, 58vw', 0)}

          {courtyardPair.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {courtyardPair.map((photo, index) =>
                <div key={photo.id}>
                  {frame(photo, 'aspect-[3/2]', '(max-width: 1024px) 50vw, 29vw', (index + 1) * 90)}
                </div>,
              )}
            </div>
          )}
        </div>

        <div className="grid gap-4 lg:col-span-5">
          {t.exterior.items.map((item, index) => (
            <FeatureCard
              key={item.title}
              icon={icons[item.icon]}
              title={item.title}
              text={item.text}
              tone="warm"
              delay={index * 90}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

/** Every courtyard frame, used on the exterior page. */
export function CourtyardGallery({ onOpen }) {
  const { t } = useLanguage()

  return (
    <Section id="courtyard">
      <Reveal>
        <Eyebrow>{t.common.courtyardGallery}</Eyebrow>
        <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
          {courtyardGallery.length} {t.units.photosLabel}
        </h2>
      </Reveal>

      <div className="mt-12 grid auto-rows-fr grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-3">
        {courtyardGallery.map((photo, index) => (
          <Reveal key={photo.id} delay={(index % 3) * 80}>
            <button
              type="button"
              // Resolved against the full set, which the viewer still browses,
              // so the grid never has to match its own order to that one.
              onClick={() => onOpen(courtyard.findIndex((item) => item.id === photo.id))}
              aria-label={`${t.a11y.openGallery} ${index + 1}`}
              className="group block aspect-[4/3] w-full overflow-hidden rounded-3xl"
            >
              <Photo
                photo={photo}
                alt={t.exterior.title}
                eager={index < 4}
                className="h-full w-full"
                imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </button>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function Units({ preview = false, withHeading = true }) {
  const { t } = useLanguage()
  const list = preview ? units.slice(0, 3) : units

  return (
    <Section id="units">
      {withHeading && (
        <SectionHeading eyebrow={t.units.eyebrow} title={t.units.title} body={t.units.body} />
      )}

      <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${withHeading ? 'mt-16' : ''}`}>
        {list.map((unit, index) => (
          <UnitCard key={unit.slug} unit={unit} delay={(index % 3) * 90} />
        ))}
      </div>

      {preview && (
        <Reveal delay={200} className="mt-12">
          <Link
            to="/apartamente"
            className="group inline-flex items-center gap-3 rounded-full bg-forest-700 px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-forest-800"
          >
            {t.common.viewAllUnits}
            <ArrowRight
              size={16}
              weight="light"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      )}
    </Section>
  )
}

export function Investment() {
  const { t } = useLanguage()

  return (
    <section id="investment" className="relative overflow-hidden bg-forest-900 text-white">
      <Photo
        photo={investmentPhoto}
        alt=""
        variant="full"
        className="absolute inset-0 h-full w-full opacity-[0.14]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900 via-forest-900/92 to-forest-900" />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-24 pt-12 sm:px-8 sm:pb-32 sm:pt-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {t.investment.items.map((item, index) => (
            <FeatureCard
              key={item.title}
              icon={investmentIcons[index]}
              title={item.title}
              text={item.text}
              tone="light"
              delay={index * 90}
            />
          ))}
        </div>

        <Reveal
          delay={200}
          className="mt-4 rounded-[2rem] bg-brass-300 px-9 py-12 text-forest-900 sm:px-14 sm:py-16"
        >
          <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-forest-900/60">
            {t.investment.conclusionTitle}
          </span>
          <p className="mt-6 max-w-4xl font-display text-[1.75rem] leading-[1.35] sm:text-[2.5rem]">
            {t.investment.conclusion}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/** One line of the contact card: accent icon, label, value. */
function ContactRow({ icon: Icon, label, value, href, external }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
        <Icon size={19} weight="light" />
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] font-medium tracking-[0.2em] uppercase text-ink/40">{label}</dt>
        <dd className="mt-1.5 text-[16px] leading-relaxed text-ink/85">
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
  )
}

export function Contact({ withHeading = true }) {
  const { t } = useLanguage()
  const goToRequest = useGoToRequest()

  return (
    <Section id="contact" tone="warm">
      {withHeading && (
        <div className="mb-14 max-w-2xl">
          <SectionHeading
            eyebrow={t.contact.eyebrow}
            title={t.contact.pageTitle}
            body={t.contact.pageLead}
          />
        </div>
      )}

      <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <div className="rounded-[2rem] bg-white p-6 sm:p-10">
            <h3 className="font-display text-2xl leading-snug sm:text-[26px]">{t.contact.detailsTitle}</h3>

            <dl className="mt-8 flex flex-col gap-7">
              {/* `key` is pulled out of the spread: React treats a spread
                  key as a missing one and warns. */}
              {contactChannels(t).map(({ key, ...channel }) => (
                <ContactRow key={key} {...channel} />
              ))}
            </dl>

            <button
              type="button"
              onClick={goToRequest}
              className="group mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-forest-700 px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-forest-800"
            >
              {t.contact.cta}
              <ArrowRight
                size={16}
                weight="light"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </Reveal>

        <Reveal delay={140} className="lg:col-span-7">
          <div className="rounded-[2rem] bg-white p-6 sm:p-10">
            <h3 className="font-display text-2xl leading-snug sm:text-[26px]">{t.contact.formTitle}</h3>
            <div className="mt-8">
              <EnquiryForm />
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={80} className="mt-6">
        <div className="overflow-hidden rounded-[2rem] bg-white">
          <iframe
            src={MAP_EMBED}
            title={t.contact.mapTitle}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[320px] w-full sm:h-[420px]"
          />
        </div>
        <a
          href={MAP_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-forest-700 transition-colors duration-200 hover:text-forest-800"
        >
          {t.contact.openInMaps}
          <ArrowSquareOut size={14} weight="light" />
        </a>
      </Reveal>
    </Section>
  )
}

/** Compact closing band on the home page, pointing at the contact page. */
export function HomeCta() {
  const { t } = useLanguage()

  return (
    <Section id="cta" tone="warm">
      <Reveal className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-forest-900 px-9 py-12 text-white sm:px-14 sm:py-16 lg:flex-row lg:items-center">
        <div>
          <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-brass-300">
            {t.contact.eyebrow}
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-[2.25rem] leading-tight sm:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base">
            {t.contact.body}
          </p>
        </div>

        <Link
          to="/contact"
          className="group flex shrink-0 items-center gap-3 rounded-full bg-brass-300 px-8 py-4 text-sm font-medium text-forest-900 transition-colors duration-300 hover:bg-white"
        >
          {t.contact.reach}
          <ArrowRight
            size={16}
            weight="light"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </Reveal>
    </Section>
  )
}

/**
 * The qualifying form, as a section of its own near the foot of the home page.
 * It used to open in a modal from the hero, which asked people to qualify
 * themselves before they had seen anything; by here they have.
 */
export function RequestSection() {
  const { t } = useLanguage()

  return (
    <Section id={REQUEST_ID} tone="warm" tightBottom>
      {/* Heading and form centred as one column, both to the same width so
          their edges line up rather than stepping in from each other. */}
      <SectionHeading
        eyebrow={t.form.eyebrow}
        title={t.form.sectionTitle}
        body={t.form.lead}
        className="mx-auto"
      />

      <Reveal delay={120} className="mx-auto mt-14 max-w-4xl">
        <div className="rounded-[2rem] bg-white p-8 sm:p-10">
          <EnquiryForm />
        </div>
      </Reveal>
    </Section>
  )
}
