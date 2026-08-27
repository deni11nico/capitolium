/**
 * Builds the social sharing image.
 *
 *   npm run og
 *
 * Run locally and commit the result. The source photography lives outside the
 * repo (poze3/ is gitignored), so CI cannot rebuild this; the generated file in
 * public/ is the committed artefact, the same arrangement as the media pipeline.
 *
 * JPEG rather than WebP on purpose. WhatsApp and some Facebook surfaces still
 * fail to render WebP link previews, and a preview that silently does not draw
 * is worse than a slightly larger file.
 */
import sharp from 'sharp'
import { stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const SOURCE = path.join(ROOT, 'poze3', 'fatada.jpeg')
const OUTPUT = path.join(ROOT, 'public', 'og-image.jpg')

/** The size every platform crops from cleanly, and the one Facebook asks for. */
const WIDTH = 1200
const HEIGHT = 630

const source = sharp(SOURCE)
const meta = await source.metadata()

await source
  .resize(WIDTH, HEIGHT, {
    fit: 'cover',
    // The facade is 1.50:1 against a 1.90:1 frame, so the crop takes height.
    // North rather than centre: centring cuts the roofline, and the building
    // is the subject while the foreground pavement is not.
    position: 'north',
  })
  .jpeg({ quality: 82, progressive: true, mozjpeg: true })
  .toFile(OUTPUT)

const out = await sharp(OUTPUT).metadata()
// metadata() of a file on disk carries no byte count, so stat it.
const { size } = await stat(OUTPUT)

console.log(`[og] source ${meta.width}x${meta.height} -> ${out.width}x${out.height}`)
console.log(`[og] ${path.relative(ROOT, OUTPUT)}, ${(size / 1024).toFixed(0)} kB`)
