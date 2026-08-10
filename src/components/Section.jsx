import Reveal from './Reveal.jsx'

/** Shared shell: consistent max width, gutters and vertical rhythm. */
export function Section({ id, tone = 'light', className = '', children }) {
  const tones = {
    light: 'bg-white text-ink',
    warm: 'bg-stone-warm text-ink',
    dark: 'bg-forest-900 text-white',
  }

  return (
    <section id={id} className={`${tones[tone]} scroll-mt-20 ${className}`}>
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 lg:py-40">{children}</div>
    </section>
  )
}

/** Small uppercase label that opens every section. */
export function Eyebrow({ children, tone = 'dark' }) {
  return (
    <span
      className={`inline-block text-[11px] font-medium tracking-[0.28em] uppercase ${
        tone === 'light' ? 'text-brass-300' : 'text-forest-600'
      }`}
    >
      {children}
    </span>
  )
}

export function SectionHeading({ eyebrow, title, body, tone = 'dark', className = '' }) {
  return (
    <Reveal className={`max-w-4xl ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className="mt-5 font-display text-[2.5rem] leading-[1.08] font-normal sm:text-6xl lg:text-[4.25rem]">
        {title}
      </h2>
      {body && (
        <p
          className={`mt-7 max-w-2xl text-base leading-[1.75] sm:text-lg ${
            tone === 'light' ? 'text-white/70' : 'text-ink/65'
          }`}
        >
          {body}
        </p>
      )}
    </Reveal>
  )
}

/**
 * Icon + title + copy, on a soft rounded tile with no border.
 * `tone` names the section the card sits on, so the tile always contrasts:
 * light section gets a warm tile, warm section gets a white one, dark section
 * gets a translucent white one.
 */
export function FeatureCard({ icon: Icon, title, text, tone = 'dark', delay = 0 }) {
  const light = tone === 'light'

  const surfaces = {
    dark: 'bg-stone-warm hover:bg-forest-50',
    warm: 'bg-white hover:bg-forest-50',
    light: 'bg-white/6 hover:bg-white/10',
  }

  return (
    <Reveal
      delay={delay}
      className={`group rounded-3xl p-8 transition-colors duration-500 sm:p-9 ${surfaces[tone]}`}
    >
      {Icon && (
        <Icon
          size={30}
          weight="light"
          className={light ? 'text-brass-300' : 'text-forest-600'}
        />
      )}
      <h3 className="mt-7 font-display text-2xl leading-snug sm:text-[26px]">{title}</h3>
      <p className={`mt-3 text-[15px] leading-relaxed ${light ? 'text-white/60' : 'text-ink/60'}`}>
        {text}
      </p>
    </Reveal>
  )
}
