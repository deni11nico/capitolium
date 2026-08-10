/**
 * The site's pages, in reading order.
 *
 * Shared by the header navigation and the mobile menu, so both stay in step
 * automatically. `key` indexes into content.nav for the label.
 */
export const ROUTES = [
  { path: '/', key: 'home' },
  { path: '/proprietate', key: 'property' },
  { path: '/exterior', key: 'exterior' },
  { path: '/apartamente', key: 'units' },
  { path: '/investitie', key: 'investment' },
  { path: '/contact', key: 'contact' },
]
