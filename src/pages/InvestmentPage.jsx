import { PageHeader } from '../components/Page.jsx'
import { Investment } from '../sections/index.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/** Dark throughout, so the commercial case reads as its own distinct chapter. */
export default function InvestmentPage() {
  const { t } = useLanguage()

  return (
    <div className="bg-forest-900">
      <PageHeader
        eyebrow={t.investment.eyebrow}
        title={t.investment.title}
        tone="light"
      />
      <Investment />
    </div>
  )
}
