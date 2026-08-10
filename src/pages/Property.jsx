import { PageHeader } from '../components/Page.jsx'
import { Comfort, Energy, Execution, Technology } from '../sections/index.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/** Everything about the build itself: materials, systems, comfort, efficiency. */
export default function Property() {
  const { t } = useLanguage()

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
      <Technology />
      <Comfort />
      <Energy />
    </>
  )
}
