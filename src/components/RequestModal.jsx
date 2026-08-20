import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle, X } from '@phosphor-icons/react'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const RequestModalContext = createContext(null)

/** Opens the acquisition form from anywhere: hero, footer, a later CTA. */
export function useRequestModal() {
  const value = useContext(RequestModalContext)
  if (!value) throw new Error('useRequestModal must be used inside RequestModalProvider')
  return value
}

const EMPTY = { acquisition: '', agency: '', buyerType: '', budget: '' }

/** A labelled group of radio buttons, laid out as selectable pills. */
function RadioGroup({ label, name, options, value, onChange, invalid }) {
  return (
    <fieldset>
      <legend className="text-[15px] leading-snug text-ink/80">{label}</legend>

      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option.id
          return (
            <label
              key={option.id}
              className={`cursor-pointer rounded-full px-5 py-2.5 text-[14px] transition-colors duration-200 ${
                selected
                  ? 'bg-forest-700 text-white'
                  : 'bg-stone-warm text-ink/70 hover:bg-forest-50'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={selected}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
              {option.label}
            </label>
          )
        })}
      </div>

      {invalid && <p className="mt-2 text-[13px] text-[#a6402f]">{invalid}</p>}
    </fieldset>
  )
}

function RequestModal({ open, onClose }) {
  const { t } = useLanguage()
  const [values, setValues] = useState(EMPTY)
  const [showErrors, setShowErrors] = useState(false)
  const [sent, setSent] = useState(false)
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }))

  // Budget is the only optional answer.
  const missing = {
    acquisition: !values.acquisition,
    agency: !values.agency,
    buyerType: !values.buyerType,
  }
  const hasMissing = Object.values(missing).some(Boolean)

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

  // Start clean each time it is opened.
  useEffect(() => {
    if (open) {
      setValues(EMPTY)
      setShowErrors(false)
      setSent(false)
    }
  }, [open])

  if (!open) return null

  const onSubmit = (event) => {
    event.preventDefault()
    if (hasMissing) {
      setShowErrors(true)
      return
    }
    // No backend yet. The answers are logged so nothing is silently lost while
    // form delivery is wired up separately.
    console.info('[acquisition request]', values)
    setSent(true)
  }

  const yesNo = [
    { id: 'yes', label: t.form.yes },
    { id: 'no', label: t.form.no },
  ]

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-ink/70 px-4 py-8 backdrop-blur-sm sm:items-center sm:py-12"
      onMouseDown={(event) => {
        // Dismiss on a click that both starts and ends outside the panel.
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

        {sent ? (
          <div className="py-8 text-center">
            <CheckCircle size={44} weight="light" className="mx-auto text-forest-600" />
            <h2 className="mt-6 font-display text-3xl sm:text-4xl">{t.form.successTitle}</h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink/60">
              {t.form.successBody}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full bg-forest-700 px-8 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-forest-800"
            >
              {t.form.successClose}
            </button>
          </div>
        ) : (
          <>
            <h2 className="max-w-md pr-10 font-display text-[1.75rem] leading-tight sm:text-4xl">
              {t.form.title}
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/55">
              {t.form.lead}
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-7">
              <RadioGroup
                label={t.form.acquisition}
                name="acquisition"
                options={yesNo}
                value={values.acquisition}
                onChange={set('acquisition')}
                invalid={showErrors && missing.acquisition ? t.form.requiredNotice : null}
              />

              <RadioGroup
                label={t.form.agency}
                name="agency"
                options={yesNo}
                value={values.agency}
                onChange={set('agency')}
                invalid={showErrors && missing.agency ? t.form.requiredNotice : null}
              />

              <RadioGroup
                label={t.form.buyerType}
                name="buyerType"
                options={t.form.buyerOptions}
                value={values.buyerType}
                onChange={set('buyerType')}
                invalid={showErrors && missing.buyerType ? t.form.requiredNotice : null}
              />

              <div>
                <label htmlFor="budget" className="text-[15px] leading-snug text-ink/80">
                  {t.form.budget}
                </label>
                <select
                  id="budget"
                  value={values.budget}
                  onChange={(event) => set('budget')(event.target.value)}
                  className="mt-3 w-full appearance-none rounded-2xl bg-stone-warm px-5 py-3.5 text-[15px] text-ink/80 outline-none transition-colors duration-200 focus:bg-forest-50"
                >
                  <option value="">{t.form.budgetPlaceholder}</option>
                  {t.form.budgetOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-forest-700 px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-forest-800"
                >
                  {t.form.submit}
                </button>
                <p className="mt-4 text-center text-[13px] text-ink/45">{t.form.reassurance}</p>
              </div>
            </form>
          </>
        )}
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
