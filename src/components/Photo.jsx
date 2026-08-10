import { useLayoutEffect, useRef, useState } from 'react'

/**
 * A lazily decoded photo that holds its aspect ratio and shows the frame's
 * average colour until the bytes land, so long galleries never jump around.
 *
 * `variant` picks which derivative the manifest generated: the 800px thumb for
 * grids, the 1920px full size for hero and lightbox.
 *
 * Visibility never depends on the load event alone. A cached image finishes
 * decoding before React attaches onLoad, and some embedded webviews suppress
 * the event entirely, either of which would leave the photo stuck at opacity 0.
 * The effect below covers both by reading `complete` directly.
 */
export default function Photo({
  photo,
  alt,
  variant = 'thumb',
  className = '',
  imgClassName = '',
  eager = false,
  sizes,
  // `natural` keeps the frame's own aspect ratio instead of filling the box.
  // The imagini sheets are collages of several shots tiled together, so
  // cropping them to a fixed ratio would slice the tiles.
  natural = false,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)

  const src = photo ? (variant === 'full' ? photo.full : photo.thumb) : null

  // A layout effect, so an already-decoded frame is marked visible before the
  // browser paints and never renders transparent waiting on the fade.
  useLayoutEffect(() => {
    const node = imgRef.current
    if (!node) return

    if (node.complete && node.naturalWidth > 0) {
      setLoaded(true)
      return
    }

    // Poll on a timer, then give up and show the photo regardless. Timers are
    // used rather than animation frames on purpose: a backgrounded or
    // non-compositing view stops serving frames but keeps running timers.
    // Better a photo that appears without its fade than one that never appears.
    let timer = 0
    let waited = 0
    const check = () => {
      const node = imgRef.current
      if (!node) return
      waited += 120
      if ((node.complete && node.naturalWidth > 0) || waited > 4000) {
        setLoaded(true)
        return
      }
      timer = setTimeout(check, 120)
    }
    timer = setTimeout(check, 120)

    return () => clearTimeout(timer)
  }, [src])

  if (!photo) return null

  return (
    // No `position` utility here on purpose. Callers pass their own (the hero
    // and the investment backdrop need `absolute`), and Tailwind resolves
    // conflicting position classes by stylesheet order rather than the order
    // they appear in the attribute, so a hardcoded `relative` would silently
    // win and drop the photo back into normal flow.
    <div
      className={`overflow-hidden ${className}`}
      style={{ backgroundColor: photo.color }}
      {...rest}
    >
      <img
        ref={imgRef}
        src={src}
        srcSet={`${photo.thumb} 800w, ${photo.full} 1920w`}
        sizes={sizes ?? (variant === 'full' ? '100vw' : '(max-width: 768px) 50vw, 33vw')}
        alt={alt}
        width={photo.width}
        height={photo.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        // lowercase on purpose: React 18 passes unknown lowercase attrs through
        fetchpriority={eager ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${
          natural ? 'h-auto w-full' : 'h-full w-full object-cover'
        } transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}
