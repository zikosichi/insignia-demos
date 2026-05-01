import { useState } from 'react'
import { createPortal } from 'react-dom'

import accountBrown from '../../assets/breathe/accounts/main/brown.svg'
import accountGreen from '../../assets/breathe/accounts/main/green.svg'
import accountPink from '../../assets/breathe/accounts/main/pink.svg'
import chargeLightbrown from '../../assets/breathe/accounts/charge/lightbrown.svg'
import chargePink from '../../assets/breathe/accounts/charge/pink.svg'

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
  return (
    <div
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
          <div className="home__balance-amount">€4,206,000</div>
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
          onChange={setTabIndex}
        />
        <div className="home__cards" key={tabIndex}>
          {(tabIndex === 0 ? ACCOUNT_CARDS : CHARGE_CARDS).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="home__cards-card"
              style={{ '--i': i }}
            />
          ))}
        </div>
      </div>
      <ControlPanel
        tuning={tuning}
        setTuning={setTuning}
        onReset={() => setTuning(DEFAULT_TUNING)}
      />
    </div>
  )
}
