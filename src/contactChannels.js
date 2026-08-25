import { EnvelopeSimple, MapPin } from '@phosphor-icons/react'

/**
 * The address as Google Maps should read it. Kept as one query string so the
 * embed and every outbound link point at the same place.
 */
export const MAP_QUERY = 'Strada Iuliu Maniu 65, Oradea, Bihor, Romania'
export const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`

/**
 * The ways to reach us, derived once so the contact page's card, the strip
 * above the footer and the footer itself cannot drift apart.
 *
 * `href` is null when there is nothing to link to, which today means the email
 * while `contact.email` is still empty. Callers render those as plain text
 * rather than as a link that does nothing.
 */
export function contactChannels(t) {
  const email = t.contact.email.trim()

  return [
    {
      key: 'email',
      icon: EnvelopeSimple,
      label: t.contact.emailLabel,
      value: email || t.contact.placeholder,
      href: email ? `mailto:${email}` : null,
    },
    {
      key: 'address',
      icon: MapPin,
      label: t.contact.addressLabel,
      value: t.contact.address,
      href: MAP_LINK,
      external: true,
    },
  ]
}
