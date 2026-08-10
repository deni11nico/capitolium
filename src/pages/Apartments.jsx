import { PageHeader } from '../components/Page.jsx'
import { Units } from '../sections/index.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { units } from '../data/units.js'

export default function Apartments() {
  const { t } = useLanguage()
  const photoCount = units.reduce((sum, unit) => sum + unit.photos.length, 0)

  return (
    <>
      <PageHeader
        eyebrow={t.units.eyebrow}
        title={t.units.title}
        lead={`${t.units.body} ${photoCount} ${t.units.photosLabel}.`}
      />
      {/* The page header already carries the heading, so the section skips its own. */}
      <Units withHeading={false} />
    </>
  )
}
