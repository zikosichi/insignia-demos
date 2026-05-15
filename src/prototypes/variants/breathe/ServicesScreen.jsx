import { useEffect, useRef, useState } from 'react'

import bgPatternSvg from '../../assets/breathe/bg-pattern.svg'
import bgPatternFoilSvg from '../../assets/breathe/bg-pattern-foil.svg'
import iconPeopleCircle from '../../assets/breathe/IconPeopleCircle.svg'
import iconMagnifyingGlass from '../../assets/breathe/IconMagnifyingGlass.svg'
import iconBubbleAnnotation from '../../assets/breathe/IconBubbleAnnotation5.svg'
import searchBarIcon from '../../assets/breathe/transactions/IconMagnifyingGlass.svg'
import offerAubergeVideo from '../../assets/breathe/offers/auberge-du-vent.mp4'
import offerSkydivingVideo from '../../assets/breathe/offers/skydiving.webm'
import wine1 from '../../assets/breathe/services/wine-1.png'
import wine2 from '../../assets/breathe/services/wine-2.png'
import rolandGarros from '../../assets/breathe/services/roland-garros.png'
import f1Img from '../../assets/breathe/services/f1.png'
import svanetiImg from '../../assets/breathe/services/svaneti.png'
import uchikoImg from '../../assets/breathe/services/uchiko.png'
import netjetsImg from '../../assets/breathe/services/netjets.png'
import iroriImg from '../../assets/breathe/services/irori.png'
import georgeLaurent from '../../assets/breathe/services/george-laurent.png'
import prefsThumbTennis from '../../assets/breathe/preferences/thumb-tennis.png'
import prefsThumbFood from '../../assets/breathe/preferences/thumb-food.png'
import prefsThumbBoat from '../../assets/breathe/preferences/thumb-boat.png'
import iconGrid from '../../assets/breathe/services/IconSquareGridCircle.svg'
import iconBed from '../../assets/breathe/services/IconBed.svg'
import iconForkKnife from '../../assets/breathe/services/IconForkKnife.svg'
import iconAirplane from '../../assets/breathe/services/IconAirplane.svg'
import iconBasket from '../../assets/breathe/services/IconBasket1.svg'

/* ────────────────────────────────────────────────────────────
   Inline icon set (Figma node 1555:19665).
   Switch to file imports once the assets are exported.
   ──────────────────────────────────────────────────────────── */

