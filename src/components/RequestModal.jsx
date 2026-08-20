import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from '@phosphor-icons/react'
import RequestForm from './RequestForm.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const RequestModalContext = createContext(null)

/** Opens the acquisition form from anywhere: hero, contact card, footer. */
export function useRequestModal() {
  const value = useContext(RequestModalContext)
  if (!value) throw new Error('useRequestModal must be used inside RequestModalProvider')
  return value
}

function RequestModal({ open, onClose }) {
  const { t } = useLanguage()
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    // Same scroll lock as the photo viewer: pin the body at its current offset
    // rather than clamping it to the top, so dismissing returns you in place.
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
  }, [onClose, open])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-ink/70 px-4 py-8 backdrop-blur-sm sm:items-center sm:py-12"
      onMouseDown={(event) => {
        // Dismiss on a click that lands outside the panel.
        if (!panelRef.current?.contains(event.target)) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.form.title}
        className="relative w-full max-w-2xl rounded-[2rem] bg-white p-7 sm:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.form.close}
          className="absolute right-5 top-5 rounded-full bg-stone-warm p-2.5 text-ink/60 transition-colors duration-200 hover:bg-forest-50 hover:text-forest-800"
        >
          <X size={18} weight="light" />
        </button>

        <h2 className="max-w-md pr-10 font-display text-[1.75rem] leading-tight sm:text-4xl">
          {t.form.title}
        </h2>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/55">{t.form.lead}</p>

        <div className="mt-8">
          {/* Stacked labels: the modal is narrower than the inline copy. */}
          <RequestForm compact onDone={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  )
}

export function RequestModalProvider({ children }) {
  const [open, setOpen] = useState(false)

  const value = {
    openRequest: useCallback(() => setOpen(true), []),
    closeRequest: useCallback(() => setOpen(false), []),
    isOpen: open,
  }

  return (
    <RequestModalContext.Provider value={value}>
      {children}
      <RequestModal open={open} onClose={value.closeRequest} />
    </RequestModalContext.Provider>
  )
}
