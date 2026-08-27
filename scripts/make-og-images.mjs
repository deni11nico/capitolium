/**
 * Builds the social sharing cards, one per page.
 *
 *   npm run og
 *
 * Each card is 1200x630: the page's photograph, darkened towards the bottom so
 * text stays legible whatever the frame holds, with the wordmark, an eyebrow
 * and the page title over it.
 *
 * Sources are the committed derivatives under public/media rather than the
 * original photography, which lives outside the repo. That keeps this script
 * runnable from a clean checkout.
 *
 * JPEG rather than WebP on purpose: WhatsApp and some Facebook surfaces still
 * fail to draw WebP link previews, and a preview that silently does not render
 * is worse than a slightly larger file.
 */
import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { content } from '../src/i18n/content.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'public', 'og')

/** The size every platform crops from cleanly, and the one Facebook asks for. */
const WIDTH = 1200
const HEIGHT = 630

/*
 * Fonts are whatever the machine has: the site's Cormorant Garamond and Inter
 * are web fonts, and librsvg resolves names against installed families only,
 * silently dropping to monospace when it cannot find one. Palatino is the
 * closest installed match to Cormorant, Segoe UI to Inter.
 */
const DISPLAY = 'Palatino Linotype, Book Antiqua, Georgia, serif'
const SANS = 'Segoe UI, Tahoma, Arial, sans-serif'

/*
 * One background across every card: poze3's facade shot, the same frame the
 * hero uses. The cards stay distinct through their eyebrow and title.
 *
 * The rest of poze3 (imag1..imag4) is deliberately not used here. Those are
 * the AI-generated interiors the site labels as such, and a sharing card
 * stands in for the property itself, where a render would misrepresent it.
 */
const BACKGROUND = 'media/uz/fatada-146e0a-f.webp'

const t = content.ro

/**
 * `crop` shifts the cover crop when the subject is not centred: the facade
 * shots keep their rooflines, the interiors sit centre.
 */
const CARDS = [
  {
    slug: 'home',
    source: BACKGROUND,
    crop: 'north',
    eyebrow: t.hero.eyebrow,
    title: 'Proprietate exclusivistă în inima Oradiei',
  },
  {
    slug: 'proprietate',
    source: BACKGROUND,
    crop: 'north',
    eyebrow: t.pages.property.eyebrow,
    title: t.pages.property.title,
  },
  {
    slug: 'exterior',
    source: BACKGROUND,
    crop: 'north',
    eyebrow: t.pages.exterior.eyebrow,
    title: t.pages.exterior.title,
  },
  {
    slug: 'apartamente',
    source: BACKGROUND,
    crop: 'north',
    eyebrow: t.units.eyebrow,
    title: t.units.title,
  },
  {
    slug: 'investitie',
    source: BACKGROUND,
    crop: 'north',
    eyebrow: t.investment.eyebrow,
    title: t.investment.title,
  },
  {
    slug: 'contact',
    source: BACKGROUND,
    crop: 'north',
    eyebrow: t.contact.eyebrow,
    title: t.contact.pageTitle,
  },
]

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Wraps on width estimated from character count, since there is no text
 * measurement available here. The ratio is tuned for Palatino at this size;
 * erring narrow costs a line break, erring wide runs off the card.
 */
function wrap(text, maxChars) {
  const words = text.split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (candidate.length > maxChars && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }
  if (line) lines.push(line)
  return lines
}

function overlay({ eyebrow, title }) {
  const titleSize = 64
  const lines = wrap(title, 30)
  // Grown upward from the baseline of the last line, so the block stays
  // anchored to the bottom however many lines the title takes.
  const lastBaseline = HEIGHT - 96
  const first = lastBaseline - (lines.length - 1) * (titleSize + 12)

  const titleTspans = lines
    .map(
      (line, i) =>
        `<text x="80" y="${first + i * (titleSize + 12)}" font-family="${DISPLAY}" font-size="${titleSize}" fill="#ffffff">${escape(line)}</text>`,
    )
    .join('')

  return Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a1c19" stop-opacity="0.55"/>
      <stop offset="42%" stop-color="#1a1c19" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#1a1c19" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#wash)"/>

  <text x="80" y="86" font-family="${DISPLAY}" font-size="34" letter-spacing="6" fill="#ffffff">MANIU 65</text>
  <text x="80" y="116" font-family="${SANS}" font-size="13" letter-spacing="5" fill="#c4a962">CENTRAL</text>

  <rect x="80" y="${first - 118}" width="54" height="2" fill="#c4a962"/>
  <text x="80" y="${first - 78}" font-family="${SANS}" font-size="17" letter-spacing="4" fill="#e8e6e0">${escape(eyebrow.toUpperCase())}</text>
  ${titleTspans}
</svg>`)
}

await mkdir(OUT_DIR, { recursive: true })

for (const card of CARDS) {
  const source = path.join(ROOT, 'public', card.source)
  const output = path.join(OUT_DIR, `${card.slug}.jpg`)

  await sharp(source)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: card.crop })
    .composite([{ input: overlay(card), top: 0, left: 0 }])
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(output)

  const { size } = await stat(output)
  console.log(`[og] ${card.slug.padEnd(13)} ${(size / 1024).toFixed(0).padStart(4)} kB  ${card.title}`)
}

console.log(`[og] ${CARDS.length} cards in public/og`)

/*
 * Icons, from the same favicon.svg the browser tab uses. Generated here rather
 * than kept as binaries, so there is one source for the mark.
 *
 * PNG at several sizes because SVG favicons are still not universal, and iOS
 * home screens and Android launchers both want their own raster.
 */
const ICON_SOURCE = path.join(ROOT, 'public', 'favicon.svg')
const ICONS = [
  { file: 'favicon-32.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
]

for (const icon of ICONS) {
  const output = path.join(ROOT, 'public', icon.file)
  await sharp(ICON_SOURCE, { density: 384 })
    .resize(icon.size, icon.size)
    .png()
    .toFile(output)
  console.log(`[icon] ${icon.file.padEnd(22)} ${icon.size}px`)
}
