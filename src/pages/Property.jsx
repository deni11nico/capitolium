import { useState } from 'react'
import Lightbox from '../components/Lightbox.jsx'
import { PageHeader } from '../components/Page.jsx'
import { Comfort, Energy, Execution, TechnicalDetails, Technology } from '../sections/index.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/** Everything about the build itself: materials, systems, comfort, efficiency. */
export default function Property() {
  const { t } = useLanguage()

  // The technical section opens two different sets: the gate on its own, and
  // the works photographs as a group. The viewer carries whichever was asked for.
  const [viewer, setViewer] = useState(null)

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
      <TechnicalDetails onOpenPhoto={setViewer} />
      <Technology />
      <Comfort />
      <Energy />

      <Lightbox
        photos={viewer?.photos ?? []}
        index={viewer?.index ?? null}
        label={t.technical.title}
        onClose={() => setViewer(null)}
        onIndexChange={(index) => setViewer((current) => ({ ...current, index }))}
      />
    </>
  )
}
