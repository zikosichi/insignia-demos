import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import accountBrown from '../../assets/breathe/accounts/main/brown.svg'
import accountGreen from '../../assets/breathe/accounts/main/green.svg'
import accountPink from '../../assets/breathe/accounts/main/pink.svg'
import chargeLightbrown from '../../assets/breathe/accounts/charge/lightbrown.svg'
import chargePink from '../../assets/breathe/accounts/charge/pink.svg'

import offerAubergeVideo from '../../assets/breathe/offers/auberge-du-vent.mp4'

const ACCOUNT_CARDS = [accountBrown, accountGreen, accountPink]
const CHARGE_CARDS = [chargeLightbrown, chargePink]

const DEFAULT_TUNING = {
  shineMult: 0.53,
  edgeMult: 0.27,
  glareMult: 1.21,
  facetPop: 1.4,
  darkness: 0.35,
  vignetteStrength: 1,
  parallaxPx: 28,
  patternSize: 220,
}

function ControlPanel({ tuning, setTuning, onReset }) {
  const [open, setOpen] = useState(false)
  const set = (key) => (e) =>
    setTuning((t) => ({ ...t, [key]: parseFloat(e.target.value) }))
  const rows = [
    ['shineMult', 'Shine', 0, 2, 0.01],
    ['edgeMult', 'Edge shine', 0, 2, 0.01],
    ['glareMult', 'Glare', 0, 2, 0.01],
    ['facetPop', 'Facet pop', 0.5, 4, 0.05],
    ['darkness', 'Darkness', 0, 0.9, 0.01],
    ['vignetteStrength', 'Vignette', 0, 2, 0.01],
    ['parallaxPx', 'Parallax (px)', 0, 80, 1],
    ['patternSize', 'Pattern size (%)', 100, 500, 5],
  ]
  return createPortal(
    <div className={`hero-tuner${open ? '' : ' hero-tuner--closed'}`}>
      <button
        className="hero-tuner__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Hero tuner"
      >
        {open ? '▾ Hero' : '⚙'}
      </button>
      {open && (
        <div className="hero-tuner__body">
          {rows.map(([k, label, min, max, step]) => (
            <label key={k} className="hero-tuner__row">
              <span className="hero-tuner__label">{label}</span>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={tuning[k]}
                onChange={set(k)}
              />
              <span className="hero-tuner__value">{tuning[k]}</span>
            </label>
          ))}
          <button className="hero-tuner__reset" onClick={onReset}>
            Reset
          </button>
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
    // Light travel: shorter than full hero — feels gentler
    const fromX = 0.5, fromY = 0.72
    const toX = 0.5, toY = 0.28
    const originalPx =
      parseFloat(getComputedStyle(el).getPropertyValue('--parallax-px')) || 28
    // Bg travels further than the live mouse parallax range
    const introParallaxStart = originalPx * 1.5
    const parent = el.closest('.tilt-phone') || el
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
    const setParallax = (px) => {
      if (parallaxEl) {
        parallaxEl.style.transform = `translate3d(0, ${px.toFixed(2)}px, 0)`
      }
    }
    // Read the live mouse-driven parallax value from the parent
    const liveParallaxY = () => {
      const cs = getComputedStyle(parent)
      const my = parseFloat(cs.getPropertyValue('--pointer-from-top')) || 0.5
      return (0.5 - my) * originalPx
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
        const py = introParallaxStart + (liveParallaxY() - introParallaxStart) * e
        setParallax(py)
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
        setParallax(liveParallaxY())
      } else {
        // Done — remove all overrides; CSS rule resumes parallax
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
      <div className="home__hero-vignette" aria-hidden />
      <div className="home__hero-content">
        <div className="home__top-row">
          <button className="home__top-circle" aria-label="Profile">
            <HomeIcon name="user" />
          </button>
          <div className="home__top-actions">
            <button className="home__top-circle" aria-label="Search">
              <HomeIcon name="search" />
            </button>
            <button className="home__pill" aria-label="My banker">
              <HomeIcon name="bubble" size={18} />
              <span>My banker</span>
            </button>
          </div>
        </div>

        <div className="home__balance">
          <div className="home__balance-label">
            <HomeIcon name="eye" size={18} />
            <span>Total balance</span>
          </div>
          <div className="home__balance-amount" aria-label="€4,206,000">
            {Array.from('€4,206,000').map((ch, i) => (
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
        </div>

        <div className="home__cta-row">
          <button className="home__cta">
            <HomeIcon name="arrowUp" />
            <span>Transfer money</span>
          </button>
          <button className="home__cta">
            <HomeIcon name="arrowSwap" />
            <span>Exchange currency</span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Recent transactions block (Figma node 344:2754) ── */

const ACCOUNT_DOT_COLORS = {
  1: '#6897D9', // tension/8
  2: '#BF8A39', // warning/8
  3: '#68A862', // neighbor/8
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
    <section className="home-section">
      <header className="home-section__header">
        <span className="home-section__rule" />
        <h3 className="home-section__title">Recent transactions</h3>
        <span className="home-section__rule" />
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
  { name: 'Auberge du Vent', account: 3, amount: '−€2,300.00' },
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
        <span className="home-section__rule" />
        <h3 className="home-section__title">Special offers for you</h3>
        <span className="home-section__rule" />
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
  home: (
    <path d="M13.555 3.40669C12.6179 2.76418 11.3821 2.76418 10.445 3.40669L4.19496 7.69172C3.44705 8.2045 3 9.05302 3 9.95984V18.2499C3 19.7687 4.23122 20.9999 5.75 20.9999H8.75C9.16421 20.9999 9.5 20.6641 9.5 20.2499V16.7499C9.5 15.3692 10.6193 14.2499 12 14.2499C13.3807 14.2499 14.5 15.3692 14.5 16.7499V20.2499C14.5 20.6641 14.8358 20.9999 15.25 20.9999H18.25C19.7688 20.9999 21 19.7687 21 18.2499V9.95984C21 9.05302 20.553 8.2045 19.805 7.69172L13.555 3.40669Z" />
  ),
  transactions: (
    <>
      <path d="M4 19.25V4.75C4 3.23122 5.23122 2 6.75 2H11.9219C12.6511 2.00007 13.3505 2.29002 13.8662 2.80566L19.1943 8.13379C19.71 8.64946 19.9999 9.3489 20 10.0781V19.25C20 20.7688 18.7688 22 17.25 22H6.75C5.23122 22 4 20.7688 4 19.25ZM5.5 19.25C5.5 19.9404 6.05964 20.5 6.75 20.5H17.25C17.9404 20.5 18.5 19.9404 18.5 19.25V10.0781C18.4999 9.74673 18.3682 9.42869 18.1338 9.19434L12.8057 3.86621C12.5713 3.63183 12.2533 3.50007 11.9219 3.5H6.75C6.05964 3.5 5.5 4.05964 5.5 4.75V19.25Z" />
      <path d="M12 7.25V3.25H13.5V7.25C13.5 7.94036 14.0596 8.5 14.75 8.5H18.75V10H14.75C13.2312 10 12 8.76878 12 7.25Z" />
      <path d="M12.25 12.5C12.6642 12.5 13 12.8358 13 13.25C13 13.6642 12.6642 14 12.25 14H8.75C8.33579 14 8 13.6642 8 13.25C8 12.8358 8.33579 12.5 8.75 12.5H12.25Z" />
      <path d="M15.25 16.5C15.6642 16.5 16 16.8358 16 17.25C16 17.6642 15.6642 18 15.25 18H8.75C8.33579 18 8 17.6642 8 17.25C8 16.8358 8.33579 16.5 8.75 16.5H15.25Z" />
    </>
  ),
  cards: (
    <path d="M20.4961 10.5H3.5V17.2461C3.5 17.9365 4.05964 18.4961 4.75 18.4961H19.2461C19.9365 18.4961 20.4961 17.9365 20.4961 17.2461V10.5ZM9.75 12.5C10.1642 12.5 10.5 12.8358 10.5 13.25C10.5 13.6642 10.1642 14 9.75 14H6.75C6.33579 14 6 13.6642 6 13.25C6 12.8358 6.33579 12.5 6.75 12.5H9.75ZM21.9961 17.2461C21.9961 18.7649 20.7649 19.9961 19.2461 19.9961H4.75C3.23122 19.9961 2 18.7649 2 17.2461V6.75293C2 5.23415 3.23122 4.00293 4.75 4.00293H19.248C20.7632 4.00296 21.9946 5.2291 21.9961 6.74609V17.2461ZM3.5 9H20.4961C20.4961 8.24916 20.4966 7.49864 20.4961 6.74805C20.4955 6.06066 19.9373 5.50296 19.248 5.50293H4.75C4.05964 5.50293 3.5 6.06257 3.5 6.75293V9Z" />
  ),
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

function BottomNav({ activeId = 'home', onChange }) {
  return (
    <nav className="home-nav" role="tablist" aria-label="Primary">
      {NAV_TABS.map((tab) => {
        const active = tab.id === activeId
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
              {NAV_ICONS[tab.id]}
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

export default function HomeScreen({ leatherSrc, foilSrc, edgesSrc }) {
  const [tuning, setTuning] = useState(DEFAULT_TUNING)
  const [tabIndex, setTabIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const handleTabChange = (next) => {
    setDirection(next > tabIndex ? 1 : -1)
    setTabIndex(next)
  }

  const listRefs = [useRef(null), useRef(null)]
  const [stageHeight, setStageHeight] = useState(null)
  useLayoutEffect(() => {
    const node = listRefs[tabIndex].current
    if (!node) return
    const update = () => setStageHeight(node.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(node)
    return () => ro.disconnect()
  }, [tabIndex])
  useEffect(() => {
    // Re-measure once images load (SVGs without intrinsic size before parse).
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
  }, [tabIndex])
  return (
    <div className="home">
      <Hero
        leatherSrc={leatherSrc}
        foilSrc={foilSrc}
        edgesSrc={edgesSrc}
        tuning={tuning}
      />
      <div className="home__body">
        <SegmentedTabs
          tabs={[
            { count: ACCOUNT_CARDS.length, label: 'Accounts' },
            { count: CHARGE_CARDS.length, label: 'Charge cards' },
          ]}
          activeIndex={tabIndex}
          onChange={handleTabChange}
        />
        <div
          className="home__cards-stage"
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
                {set.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="home__cards-card"
                    style={{ '--i': i }}
                  />
                ))}
              </div>
            )
          })}
        </div>
        <RecentTransactions items={RECENT_TRANSACTIONS} />
        <Stories slides={SPECIAL_OFFERS} />
      </div>
      <BottomNav />
      <ControlPanel
        tuning={tuning}
        setTuning={setTuning}
        onReset={() => setTuning(DEFAULT_TUNING)}
      />
    </div>
  )
}
