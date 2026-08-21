import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Lightbox from '../components/Lightbox.jsx'
import { REQUEST_ID, scrollToRequest } from '../components/useGoToRequest.js'
import {
  Architecture,
  Faq,
  Hero,
  HomeCta,
  Intro,
  Opportunities,
  RequestSection,
  TrustBar,
  Units,
} from '../sections/index.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { opportunityPhotos } from '../data/units.js'

/**
 * Introduces the property, then lists every unit in full. The detail pages
 * carry the rest: materials, systems, exterior and the investment case.
 */
export default function Home() {
  const { t } = useLanguage()
  const { state } = useLocation()
  const [photoIndex, setPhotoIndex] = useState(null)

  // A header CTA pressed on another route asks for the form by name. Page
  // sends the window to the top on arrival and its effect runs after this
  // one, so the scroll is deferred a beat rather than being overridden.
  useEffect(() => {
    if (state?.scrollTo !== REQUEST_ID) return
    const timer = setTimeout(scrollToRequest, 80)
    return () => clearTimeout(timer)
  }, [state])

  return (
    <>
      <Hero />
      <TrustBar />
      <Opportunities onOpenPhoto={setPhotoIndex} />
      {/* The terms that disqualify most enquiries, before the detail. */}
      <Faq />
      <Intro />
      <Architecture />
      <Units />
      {/* Asked only once the property has been seen. */}
      <RequestSection />
      <HomeCta />

      <Lightbox
        photos={opportunityPhotos}
        index={photoIndex}
        // Names the use rather than the room, matching the caption below it.
        label={photoIndex !== null ? t.opportunities.items[photoIndex] : ''}
        onClose={() => setPhotoIndex(null)}
        onIndexChange={setPhotoIndex}
      />
    </>
  )
}
