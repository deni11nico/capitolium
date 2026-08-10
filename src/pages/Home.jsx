import { Architecture, Hero, HomeCta, Intro, Units } from '../sections/index.jsx'

/**
 * Introduces the property, then lists every unit in full. The detail pages
 * carry the rest: materials, systems, exterior and the investment case.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Architecture />
      <Units />
      <HomeCta />
    </>
  )
}
