import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Images,
  MagnifyingGlassPlus,
  Ruler,
  SquaresFour,
} from '@phosphor-icons/react'
import Lightbox from '../components/Lightbox.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { BRAND_FULL } from '../brand.js'
import { unitBySlug, units } from '../data/units.js'

function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-center px-5 py-40 sm:px-8">
      <h1 className="font-display text-5xl sm:text-7xl">{t.unit.notFound}</h1>
      <p className="mt-6 max-w-md text-ink/60">{t.unit.notFoundBody}</p>
      <Link
        to="/apartamente"
        className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-forest-700 px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-forest-800"
      >
        <ArrowLeft size={16} weight="light" />
        {t.unit.back}
      </Link>
    </div>
  )
}

/** Areas always read to one decimal, the way the surveys quote them. */
const area = (value) => value.toFixed(1)

/**
 * One corner radius for every photo frame on the page, at every breakpoint.
 * The hero, the collage sheets, the floor plan and the gallery thumbnails all
 * use this, so nothing reads as an exception.
 */
const FRAME = 'rounded-3xl'

/**
 * All of a unit's collage sheets sit on one horizontal line, so the column
 * count follows how many it has (2 or 3 today). Spelled out as literal classes
 * so Tailwind's scanner emits them.
 *
 * They stack below sm, where a third of a 375px screen would be unusable.
 */
const SHEET_COLUMNS = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
}

/** One headline figure, used for rooms, area and land share. */
function KeyDetail({ icon: Icon, label, value, unit }) {
  return (
    <div className="rounded-2xl bg-stone-warm px-6 py-5">
      <div className="flex items-center gap-2 text-forest-600">
        {Icon && <Icon size={16} weight="light" />}
        <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-ink/45">
          {label}
        </span>
      </div>
      <p className="mt-2.5 flex items-baseline gap-1.5">
        <span className="font-display text-[2rem] leading-none text-forest-700">{value}</span>
        {unit && <span className="text-sm text-forest-600">{unit}</span>}
      </p>
    </div>
  )
}

