import { useState } from 'react'
import Lightbox from '../components/Lightbox.jsx'
import { PageHeader } from '../components/Page.jsx'
import { Comfort, Energy, Execution, TechnicalDetails, Technology } from '../sections/index.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { technical } from '../data/units.js'

/** Everything about the build itself: materials, systems, comfort, efficiency. */
export default function Property() {
  const { t } = useLanguage()
  const [photoIndex, setPhotoIndex] = useState(null)

  return (
    <>
      {/* The only page carrying the bordered panel treatment. */}
      <PageHeader
        framed
        eyebrow={t.pages.property.eyebrow}
        title={t.pages.property.title}
        lead={t.pages.property.lead}
      />
      <Execution />
      <TechnicalDetails onOpenPhoto={setPhotoIndex} />
      <Technology />
      <Comfort />
      <Energy />

      <Lightbox
        photos={technical}
        index={photoIndex}
        label={t.technical.title}
        onClose={() => setPhotoIndex(null)}
        onIndexChange={setPhotoIndex}
      />
    </>
  )
}
