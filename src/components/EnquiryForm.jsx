import { useState } from 'react'
import { CheckCircle, LockSimple } from '@phosphor-icons/react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { content } from '../i18n/content.js'
import { submitForm } from '../formDelivery.js'

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  acquisition: '',
  agency: '',
  buyerType: '',
  budget: '',
  botcheck: '',
}

// Deliberately loose. Anything stricter starts rejecting addresses that work,
// and the real check is whether our reply arrives.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Whatever people put between the digits: spaces, dashes, dots, brackets. */
const SEPARATORS = /[\s().\-‐-―]/g

/** A Romanian number in national form: ten digits, the first a zero. */
const RO_NATIONAL = /^0\d{9}$/

/** Anything foreign, on the loose rule that + and 8 to 15 digits is plausible. */
const INTERNATIONAL = /^\+\d{8,15}$/

/**
 * Romanian numbers are the expected case, so "+40" and "0040" are folded back
 * to the national leading zero and judged by the same rule. A foreign number
 * is still accepted: a buyer calling from abroad should not be turned away by
 * a regex, and the number only has to be good enough to ring.
 *
 * Separators are stripped first, so "0765 776 955" and "(0765) 776-955" both
 * pass, as does the en dash a phone keyboard sometimes inserts.
 */
export function isValidPhone(value) {
  const compact = value.replace(SEPARATORS, '').replace(/^(?:\+40|0040)/, '0')
  return RO_NATIONAL.test(compact) || INTERNATIONAL.test(compact)
}

/**
 * Answers are sent as their Romanian labels whatever language the visitor was
 * reading, so one inbox does not end up holding a mix of two languages. The
 * stored values are ids, which is what makes this translation possible.
 */
const ro = content.ro.form
const labelIn = (options, id) => options.find((option) => option.id === id)?.label ?? id
const yesNoLabel = (value) => (value === 'yes' ? ro.yes : ro.no)

/**
 * One labelled text field. Errors tint the field and add a line of text rather
 * than drawing a border, matching the rest of the site.
 */
