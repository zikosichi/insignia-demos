import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import accountCardTexture from '../../assets/breathe/accounts/account-card-texture.png'
import account1Card from '../../assets/breathe/accounts/account-1-card.png'
import chargeCardGlow from '../../assets/breathe/accounts/charge-card-glow.svg'
import chargeCardTexture from '../../assets/breathe/accounts/charge-card-texture.png'
import chargeCardThumb from '../../assets/breathe/accounts/charge-card-thumb.png'

import offerAubergeVideo from '../../assets/breathe/offers/auberge-du-vent.mp4'
import iconPeopleCircle from '../../assets/breathe/IconPeopleCircle.svg'
import iconMagnifyingGlass from '../../assets/breathe/IconMagnifyingGlass.svg'
import iconBubbleAnnotation from '../../assets/breathe/IconBubbleAnnotation5.svg'
import iconArrowLeftRight from '../../assets/breathe/IconArrowLeftRight.svg'
import iconArrowUp from '../../assets/breathe/IconArrowUp.svg'
import bodyTopCrest from '../../assets/breathe/body-top-crest.svg'

const ACCOUNT_CARDS = [
  {
    id: 'account-1',
    title: 'Account 1',
    amount: '€1,850,000',
    breakdown: ['€1,850,000', '$420,000', '£95,000'],
    background: '#482B4F',
    text: '#FFFFFF',
    texture: accountCardTexture,
    thumb: account1Card,
  },
  {
    id: 'account-2',
    title: 'Account 2',
    amount: '€1,420,000',
    breakdown: ['€940,000', '$310,000', '£72,000'],
    background: '#5A2E05',
    text: '#FFFFFF',
    texture: accountCardTexture,
    thumb: null,
  },
]

const CHARGE_CARDS = [
  {
    id: 'charge-1',
    title: 'Charge card 1',
    status: 'Available',
    amount: '€31,580',
    usage: '€18,420 of €50,000 used',
    progress: 64 / 328,
    background: '#CAB495',
    texture: chargeCardTexture,
    glow: chargeCardGlow,
    thumb: chargeCardThumb,
  },
  {
    id: 'charge-2',
    title: 'Charge card 2',
    status: 'Available',
    amount: '€31,580',
    usage: '€18,420 of €50,000 used',
    progress: 64 / 328,
    background: '#D8ABB6',
    texture: chargeCardTexture,
    glow: chargeCardGlow,
    thumb: chargeCardThumb,
  },
]

export const DEFAULT_TUNING = {
  shineMult: 0.52,
  edgeMult: 0.32,
  glareMult: 1.29,
  facetPop: 1.45,
  darkness: 0,
  vignetteStrength: 0.22,
  parallaxPx: 34,
  patternSize: 470,
  lightCtas: false,
  balanceRevealEffect: 'blur',
}

const BALANCE_VALUE = 4206000
const BALANCE_TEXT = `€${BALANCE_VALUE.toLocaleString('en-US')}`
const CONTROL_PANEL_OPEN_KEY = 'breathe-control-panel-open'

function getInitialCounterValue(revealEffect) {
  if (revealEffect !== 'counter') return BALANCE_VALUE
  if (typeof window === 'undefined') return BALANCE_VALUE
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? BALANCE_VALUE
    : 0
}

