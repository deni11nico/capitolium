/**
 * Form delivery, through Web3Forms.
 *
 * The access key is a public, client-side key by design. It names the inbox
 * that submissions land in, it does not authorise anything on this end, and
 * Web3Forms expects it to ship in the page. So it lives here in the source
 * rather than in an env var, where hiding it would only be theatre.
 *
 * One key means one inbox, so both forms arrive at the same address. They set
 * different subjects, which is what makes them filterable apart.
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
