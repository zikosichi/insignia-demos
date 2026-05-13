import { useEffect, useRef, useState } from 'react'
import './ExchangeScreen.css'
import PhoneChrome from '../../PhoneChrome'
import bgPatternSvg from '../../assets/breathe/bg-pattern.svg'
import bgPatternFoilSvg from '../../assets/breathe/bg-pattern-foil.svg'
import iconBubbleAnnotation from '../../assets/breathe/IconBubbleAnnotation5.svg'

function Icon({ children, size = 24, stroke = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  )
}

const ChevronLeft = (p) => <Icon {...p}><path d="m15 6-6 6 6 6" /></Icon>
const ChevronDown = (p) => <Icon {...p}><path d="m6 9 6 6 6-6" /></Icon>
const InfoCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8h.01M11 12h1v5h1" />
  </Icon>
)
const SwapVertical = (p) => (
  <Icon {...p}>
    <path d="M8 3v18" />
    <path d="m4 7 4-4 4 4" />
    <path d="M16 21V3" />
    <path d="m12 17 4 4 4-4" />
  </Icon>
)

function FlagEU({ size = 20 }) {
  const stars = []
  for (let i = 0; i < 12; i += 1) {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
    const x = 12 + Math.cos(angle) * 7
    const y = 12 + Math.sin(angle) * 7
    stars.push(<circle key={i} cx={x} cy={y} r="0.9" fill="#FFCC00" />)
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#003399" />
      {stars}
    </svg>
  )
}

