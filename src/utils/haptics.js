/* Global tactile-feedback wiring.
 *
 * Web has no real haptic API on iOS Safari — `navigator.vibrate` only
 * fires on Android Chrome / Firefox. We call it anyway so Android users
 * get a small tap, and rely on the existing CSS `:active` scale-down
 * for visual feedback everywhere else.
 *
 * A single delegated pointerdown listener on the document catches every
 * tap on a button-shaped element (button, [role="button"], [data-tactile]).
 */

const HAPTIC_TARGET_SELECTOR =
  'button, [role="button"], [data-tactile], a[href]'

const tap = () => {
  if (typeof navigator === 'undefined') return
  if (typeof navigator.vibrate !== 'function') return
  try { navigator.vibrate(8) } catch { /* noop */ }
}

export function installHaptics() {
  if (typeof window === 'undefined') return
  if (window.__hapticsInstalled) return
  window.__hapticsInstalled = true

  document.addEventListener(
    'pointerdown',
    (event) => {
      const target = event.target?.closest?.(HAPTIC_TARGET_SELECTOR)
      if (!target) return
      if (target.hasAttribute('disabled') || target.getAttribute('aria-disabled') === 'true') return
      tap()
    },
    { passive: true, capture: true },
  )
}
