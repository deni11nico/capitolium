/**
 * Writes one HTML file per route into dist/, each carrying its own title,
 * description and sharing card.
 *
 *   npm run prerender      (run after vite build; the deploy workflow does)
 *
 * Two problems this solves, both caused by the site being one shell served for
 * every path:
 *
 *   Sharing. A crawler reads the HTML it is served and does not run the app,
 *   so without this every shared URL showed the home page's card and title.
 *
 *   Status codes. Pages has no rewrite rules, so a direct hit on /contact fell
 *   to 404.html: the right page rendered, but under a 404. A real file at each
 *   path answers 200, which is what crawlers and the cookie banner's privacy
 *   link need.
 *
 * The app still owns everything after load; this only fixes what is true
 * before JavaScript runs.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { content } from '../src/i18n/content.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const ORIGIN = 'https://maniu65centralproperty.ro'
const BRAND = 'Maniu 65 Central'

const t = content.ro

/** Trimmed to roughly what Facebook and Google show before they truncate. */
const clamp = (text, max = 200) =>
  text.length <= max ? text : `${text.slice(0, max - 1).replace(/[\s,.;:]+\S*$/, '')}…`

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * `card` names a file in public/og. Routes without one of their own borrow the
 * home card rather than going without: a preview with no image collapses to a
 * bare link on most platforms.
 */
const ROUTES = [
  {
    path: '/',
    card: 'home',
    title: t.meta.title,
    description: t.meta.description,
    alt: 'Fațada iluminată a imobilului din str. Iuliu Maniu nr. 65, Oradea',
  },
  {
    path: '/proprietate',
    card: 'proprietate',
    title: `${t.pages.property.title} | ${BRAND}`,
    description: t.pages.property.lead,
    alt: 'Curtea interioară a imobilului',
  },
  {
    path: '/exterior',
    card: 'exterior',
    title: `${t.pages.exterior.title} | ${BRAND}`,
    description: t.pages.exterior.lead,
    alt: 'Curtea și facilitățile exterioare',
  },
  {
    path: '/apartamente',
    card: 'apartamente',
    title: `${t.units.title} | ${BRAND}`,
    description: t.units.body,
    alt: 'Interior dintr-unul dintre apartamente',
  },
  {
    path: '/investitie',
    card: 'investitie',
    title: `${t.investment.title} | ${BRAND}`,
    // investment has no lead of its own; its closing paragraph is the summary.
    description: t.investment.conclusion,
    alt: 'Fațada imobilului',
  },
  {
    path: '/contact',
    card: 'contact',
    title: `${t.contact.pageTitle} | ${BRAND}`,
    description: t.contact.pageLead,
    alt: 'Intrarea principală a imobilului',
  },
  {
    path: '/politica-confidentialitate',
    card: 'home',
    title: `${t.privacy.title} | ${BRAND}`,
    description: 'Cum sunt colectate, folosite și păstrate datele transmise prin acest site.',
    alt: 'Fațada iluminată a imobilului din str. Iuliu Maniu nr. 65, Oradea',
  },
]

function socialBlock(route) {
  const url = `${ORIGIN}${route.path}`
  const image = `${ORIGIN}/og/${route.card}.jpg`
  const title = escape(route.title)
  const description = escape(clamp(route.description))
  const alt = escape(route.alt)

  return `<title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${BRAND}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:secure_url" content="${image}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${alt}" />
    <meta property="og:locale" content="ro_RO" />
    <meta property="og:locale:alternate" content="en_GB" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${alt}" />`
}

const shell = await readFile(path.join(DIST, 'index.html'), 'utf8')

const MARKERS = /<!-- social:start -->[\s\S]*?<!-- social:end -->/
if (!MARKERS.test(shell)) {
  throw new Error('social markers not found in dist/index.html; prerender cannot target the tags')
}

for (const route of ROUTES) {
  const html = shell.replace(
    MARKERS,
    `<!-- social:start -->\n    ${socialBlock(route)}\n    <!-- social:end -->`,
  )

  const target =
    route.path === '/'
      ? path.join(DIST, 'index.html')
      : path.join(DIST, route.path.slice(1), 'index.html')

  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, html)
  console.log(`[prerender] ${route.path.padEnd(28)} og/${route.card}.jpg`)
}

/*
 * The fallback keeps the home card: it answers for unit pages and anything
 * mistyped, and a wrong-but-present preview beats none.
 */
await writeFile(path.join(DIST, '404.html'), await readFile(path.join(DIST, 'index.html'), 'utf8'))
console.log(`[prerender] 404.html from the home shell`)
