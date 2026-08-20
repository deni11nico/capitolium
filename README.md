# Maniu 65 Central

Presentation site for the Maniu 65 Central property, str. Iuliu Maniu, Oradea.
The name lives in `src/brand.js`; nothing user-facing should hardcode it.
React + Vite + Tailwind v4 + Phosphor icons, bilingual RO/EN with Romanian as the default.

## Commands

```bash
npm install
npm run images   # build optimized photos into public/media (run once, then after any photo change)
npm run dev      # http://localhost:5183
npm run build    # production bundle into dist/
```

`npm run images` must run before the first `dev` or `build`, because the site reads
`src/data/media.json`, which that script generates.

## Photography

Source photos stay untouched in `imagini/` and `poze2/`. They are gitignored, since
the deployable output is `public/media/`.

`scripts/optimize-images.mjs` reads every folder listed in its `GROUPS` table and writes
two WebP derivatives per photo, an 800px thumbnail for grids and a 1920px version for the
hero and lightbox. It also records each frame's average colour, used as the placeholder
tint while the image loads. Reruns are incremental; pass `--force` to rebuild everything.

    npm run images -- --force

Current output: 213 photos, 2.4 GB of originals reduced to about 33 MB.

Each group in `GROUPS` reads from one or more sources, concatenated in order. The
full-resolution `poze2/` originals come first, so the first frame of a group is always
usable as a page hero. The `imagini/` sheets are lower-resolution collages of several
shots tiled together, so they are appended at the end of the matching gallery and
selected by filename, since that one folder mixes every unit together:

| imagini/ files | joins |
| --- | --- |
| `ap1-poza1`, `ap1`, `ap1.1`, `ap1.2` | `/ap-1` |
| `ap2-*` … `ap7-*` | the matching apartment page |
| `pivnita` | `/ap-4` |
| `curte1`, `curte2` | homepage exterior strip |
| `imobil` | homepage facade group |

Each photo carries a `source` field of `poze2` or `imagini`, which is what drives the
split in `src/data/units.js`:

- **`cover`** is the unit's `poza1` sheet. It is the homepage card image and the hero on
  the unit page. Note ap-2's file is misnamed `ap2-paza1`, so the match is deliberately
  loose.
- **`sheets`** are the remaining imagini files, shown large under the hero.
- **`galleryPhotos`** are all the `poze2` photographs, none held back.

Sheets are always rendered with `Photo`'s `natural` prop, which keeps their own aspect
ratio instead of cropping to a fixed box. They are collages of several shots tiled into
one frame, so a crop would slice the tiles. The homepage cards use a 3:2 box for the same
reason, matching the sheets exactly.

## Floor plans

The only floor plans that exist are the cadastral surveys in `imagini/`, as PDFs. None of
the photo folders contains a plan image. The script rasterizes the first page of each PDF
into two WebP sizes and the unit pages show them inline, with click to enlarge. There is no
PDF download anywhere on the site.

`ap-4` (the cellar) has no survey of its own, so its page simply omits the plan section.

Room schedules and areas in `src/data/unitSpecs.js` were transcribed from those same
surveys (ing. Fitero Lucian, December 2025). `schedule` rows always sum to `area`;
anything the survey records outside the usable area, such as a terrace or a basement box,
lives in `extra` and renders after the total.

## Structure

The property has **6 apartments** (ap 1, 2, 3, 5, 6, 7). The `ap 4 pivnita` folder is the
cellar, not an apartment, so the site shows 7 spaces of which 6 are apartments.

    src/
      i18n/content.js            all RO and EN copy, one key per string
      i18n/unitDescriptions.js   >> per-apartment description text, TODO placeholders
      i18n/LanguageContext.jsx   language state, persisted to localStorage
      data/units.js              unit list, joined against the generated manifest
      data/unitSpecs.js          rooms, areas and room schedules from the surveys
      data/media.json            generated, do not edit by hand
      components/                Header, Footer, Photo, Lightbox, UnitCard, Section, Reveal
      components/Page.jsx        PageHeader, NextPage, scroll reset, route fade
      routes.js                  the page list, shared by nav / menu / next-links
      sections/index.jsx         every content block, composed by the pages
      pages/                     one file per route

## Pages

The site is split across routes rather than one long scroll. `src/routes.js` is the single
source of truth for the order, and the header nav, the mobile menu and the "continue with"
link at the foot of each page all read from it, so adding a page updates all three.

| route | contents |
| --- | --- |
| `/` | hero, introduction, architecture, a three-unit preview, closing CTA |
| `/proprietate` | execution and materials, technology, comfort, efficiency |
| `/exterior` | exterior and amenities, plus the full courtyard gallery |
| `/apartamente` | the seven unit cards |
| `/investitie` | investment value, dark throughout |
| `/contact` | contact details |
| `/ap-1` … `/ap-7` | individual unit pages |

Unit pages keep their short `/ap-N` URLs. React Router ranks static paths above the
`/:slug` route, so `/proprietate` and friends resolve to their own pages.

## Adding apartment descriptions

`src/i18n/unitDescriptions.js` holds one `ro` and one `en` string per unit, all empty,
each above a `// TODO: description for ap-N` comment. Fill in the strings and they appear
in the right-hand column of the apartment hero. An empty string renders nothing, so the
layout stays clean until the copy is written.

## Adding contact details

Phone and email currently render a placeholder string. Replace `contact.placeholder`
usage in `src/i18n/content.js` with real values under `contact.phone` and `contact.email`,
then reference them in `src/pages/Home.jsx` and `src/components/Footer.jsx`.

## Deployment

Client-side routing needs an SPA rewrite so `/ap-1` resolves on a hard refresh.
`public/_redirects` covers Netlify, `vercel.json` covers Vercel. For nginx or Apache,
rewrite all unmatched paths to `/index.html`.