function Field({ id, label, value, onChange, error, type = 'text', autoComplete, required, inputMode }) {
  const { t } = useLanguage()
  const surface = error ? 'bg-[#f8ece8]' : 'bg-stone-warm focus:bg-forest-50'
  // 16px on phones: below that, iOS Safari zooms the page on focus.
  const shared = `w-full rounded-xl px-4 py-3.5 text-[16px] leading-relaxed text-ink outline-none transition-colors duration-200 sm:text-[15px] ${surface}`
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div>
      <label htmlFor={id} className="block text-[14px] text-ink/75">
        {label}
        {required && <span className="ml-1.5 text-ink/40">{t.form.requiredMark}</span>}
      </label>

      <div className="mt-2.5">
        <input
          id={id}
          name={id}
          type={type}
          inputMode={inputMode}
          value={value}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={shared}
        />
      </div>

      {error && (
        <p id={describedBy} className="mt-2 text-[13px] text-[#a6402f]">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * A labelled group of radio buttons.
 *
 * A div with role="radiogroup" rather than fieldset/legend on purpose. A legend
 * cannot be laid out as a flex item, so putting the question beside its answers
 * needed `float-left`, and on a phone the floated question was wider than the
 * row: the answers wrapped around it and off the right edge of the screen.
 */
function RadioRow({ label, name, options, value, onChange, invalid }) {
  const labelId = `${name}-label`

  return (
    <div role="radiogroup" aria-labelledby={labelId}>
      <p id={labelId} className="text-[14px] leading-snug text-ink/75">
        {label}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-1">
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

      {invalid && <p className="mt-1 text-[13px] text-[#a6402f]">{invalid}</p>}
    </div>
  )
}

/**
 * The site's one enquiry form, used both at the foot of the home page and on
 * the contact page. It replaces the split between a qualifying form and a
 * contact form: that split meant whoever wrote in through the contact page was
 * never qualified, and whoever qualified left no way of being answered.
 */
export default function EnquiryForm() {
  const { t } = useLanguage()
  const [values, setValues] = useState(EMPTY)
  const [showErrors, setShowErrors] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [failed, setFailed] = useState(false)

  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }))

  const filled = (key) => values[key].trim()

  // Subject and budget are the optional ones.
  const errors = {
    name: filled('name') ? null : t.form.requiredField,
    phone: !filled('phone')
      ? t.form.requiredField
      : isValidPhone(filled('phone'))
        ? null
        : t.form.invalidPhone,
    email: !filled('email')
      ? t.form.requiredField
      : EMAIL.test(filled('email'))
        ? null
        : t.form.invalidEmail,
    acquisition: values.acquisition ? null : t.form.requiredNotice,
    agency: values.agency ? null : t.form.requiredNotice,
    buyerType: values.buyerType ? null : t.form.requiredNotice,
  }
  const hasErrors = Object.values(errors).some(Boolean)

  const onSubmit = async (event) => {
    event.preventDefault()
    if (hasErrors) {
      setShowErrors(true)
      return
    }

    setSending(true)
    setFailed(false)
    try {
      // Field names are the labels that appear in the email, so they are
      // written for the person reading the inbox rather than for the code.
      const ok = await submitForm({
        subject: `Solicitare informații: ${filled('name')}`,
        from_name: 'Maniu 65 Central',
        // Puts the sender on Reply-To, so answering the email answers them.
        replyto: filled('email'),
        botcheck: values.botcheck,
        Nume: filled('name'),
        Telefon: filled('phone'),
        Email: filled('email'),
        Subiect: filled('subject') || 'nespecificat',
        'Achizitie integrala': yesNoLabel(values.acquisition),
        Agentie: yesNoLabel(values.agency),
        'Tip cumparator': labelIn(ro.buyerOptions, values.buyerType),
        Buget: values.budget ? labelIn(ro.budgetOptions, values.budget) : 'nespecificat',
      })
      if (ok) setSent(true)
      else setFailed(true)
    } catch {
      setFailed(true)
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="py-8 text-center">
        <CheckCircle size={40} weight="light" className="mx-auto text-forest-600" />
        <h3 className="mt-5 font-display text-2xl sm:text-3xl">{t.form.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink/60">
          {t.form.successBody}
        </p>
      </div>
    )
  }

  const shown = (key) => (showErrors ? errors[key] : null)
  const yesNo = [
    { id: 'yes', label: t.form.yes },
    { id: 'no', label: t.form.no },
  ]

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot. Hidden from people, so anything filling it is a bot and
          Web3Forms drops the submission. Kept out of the tab order too. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        checked={Boolean(values.botcheck)}
        onChange={(event) => set('botcheck')(event.target.checked ? 'on' : '')}
        className="hidden"
      />

      <Field
        id="enquiry-name"
        label={t.form.fields.name}
        required
        value={values.name}
        onChange={set('name')}
        error={shown('name')}
        autoComplete="name"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="enquiry-phone"
          label={t.form.fields.phone}
          required
          type="tel"
          inputMode="tel"
          value={values.phone}
          onChange={set('phone')}
          error={shown('phone')}
          autoComplete="tel"
        />
        <Field
          id="enquiry-email"
          label={t.form.fields.email}
          required
          type="email"
          value={values.email}
          onChange={set('email')}
          error={shown('email')}
          autoComplete="email"
        />
      </div>

      <Field
        id="enquiry-subject"
        label={t.form.fields.subject}
        value={values.subject}
        onChange={set('subject')}
      />

      {/* The qualifying questions, set apart from the contact details above
          so the form reads as two asks rather than one long one. */}
      <div aria-hidden="true" className="mt-3 h-px bg-ink/8" />

      <div className="flex flex-col gap-5">
        <RadioRow
          label={t.form.acquisition}
          name="acquisition"
          options={yesNo}
          value={values.acquisition}
          onChange={set('acquisition')}
          invalid={shown('acquisition')}
        />

        <RadioRow
          label={t.form.agency}
          name="agency"
          options={yesNo}
          value={values.agency}
          onChange={set('agency')}
          invalid={shown('agency')}
        />

        <RadioRow
          label={t.form.buyerType}
          name="buyerType"
          options={t.form.buyerOptions}
          value={values.buyerType}
          onChange={set('buyerType')}
          invalid={shown('buyerType')}
        />

        <div>
          <label htmlFor="budget" className="block text-[14px] leading-snug text-ink/75">
            {t.form.budget}
          </label>
          <select
            id="budget"
            value={values.budget}
            onChange={(event) => set('budget')(event.target.value)}
            className="mt-2.5 w-full appearance-none rounded-xl bg-stone-warm px-4 py-3.5 text-[16px] text-ink/80 outline-none transition-colors duration-200 focus:bg-forest-50 sm:text-[15px]"
          >
            <option value="">{t.form.budgetPlaceholder}</option>
            {t.form.budgetOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-1">
        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-xl bg-ink px-8 py-4 text-[12px] font-medium tracking-[0.16em] uppercase text-white transition-colors duration-300 hover:bg-forest-800 disabled:opacity-60"
        >
          {sending ? t.form.sending : t.form.submit}
        </button>

        {failed && (
          <p className="mt-4 text-center text-[13px] text-[#a6402f]">{t.form.sendFailed}</p>
        )}

        <p className="mt-4 flex items-center justify-center gap-2 text-center text-[12px] text-ink/45">
          <LockSimple size={13} weight="light" />
          {t.form.reassurance}
        </p>
      </div>
    </form>
  )
}
