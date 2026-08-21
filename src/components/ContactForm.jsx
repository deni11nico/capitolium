import { useState } from 'react'
import { CheckCircle } from '@phosphor-icons/react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { CONTACT_FORM_ENDPOINT, submitForm } from '../formEndpoints.js'

const EMPTY = { name: '', email: '', phone: '', subject: '' }

// Deliberately loose. Anything stricter starts rejecting addresses that work,
// and the real check is whether our reply arrives.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * One labelled input. Errors are shown by tinting the field and adding a line
 * of text rather than by drawing a border, matching the rest of the site.
 */
function Field({ id, label, value, onChange, error, type = 'text', autoComplete }) {
  const surface = error ? 'bg-[#f8ece8]' : 'bg-stone-warm focus:bg-forest-50'
  const shared = `w-full rounded-xl px-4 py-3.5 text-[16px] leading-relaxed text-ink outline-none sm:text-[15px] transition-colors duration-200 ${surface}`
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div>
      <label htmlFor={id} className="block text-[14px] text-ink/75">
        {label}
      </label>

      <div className="mt-2.5">
        <input
          id={id}
          name={id}
          type={type}
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
 * The general contact form. Separate from the qualifying form behind the hero
 * button: this one is for questions, that one is for buyers.
 */
export default function ContactForm() {
  const { t } = useLanguage()
  const [values, setValues] = useState(EMPTY)
  const [showErrors, setShowErrors] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [failed, setFailed] = useState(false)

  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }))

  // Subject is the only optional field.
  const errors = {
    name: values.name.trim() ? null : t.contact.requiredNotice,
    email: !values.email.trim()
      ? t.contact.requiredNotice
      : EMAIL.test(values.email.trim())
        ? null
        : t.contact.invalidEmail,
    phone: values.phone.trim() ? null : t.contact.requiredNotice,
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
      const ok = await submitForm(CONTACT_FORM_ENDPOINT, {
        form: 'contact',
        ...values,
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
      <div className="py-10 text-center">
        <CheckCircle size={40} weight="light" className="mx-auto text-forest-600" />
        <h3 className="mt-5 font-display text-2xl sm:text-3xl">{t.contact.sentTitle}</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink/60">
          {t.contact.sentBody}
        </p>
      </div>
    )
  }

  const shown = (key) => (showErrors ? errors[key] : null)

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <Field
        id="contact-name"
        label={t.contact.fields.name}
        value={values.name}
        onChange={set('name')}
        error={shown('name')}
        autoComplete="name"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-email"
          label={t.contact.fields.email}
          type="email"
          value={values.email}
          onChange={set('email')}
          error={shown('email')}
          autoComplete="email"
        />
        <Field
          id="contact-phone"
          label={t.contact.fields.phone}
          type="tel"
          value={values.phone}
          onChange={set('phone')}
          error={shown('phone')}
          autoComplete="tel"
        />
      </div>

      <Field
        id="contact-subject"
        label={t.contact.fields.subject}
        value={values.subject}
        onChange={set('subject')}
      />

      <div className="mt-1">
        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-xl bg-forest-700 px-8 py-4 text-[12px] font-medium tracking-[0.16em] uppercase text-white transition-colors duration-300 hover:bg-forest-800 disabled:opacity-60"
        >
          {sending ? t.contact.sending : t.contact.send}
        </button>

        {failed && (
          <p className="mt-4 text-center text-[13px] text-[#a6402f]">{t.contact.sendFailed}</p>
        )}
      </div>
    </form>
  )
}
