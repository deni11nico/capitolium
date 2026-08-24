/**
 * Form delivery, through Web3Forms.
 *
 * The access key is a public, client-side key by design. It does not authorise
 * anything on this end and Web3Forms expects it to ship in the page, so it
 * lives here in the source rather than in an env var, where hiding it would
 * only be theatre.
 *
 * WHERE SUBMISSIONS ARRIVE. There is no recipient field here, and adding one
 * would do nothing: Web3Forms treats the access key as an alias for a single
 * inbox, fixed when the key was created at web3forms.com. So the destination
 * is a property of the key below, not of this code.
 *
 * That inbox is meant to be maniucentralproperty@gmail.com. To point the forms
 * somewhere else, create a key for that address at web3forms.com and replace
 * the one below; editing anything here cannot redirect the existing key.
 */
const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = '8757610b-4b00-476f-93d4-dff8e9573bf4'

/**
 * Posts one submission and reports whether it was actually accepted.
 *
 * Web3Forms answers 200 with `success: false` in the body when it rejects a
 * submission, so the status code alone cannot tell a delivered message from a
 * dropped one and the body has to be read too.
 *
 * Throws on a network failure, which the callers turn into the "could not be
 * sent, please call us" notice rather than a false confirmation.
 */
export async function submitForm(fields) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: ACCESS_KEY, ...fields }),
  })

  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.success) {
    console.warn('[web3forms] rejected', response.status, result)
    return false
  }

  return true
}
