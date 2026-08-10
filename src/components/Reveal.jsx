import { useEffect, useRef, useState } from 'react'

/**
 * Fades content up once as it enters the viewport. Reduced-motion users get the
 * final state immediately, handled by the .reveal rules in index.css.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    observer.observe(node)

    // Failsafe. Content must never stay hidden because an observer callback
    // was throttled or never delivered, so anything already on screen after a
    // short grace period is revealed outright.
    const failsafe = setTimeout(() => {
      const rect = node.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setVisible(true)
        observer.disconnect()
      }
    }, 1200)

    return () => {
      clearTimeout(failsafe)
      observer.disconnect()
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
