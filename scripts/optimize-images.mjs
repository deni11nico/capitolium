/**
 * Image pipeline for the Capitolium site.
 *
 * Reads the untouched source photography from poze2/ and the floor plans from
 * imagini/, and writes web-sized WebP derivatives plus a manifest into
 * public/media/. Originals are never modified or moved.
 *
 *   npm run images            incremental, skips work already done
 *   npm run images -- --force rebuild everything
 *
 * Output per photo:
 *   <slug>/<id>-t.webp   800px  wide, grid thumbnails
 *   <slug>/<id>-f.webp   1920px wide, lightbox and hero
 */

import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pdf } from 'pdf-to-img'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'public', 'media')
const FORCE = process.argv.includes('--force')

const THUMB = { suffix: 't', width: 800, quality: 72 }
const FULL = { suffix: 'f', width: 1920, quality: 80 }

/**
 * Source folders, in the order they should appear on the site.
 *
 * Each group reads from one or more sources, concatenated in the order listed.
 * The full-resolution originals in poze2/ always come first, which keeps the
 * first frame of every group usable as the page hero. The imagini/ sheets are
 * lower resolution collages of several shots tiled together, so they follow,
 * selected by filename since that folder mixes every unit together.
 */
const GROUPS = [
  { slug: 'fatada', sources: ['poze2/fatada + intrare', { dir: 'imagini', match: /^imobil\./i }] },
  { slug: 'curte', sources: ['poze2/curte', { dir: 'imagini', match: /^curte/i }] },
  { slug: 'ap-1', sources: ['poze2/ap 1', { dir: 'imagini', match: /^ap1[.\-]/i }] },
  { slug: 'ap-2', sources: ['poze2/ap 2', { dir: 'imagini', match: /^ap2[.\-]/i }] },
  { slug: 'ap-3', sources: ['poze2/ap 3', { dir: 'imagini', match: /^ap3[.\-]/i }] },
  { slug: 'ap-4', sources: ['poze2/ap 4 pivnita', { dir: 'imagini', match: /^pivnita\./i }] },
  { slug: 'ap-5', sources: ['poze2/ap 5', { dir: 'imagini', match: /^ap5[.\-]/i }] },
  { slug: 'ap-6', sources: ['poze2/ap 6', { dir: 'imagini', match: /^ap6[.\-]/i }] },
  { slug: 'ap-7', sources: ['poze2/ap 7', { dir: 'imagini', match: /^ap7[.\-]/i }] },
  // Construction and product documentation, shown on the technical details page.
  { slug: 'tehnic', sources: ['pozenoi'] },
]

/**
 * Floor plans. The source drawings only exist as PDFs, so they get rasterized
 * to WebP here and shown inline on the unit pages. The cellar (ap-4) has no
 * drawing of its own, which the site handles by omitting the plan section.
 */
const PLANS = [
  { key: 'ap-1', file: 'imagini/ap1-S.pdf' },
  { key: 'ap-2', file: 'imagini/ap2-S.pdf' },
  { key: 'ap-3', file: 'imagini/ap3-S.pdf' },
  { key: 'ap-5', file: 'imagini/ap5-S.pdf' },
  { key: 'ap-6', file: 'imagini/ap6-S.pdf' },
  { key: 'ap-7', file: 'imagini/ap7-S.pdf' },
  { key: 'site', file: 'imagini/11A plan parter propus.pdf' },
  { key: 'attic', file: 'imagini/pad-S.pdf' },
]

/** Rasterize at 2x, then downscale, so fine line work stays crisp. */
const PLAN_SCALE = 2.5
const PLAN_DISPLAY = { suffix: 'd', width: 1600, quality: 88 }
const PLAN_FULL = { suffix: 'f', width: 2600, quality: 90 }

const PHOTO_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'])

/**
 * Frames pulled from the site by request, listed by their source filename.
 * Excluded here rather than in the site code so no derivative is built and no
 * bytes ship. Delete an entry to bring a photo back.
 */
const EXCLUDE = new Set(['LAS_7384 ok.JPG'])
const CONCURRENCY = 4

const log = (...args) => console.log('[images]', ...args)

/** Run an async worker over a list, a few items at a time. */
async function pool(items, limit, worker) {
  const results = new Array(items.length)
  let cursor = 0
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await worker(items[index], index)
    }
  })
  await Promise.all(runners)
  return results
}

async function exists(file) {
  try {
    await fs.access(file)
    return true
  } catch {
    return false
  }
}

/**
 * Photo filenames are camera dumps with spaces ("LAS_7425 ok.JPG"), so they get
 * a stable slug plus a short hash to guarantee uniqueness inside a folder.
 */
function idFor(filename) {
  const base = path.basename(filename, path.extname(filename))
  const slug =
    base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-ok$/, '') || 'photo'
  const hash = createHash('sha1').update(filename).digest('hex').slice(0, 6)
  return `${slug}-${hash}`
}

/** Average colour, used as the placeholder tint while a photo loads. */
function toHex({ r, g, b }) {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
}

async function renderVariant(source, target, preset, width, height) {
  const pipeline = sharp(source, { failOn: 'none' }).rotate()
  if (width > preset.width) {
    pipeline.resize({ width: preset.width, withoutEnlargement: true })
  }
  await pipeline.webp({ quality: preset.quality, effort: 5 }).toFile(target)
  const scale = width > preset.width ? preset.width / width : 1
  return { w: Math.round(width * scale), h: Math.round(height * scale) }
}

