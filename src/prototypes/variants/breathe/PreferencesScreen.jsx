import { useState } from 'react'
import './PreferencesScreen.css'
import PhoneChrome from '../../PhoneChrome'
import bgPatternSvg from '../../assets/breathe/bg-pattern.svg'
import bgPatternFoilSvg from '../../assets/breathe/bg-pattern-foil.svg'
import iconBubbleAnnotation from '../../assets/breathe/IconBubbleAnnotation5.svg'
import fineDining from '../../assets/breathe/preferences/fine-dining.png'
import wineSpirits from '../../assets/breathe/preferences/wine-spirits.png'
import fashion from '../../assets/breathe/preferences/fashion.png'
import automotive from '../../assets/breathe/preferences/automotive.png'
import travel from '../../assets/breathe/preferences/travel.png'
import artCollecting from '../../assets/breathe/preferences/art-collecting.png'
import watches from '../../assets/breathe/preferences/watches.png'
import yachting from '../../assets/breathe/preferences/yachting.png'

const CATEGORIES = [
  { id: 'fine-dining',  label: 'Fine dining',         image: fineDining },
  { id: 'travel',       label: 'Travel',              image: travel },
  { id: 'wine',         label: 'Wine & spirits',      image: wineSpirits },
  { id: 'art',          label: 'Art & collecting',    image: artCollecting },
  { id: 'fashion',      label: 'Fashion',             image: fashion },
  { id: 'watches',      label: 'Watches & jewellery', image: watches },
  { id: 'automotive',   label: 'Automotive',          image: automotive },
  { id: 'yachting',     label: 'Yachting & sailing',  image: yachting },
]

function ChevronLeft(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CrossLarge(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function haptic(ms = 8) {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms)
  } catch (_) {}
}

export default function PreferencesScreen({ onClose, onComplete }) {
  const [selected, setSelected] = useState(() => new Set())
  const canContinue = selected.size > 0

  const toggle = (id) => {
    haptic(10)
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleContinue = () => {
    if (!canContinue) return
    haptic([12, 40, 18])
    onComplete?.()
  }

  return (
    <div className="prefs">
      <PhoneChrome tone="light" />
      <section
        className="home__hero prefs-hero"
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
        <div className="home__hero-content prefs-hero__content">
          <div className="home__top-row">
            <button
              type="button"
              className="prefs-hero__lead"
              onClick={onClose}
              aria-label="Back"
            >
              <span className="home__top-circle" aria-hidden>
                <ChevronLeft style={{ color: '#F5F0ED' }} />
              </span>
              <span className="prefs-hero__title">Tailored offers</span>
            </button>
            <div className="home__top-actions">
              <button className="home__pill" type="button" aria-label="Help">
                <img className="home__top-icon" src={iconBubbleAnnotation} alt="" />
                <span>Help</span>
              </button>
              <button
                type="button"
                className="home__pill prefs-hero__close"
                onClick={onComplete}
                aria-label="Close"
              >
                <CrossLarge style={{ color: '#F5F0ED' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className={`prefs__body${selected.size > 0 ? ' prefs__body--has-selection' : ''}`}>
        <h2 className="prefs__title">What do you love?</h2>
        <div className="prefs__grid">
          {CATEGORIES.map((cat) => {
            const isOn = selected.has(cat.id)
            return (
              <button
                key={cat.id}
                type="button"
                className={`prefs-tile${isOn ? ' prefs-tile--on' : ''}`}
                onClick={() => toggle(cat.id)}
                aria-pressed={isOn}
              >
                <img className="prefs-tile__img" src={cat.image} alt="" />
                <span className={`prefs-tile__check${isOn ? ' prefs-tile__check--on' : ''}`} aria-hidden>
                  {isOn && <CheckIcon style={{ color: '#403535' }} />}
                </span>
                <span className="prefs-tile__label">{cat.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="prefs__footer">
        <button
          type="button"
          className="prefs__cta"
          onClick={handleContinue}
          disabled={!canContinue}
          aria-disabled={!canContinue}
        >
          {canContinue ? `Continue · ${selected.size}` : 'Select at least one'}
        </button>
      </div>
    </div>
  )
}
