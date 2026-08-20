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

/**
 * Introduces the property, then lists every unit in full. The detail pages
 * carry the rest: materials, systems, exterior and the investment case.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Opportunities />
      {/* The terms that disqualify most enquiries, beside the form itself. */}
      <Faq />
      <Intro />
      <Architecture />
      <Units />
      <HomeCta />
    </>
  )
}