export default function UnitPage() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()

  // One viewer drives both the gallery and the floor plan zoom.
  const [viewer, setViewer] = useState(null)

  const unit = unitBySlug.get(slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setViewer(null)
  }, [slug])

  if (!unit) return <NotFound />

  const name = unit.name[lang]
  const others = units.filter((other) => other.slug !== unit.slug)

  // Wraps around, so the button is never a dead end on the last unit.
  const position = units.findIndex((other) => other.slug === unit.slug)
  const upcoming = units[(position + 1) % units.length]

  const description = unit.description?.[lang]?.trim()
  const specs = unit.specs

  // The lead sheet and the ones below it browse as one set in the viewer.
  const sheetSet = unit.cover ? [unit.cover, ...unit.sheets] : unit.sheets

  const openSheets = (index) => setViewer({ photos: sheetSet, index, label: name })
  const openGallery = (index) => setViewer({ photos: unit.galleryPhotos, index, label: name })
  const openPlan = () =>
    setViewer({ photos: [unit.plan], index: 0, label: `${name}, ${t.unit.plan}` })

  return (
    <>
      <div className="mx-auto max-w-[1500px] px-5 pt-28 sm:px-8 sm:pt-36">
        {/* Top bar: back to the list on the left, the next unit on the right.
            Wraps on narrow screens, where the two pills will not sit side by
            side. */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Reveal>
            <Link
              to="/apartamente"
              className="group inline-flex items-center gap-2.5 rounded-full bg-stone-warm px-5 py-2.5 text-[13px] font-medium text-ink/70 transition-colors duration-300 hover:bg-forest-50 hover:text-forest-800"
            >
              <ArrowLeft
                size={15}
                weight="light"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              {t.unit.back}
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <Link
              to={upcoming.href}
              className="group inline-flex items-center gap-2.5 rounded-full bg-stone-warm py-2.5 pl-5 pr-4 text-[13px] font-medium text-ink/70 transition-colors duration-300 hover:bg-forest-700 hover:text-white"
            >
              <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-ink/40 transition-colors duration-300 group-hover:text-white/60">
                {t.unit.nextUnit}
              </span>
              {upcoming.name[lang]}
              <ArrowRight
                size={15}
                weight="light"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Hero: the lead imagini sheet on the left, identity and figures on the
            right. The sheet keeps its own 3:2 ratio, never cropped. */}
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <button
              type="button"
              onClick={() => openSheets(0)}
              className={`group block w-full overflow-hidden ${FRAME}`}
              aria-label={`${t.a11y.openGallery} 1`}
            >
              <Photo
                photo={unit.cover}
                alt={name}
                variant="full"
                eager
                natural
                className="w-full"
                imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </button>
          </Reveal>

          <Reveal delay={140} className="flex flex-col justify-center lg:py-4">
            <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-forest-600">
              {BRAND_FULL} {unit.kind === 'cellar' ? '' : `· 0${unit.number}`}
            </span>

            <h1 className="mt-4 font-display text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
              {name}
            </h1>

            {/* Description copy, hidden until the text is supplied in unitDescriptions.js */}
            {description && (
              <p className="mt-7 max-w-xl text-base leading-[1.8] text-ink/70 sm:text-[17px]">
                {description}
              </p>
            )}

            {specs && (
              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                <KeyDetail icon={SquaresFour} label={t.unit.roomsLabel} value={specs.rooms} />
                <KeyDetail
                  icon={Ruler}
                  label={t.unit.areaLabel}
                  value={area(specs.area)}
                  unit={t.unit.sqm}
                />
                <KeyDetail label={t.unit.landLabel} value={specs.landShare} />
              </div>
            )}

            <p className="mt-7 flex items-center gap-2 text-[15px] text-ink/45">
              <Images size={17} weight="light" />
              {unit.photos.length} {t.unit.photos}
            </p>
          </Reveal>
        </div>

        {/* The remaining imagini sheets, side by side across the full width and
            uncropped, so every shot tiled inside them stays readable. They
            stack below sm, where a third of 375px would be unreadable. */}
        {unit.sheets.length > 0 && (
          <div
            className={`mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 ${
              SHEET_COLUMNS[unit.sheets.length] ?? 'sm:grid-cols-3'
            }`}
          >
            {unit.sheets.map((sheet, index) => (
              <Reveal key={sheet.id} delay={index * 90}>
                <button
                  type="button"
                  onClick={() => openSheets(index + 1)}
                  aria-label={`${t.a11y.openGallery} ${index + 2}`}
                  className={`group block w-full overflow-hidden ${FRAME}`}
                >
                  <Photo
                    photo={sheet}
                    alt={`${name} ${index + 2}`}
                    variant="full"
                    natural
                    className="w-full"
                    imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
                    sizes={`(max-width: 640px) 100vw, ${Math.round(100 / unit.sheets.length)}vw`}
                  />
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Floor plan, rendered inline from the cadastral survey. */}
      {unit.plan && (
        <section className="mt-24 bg-stone-warm sm:mt-32">
          <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-4">
                <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-forest-600">
                  {t.unit.plan}
                </span>
                <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">{name}</h2>
                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink/55">
                  {t.unit.planNote}
                </p>

                {specs && (
                  <div className="mt-9 rounded-3xl bg-white p-7">
                    <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-ink/40">
                      {t.unit.scheduleTitle}
                    </p>
                    <ul className="mt-5 flex flex-col gap-3">
                      {specs.schedule.map((room, index) => (
                        <li
                          key={`${room.en}-${index}`}
                          className="flex items-baseline justify-between gap-4 text-[15px]"
                        >
                          <span className="text-ink/70">{room[lang]}</span>
                          <span className="shrink-0 tabular-nums text-ink/45">
                            {area(room.area)} {t.unit.sqm}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 rounded-2xl bg-forest-50 px-5 py-4">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-[13px] font-medium text-forest-800">
                          {t.unit.totalLabel}
                        </span>
                        <span className="shrink-0 font-display text-2xl tabular-nums text-forest-700">
                          {area(specs.area)} {t.unit.sqm}
                        </span>
                      </div>
                    </div>

                    {/* Recorded outside the usable area by the survey, so it sits after the total. */}
                    {specs.extra && (
                      <div className="mt-3 flex items-baseline justify-between gap-4 px-5 text-[15px]">
                        <span className="text-ink/70">
                          + {specs.extra[lang]}
                        </span>
                        <span className="shrink-0 tabular-nums text-ink/45">
                          {area(specs.extra.area)} {t.unit.sqm}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </Reveal>

              <Reveal delay={140} className="lg:col-span-8">
                <button
                  type="button"
                  onClick={openPlan}
                  aria-label={t.unit.planZoom}
                  className={`group relative block w-full overflow-hidden bg-white p-4 sm:p-8 ${FRAME}`}
                >
                  <img
                    src={unit.plan.thumb}
                    alt={`${name}, ${t.unit.plan}`}
                    width={unit.plan.width}
                    height={unit.plan.height}
                    loading="lazy"
                    decoding="async"
                    className="mx-auto h-auto w-full max-w-3xl"
                  />
                  <span className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-ink/70 px-4 py-2.5 text-[12px] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <MagnifyingGlassPlus size={15} weight="light" />
                    {t.unit.planZoom}
                  </span>
                </button>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Remaining photos. The cover is excluded, it already leads the page. */}
      {unit.galleryPhotos.length > 0 && (
        <section className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-forest-600">
              {t.unit.gallery}
            </span>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
              {unit.galleryPhotos.length} {t.unit.photos}
            </h2>
            <p className="mt-4 text-[15px] text-ink/55">{t.unit.galleryNote}</p>
          </Reveal>

          {/*
            Fixed column counts, never flex, so a partial last row keeps the
            same column positions and widths as every full row above it.

            The 4:3 ratio sits on the grid item itself and the photo fills it
            with h-full. Putting the ratio on an inner box instead let each
            column round its computed height differently, since the columns
            land on fractional pixel widths, which left tile bottoms 1px apart
            within a row. Stretch alignment now gives every tile in a row an
            identical height.
          */}
          <div className="mt-14 grid auto-rows-fr grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-5">
            {unit.galleryPhotos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => openGallery(index)}
                aria-label={`${t.a11y.openGallery} ${index + 1}`}
                className={`group block aspect-[4/3] w-full overflow-hidden ${FRAME}`}
              >
                <Photo
                  photo={photo}
                  alt={`${name} ${index + 1}`}
                  eager={index < 4}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 1024px) 50vw, 20vw"
                />
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="bg-stone-warm">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl">{t.unit.otherUnits}</h2>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            {others.map((other, index) => (
              <Reveal key={other.slug} delay={index * 60}>
                <Link
                  to={other.href}
                  className="group flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink/80 transition-colors duration-300 hover:bg-forest-700 hover:text-white"
                >
                  {other.name[lang]}
                  <ArrowRight
                    size={15}
                    weight="light"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        photos={viewer?.photos ?? []}
        index={viewer?.index ?? null}
        label={viewer?.label ?? name}
        onClose={() => setViewer(null)}
        onIndexChange={(index) => setViewer((current) => ({ ...current, index }))}
      />
    </>
  )
}
