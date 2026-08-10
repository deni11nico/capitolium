import { PageHeader } from '../components/Page.jsx'
import { Contact } from '../sections/index.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <>
      <PageHeader eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.body} />
      {/* The page header already carries the heading. */}
      <Contact withHeading={false} />
    </>
  )
}
