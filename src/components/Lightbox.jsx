import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * Full-screen photo viewer with arrow, keyboard and swipe navigation.
 * Neighbouring frames are prefetched so stepping through feels instant.
 */
export default function Lightbox({ photos, index, onClose, onIndexChange, label }) {
  const { t } = useLanguage()
  const closeRef = useRef(null)
  const touchStart = useRef(null)

  const open = index !== null && index >= 0
  const photo = open ? photos[index] : null

  const step = useCallback(
    (delta) => {
      if (!open || photos.length === 0) return
      const next = (index + delta + photos.length) % photos.length
      onIndexChange(next)
    },
    [index, onIndexChange, open, photos.length],
  )

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowRight') step(1)
      else if (event.key === 'ArrowLeft') step(-1)
    }

    document.addEventListener('keydown', onKeyDown)

    /**
     * Freeze the page without losing the reader's place.
     *
     * `overflow: hidden` alone clamps the scroll to the top, so opening the
     * viewer threw you back to the start of the page and closing it left you
     * there. Pinning the body at a negative offset keeps the same pixels on
     * screen behind the overlay, and the offset is scrolled back on close.
     */
    const { body } = document
    const scrollY = window.scrollY
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      overflow: body.style.overflow,
    }

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.overflow = 'hidden'

    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      Object.assign(body.style, previous)
      window.scrollTo({ top: scrollY, behavior: 'instant' })
    }
  }, [onClose, open, step])

  // Warm the adjacent full-size frames.
  useEffect(() => {
    if (!open || photos.length < 2) return
    for (const delta of [1, -1]) {
      const neighbour = photos[(index + delta + photos.length) % photos.length]
      const image = new Image()
      image.src = neighbour.full
    }
  }, [index, open, photos])


  if (!open || !photo) return null

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX
  }

  const onTouchEnd = (event) => {
    if (touchStart.current === null) return
    const delta = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(delta) > 55) step(delta < 0 ? 1 : -1)
    touchStart.current = null
  }

  /**
   * Rendered through a portal into <body> rather than in place.
   *
   * `position: fixed` resolves against the nearest ancestor carrying a
   * transform, filter or perspective rather than against the viewport. The
   * route transition wrapper keeps an identity transform after it finishes,
   * which made the overlay size itself to the whole document instead of the
   * screen. Escaping to <body> makes that structurally impossible.
   */
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/97 backdrop-blur-md"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex shrink-0 items-center justify-between px-5 py-4 text-white/70 sm:px-8">
        <span className="text-xs font-medium tracking-[0.2em] uppercase tabular-nums">
          {String(index + 1).padStart(2, '0')} {t.unit.of} {String(photos.length).padStart(2, '0')}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.unit.closeLightbox}
          className="rounded-full bg-white/10 p-2.5 text-white transition-colors duration-200 hover:bg-white/20"
        >
          <X size={20} weight="light" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-6 sm:px-20"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
      >
        {/*
          Rendered fully opaque, with no fade gating it.

          A fade means mounting at opacity 0 and relying on a transition to
          reveal the photo. The viewer prefetches its neighbours, so frames are
          often already decoded, and any hitch in that transition leaves the
          overlay open with nothing visible, which reads as "it did not open".
          The dark backdrop already covers the brief moment before a cold frame
          decodes, so the fade bought nothing and could cost everything.
        */}
        <img
          key={photo.id}
          src={photo.full}
          alt={`${label} ${index + 1}`}
          className="max-h-full max-w-full rounded-2xl object-contain"
        />

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={t.unit.prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors duration-200 hover:bg-white/25 sm:left-5 sm:p-4"
            >
              <CaretLeft size={22} weight="light" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={t.unit.next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors duration-200 hover:bg-white/25 sm:right-5 sm:p-4"
            >
              <CaretRight size={22} weight="light" />
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
