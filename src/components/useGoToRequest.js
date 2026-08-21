import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/** The qualifying form's section, and the scroll target every CTA aims at. */
export const REQUEST_ID = 'request'

export function scrollToRequest() {
  document.getElementById(REQUEST_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Sends the visitor to the qualifying form from anywhere on the site.
 *
 * The form is a section of the home page rather than a page of its own, so
 * from another route this has to go home first and scroll once that page has
 * rendered. The target rides along in router state, which Home reads on mount:
 * a plain "/#request" link would not work, because React Router does not act
 * on the hash and Page resets the scroll position on every navigation.
 */
export function useGoToRequest() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(() => {
    if (pathname === '/') scrollToRequest()
    else navigate('/', { state: { scrollTo: REQUEST_ID } })
  }, [navigate, pathname])
}
