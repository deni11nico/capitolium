import { useState } from 'react'
import Lightbox from '../components/Lightbox.jsx'
import { PageHeader } from '../components/Page.jsx'
import { CourtyardGallery, Exterior } from '../sections/index.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { courtyard } from '../data/units.js'

export default function ExteriorPage() {
  const { t } = useLanguage()
  const [index, setIndex] = useState(null)

  return (
    <>
      <PageHeader
        eyebrow={t.pages.exterior.eyebrow}
        title={t.pages.exterior.title}
        lead={t.pages.exterior.lead}
      />
      <Exterior />
      <CourtyardGallery onOpen={setIndex} />

      <Lightbox
        photos={courtyard}
        index={index}
        label={t.exterior.title}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </>
  )
}
