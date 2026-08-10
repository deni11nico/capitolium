import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { content, DEFAULT_LANGUAGE, LANGUAGES } from './content.js'

const STORAGE_KEY = 'capitolium.lang'

const LanguageContext = createContext(null)

function readStoredLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLanguage)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = content[lang].meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', content[lang].meta.description)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // a blocked storage quota should never break the toggle
    }
  }, [lang])

  const toggle = useCallback(() => {
    setLang((current) => (current === 'ro' ? 'en' : 'ro'))
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, toggle, t: content[lang] }),
    [lang, toggle],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside a LanguageProvider')
  return value
}