function IconClock(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 4.75V8l2.25 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconMapPin(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M8 14s4.5-4.21 4.5-7.5a4.5 4.5 0 1 0-9 0C3.5 9.79 8 14 8 14Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6.5" r="1.6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function IconArrowRight(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconGrid(props) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17" cy="17" r="3.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function IconBed(props) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M3 18V7M21 18v-5a3 3 0 0 0-3-3H10v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3 13h18M3 18h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="6.5" cy="10.5" r="1.75" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function IconForkKnife(props) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M7 3v8a2 2 0 0 0 4 0V3M9 11v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M17 3c-2 0-3 2-3 5s1 4 3 4v9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconAirplane(props) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M3.5 13.5 21 8l-2 3.5-7 1.5-2.5 5L8 17l-.5-2.5L5 14l-1.5-.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconBasket(props) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="m8 9 4-5 4 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M3.5 9.5h17l-1.4 9.13A2 2 0 0 1 17.12 20.5H6.88a2 2 0 0 1-1.98-1.87L3.5 9.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M9.5 13.5v3M14.5 13.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/* ────────────────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────────────────── */

const FEATURED_OFFERS = [
  {
    id: 'auberge',
    video: offerAubergeVideo,
    title: 'Auberge du Vent',
    description:
      "Private chef's table with a bespoke Michelin menu in Biarritz. Reserved on request.",
    loop: true,
    duration: 8000,
  },
  {
    id: 'skydiving',
    video: offerSkydivingVideo,
    title: 'Tandem skydive over the Alps',
    description:
      'Sunrise jump above Mont Blanc with a private guide and chase film. Booked through your concierge.',
    loop: true,
    duration: 14900,
  },
  { id: 'offer-3', title: 'Slide 3', description: 'Description coming soon.' },
  { id: 'offer-4', title: 'Slide 4', description: 'Description coming soon.' },
  { id: 'offer-5', title: 'Slide 5', description: 'Description coming soon.' },
]

const UPCOMING_EVENTS = [
  {
    day: '12',
    month: 'Apr',
    title: 'Sip & Savor — wine tasting',
    time: '17:00',
    place: 'Maple Avenue 42',
  },
  {
    day: '24',
    month: 'Apr',
    title: 'Culinary Heights',
    time: '10:00',
    place: 'Cedar Lane 78',
  },
]

const WINE_OFFERS = [
  {
    id: 'wine-batch-1',
    brand: 'Batch',
    badge: 'Valid until 5 May',
    body:
      'Charming wine bar that invites you to indulge in a carefully curated selection of exquisite wines sourced from renowned vineyards.',
    image: wine1,
    initials: 'B',
  },
  {
    id: 'wine-batch-2',
    brand: 'Batch',
    badge: 'Valid until 5 May',
    body:
      'A refined cellar of small-batch vintages, presented by sommeliers who know every estate in person.',
    image: wine2,
    initials: 'B',
  },
  {
    id: 'wine-batch-3',
    brand: 'Batch',
    badge: 'Valid until 5 May',
    body:
      'Reserved tables overlooking the cellar — a quiet evening of tastings paired with seasonal plates.',
    image: wine1,
    initials: 'B',
  },
]

const WEEK_OFFERS = [
  {
    id: 'week-batch',
    brand: 'Batch',
    badge: '10 April',
    body:
      'Charming wine bar that invites you to indulge in a carefully curated selection of exquisite wines.',
    image: wine2,
    initials: 'B',
  },
  {
    id: 'week-rg-1',
    brand: 'Roland Garros',
    badge: '12 April',
    body:
      "Where the world's best tennis players compete on the iconic clay courts of Paris. A prestigious event held annually.",
    image: rolandGarros,
    initials: 'RG',
  },
  {
    id: 'week-rg-2',
    brand: 'Roland Garros',
    badge: '12 April',
    body:
      'Centre-court access with hospitality lounge for the marquee weekend matches.',
    image: rolandGarros,
    initials: 'RG',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All', icon: iconGrid },
  { id: 'hotels', label: 'Hotels', icon: iconBed },
  { id: 'dining', label: 'Dining', icon: iconForkKnife },
  { id: 'travel', label: 'Travel', icon: iconAirplane },
  { id: 'shopping', label: 'Shopping', icon: iconBasket },
]

const OTHER_OFFERS = [
  {
    id: 'f1',
    brand: 'FIA Formula 1 world championship',
    badge: 'Valid until 5 May',
    body:
      'Reserved paddock access across the European leg — pit-lane walkthroughs and team garage briefings included.',
    image: f1Img,
    initials: 'F1',
  },
  {
    id: 'svaneti',
    brand: 'Svaneti Heliskiing',
    badge: 'Valid until 5 May',
    body:
      'Heliskiing across the untouched peaks of Svaneti. Private guide, lodge stay, and gear arranged on request.',
    image: svanetiImg,
    initials: 'SV',
  },
  {
    id: 'uchiko',
    brand: 'Uchiko Houston',
    badge: 'Valid until 5 May',
    body:
      'Chef’s counter at Uchiko — a contemporary take on Japanese farmhouse dining, reservation by introduction.',
    image: uchikoImg,
    initials: 'UC',
  },
  {
    id: 'netjets',
    brand: 'NetJets',
    badge: 'Valid until 5 May',
    body:
      'Private jet travel with NetJets. Member rates and on-demand routing through your concierge.',
    image: netjetsImg,
    initials: 'NJ',
  },
  {
    id: 'irori',
    brand: 'Irori',
    badge: 'Valid until 5 May',
    body:
      'A hidden hearth-side counter tucked into the mountains. A reservation-only winter retreat.',
    image: iroriImg,
    initials: 'IR',
  },
]

/* ────────────────────────────────────────────────────────────
   Components
   ──────────────────────────────────────────────────────────── */

const FEATURED_DURATION = 6000

function FeaturedOffer({ slides, duration = FEATURED_DURATION }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
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

  useEffect(() => {
    if (slides.length <= 1) return
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
          elapsedBefore.current = 0
          startedAt.current = performance.now()
          setProgress(0)
          rafRef.current = requestAnimationFrame(tick)
          return
        }
        setIndex((i) => (i + 1) % slides.length)
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paused, index, slideDuration, slides.length])

  if (!slide) return null

  return (
    <section
      className="services-featured"
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerLeave={() => setPaused(false)}
      onPointerCancel={() => setPaused(false)}
    >
      <div className="services-featured__media">
        {slide.video ? (
          <video
            key={slide.video}
            className="services-featured__media-el"
            src={slide.video}
            autoPlay
            muted
            playsInline
            loop
          />
        ) : slide.image ? (
          <img key={slide.image} className="services-featured__media-el" src={slide.image} alt="" />
        ) : (
          <div className="services-featured__media-el services-featured__media-el--placeholder" aria-hidden />
        )}
      </div>

      {slides.length > 1 && (
        <>
          <div className="services-featured__progress" aria-hidden>
            {slides.map((_, i) => (
              <div key={i} className="services-featured__progress-seg">
                <div
                  className="services-featured__progress-fill"
                  style={{
                    transform: `scaleX(${i < index ? 1 : i === index ? progress : 0})`,
                  }}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="services-featured__nav services-featured__nav--prev"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            aria-label="Previous"
          />
          <button
            type="button"
            className="services-featured__nav services-featured__nav--next"
            onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
            aria-label="Next"
          />
        </>
      )}

      <div className="services-featured__panel">
        <p className="services-featured__title">{slide.title}</p>
        <p className="services-featured__desc">{slide.description}</p>
        <button type="button" className="services-featured__cta">
          <span>View offer</span>
          <IconArrowRight />
        </button>
      </div>
    </section>
  )
}

function ServicesTopBar() {
  return (
    <div className="transactions-topbar">
      <button className="home__top-circle" aria-label="Profile" type="button">
        <img className="home__top-icon" src={iconPeopleCircle} alt="" />
      </button>
      <div className="home__top-actions">
        <button className="home__top-circle" aria-label="Search" type="button">
          <img className="home__top-icon" src={iconMagnifyingGlass} alt="" />
        </button>
        <button className="home__pill" aria-label="Help" type="button">
          <img className="home__top-icon" src={iconBubbleAnnotation} alt="" />
          <span>Help</span>
        </button>
      </div>
    </div>
  )
}

function EventCard({ event, index }) {
  return (
    <article className="services-event" style={{ '--row-index': index }}>
      <div className="services-event__date" aria-hidden>
        <span className="services-event__date-month">{event.month}</span>
        <span className="services-event__date-day">{event.day}</span>
      </div>
      <div className="services-event__body">
        <p className="services-event__title">{event.title}</p>
        <div className="services-event__meta">
          <span className="services-event__meta-item">
            <IconClock />
            <span>{event.time}</span>
          </span>
          <span className="services-event__meta-item">
            <IconMapPin />
            <span>{event.place}</span>
          </span>
        </div>
      </div>
    </article>
  )
}

function OfferCard({ offer }) {
  return (
    <article className="services-offer">
      <div
        className="services-offer__media"
        style={offer.image ? { backgroundImage: `url(${offer.image})` } : undefined}
      >
        <span className="services-offer__badge">{offer.badge}</span>
        <span className="services-offer__brand">
          <span className="services-offer__brand-avatar" aria-hidden>
            {offer.initials}
          </span>
          <span className="services-offer__brand-name">{offer.brand}</span>
        </span>
      </div>
      <p className="services-offer__body">{offer.body}</p>
    </article>
  )
}

function OfferCarousel({ title, offers, sectionIndex }) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef(null)

  const onScroll = () => {
    const node = trackRef.current
    if (!node) return
    const childWidth = node.firstElementChild?.offsetWidth ?? 1
    const gap = 16
    const i = Math.round(node.scrollLeft / (childWidth + gap))
    if (i !== index) setIndex(i)
  }

  return (
    <section className="services-section" style={{ '--section-index': sectionIndex }}>
      <h2 className="services-section__title">{title}</h2>
      <div
        ref={trackRef}
        className="services-carousel"
        onScroll={onScroll}
        role="region"
        aria-label={title}
      >
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
      <div className="services-pager" role="tablist" aria-label={`${title} pages`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`services-pager__dot${i === Math.min(index, 4) ? ' services-pager__dot--active' : ''}`}
            aria-hidden
          />
        ))}
      </div>
    </section>
  )
}

function ConciergeCard({ sectionIndex }) {
  return (
    <section className="services-concierge" style={{ '--section-index': sectionIndex }}>
      <h3 className="services-concierge__title">Anything can be arranged</h3>
      <p className="services-concierge__sub">
        For reservations, introductions, or requests of any kind, George is available.
      </p>
      <div className="services-concierge__row">
        <span className="services-concierge__avatar" aria-hidden>
          <img src={georgeLaurent} alt="" />
        </span>
        <span className="services-concierge__person">
          <span className="services-concierge__name">George Laurent</span>
          <span className="services-concierge__status">
            <span className="services-concierge__dot" aria-hidden />
            Available now
          </span>
        </span>
        <button type="button" className="services-concierge__cta">Contact</button>
      </div>
    </section>
  )
}

function OtherOffers({ sectionIndex }) {
  const [active, setActive] = useState('all')
  return (
    <section className="services-section services-other" style={{ '--section-index': sectionIndex }}>
      <h2 className="services-section__title">Other offers</h2>
      <div className="services-chips" role="tablist" aria-label="Categories">
        {CATEGORIES.map(({ id, label, icon }) => {
          const selected = active === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`services-chip${selected ? ' services-chip--active' : ''}`}
              onClick={() => setActive(id)}
            >
              <img className="services-chip__icon" src={icon} alt="" aria-hidden />
              <span>{label}</span>
            </button>
          )
        })}
      </div>
      <label className="services-search">
        <img src={searchBarIcon} alt="" aria-hidden />
        <input type="search" placeholder="Search offers" aria-label="Search offers" />
      </label>
      <ul className="services-other__list">
        {OTHER_OFFERS.map((offer, i) => (
          <li key={offer.id} className="services-other__item" style={{ '--row-index': i }}>
            <OfferCard offer={offer} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function promptHaptic(ms = 8) {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms)
  } catch (_) {}
}

function PreferencesPrompt({ onShare, onDismiss }) {
  return (
    <section className="services-prefs-prompt" role="region" aria-label="Share your preferences">
      <button
        type="button"
        className="services-prefs-prompt__close"
        onClick={() => { promptHaptic(6); onDismiss?.() }}
        aria-label="Dismiss"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 6l12 12M18 6 6 18" stroke="#403535" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <div className="services-prefs-prompt__thumbs" aria-hidden>
        <span className="services-prefs-prompt__thumb services-prefs-prompt__thumb--left">
          <img src={prefsThumbTennis} alt="" />
        </span>
        <span className="services-prefs-prompt__thumb services-prefs-prompt__thumb--center">
          <img src={prefsThumbFood} alt="" />
        </span>
        <span className="services-prefs-prompt__thumb services-prefs-prompt__thumb--right">
          <img src={prefsThumbBoat} alt="" />
        </span>
      </div>
      <p className="services-prefs-prompt__title">Shape what we show you</p>
      <p className="services-prefs-prompt__sub">
        Answer a few questions and we'll curate what you actually care about.
      </p>
      <button
        type="button"
        className="services-prefs-prompt__cta"
        onClick={() => { promptHaptic(10); onShare?.() }}
      >
        Share Your Preferences
      </button>
    </section>
  )
}

export default function ServicesScreen({
  showPreferencesCard = true,
  onSharePreferences,
  onDismissPreferences,
}) {
  return (
    <div className="services-page">
      <section
        className="home__hero services-hero"
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
        <div className="home__hero-content services-hero__content">
          <ServicesTopBar />
        </div>
      </section>

      <main className="services-body">
        <div className="services-stack">
          {showPreferencesCard && (
            <div className="services-reveal" style={{ '--section-index': 0 }}>
              <PreferencesPrompt onShare={onSharePreferences} onDismiss={onDismissPreferences} />
            </div>
          )}
          <div className="services-reveal" style={{ '--section-index': 0 }}>
            <FeaturedOffer slides={FEATURED_OFFERS} />
          </div>

          <section className="services-section" style={{ '--section-index': 1 }}>
            <h2 className="services-section__title">Upcoming events</h2>
            <div className="services-events">
              {UPCOMING_EVENTS.map((event, i) => (
                <EventCard key={event.title} event={event} index={i} />
              ))}
            </div>
          </section>

          <div className="services-reveal" style={{ '--section-index': 2 }}>
            <OfferCarousel title="Because you enjoy wine" offers={WINE_OFFERS} sectionIndex={2} />
          </div>

          <div className="services-reveal" style={{ '--section-index': 3 }}>
            <OfferCarousel title="This week" offers={WEEK_OFFERS} sectionIndex={3} />
          </div>

          <div className="services-reveal" style={{ '--section-index': 4 }}>
            <ConciergeCard sectionIndex={4} />
          </div>

          <div className="services-reveal" style={{ '--section-index': 5 }}>
            <OtherOffers sectionIndex={5} />
          </div>
        </div>
      </main>
    </div>
  )
}
