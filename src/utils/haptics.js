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

/* Intensity levels mapped to vibrate-API durations (ms).
 * Android Chrome respects these; iOS Safari ignores all of them. */
const HAPTIC_DURATIONS = {
  ultraLight: 1, // tab / back navigation — barely-there tick
  light: 3,      // secondary nav, thumbs, chips — quiet "tick"
  medium: 8,     // default action button — confirms a tap
  strong: 14,    // CTA / primary commit — a noticeable thump
}

/* Pure navigation surfaces (bottom nav, hero back-leads, segmented
 * tabs) get no haptic at all — they fire often and the transition
 * already gives plenty of feedback. */
const OFF_SELECTOR = [
  '.bottom-nav__item',
  '.home-tabs__tab',
  '.cards-tabs__tab',
  '[role="tab"]',
  '.transactions-hero__lead',
  '.cards-hero__lead',
  '.transfer-hero__lead',
  '.exchange-hero__lead',
  '.services-hero__lead',
].join(',')

/* Other secondary nav surfaces — sub-tabs, top-row pills etc — keep
 * the barely-there ultraLight tick. */
const ULTRA_LIGHT_SELECTOR = [
  '.services-tab',
  '.services-sub-tab',
].join(',')

/* Elements that match one of these selectors get the lighter "tick"
 * instead of the default medium tap. */
const LIGHT_SELECTOR = [
  '.cards-thumb',
  '.cards-thumb--add',
  '.home__top-circle',
  '.home__pill',
  '.exchange-chip',
  '.card-name-pill',
  '.card-name-pill__confirm',
  '.exchange-picker',
  '.exchange-picker__chevron',
].join(',')

/* Primary CTAs / commit buttons get the firmer tap. */
const STRONG_SELECTOR = [
  '.breathe-cta',
  '.exchange__continue',
  '.transfer-action',
  '.cards-action',
].join(',')

const intensityFor = (el) => {
  const explicit = el.getAttribute('data-haptic')
  if (explicit && HAPTIC_DURATIONS[explicit] !== undefined) return explicit
  if (el.matches(OFF_SELECTOR)) return 'off'
  if (el.matches(STRONG_SELECTOR)) return 'strong'
  if (el.matches(ULTRA_LIGHT_SELECTOR)) return 'ultraLight'
  if (el.matches(LIGHT_SELECTOR)) return 'light'
  return 'medium'
}

const tap = (level) => {
  if (typeof navigator === 'undefined') return
  if (typeof navigator.vibrate !== 'function') return
  const ms = HAPTIC_DURATIONS[level] ?? HAPTIC_DURATIONS.medium
  try { navigator.vibrate(ms) } catch { /* noop */ }
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
      if (target.getAttribute('data-haptic') === 'off') return
      const level = intensityFor(target)
      if (level === 'off') return
      tap(level)
    },
    { passive: true, capture: true },
  )
}
