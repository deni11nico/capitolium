import rawMedia from './media.json'
import { unitSpecs } from './unitSpecs.js'
import { unitDescriptions } from '../i18n/unitDescriptions.js'

/**
 * The manifest stores root-absolute URLs like "/media/ap-1/x.webp", which only
 * resolve when the site is served from the root. On GitHub Pages it lives under
 * /capitolium/, so every photo URL is rebased against Vite's BASE_URL here,
 * once, before anything downstream reads it.
 */
const withBase = (url) =>
  url.startsWith('/') ? import.meta.env.BASE_URL + url.slice(1) : url

const rebase = (photo) =>
  photo ? { ...photo, thumb: withBase(photo.thumb), full: withBase(photo.full) } : photo

const media = {
  groups: Object.fromEntries(
    Object.entries(rawMedia.groups).map(([slug, list]) => [slug, list.map(rebase)]),
  ),
  plans: Object.fromEntries(
    Object.entries(rawMedia.plans).map(([key, plan]) => [key, rebase(plan)]),
  ),
}

/**
 * The six apartments plus the cellar, in presentation order. `slug` is both the
 * route segment and the key into the generated media manifest.
 *
 * ap-4 is the building's cellar rather than an apartment, which is why the
 * property counts 6 apartments across 7 photographed spaces.
 */
const UNITS = [
  { slug: 'ap-1', number: 1, kind: 'apartment', name: { ro: 'Apartamentul 1', en: 'Apartment 1' } },
  { slug: 'ap-2', number: 2, kind: 'apartment', name: { ro: 'Apartamentul 2', en: 'Apartment 2' } },
  { slug: 'ap-3', number: 3, kind: 'apartment', name: { ro: 'Apartamentul 3', en: 'Apartment 3' } },
  { slug: 'ap-5', number: 5, kind: 'apartment', name: { ro: 'Apartamentul 5', en: 'Apartment 5' } },
  { slug: 'ap-6', number: 6, kind: 'apartment', name: { ro: 'Apartamentul 6', en: 'Apartment 6' } },
  { slug: 'ap-7', number: 7, kind: 'apartment', name: { ro: 'Apartamentul 7', en: 'Apartment 7' } },
  { slug: 'ap-4', number: 4, kind: 'cellar', name: { ro: 'Pivnița', en: 'The Cellar' } },
]

/**
 * The "poza1" sheet is the curated lead image for a unit, so it becomes the
 * homepage card cover and the hero on the unit page. Note ap-2's file is named
 * "ap2-paza1", a typo in the source folder, hence the loose match.
 */
const isLeadSheet = (photo) => /-p[oa]za1-/.test(photo.id)

export const units = UNITS.map((unit) => {
  const photos = media.groups[unit.slug] ?? []

  const sheets = photos.filter((photo) => photo.source === 'imagini')
  const photographs = photos.filter((photo) => photo.source !== 'imagini')

  // Fall back through the remaining sheets, then the photographs, so a unit
  // without a poza1 file (the cellar) still gets a cover.
  const cover = sheets.find(isLeadSheet) ?? sheets[0] ?? photographs[0] ?? null

  return {
    ...unit,
    href: `/${unit.slug}`,
    photos,
    cover,
    // Shown large under the hero, above the floor plan.
    sheets: sheets.filter((photo) => photo !== cover),
    // Every photographed frame, none held back, since the hero is a sheet now.
    galleryPhotos: photographs,
    plan: media.plans[unit.slug] ?? null,
    specs: unitSpecs[unit.slug] ?? null,
    description: unitDescriptions[unit.slug] ?? null,
  }
})

export const unitBySlug = new Map(units.map((unit) => [unit.slug, unit]))

export const apartmentCount = units.filter((unit) => unit.kind === 'apartment').length

/** Photography used outside the unit pages. */
export const facade = media.groups.fatada ?? []
export const courtyard = media.groups.curte ?? []
/** Construction and product documentation shots, used on the property page. */
export const technical = media.groups.tehnic ?? []
export const sitePlan = media.plans.site ?? null

const byId = (list, id) => list.find((photo) => photo.id === id) ?? list[0] ?? null

/** Exact match, no fallback, for picks where the wrong frame would mislead. */
const exactly = (list, id) => list.find((photo) => photo.id === id) ?? null

/** The automated gate, shown beside the access block. */
export const gatePhoto = exactly(technical, 'p5-9d19a0')

/**
 * Four interiors standing for the uses the building suits: boutique hotel,
 * aparthotel, clinic, premium offices.
 *
 * Sourced from poze3/imag1..imag4, in that order. Any slot whose file is
 * missing or unreadable falls back to a room from the matching apartment, so
 * the row is never left with a hole.
 */
const uses = media.groups.uz ?? []

const FALLBACK_USE_SLUGS = ['ap-1', 'ap-3', 'ap-6', 'ap-7']

export const opportunityPhotos = [1, 2, 3, 4].map((n, index) => {
  const supplied = uses.find((photo) => photo.id.startsWith(`imag${n}-`))
  if (supplied) return supplied

  const list = (media.groups[FALLBACK_USE_SLUGS[index]] ?? []).filter(
    (photo) => photo.source !== 'imagini',
  )
  return list[0] ?? null
})

/**
 * Site photographs from the insulation works, shown with the ceiling block.
 * The Petrafas product label (p2) is deliberately not among them: that block
 * carries the specification as text and a link to the manufacturer instead.
 */
export const worksPhotos = ['p1-103056', 'p3-8383fb', 'p4-9a3ea4']
  .map((id) => exactly(technical, id))
  .filter(Boolean)

/** Hand-picked frames so the key sections never depend on folder ordering. */
export const heroPhoto = byId(facade, 'las-7844-b43f0d')
export const architecturePhoto = byId(courtyard, 'las-7417-8e26ab')
export const entrancePhoto = byId(facade, 'las-7857-d449fd')
export const courtyardFeature = byId(courtyard, 'las-7408-e1c25e')
export const investmentPhoto = byId(facade, 'las-7843-b9a09d')