function FlagUS({ size = 20 }) {
  const stripeH = 24 / 13
  const stripes = []
  for (let i = 0; i < 13; i += 1) {
    stripes.push(
      <rect
        key={i}
        x="0"
        y={i * stripeH}
        width="24"
        height={stripeH + 0.2}
        fill={i % 2 === 0 ? '#BF0A30' : '#FFFFFF'}
      />,
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <clipPath id="flag-us-clip"><circle cx="12" cy="12" r="12" /></clipPath>
      </defs>
      <g clipPath="url(#flag-us-clip)">
        {stripes}
        <rect x="0" y="0" width="11" height={stripeH * 7} fill="#002868" />
        {[...Array(6)].map((_, i) => (
          <circle key={i} cx={1.6 + (i % 3) * 3} cy={1.5 + Math.floor(i / 3) * 3} r="0.5" fill="#FFFFFF" />
        ))}
      </g>
    </svg>
  )
}

const REEL_CYCLES = 3
const REEL_DIGITS = Array.from({ length: REEL_CYCLES * 10 }, (_, i) => i % 10)

function RollingDigit({ digit, delay }) {
  return (
    <span className="rolling-digit" aria-hidden>
      <span
        className="rolling-digit__reel"
        style={{ '--target': digit, '--delay': `${delay}ms` }}
      >
        {REEL_DIGITS.map((n, i) => (
          <span key={i} className="rolling-digit__cell">{n}</span>
        ))}
      </span>
    </span>
  )
}

function RollingNumber({ value, label }) {
  const chars = String(value).split('')
  let digitIdx = 0
  return (
    <span className="rolling-number" aria-label={label || value}>
      {chars.map((c, i) => {
        if (/\d/.test(c)) {
          const d = Number(c)
          const delay = 260 + digitIdx * 80
          digitIdx += 1
          return <RollingDigit key={`${i}-${c}`} digit={d} delay={delay} />
        }
        return (
          <span key={`${i}-${c}`} className="rolling-number__static" aria-hidden>
            {c}
          </span>
        )
      })}
    </span>
  )
}

function PickerRow({ label, dotColor, accountName, flag, amount }) {
  return (
    <button type="button" className="exchange-picker">
      <span className="exchange-picker__left">
        <span className="exchange-picker__label">{label}</span>
        <span className="exchange-picker__name-row">
          <span className="exchange-picker__dot" style={{ background: dotColor }} aria-hidden />
          <span className="exchange-picker__account">{accountName}</span>
        </span>
      </span>
      <span className="exchange-picker__right">
        <span className="exchange-picker__flag" aria-hidden>{flag}</span>
        <span className="exchange-picker__amount">{amount}</span>
      </span>
      <span className="exchange-picker__chevron" aria-hidden>
        <ChevronDown size={24} stroke="#403535" strokeWidth={1.6} />
      </span>
    </button>
  )
}

const QUICK_AMOUNTS = ['100', '500', '1,000', '10,000', 'Max']
const MAX_AMOUNT = '14000'
const RATE = 1.17 // USD per EUR

const parseAmount = (str) => {
  const n = parseFloat(String(str).replace(/,/g, ''))
  return Number.isFinite(n) ? n : null
}

const formatAmount = (n) =>
  n.toLocaleString('en-US', { maximumFractionDigits: 2 })

export default function ExchangeScreen({ onClose }) {
  const sellRef = useRef(null)
  const buyRef = useRef(null)
  const barRef = useRef(null)
  const [sellValue, setSellValue] = useState('')
  const [buyValue, setBuyValue] = useState('')
  const [focused, setFocused] = useState(null) // 'sell' | 'buy' | null
  const [kbOffset, setKbOffset] = useState(0)
  const [barHeight, setBarHeight] = useState(60)

  useEffect(() => {
    if (!barRef.current || typeof ResizeObserver === 'undefined') return
    const el = barRef.current
    const ro = new ResizeObserver(() => setBarHeight(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const vv = typeof window !== 'undefined' ? window.visualViewport : null
    if (!vv) return
    const update = () => {
      const offset = Math.max(
        0,
        window.innerHeight - vv.height - vv.offsetTop,
      )
      setKbOffset(offset)
    }
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)
    update()
    return () => {
      vv.removeEventListener('resize', update)
      vv.removeEventListener('scroll', update)
    }
  }, [])

  const setSellFromUser = (raw) => {
    setSellValue(raw)
    const n = parseAmount(raw)
    setBuyValue(n === null ? '' : formatAmount(n * RATE))
  }

  const setBuyFromUser = (raw) => {
    setBuyValue(raw)
    const n = parseAmount(raw)
    setSellValue(n === null ? '' : formatAmount(n / RATE))
  }

  const applyAmount = (chip) => {
    const value = chip === 'Max' ? MAX_AMOUNT : chip.replace(/,/g, '')
    const n = parseAmount(value)
    if (focused === 'sell') {
      setSellValue(n === null ? value : formatAmount(n))
      setBuyValue(n === null ? '' : formatAmount(n * RATE))
    } else if (focused === 'buy') {
      setBuyValue(n === null ? value : formatAmount(n))
      setSellValue(n === null ? '' : formatAmount(n / RATE))
    }
    // Keep focus on the input so the keyboard stays open.
    const ref = focused === 'sell' ? sellRef : buyRef
    ref.current?.focus()
  }

  const showSuggestions = focused !== null

  return (
    <div
      className={`exchange${showSuggestions ? ' exchange--focused' : ''}`}
      style={{
        '--kb-offset': `${kbOffset}px`,
        '--chip-bar-h': `${barHeight}px`,
      }}
    >
      <PhoneChrome tone="light" />
      <section
        className="home__hero exchange-hero"
        style={{
          '--hero-foil': `url(${bgPatternFoilSvg})`,
          '--hero-edges': `url(${bgPatternFoilSvg})`,
          '--pattern-size': '450%',
          '--shine-mult': 0.13,
          '--edge-mult': 0,
          '--glare-mult': 0,
          '--facet-pop': 1.45,
          '--darkness': 0,
          '--vignette-strength': 0.22,
          '--parallax-px': '4px',
        }}
      >
        <div className="home__hero-parallax">
          <div
            className="home__hero-bg"
            style={{ backgroundImage: `url(${bgPatternSvg})` }}
            aria-hidden
          />
        </div>
        <div className="home__hero-content exchange-hero__content">
          <div className="home__top-row">
            <button
              type="button"
              className="exchange-hero__lead"
              onClick={onClose}
              aria-label="Back"
            >
              <span className="home__top-circle" aria-hidden>
                <ChevronLeft size={20} stroke="#F5F0ED" strokeWidth={1.6} />
              </span>
              <span className="exchange-hero__title">Exchange currency</span>
            </button>
            <div className="home__top-actions">
              <button className="home__pill" type="button" aria-label="Help">
                <img className="home__top-icon" src={iconBubbleAnnotation} alt="" />
                <span>Help</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="exchange__body">
        <section className="exchange__section">
          <h2 className="exchange__section-title">Exchange between</h2>
          <div className="exchange__pickers">
            <PickerRow
              label="From"
              dotColor="#2f6dc2"
              accountName="Account 1"
              flag={<FlagEU size={20} />}
              amount="€14,000"
            />
            <span className="exchange__swap" aria-hidden>
              <SwapVertical size={24} stroke="#403535" strokeWidth={1.6} />
            </span>
            <PickerRow
              label="To"
              dotColor="#956300"
              accountName="Account 2"
              flag={<FlagUS size={20} />}
              amount="$12,000"
            />
          </div>
        </section>

        <section className="exchange__section">
          <h2 className="exchange__section-title">Rate and amount</h2>
          <div className="exchange__rate">
            <input
              ref={sellRef}
              type="text"
              inputMode="decimal"
              className="exchange-input"
              placeholder="Sell"
              aria-label="Sell amount"
              value={sellValue}
              onChange={(e) => setSellFromUser(e.target.value)}
              onFocus={(e) => {
                setFocused('sell')
                const el = e.currentTarget
                window.setTimeout(
                  () => el.scrollIntoView({ behavior: 'smooth', block: 'center' }),
                  280,
                )
              }}
              onBlur={() => setFocused((f) => (f === 'sell' ? null : f))}
            />
            <input
              ref={buyRef}
              type="text"
              inputMode="decimal"
              className="exchange-input"
              placeholder="Buy"
              aria-label="Buy amount"
              value={buyValue}
              onChange={(e) => setBuyFromUser(e.target.value)}
              onFocus={(e) => {
                setFocused('buy')
                const el = e.currentTarget
                window.setTimeout(
                  () => el.scrollIntoView({ behavior: 'smooth', block: 'center' }),
                  280,
                )
              }}
              onBlur={() => setFocused((f) => (f === 'buy' ? null : f))}
            />
          </div>
          <p className="exchange__rate-note">
            <InfoCircle size={24} stroke="#403535" strokeWidth={1.6} />
            <span>
              Applicable exchange rate ·{' '}
              <span className="exchange__rate-value">
                €<RollingNumber value="1" label="1" /> ={' '}
                $<RollingNumber value="1.17" label="1.17" />
              </span>
            </span>
          </p>
        </section>
      </div>

      <div className="exchange__footer">
        <button type="button" className="exchange__continue">Continue</button>
      </div>

      <div
        ref={barRef}
        className={`exchange__suggestions${showSuggestions ? ' exchange__suggestions--visible' : ''}`}
        aria-hidden={!showSuggestions}
      >
        {QUICK_AMOUNTS.map((chip) => (
          <button
            key={chip}
            type="button"
            className="exchange-chip"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyAmount(chip)}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  )
}
