/**
 * Form delivery.
 *
 * Nothing is wired to a backend yet. Paste a Formspree endpoint below and the
 * matching form starts posting to it; while a value is empty the form still
 * validates and confirms, it just logs instead of sending. That keeps the site
 * honest: it never tells someone we received a message we did not receive.
 *
 * Two separate endpoints so the qualifying enquiries (buyer type, budget) stay
 * out of the general contact inbox. Point both at the same URL if you would
 * rather have one inbox.
 */
export const REQUEST_FORM_ENDPOINT = ''
export const CONTACT_FORM_ENDPOINT = ''

/**
 * Posts to Formspree, which wants JSON plus an explicit Accept header or it
 * replies with a redirect instead of a result. Resolves to true when the
 * message is on its way, false when the endpoint rejected it.
 */
export async function submitForm(endpoint, payload) {
  if (!endpoint) {
    console.info('[form, not sent: no endpoint configured]', payload)
    return true
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  return response.ok
}
