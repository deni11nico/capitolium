import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, CheckCircle, Leaf } from '@phosphor-icons/react'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import UnitCard from '../components/UnitCard.jsx'
import { Eyebrow, FeatureCard, Section, SectionHeading } from '../components/Section.jsx'
import { icons, investmentIcons } from '../components/icons.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import {
  architecturePhoto,
  courtyard,
  courtyardFeature,
  entrancePhoto,
  heroPhoto,
  investmentPhoto,
  units,
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

        <Reveal delay={240}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {t.hero.lead}
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-11 flex flex-wrap items-center gap-3">
            <Link
              to="/apartamente"
              className="group flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium text-ink transition-all duration-300 hover:bg-brass-300"
            >
              {t.hero.cta}
              <ArrowRight
                size={16}
                weight="light"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <button
              type="button"
              onClick={toOverview}
              className="rounded-full bg-white/12 px-7 py-4 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/22"
            >
              {t.hero.secondary}
            </button>
          </div>
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
    <Section id="execution">
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

      <Reveal
        delay={220}
        className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4 rounded-3xl bg-forest-900 px-9 py-7"
      >
        {t.execution.brands.map((brand) => (
          <span key={brand} className="font-display text-2xl text-white/85 sm:text-[28px]">
            {brand}
          </span>
        ))}
      </Reveal>
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

export function Exterior() {
  const { t } = useLanguage()

  return (
    <Section id="exterior" tone="warm">
      <SectionHeading
        eyebrow={t.exterior.eyebrow}
        title={t.exterior.title}
        body={t.exterior.body}
      />

      <div className="mt-16 grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Photo
            photo={courtyardFeature}
            alt={t.exterior.title}
            variant="full"
            className="aspect-[4/3] w-full rounded-[2rem] lg:aspect-auto lg:h-full"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </Reveal>

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
          {courtyard.length} {t.units.photosLabel}
        </h2>
      </Reveal>

      <div className="mt-12 grid auto-rows-fr grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-3">
        {courtyard.map((photo, index) => (
          <Reveal key={photo.id} delay={(index % 3) * 80}>
            <button
              type="button"
              onClick={() => onOpen(index)}
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

export function Contact({ withHeading = true }) {
  const { t } = useLanguage()

  return (
    <Section id="contact" tone="warm">
      <div className={`grid gap-14 lg:gap-20 ${withHeading ? 'lg:grid-cols-12' : ''}`}>
        {withHeading && (
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={t.contact.eyebrow}
              title={t.contact.title}
              body={t.contact.body}
            />
          </div>
        )}

        <Reveal delay={140} className={withHeading ? 'lg:col-span-5' : 'w-full max-w-xl'}>
          <div className="rounded-[2rem] bg-white p-9 sm:p-11">
            <dl className="flex flex-col gap-8">
              {[
                { label: t.contact.addressLabel, value: t.contact.address },
                { label: t.contact.phoneLabel, value: t.contact.placeholder },
                { label: t.contact.emailLabel, value: t.contact.placeholder },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-[11px] font-medium tracking-[0.2em] uppercase text-ink/40">
                    {row.label}
                  </dt>
                  <dd className="mt-2 text-[17px] leading-relaxed text-ink/85">{row.value}</dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              className="group mt-11 flex w-full items-center justify-center gap-3 rounded-full bg-forest-700 px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-forest-800"
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
      </div>
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
          className="group flex shrink-0 items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-brass-300"
        >
          {t.contact.cta}
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
