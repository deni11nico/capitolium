import { useState } from 'react'
import Lightbox from '../components/Lightbox.jsx'
import {
  Architecture,
  Faq,
  Hero,
  HomeCta,
  Intro,
  Opportunities,
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
  const [photoIndex, setPhotoIndex] = useState(null)

  return (
    <>
      <Hero />
      <TrustBar />
      <Opportunities onOpenPhoto={setPhotoIndex} />
      {/* The terms that disqualify most enquiries, beside the form itself. */}
      <Faq />
      <Intro />
      <Architecture />
      <Units />
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
