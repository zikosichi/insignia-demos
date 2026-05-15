import { useCallback, useEffect, useRef, useState } from 'react'
import './ExpertTips.css'

const TIPS = {
  home: [
    'Checking balance and recent activity accounts for roughly 70% of all banking-app sessions — so it lives where the eye lands first.',
    'The average mobile banking session lasts under two minutes. Every tap has to earn its place.',
    'Personalized offers driven by behavior — not demographics — outperform generic placements by an order of magnitude in private banking.',
  ],
  cards: [
    'Instant card freeze is consistently the #1 most-requested control feature among customers over 50 — most local banks bury it three taps deep.',
    'Tactile metaphors — rotate, tilt, flip — reduce cognitive load for customers who learned the world before touchscreens.',
    'Card details revealed by gesture, not by a labeled button. The motion is the affordance.',
    'Granular card controls (online limits, ATM caps, regional locks) are now table-stakes for HNW segments — designed to scale here from day one.',
  ],
  transactions: [
    'The most common "lost" user in banking apps is one who cannot locate their statement. We placed generation inside the filter, not behind a menu.',
    'Charge vs. Debit is the most-used filter in this segment — surfaced first, with one tap.',
  ],
  services: [
    'Concierge access placed directly on the page — not behind a menu — converts a feature into a relationship.',
    'Preferences captured once, then honored. Re-asking the customer is a tax on the relationship.',
    'For HNW clients, "Services" is not a side feature — it is often why they chose the bank.',
  ],
  transfer: [
    'Roughly 80% of transfers go to recipients the customer has paid before. Surfacing recents covers most intent before a single keystroke.',
  ],
}

const ROTATION_MS = 14000
const FADE_MS = 1600

function routeFromHash(hash) {
  if (hash === '#cards') return 'cards'
  if (hash === '#transactions') return 'transactions'
  if (hash === '#services') return 'services'
  if (hash === '' || hash === '#' || hash === '#home') return 'home'
  return null
}

export default function ExpertTips() {
  const [hashRoute, setHashRoute] = useState(routeFromHash(window.location.hash))
  const [subScreen, setSubScreen] = useState(null)
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const rotateTimer = useRef(null)
  const fadeTimer = useRef(null)

  useEffect(() => {
    const onHash = () => {
      setHashRoute(routeFromHash(window.location.hash))
      setIdx(0)
      setFading(false)
    }
    const onSub = (e) => {
      setSubScreen(e.detail?.subScreen ?? null)
      setIdx(0)
      setFading(false)
    }
    window.addEventListener('hashchange', onHash)
    window.addEventListener('subscreen-change', onSub)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('subscreen-change', onSub)
    }
  }, [])

  const route = subScreen && TIPS[subScreen] ? subScreen : hashRoute
  const tips = route ? TIPS[route] : null
  const total = tips?.length ?? 0

  const advance = useCallback((target) => {
    if (!tips || tips.length <= 1) return
    if (fadeTimer.current) clearTimeout(fadeTimer.current)
    setFading(true)
    fadeTimer.current = setTimeout(() => {
      setIdx(i => {
        if (typeof target === 'number') return target
        return (i + 1) % tips.length
      })
      setFading(false)
    }, FADE_MS)
  }, [tips])

  useEffect(() => {
    if (!tips || tips.length <= 1) return
    if (rotateTimer.current) clearInterval(rotateTimer.current)
    rotateTimer.current = setInterval(() => advance(), ROTATION_MS)
    return () => {
      if (rotateTimer.current) clearInterval(rotateTimer.current)
      if (fadeTimer.current) clearTimeout(fadeTimer.current)
    }
  }, [advance, tips])

  if (!route || !tips || tips.length === 0) return null

  const handleClick = () => {
    if (rotateTimer.current) clearInterval(rotateTimer.current)
    advance()
    rotateTimer.current = setInterval(() => advance(), ROTATION_MS)
  }

  return (
    <aside
      className="expert-tips"
      style={{ '--fade-ms': `${FADE_MS}ms` }}
    >
      <div
        className={`expert-tips__inner ${fading ? 'is-fading' : ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
        aria-label="Next industry note"
      >
        <blockquote className="expert-tips__quote" key={`${route}-${idx}`}>
          {tips[idx]}
        </blockquote>
        {total > 1 && (
          <div className="expert-tips__dots" aria-hidden="true">
            {tips.map((_, i) => (
              <span
                key={i}
                className={`expert-tips__dot ${i === idx ? 'is-active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