async function processPhoto(group, { dir, filename }) {
  const source = path.join(ROOT, dir, filename)
  const id = idFor(filename)
  const thumbRel = `${group.slug}/${id}-${THUMB.suffix}.webp`
  const fullRel = `${group.slug}/${id}-${FULL.suffix}.webp`
  const thumbAbs = path.join(OUT_DIR, thumbRel)
  const fullAbs = path.join(OUT_DIR, fullRel)

  const meta = await sharp(source).metadata()
  // EXIF orientation 5-8 means the stored pixels are rotated a quarter turn.
  const swap = meta.orientation >= 5
  const width = swap ? meta.height : meta.width
  const height = swap ? meta.width : meta.height

  const cached = !FORCE && (await exists(thumbAbs)) && (await exists(fullAbs))
  let fullSize
  if (cached) {
    const scale = width > FULL.width ? FULL.width / width : 1
    fullSize = { w: Math.round(width * scale), h: Math.round(height * scale) }
  } else {
    await renderVariant(source, thumbAbs, THUMB, width, height)
    fullSize = await renderVariant(source, fullAbs, FULL, width, height)
  }

  const { dominant } = await sharp(source).resize(32, 32, { fit: 'inside' }).stats()

  return {
    id,
    thumb: `/media/${thumbRel}`,
    full: `/media/${fullRel}`,
    width: fullSize.w,
    height: fullSize.h,
    color: toHex(dominant),
    // Lets the site tell the photographed originals apart from the imagini
    // collage sheets, which get their own treatment on the unit pages.
    source: dir === 'imagini' ? 'imagini' : 'poze2',
    cached,
  }
}

/** Lists the photos one source contributes, sorted naturally by filename. */
async function readSource(source, slug) {
  const spec = typeof source === 'string' ? { dir: source, match: null } : source
  const dir = path.join(ROOT, spec.dir)

  if (!(await exists(dir))) {
    log(`skipped ${slug}, missing folder ${spec.dir}`)
    return []
  }

  return (await fs.readdir(dir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && PHOTO_EXT.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .filter((name) => !EXCLUDE.has(name))
    .filter((name) => !spec.match || spec.match.test(name))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
    .map((filename) => ({ dir: spec.dir, filename }))
}

async function processGroup(group) {
  const entries = []
  for (const source of group.sources) {
    entries.push(...(await readSource(source, group.slug)))
  }

  if (entries.length === 0) {
    log(`skipped ${group.slug}, no photos found`)
    return null
  }

  await fs.mkdir(path.join(OUT_DIR, group.slug), { recursive: true })

  const photos = await pool(entries, CONCURRENCY, (entry) => processPhoto(group, entry))
  const built = photos.filter((p) => !p.cached).length
  const extra = entries.filter((entry) => entry.dir === 'imagini').length
  log(
    `${group.slug}: ${photos.length} photos (${built} built, ${photos.length - built} cached` +
      `${extra ? `, ${extra} from imagini` : ''})`,
  )

  return photos.map(({ cached, ...photo }) => photo)
}

/** Renders the first page of a plan PDF into display and full-size WebP. */
async function renderPlan(plan, plansDir) {
  const source = path.join(ROOT, plan.file)
  const displayRel = `plans/${plan.key}-${PLAN_DISPLAY.suffix}.webp`
  const fullRel = `plans/${plan.key}-${PLAN_FULL.suffix}.webp`
  const displayAbs = path.join(plansDir, path.basename(displayRel))
  const fullAbs = path.join(plansDir, path.basename(fullRel))

  const document = await pdf(source, { scale: PLAN_SCALE })
  let page = null
  for await (const rendered of document) {
    page = rendered
    break
  }
  if (!page) throw new Error(`no pages in ${plan.file}`)

  const meta = await sharp(page).metadata()

  // Plans are line drawings on white, so a flat white matte beats transparency.
  const render = async (preset, target) => {
    const pipeline = sharp(page).flatten({ background: '#ffffff' })
    if (meta.width > preset.width) {
      pipeline.resize({ width: preset.width, withoutEnlargement: true })
    }
    await pipeline.webp({ quality: preset.quality, effort: 5 }).toFile(target)
  }

  await render(PLAN_DISPLAY, displayAbs)
  await render(PLAN_FULL, fullAbs)

  const scale = meta.width > PLAN_FULL.width ? PLAN_FULL.width / meta.width : 1

  return {
    id: `plan-${plan.key}`,
    thumb: `/media/${displayRel}`,
    full: `/media/${fullRel}`,
    width: Math.round(meta.width * scale),
    height: Math.round(meta.height * scale),
    color: '#ffffff',
  }
}

async function buildPlans() {
  const plansDir = path.join(OUT_DIR, 'plans')
  await fs.mkdir(plansDir, { recursive: true })

  const plans = {}
  for (const plan of PLANS) {
    if (!(await exists(path.join(ROOT, plan.file)))) {
      log(`skipped plan ${plan.key}, missing ${plan.file}`)
      continue
    }
    try {
      plans[plan.key] = await renderPlan(plan, plansDir)
    } catch (error) {
      log(`failed plan ${plan.key}: ${error.message}`)
    }
  }
  log(`plans: ${Object.keys(plans).length} rendered`)
  return plans
}

async function main() {
  const started = Date.now()
  await fs.mkdir(OUT_DIR, { recursive: true })

  const groups = {}
  for (const group of GROUPS) {
    const photos = await processGroup(group)
    if (photos) groups[group.slug] = photos
  }

  const plans = await buildPlans()

  const manifest = { groups, plans }
  await fs.writeFile(
    path.join(ROOT, 'src', 'data', 'media.json'),
    JSON.stringify(manifest, null, 2) + '\n',
  )

  const total = Object.values(groups).reduce((sum, list) => sum + list.length, 0)
  log(`done: ${total} photos across ${Object.keys(groups).length} groups in ${Math.round((Date.now() - started) / 1000)}s`)
}

main().catch((error) => {
  console.error('[images] failed:', error)
  process.exit(1)
})
