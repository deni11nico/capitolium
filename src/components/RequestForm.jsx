import { useState } from 'react'
import { CheckCircle, LockSimple } from '@phosphor-icons/react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { REQUEST_FORM_ENDPOINT, submitForm } from '../formEndpoints.js'

const EMPTY = { acquisition: '', agency: '', buyerType: '', budget: '' }

/**
 * A labelled group of radio buttons. Rendered as real inputs with a visible
 * ring rather than pills, matching the approved design, and still operable by
 * keyboard because the input keeps focus.
 *
 * A div with role="radiogroup" rather than fieldset/legend on purpose. A legend
 * cannot be laid out as a flex item, so putting the question beside its answers
 * needed `float-left`, and on a phone the floated question was wider than the
 * row: the answers wrapped around it and off the right edge of the screen.
 */
function RadioRow({ label, name, options, value, onChange, invalid, stacked }) {
  const labelId = `${name}-label`

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelId}
      className={
        stacked
          ? ''
          : 'flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8'
      }
    >
      <p id={labelId} className="text-[14px] leading-snug text-ink/75 sm:max-w-[16rem]">
        {label}
      </p>

      <div className={`flex flex-wrap items-center gap-x-7 gap-y-2 ${stacked ? 'mt-3' : 'sm:pt-0.5'}`}>
        {options.map((option) => {
          const selected = value === option.id
          return (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-2.5 py-2 text-[14px] text-ink/70"
            >
              <span
                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                  selected ? 'bg-forest-700' : 'bg-stone-warm'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full bg-white transition-opacity duration-200 ${
                    selected ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </span>
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

      {invalid && <p className="mt-2 w-full text-[13px] text-[#a6402f]">{invalid}</p>}
    </div>
  )
}

/**
 * The qualifying form. Shared by the modal opened from the hero and the inline
 * copy at the foot of the home page, so the two can never drift apart.
 */
export default function RequestForm({ onDone, compact = false }) {
  const { t } = useLanguage()
  const [values, setValues] = useState(EMPTY)
  const [showErrors, setShowErrors] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }))

  // Budget is the only optional answer.
  const missing = {
    acquisition: !values.acquisition,
    agency: !values.agency,
    buyerType: !values.buyerType,
  }
  const hasMissing = Object.values(missing).some(Boolean)

  const onSubmit = async (event) => {
    event.preventDefault()
    if (hasMissing) {
      setShowErrors(true)
      return
    }
    // Falls back to logging while REQUEST_FORM_ENDPOINT is empty, so answers
    // are never silently lost before delivery is wired up.
    await submitForm(REQUEST_FORM_ENDPOINT, { form: 'acquisition', ...values })
    setSent(true)
  }

  if (sent) {
    return (
      <div className="py-6 text-center">
        <CheckCircle size={40} weight="light" className="mx-auto text-forest-600" />
        <h3 className="mt-5 font-display text-2xl sm:text-3xl">{t.form.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink/60">
          {t.form.successBody}
        </p>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="mt-7 rounded-full bg-forest-700 px-8 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-forest-800"
          >
            {t.form.successClose}
          </button>
        )}
      </div>
    )
  }

  const yesNo = [
    { id: 'yes', label: t.form.yes },
    { id: 'no', label: t.form.no },
  ]

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <RadioRow
        label={t.form.acquisition}
        name="acquisition"
        options={yesNo}
        value={values.acquisition}
        onChange={set('acquisition')}
        invalid={showErrors && missing.acquisition ? t.form.requiredNotice : null}
        stacked={compact}
      />

      <RadioRow
        label={t.form.agency}
        name="agency"
        options={yesNo}
        value={values.agency}
        onChange={set('agency')}
        invalid={showErrors && missing.agency ? t.form.requiredNotice : null}
        stacked={compact}
      />

      <RadioRow
        label={t.form.buyerType}
        name="buyerType"
        options={t.form.buyerOptions}
        value={values.buyerType}
        onChange={set('buyerType')}
        invalid={showErrors && missing.buyerType ? t.form.requiredNotice : null}
        stacked={compact}
      />

      <div
        className={
          compact
            ? ''
            : 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8'
        }
      >
        <label htmlFor="budget" className="text-[14px] leading-snug text-ink/75 sm:max-w-[16rem]">
          {t.form.budget}
        </label>
        <select
          id="budget"
          value={values.budget}
          onChange={(event) => set('budget')(event.target.value)}
          className={`appearance-none rounded-xl bg-stone-warm px-4 py-3 text-[16px] text-ink/80 sm:text-[14px] outline-none transition-colors duration-200 focus:bg-forest-50 ${
            compact ? 'mt-3 w-full' : 'w-full sm:w-[17rem]'
          }`}
        >
          <option value="">{t.form.budgetPlaceholder}</option>
          {t.form.budgetOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-1">
        <button
          type="submit"
          className="w-full rounded-xl bg-ink px-8 py-4 text-[12px] font-medium tracking-[0.16em] uppercase text-white transition-colors duration-300 hover:bg-forest-800"
        >
          {t.form.submit}
        </button>
        <p className="mt-4 flex items-center justify-center gap-2 text-center text-[12px] text-ink/45">
          <LockSimple size={13} weight="light" />
          {t.form.reassurance}
        </p>
      </div>
    </form>
  )
}