export function ControlPanel({
  tuning,
  setTuning,
  onReset,
  showContentControls = true,
  extraSections = [],
}) {
  const [open, setOpen] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(CONTROL_PANEL_OPEN_KEY) === 'true'
  })
  const set = (key) => (e) =>
    setTuning((t) => ({ ...t, [key]: parseFloat(e.target.value) }))
  const setChecked = (key) => (e) =>
    setTuning((t) => ({ ...t, [key]: e.target.checked }))
  const setText = (key) => (e) =>
    setTuning((t) => ({ ...t, [key]: e.target.value }))
  const sections = [
    {
      title: 'Reflection',
      rows: [
        ['shineMult', 'Shine', 0, 2, 0.01],
        ['edgeMult', 'Edge shine', 0, 2, 0.01],
        ['glareMult', 'Glare', 0, 2, 0.01],
        ['facetPop', 'Facet pop', 0.5, 4, 0.05],
      ],
    },
    {
      title: 'Surface',
      rows: [
        ['darkness', 'Darkness', 0, 0.9, 0.01],
        ['vignetteStrength', 'Vignette', 0, 2, 0.01],
        ['patternSize', 'Pattern size', 100, 500, 5, '%'],
      ],
    },
    {
      title: 'Motion',
      rows: [['parallaxPx', 'Parallax', 0, 80, 1, 'px']],
    },
    ...extraSections,
  ]

  const toggleOpen = () => {
    setOpen((current) => {
      const next = !current
      window.localStorage.setItem(CONTROL_PANEL_OPEN_KEY, String(next))
      return next
    })
  }

  return createPortal(
    <div className={`hero-tuner${open ? '' : ' hero-tuner--closed'}`}>
      <button
        type="button"
        className="hero-tuner__toggle"
        onClick={toggleOpen}
        aria-expanded={open}
        aria-label="Hero tuner"
      >
        <span className="hero-tuner__title">Hero controls</span>
        <span className="hero-tuner__chevron" aria-hidden>
          <svg viewBox="0 0 20 20" focusable="false">
            <path
              d="m5.5 7.5 4.5 4.5 4.5-4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div className="hero-tuner__body">
          {sections.map((section) => (
            <section key={section.title} className="hero-tuner__section">
              <div className="hero-tuner__section-title">{section.title}</div>
              {section.rows.map(([k, label, min, max, step, suffix = '']) => (
                <label key={k} className="hero-tuner__row">
                  <span className="hero-tuner__label">{label}</span>
                  <span className="hero-tuner__control">
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={tuning[k]}
                      onChange={set(k)}
                    />
                    <span className="hero-tuner__value">
                      {tuning[k]}
                      {suffix}
                    </span>
                  </span>
                </label>
              ))}
            </section>
          ))}
          {showContentControls && (
            <section className="hero-tuner__section">
              <div className="hero-tuner__section-title">Content</div>
              <label className="hero-tuner__field">
                <span className="hero-tuner__label">Balance reveal</span>
                <select
                  value={tuning.balanceRevealEffect}
                  onChange={setText('balanceRevealEffect')}
                >
                  <option value="blur">Blur</option>
                  <option value="counter">Counter</option>
                </select>
              </label>
              <label className="hero-tuner__switch-row">
                <span>
                  <span className="hero-tuner__label">Light CTAs</span>
                  <span className="hero-tuner__hint">
                    {tuning.lightCtas ? 'Enabled' : 'Disabled'}
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={tuning.lightCtas}
                  onChange={setChecked('lightCtas')}
                />
              </label>
            </section>
          )}
          <div className="hero-tuner__footer">
            <button className="hero-tuner__reset" onClick={onReset}>
              Reset controls
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body,
  )
}

function Icon({ d, size = 20, stroke = 'currentColor' }) {
  return (
    <svg
      className="home__icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {d}
    </svg>
  )
}

const ICONS = {
  user: (
    <>
      <circle cx="12" cy="9" r="3.6" />
      <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  bubble: <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8A2.5 2.5 0 0 1 17.5 17H10l-4 3v-3H6.5A2.5 2.5 0 0 1 4 14.5z" />,
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M3 3l18 18" />
    </>
  ),
  arrowUp: <path d="M12 19V6m0 0-6 6m6-6 6 6" />,
  arrowSwap: (
    <>
      <path d="M7 7h13l-3-3" />
      <path d="M17 17H4l3 3" />
    </>
  ),
}

function HomeIcon({ name, size, stroke }) {
  return <Icon d={ICONS[name]} size={size} stroke={stroke} />
}

