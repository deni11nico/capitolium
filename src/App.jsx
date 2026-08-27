import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ContactStrip from './components/ContactStrip.jsx'
import { Page } from './components/Page.jsx'
import Home from './pages/Home.jsx'
import Property from './pages/Property.jsx'
import ExteriorPage from './pages/ExteriorPage.jsx'
import Apartments from './pages/Apartments.jsx'
import InvestmentPage from './pages/InvestmentPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import UnitPage from './pages/UnitPage.jsx'

export default function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        {/* Page handles scroll reset and the cross-fade for every route. */}
        <Page>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proprietate" element={<Property />} />
            <Route path="/exterior" element={<ExteriorPage />} />
            <Route path="/apartamente" element={<Apartments />} />
            <Route path="/investitie" element={<InvestmentPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/politica-confidentialitate" element={<PrivacyPage />} />
            {/* Static paths above win over this by React Router's ranking, so
                the unit pages keep their short /ap-1 style URLs. */}
            <Route path="/:slug" element={<UnitPage />} />
          </Routes>
        </Page>
      </main>
      {/* Same closing block on every route, so it cannot drift per page. */}
      <ContactStrip />
      <Footer />
    </div>
  )
}
