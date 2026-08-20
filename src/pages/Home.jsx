import { Architecture, Faq, Hero, HomeCta, Intro, Units } from '../sections/index.jsx'

/**
 * Introduces the property, then lists every unit in full. The detail pages
 * carry the rest: materials, systems, exterior and the investment case.
 */
export default function Home() {
  return (
    <>
      <Hero />
      {/* Directly under the hero: the three answers that decide whether a
          visitor should go any further. */}
      <Faq />
      <Intro />
      <Architecture />
      <Units />
      <HomeCta />
    </>
  )
}
