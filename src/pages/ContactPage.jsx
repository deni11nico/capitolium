import { PageHeader } from '../components/Page.jsx'
import { Contact } from '../sections/index.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <>
      <PageHeader
        eyebrow={t.contact.eyebrow}
        title={t.contact.pageTitle}
        lead={t.contact.pageLead}
      />
      {/* The page header already carries the heading. */}
      <Contact withHeading={false} />
    </>
  )
}