function BalanceAmount({ revealEffect }) {
  const [counterValue, setCounterValue] = useState(() =>
    getInitialCounterValue(revealEffect),
  )

  useEffect(() => {
    if (revealEffect !== 'counter') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf
    let timeout
    const delay = 525
    const duration = 1200

    timeout = window.setTimeout(() => {
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setCounterValue(Math.round(BALANCE_VALUE * eased))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => {
      window.clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [revealEffect])

  if (revealEffect === 'counter') {
    return (
      <div
        className="home__balance-amount home__balance-amount--counter"
        aria-label={BALANCE_TEXT}
      >
        €{counterValue.toLocaleString('en-US')}
      </div>
    )
  }

  return (
    <div className="home__balance-amount" aria-label={BALANCE_TEXT}>
      {Array.from(BALANCE_TEXT).map((ch, i) => (
        <span
          key={i}
          className="home__balance-amount-char"
          style={{ '--i': i }}
          aria-hidden
        >
          {ch}
        </span>
      ))}
    </div>
  )
}

function Hero({ leatherSrc, foilSrc, edgesSrc, tuning }) {
  const heroRef = useRef(null)
  // Intro: animate the same --mx/--my the live mouse drives, so the
  // existing shine/edge/glare layers light up and the highlight sweeps
  // across the leather. When the animation ends we remove the overrides
  // and the inherited (mouse-driven) values take over.
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    const start = performance.now()
    // Light intro: rise from below to top, then blend reflection toward
    // live mouse position. Parallax is driven by an INLINE transform on
    // the parallax wrapper so it can move bottom→up without inverting
    // --parallax-px (which would otherwise cause a snap on hand-off).
    const introDuration = 1100
    const blendDuration = 500
    const totalDuration = introDuration + blendDuration
    const patternDuration = totalDuration + 300
    // Light travel: shorter than full hero — feels gentler
    const fromX = 0.5, fromY = 0.72
    const toX = 0.5, toY = 0.28
    const originalPx =
      parseFloat(getComputedStyle(el).getPropertyValue('--parallax-px')) || 28
    const targetPatternSize =
      parseFloat(getComputedStyle(el).getPropertyValue('--pattern-size')) || 470
    const introPatternSize = 440
    // Bg travels further than the live mouse parallax range
    const introParallaxStart = originalPx * 1.5
    const parent =
      el.closest('.tilt-phone') ||
      el.closest('.prototypes-mobile-host') ||
      el
    const parallaxEl = el.querySelector('.home__hero-parallax')
    const setReflection = (mx, my) => {
      const dist = Math.hypot(mx - 0.5, my - 0.5)
      const shine = Math.min(1, dist * 2.5 + 0.2)
      const glare = Math.min(0.8, dist * 0.5)
      const angle =
        (Math.atan2(my - 0.5, mx - 0.5) * 180) / Math.PI + 90
      el.style.setProperty('--mx', `${(mx * 100).toFixed(2)}%`)
      el.style.setProperty('--my', `${(my * 100).toFixed(2)}%`)
      el.style.setProperty('--pointer-from-left', mx.toFixed(4))
      el.style.setProperty('--pointer-from-top', my.toFixed(4))
      el.style.setProperty('--shine-opacity', shine.toFixed(3))
      el.style.setProperty('--glare-opacity', glare.toFixed(3))
      el.style.setProperty('--border-angle', `${angle.toFixed(2)}deg`)
    }
    const setParallax = (px, py) => {
      if (parallaxEl) {
        parallaxEl.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`
      }
    }
    const setPatternScale = (elapsed) => {
      const t = Math.min(1, elapsed / patternDuration)
      const e = 1 - Math.pow(1 - t, 3)
      el.style.setProperty(
        '--pattern-size',
        `${(introPatternSize + (targetPatternSize - introPatternSize) * e).toFixed(2)}%`,
      )
    }
    // Read the live mouse-driven parallax value from the parent
    const liveParallax = () => {
      const cs = getComputedStyle(parent)
      const mx = parseFloat(cs.getPropertyValue('--pointer-from-left')) || 0.5
      const my = parseFloat(cs.getPropertyValue('--pointer-from-top')) || 0.5
      return {
        x: (0.5 - mx) * originalPx,
        y: (0.5 - my) * originalPx,
      }
    }
    const tick = (now) => {
      const elapsed = now - start
      if (elapsed < introDuration) {
        // Phase 1: light rises bottom→top, bg drifts up alongside it
        const t = elapsed / introDuration
        const e = 1 - Math.pow(1 - t, 3)
        const mx = fromX + (toX - fromX) * e
        const my = fromY + (toY - fromY) * e
        setReflection(mx, my)
        // Bg parallax: from introParallaxStart (low) → live mouse position
        const live = liveParallax()
        const px = live.x * e
        const py = introParallaxStart + (live.y - introParallaxStart) * e
        setParallax(px, py)
        setPatternScale(elapsed)
      } else if (elapsed < totalDuration) {
        // Phase 2: blend reflection toward live mouse, parallax already
        // tracks live mouse — no further work needed there.
        const t = (elapsed - introDuration) / blendDuration
        const e = t * t * (3 - 2 * t)
        const cs = getComputedStyle(parent)
        const mouseMx =
          parseFloat(cs.getPropertyValue('--pointer-from-left')) || 0.5
        const mouseMy =
          parseFloat(cs.getPropertyValue('--pointer-from-top')) || 0.5
        setReflection(toX + (mouseMx - toX) * e, toY + (mouseMy - toY) * e)
        const live = liveParallax()
        setParallax(live.x, live.y)
        setPatternScale(elapsed)
      } else {
        // Done — leave the JS-set values in place so they line up with
        // whatever phase 2 settled on, then let live pointer input take
        // over on the first move. Previously we overwrote --border-angle
        // (and removed --mx/--my) here, which caused a visible snap on
        // the CTA gold-stroke gradient and the shine layer.
        const release = () => {
          for (const k of [
            '--mx',
            '--my',
            '--pointer-from-left',
            '--pointer-from-top',
            '--shine-opacity',
            '--glare-opacity',
            '--border-angle',
          ])
            el.style.removeProperty(k)
        }
        window.addEventListener('pointermove', release, { once: true })
        el.style.setProperty('--pattern-size', `${targetPatternSize}%`)
        if (parallaxEl) parallaxEl.style.transform = ''
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div
      ref={heroRef}
      className="home__hero"
      style={{
        '--hero-foil': `url(${foilSrc})`,
        '--hero-edges': `url(${edgesSrc})`,
        '--shine-mult': tuning.shineMult,
        '--edge-mult': tuning.edgeMult,
        '--glare-mult': tuning.glareMult,
        '--facet-pop': tuning.facetPop,
        '--darkness': tuning.darkness,
        '--vignette-strength': tuning.vignetteStrength,
        '--parallax-px': `${tuning.parallaxPx}px`,
        '--pattern-size': `${tuning.patternSize}%`,
      }}
    >
      <div className="home__hero-parallax">
        <div
          className="home__hero-bg"
          style={{ backgroundImage: `url(${leatherSrc})` }}
        />
        <div className="home__hero-shine" aria-hidden />
        <div className="home__hero-edge-shine" aria-hidden />
        <div className="home__hero-glare" aria-hidden />
      </div>
      <div className="home__hero-frame">
        <div className="home__hero-vignette" aria-hidden />
        <div className="home__hero-content">
          <div className="home__top-row">
            <button className="home__top-circle" aria-label="Profile">
              <img className="home__top-icon" src={iconPeopleCircle} alt="" />
            </button>
            <div className="home__top-actions">
              <button className="home__top-circle" aria-label="Search">
                <img className="home__top-icon" src={iconMagnifyingGlass} alt="" />
              </button>
              <button className="home__pill" aria-label="Help">
                <img className="home__top-icon" src={iconBubbleAnnotation} alt="" />
                <span>Help</span>
              </button>
            </div>
          </div>

          <div className="home__balance">
            <div className="home__balance-label">
              <HomeIcon name="eye" size={18} />
              <span>Total balance</span>
            </div>
            <BalanceAmount
              key={tuning.balanceRevealEffect}
              revealEffect={tuning.balanceRevealEffect}
            />
          </div>

          <div className="home__cta-row">
            <button className={`home__cta${tuning.lightCtas ? ' home__cta--light' : ''}`}>
              <img className="home__icon" src={iconArrowUp} alt="" aria-hidden />
              <span>Transfer</span>
            </button>
            <button className={`home__cta${tuning.lightCtas ? ' home__cta--light' : ''}`}>
              <img className="home__icon" src={iconArrowLeftRight} alt="" aria-hidden />
              <span>Exchange</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Recent transactions block (Figma node 344:2754) ── */

const ACCOUNT_DOT_COLORS = {
  1: '#BEB3CD',
  2: '#D9AD9C',
}

function Amount({ value }) {
  // value: "−€23,750.49" or "−€450.00" — split cents to a smaller superscript
  const match = value.match(/^(.+\.)(\d{2})$/)
  if (!match) return <span>{value}</span>
  const [, whole, cents] = match
  return (
    <>
      {whole}
      <span className="home-tx__cents">{cents}</span>
    </>
  )
}

function RecentTransactions({ items }) {
  return (
    <section className="home-section home-section--tx">
      <header className="home-section__header">
        <h3 className="home-section__title">Recent transactions</h3>
      </header>
      <div className="home-tx">
        <ul className="home-tx__list">
          {items.map((item, i) => (
            <li key={i} className="home-tx__row">
              <span
                className="home-tx__dot"
                style={{ background: ACCOUNT_DOT_COLORS[item.account] }}
                aria-hidden
              />
              <div className="home-tx__text">
                <p className="home-tx__name">{item.name}</p>
                <p className="home-tx__sub">Account {item.account}</p>
              </div>
              <p className="home-tx__amount">
                <Amount value={item.amount} />
              </p>
            </li>
          ))}
        </ul>
        <button type="button" className="home-tx__more">
          <span>See all transactions</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  )
}

const RECENT_TRANSACTIONS = [
  { name: 'Palais de Lumière', account: 2, amount: '−€23,750.49' },
  { name: 'Apple Store', account: 1, amount: '−€450.00' },
  { name: 'Château de l’Étoile', account: 2, amount: '−€15,600.67' },
  { name: 'Auberge du Vent', account: 1, amount: '−€2,300.00' },
]

/* ── Stories: "Special offers for you" (Figma node 344:2784) ──
   Tap left/right halves to navigate. Auto-advances every `duration` ms.
   Each slide accepts `image` or `video` (MP4 url). */

const STORY_DEFAULT_DURATION = 6000

function Story({ slide, paused, advance, onComplete }) {
  if (!slide) return null
  const isVideo = !!slide.video
  return (
    <div className="home-story__media">
      {isVideo ? (
        <video
          key={slide.video}
          className="home-story__media-el"
          src={slide.video}
          autoPlay
          muted
          playsInline
          loop
        />
      ) : (
        <img
          key={slide.image}
          className="home-story__media-el"
          src={slide.image}
          alt=""
        />
      )}
    </div>
  )
}

function Stories({ slides, duration = STORY_DEFAULT_DURATION }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  // progress 0..1 of the current slide
  const [progress, setProgress] = useState(0)
  const startedAt = useRef(0)
  const elapsedBefore = useRef(0)
  const rafRef = useRef(0)

  const slide = slides[index]
  const slideDuration = slide?.duration ?? duration

  useEffect(() => {
    elapsedBefore.current = 0
    setProgress(0)
  }, [index])

  const isSingle = slides.length <= 1

  useEffect(() => {
    if (isSingle) return
    if (paused) {
      cancelAnimationFrame(rafRef.current)
      elapsedBefore.current += performance.now() - startedAt.current
      return
    }
    startedAt.current = performance.now()
    const tick = () => {
      const elapsed = elapsedBefore.current + (performance.now() - startedAt.current)
      const p = Math.min(1, elapsed / slideDuration)
      setProgress(p)
      if (p >= 1) {
        if (slide?.loop) {
          // Restart this slide's progress without advancing.
          elapsedBefore.current = 0
          startedAt.current = performance.now()
          setProgress(0)
          rafRef.current = requestAnimationFrame(tick)
          return
        }
        if (index < slides.length - 1) setIndex((i) => i + 1)
        else setIndex(0)
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paused, index, slideDuration, slides.length])

  const goPrev = () => setIndex((i) => Math.max(0, i - 1))
  const goNext = () => setIndex((i) => Math.min(slides.length - 1, i + 1))

  if (!slide) return null

  return (
    <section className="home-section">
      <header className="home-section__header">
        <h3 className="home-section__title">Special offers for you</h3>
      </header>
      <div
        className="home-story"
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerLeave={() => setPaused(false)}
        onPointerCancel={() => setPaused(false)}
      >
        <Story slide={slide} />
        {!isSingle && (
          <>
            <div className="home-story__progress" aria-hidden>
              {slides.map((_, i) => (
                <div key={i} className="home-story__progress-seg">
                  <div
                    className="home-story__progress-fill"
                    style={{
                      transform: `scaleX(${i < index ? 1 : i === index ? progress : 0})`,
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="home-story__nav home-story__nav--prev"
              onClick={goPrev}
              aria-label="Previous"
            />
            <button
              type="button"
              className="home-story__nav home-story__nav--next"
              onClick={goNext}
              aria-label="Next"
            />
          </>
        )}
        <div className="home-story__panel">
          <div className="home-story__text">
            <p className="home-story__title">{slide.title}</p>
            <p className="home-story__desc">{slide.description}</p>
          </div>
          <button type="button" className="home-story__cta">
            <span>{slide.ctaLabel ?? 'View offer'}</span>
            <svg
              className="home-story__cta-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

const SPECIAL_OFFERS = [
  {
    video: offerAubergeVideo,
    title: 'Auberge du Vent',
    description:
      "Private chef's table with a bespoke Michelin menu in Biarritz. Reserved on request.",
    loop: true,
  },
  { title: 'Slide 2', description: 'Description coming soon.' },
  { title: 'Slide 3', description: 'Description coming soon.' },
  { title: 'Slide 4', description: 'Description coming soon.' },
  { title: 'Slide 5', description: 'Description coming soon.' },
]

/* ── Bottom navigation (Figma node 344:2808) ──
   Active tab: white bg + 1px pastel-gold (#f5d4a9) stroke + rounded 12px.
   Inactive: white bg + 1px white border (so widths match the active state). */

const NAV_ICONS = {
  home: {
    selected: (
      <path d="M13.555 3.40669C12.6179 2.76418 11.3821 2.76418 10.445 3.40669L4.19496 7.69172C3.44705 8.2045 3 9.05302 3 9.95984V18.2499C3 19.7687 4.23122 20.9999 5.75 20.9999H8.75C9.16421 20.9999 9.5 20.6641 9.5 20.2499V16.7499C9.5 15.3692 10.6193 14.2499 12 14.2499C13.3807 14.2499 14.5 15.3692 14.5 16.7499V20.2499C14.5 20.6641 14.8358 20.9999 15.25 20.9999H18.25C19.7688 20.9999 21 19.7687 21 18.2499V9.95984C21 9.05302 20.553 8.2045 19.805 7.69172L13.555 3.40669Z" />
    ),
    unselected: (
      <path d="M19.5 9.96011C19.5 9.54794 19.297 9.16194 18.957 8.92886L12.707 4.64371C12.2811 4.35168 11.7189 4.35168 11.293 4.64371L5.04297 8.92886C4.70304 9.16195 4.5 9.54796 4.5 9.96011V18.2502C4.50007 18.9405 5.05968 19.5002 5.75 19.5002H8.75V16.7502C8.75 14.9552 10.2051 13.5002 12 13.5002C13.7949 13.5002 15.25 14.9552 15.25 16.7502V19.5002H18.25C18.9403 19.5002 19.4999 18.9405 19.5 18.2502V9.96011ZM21 18.2502C20.9999 19.7689 19.7688 21.0002 18.25 21.0002H14.5C14.0858 21.0002 13.7501 20.6643 13.75 20.2502V16.7502C13.75 15.7837 12.9665 15.0002 12 15.0002C11.0335 15.0002 10.25 15.7837 10.25 16.7502V20.2502C10.2499 20.6643 9.91417 21.0002 9.5 21.0002H5.75C4.23127 21.0002 3.00007 19.7689 3 18.2502V9.96011C3 9.05329 3.4474 8.20433 4.19531 7.69156L10.4453 3.4064C11.3822 2.76427 12.6178 2.76427 13.5547 3.4064L19.8047 7.69156C20.5527 8.20435 21 9.05331 21 9.96011V18.2502Z" />
    ),
  },
  transactions: {
    selected: (
      <>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 7.25C12 8.76878 13.2312 10 14.75 10H20V19.25C20 20.7688 18.7688 22 17.25 22H6.75C5.23122 22 4 20.7688 4 19.25V4.75C4 3.23122 5.23122 2 6.75 2H12V7.25ZM8.75 17.5C8.33579 17.5 8 17.8358 8 18.25C8 18.6642 8.33579 19 8.75 19H15.25C15.6642 19 16 18.6642 16 18.25C16 17.8358 15.6642 17.5 15.25 17.5H8.75ZM8.75 13.5C8.33579 13.5 8 13.8358 8 14.25C8 14.6642 8.33579 15 8.75 15H12.25C12.6642 15 13 14.6642 13 14.25C13 13.8358 12.6642 13.5 12.25 13.5H8.75Z" />
        <path d="M13.5732 2.5127L19.4873 8.42676C19.5111 8.45056 19.5344 8.475 19.5566 8.5H14.75C14.0597 8.5 13.5 7.94032 13.5 7.25V2.44336C13.525 2.46564 13.5494 2.48889 13.5732 2.5127Z" />
      </>
    ),
    unselected: (
      <>
        <path d="M4 19.25V4.75C4 3.23122 5.23122 2 6.75 2H11.9219C12.6511 2.00007 13.3505 2.29002 13.8662 2.80566L19.1943 8.13379C19.71 8.64946 19.9999 9.3489 20 10.0781V19.25C20 20.7688 18.7688 22 17.25 22H6.75C5.23122 22 4 20.7688 4 19.25ZM5.5 19.25C5.5 19.9404 6.05964 20.5 6.75 20.5H17.25C17.9404 20.5 18.5 19.9404 18.5 19.25V10.0781C18.4999 9.74673 18.3682 9.42869 18.1338 9.19434L12.8057 3.86621C12.5713 3.63183 12.2533 3.50007 11.9219 3.5H6.75C6.05964 3.5 5.5 4.05964 5.5 4.75V19.25Z" />
        <path d="M12 7.25V3.25H13.5V7.25C13.5 7.94036 14.0596 8.5 14.75 8.5H18.75V10H14.75C13.2312 10 12 8.76878 12 7.25Z" />
        <path d="M12.25 12.5C12.6642 12.5 13 12.8358 13 13.25C13 13.6642 12.6642 14 12.25 14H8.75C8.33579 14 8 13.6642 8 13.25C8 12.8358 8.33579 12.5 8.75 12.5H12.25Z" />
        <path d="M15.25 16.5C15.6642 16.5 16 16.8358 16 17.25C16 17.6642 15.6642 18 15.25 18H8.75C8.33579 18 8 17.6642 8 17.25C8 16.8358 8.33579 16.5 8.75 16.5H15.25Z" />
      </>
    ),
  },
  cards: {
    selected: (
      <path fillRule="evenodd" clipRule="evenodd" d="M4.75 4.00293C3.23122 4.00293 2 5.23415 2 6.75293V9H21.9961V10.5H2V17.2461C2 18.7649 3.23122 19.9961 4.75 19.9961H19.2461C20.7649 19.9961 21.9961 18.7649 21.9961 17.2461V9.04593C21.9962 8.27968 21.9963 7.51306 21.9957 6.74653C21.9945 5.22932 20.7633 4.00293 19.248 4.00293H4.75ZM6.75 12.5C6.33579 12.5 6 12.8358 6 13.25C6 13.6642 6.33579 14 6.75 14H9.75C10.1642 14 10.5 13.6642 10.5 13.25C10.5 12.8358 10.1642 12.5 9.75 12.5H6.75Z" />
    ),
    unselected: (
      <path d="M20.4961 10.5H3.5V17.2461C3.5 17.9365 4.05964 18.4961 4.75 18.4961H19.2461C19.9365 18.4961 20.4961 17.9365 20.4961 17.2461V10.5ZM9.75 12.5C10.1642 12.5 10.5 12.8358 10.5 13.25C10.5 13.6642 10.1642 14 9.75 14H6.75C6.33579 14 6 13.6642 6 13.25C6 12.8358 6.33579 12.5 6.75 12.5H9.75ZM21.9961 17.2461C21.9961 18.7649 20.7649 19.9961 19.2461 19.9961H4.75C3.23122 19.9961 2 18.7649 2 17.2461V6.75293C2 5.23415 3.23122 4.00293 4.75 4.00293H19.248C20.7632 4.00296 21.9946 5.2291 21.9961 6.74609V17.2461ZM3.5 9H20.4961C20.4961 8.24916 20.4966 7.49864 20.4961 6.74805C20.4955 6.06066 19.9373 5.50296 19.248 5.50293H4.75C4.05964 5.50293 3.5 6.06257 3.5 6.75293V9Z" />
    ),
  },
  services: (
    <path d="M18.5 12.7373C18.4176 12.7448 18.3343 12.75 18.25 12.75H12.75V19.5H17.25C17.9404 19.5 18.5 18.9404 18.5 18.25V12.7373ZM5.5 18.25C5.5 18.9404 6.05964 19.5 6.75 19.5H11.25V12.75H5.75C5.66574 12.75 5.58244 12.7448 5.5 12.7373V18.25ZM19.5 9.75C19.5 9.05964 18.9404 8.5 18.25 8.5H12.75V11.25H18.25C18.4788 11.25 18.6909 11.1889 18.874 11.083C19.2496 10.8657 19.5 10.4617 19.5 10V9.75ZM4.5 10C4.5 10.4617 4.75039 10.8657 5.12598 11.083C5.309 11.1889 5.52116 11.25 5.75 11.25H11.25V8.5H5.75C5.05964 8.5 4.5 9.05964 4.5 9.75V10ZM16.25 4.41699C16.25 3.91074 15.8393 3.5 15.333 3.5C13.9066 3.50016 12.7502 4.65652 12.75 6.08301V7H13.667C15.0934 6.99984 16.2498 5.84348 16.25 4.41699ZM7.75 4.41699C7.75017 5.84349 8.90655 6.99984 10.333 7H11.25V6.08301C11.2498 4.65653 10.0935 3.50017 8.66699 3.5C8.16073 3.5 7.75 3.91073 7.75 4.41699ZM17.75 4.41699C17.7499 5.39719 17.4039 6.29623 16.8281 7H18.25C19.7688 7 21 8.23122 21 9.75V10C21 10.8542 20.6092 11.6155 20 12.1191V18.25C20 19.7688 18.7688 21 17.25 21H6.75C5.23122 21 4 19.7688 4 18.25V12.1191C3.39078 11.6155 3 10.8542 3 10V9.75C3 8.23122 4.23122 7 5.75 7H7.17188C6.59611 6.29623 6.25008 5.39719 6.25 4.41699C6.25 3.0823 7.3323 2 8.66699 2C10.0438 2.00011 11.2604 2.68244 12 3.72656C12.7396 2.68243 13.9562 2.0001 15.333 2C16.6677 2 17.75 3.08229 17.75 4.41699Z" />
  ),
}

const NAV_TABS = [
  { id: 'home', label: 'Home' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'cards', label: 'Cards' },
  { id: 'services', label: 'Services' },
]

export function BottomNav({ activeId = 'home', onChange }) {
  return (
    <nav className="home-nav" role="tablist" aria-label="Primary">
      {NAV_TABS.map((tab) => {
        const active = tab.id === activeId
        const icon = NAV_ICONS[tab.id]
        const iconNode = icon?.selected ? icon[active ? 'selected' : 'unselected'] : icon
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={`home-nav__btn${active ? ' home-nav__btn--active' : ''}`}
            onClick={() => onChange?.(tab.id)}
          >
            <svg
              className="home-nav__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              {iconNode}
            </svg>
            <span className="home-nav__label">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function SegmentedTabs({ tabs, activeIndex, onChange }) {
  return (
    <div
      className="home-tabs"
      role="tablist"
      style={{ '--active': activeIndex, '--count': tabs.length }}
    >
      <span className="home-tabs__indicator" aria-hidden />
      {tabs.map((tab, i) => {
        const active = i === activeIndex
        return (
          <button
            key={tab.label}
            role="tab"
            aria-selected={active}
            className={`home-tabs__item${active ? ' home-tabs__item--active' : ''}`}
            onClick={() => onChange?.(i)}
          >
            <span className="home-tabs__count">{tab.count}</span>
            <span className="home-tabs__label">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function AccountBox({ card, index }) {
  return (
    <article
      className="home__cards-card home-account-card"
      style={{
        '--i': index,
        '--account-bg': card.background,
        '--account-text': card.text,
      }}
    >
      <span
        className="home-account-card__texture"
        style={{ backgroundImage: `url(${card.texture})` }}
        aria-hidden
      />
      <p className="home-account-card__title">{card.title}</p>
      <div className="home-account-card__copy">
        <p className="home-account-card__amount" aria-label={card.amount}>
          {Array.from(card.amount).map((ch, j) => (
            <span
              key={j}
              className="home-account-card__amount-char"
              style={{ '--j': j }}
              aria-hidden
            >
              {ch}
            </span>
          ))}
        </p>
        <div className="home-account-card__breakdown" aria-label={card.breakdown.join(', ')}>
          {card.breakdown.map((item, i) => (
            <span key={item} className="home-account-card__breakdown-item">
              {i > 0 && <span className="home-account-card__separator" aria-hidden />}
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
      {card.thumb && (
        <span className="home-account-card__thumb-wrap" aria-hidden>
          <img className="home-account-card__thumb" src={card.thumb} alt="" />
        </span>
      )}
      <span className="home-account-card__stitch" aria-hidden />
    </article>
  )
}

function ChargeCard({ card, index }) {
  return (
    <article
      className="home__cards-card home-charge-card"
      style={{
        '--i': index,
        '--charge-bg': card.background,
        '--charge-progress': `${card.progress * 100}%`,
      }}
    >
      <span
        className="home-charge-card__texture"
        style={{ backgroundImage: `url(${card.texture})` }}
        aria-hidden
      />
      <span className="home-charge-card__glow home-charge-card__glow--right" aria-hidden>
        <img src={card.glow} alt="" />
      </span>
      <span className="home-charge-card__glow home-charge-card__glow--left" aria-hidden>
        <img src={card.glow} alt="" />
      </span>
      <p className="home-charge-card__title">{card.title}</p>
      <p className="home-charge-card__status">{card.status}</p>
      <p className="home-charge-card__amount">{card.amount}</p>
      <p className="home-charge-card__usage">{card.usage}</p>
      <span className="home-charge-card__progress" aria-hidden>
        <span />
      </span>
      <span className="home-charge-card__thumb-wrap" aria-hidden>
        <img className="home-charge-card__thumb" src={card.thumb} alt="" />
      </span>
      <span className="home-charge-card__stitch" aria-hidden />
    </article>
  )
}

export default function HomeScreen({
  leatherSrc,
  foilSrc,
  edgesSrc,
  isActive = true,
  showControls = true,
}) {
  const [tuning, setTuning] = useState(DEFAULT_TUNING)
  const [tabIndex, setTabIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [hasChangedCardsTab, setHasChangedCardsTab] = useState(false)
  const handleTabChange = (next) => {
    setDirection(next > tabIndex ? 1 : -1)
    setHasChangedCardsTab(true)
    setTabIndex(next)
  }

  const listRefs = [useRef(null), useRef(null)]
  const [stageHeight, setStageHeight] = useState(null)
  useLayoutEffect(() => {
    if (!isActive) return
    const node = listRefs[tabIndex].current
    if (!node) return
    const update = () => setStageHeight(node.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(node)
    return () => ro.disconnect()
  }, [isActive, tabIndex])
  useEffect(() => {
    if (!isActive) return
    // Re-measure once card texture assets load.
    const imgs = listRefs[tabIndex].current?.querySelectorAll('img') ?? []
    let pending = imgs.length
    if (!pending) return
    const onLoad = () => {
      pending -= 1
      if (pending === 0 && listRefs[tabIndex].current) {
        setStageHeight(listRefs[tabIndex].current.offsetHeight)
      }
    }
    imgs.forEach((img) => {
      if (img.complete) onLoad()
      else img.addEventListener('load', onLoad, { once: true })
    })
  }, [isActive, tabIndex])
  return (
    <div className="home">
      <Hero
        leatherSrc={leatherSrc}
        foilSrc={foilSrc}
        edgesSrc={edgesSrc}
        tuning={tuning}
      />
      <div className="home__body">
        <img className="home__body-crest" src={bodyTopCrest} alt="" aria-hidden />
        <SegmentedTabs
          tabs={[
            { count: ACCOUNT_CARDS.length, label: 'Accounts' },
            { count: CHARGE_CARDS.length, label: 'Charge cards' },
          ]}
          activeIndex={tabIndex}
          onChange={handleTabChange}
        />
        <div
          className={`home__cards-stage${hasChangedCardsTab ? ' home__cards-stage--animate' : ''}`}
          style={{
            '--dir': direction,
            height: stageHeight != null ? `${stageHeight}px` : undefined,
          }}
        >
          {[ACCOUNT_CARDS, CHARGE_CARDS].map((set, idx) => {
            const active = idx === tabIndex
            return (
              <div
                key={idx}
                ref={listRefs[idx]}
                className={`home__cards${active ? ' home__cards--active' : ''}`}
                aria-hidden={!active}
              >
                {set.map((card, i) =>
                  idx === 0 ? (
                    <AccountBox key={card.id} card={card} index={i} />
                  ) : (
                    <ChargeCard key={card.id} card={card} index={i} />
                  ),
                )}
              </div>
            )
          })}
        </div>
        <RecentTransactions items={RECENT_TRANSACTIONS} />
        <Stories slides={SPECIAL_OFFERS} />
      </div>
      {showControls && (
        <ControlPanel
          tuning={tuning}
          setTuning={setTuning}
          onReset={() => setTuning(DEFAULT_TUNING)}
        />
      )}
    </div>
  )
}
