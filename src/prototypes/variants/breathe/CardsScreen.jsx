import { useMemo, useRef, useState } from 'react'
import Card3D from '../../../components/Card3D'
import { ControlPanel, DEFAULT_TUNING } from './HomeScreen'
import bgPatternSvg from '../../assets/breathe/bg-pattern.svg'
import bgPatternFoilSvg from '../../assets/breathe/bg-pattern-foil.svg'
import iconPeopleCircle from '../../assets/breathe/IconPeopleCircle.svg'
import iconMagnifyingGlass from '../../assets/breathe/IconMagnifyingGlass.svg'
import iconBubbleAnnotation from '../../assets/breathe/IconBubbleAnnotation5.svg'
import iconEyeOpen from '../../assets/breathe/IconEyeOpen.svg'
import iconSnowFlakes from '../../assets/breathe/IconSnowFlakes.svg'
import iconSettingsGear from '../../assets/breathe/IconSettingsGear2.svg'
import appleWalletCardIcon from '../../assets/breathe/apple-wallet-card-icon.png'
import personalMcFront from '../../../assets/cards/personal-mastercard/front.png'
import personalMcFoil from '../../../assets/cards/personal-mastercard/foil.png'
import personalMcBack from '../../../assets/cards/personal-mastercard/back.png'
import personalMcBackFoil from '../../../assets/cards/personal-mastercard/back-foil.png'
import personalVisaFront from '../../../assets/cards/personal-visa/front.png'
import personalVisaFoil from '../../../assets/cards/personal-visa/foil.png'
import personalVisaBack from '../../../assets/cards/personal-visa/back.png'
import personalVisaBackFoil from '../../../assets/cards/personal-visa/back-foil.png'

const CARDS_DEFAULT_TUNING = {
  ...DEFAULT_TUNING,
  shineMult: 0.13,
  edgeMult: 0,
  glareMult: 0,
  facetPop: 1.45,
  darkness: 0,
  vignetteStrength: 0.22,
  patternSize: 450,
  parallaxPx: 4,
  cardDriftX: 10,
  cardDriftY: 7,
  cardShadow: 0.35,
  cardShadowBlur: 24,
  cardShadowY: 12,
  cardShadowX: 0.55,
  cardShadowOpacity: 0.23,
}

const CARD_EXTRA_CONTROL_SECTIONS = [
  {
    title: 'Card lift',
    rows: [
      ['cardDriftX', 'Move X', 0, 28, 1, 'px'],
      ['cardDriftY', 'Move Y', 0, 28, 1, 'px'],
      ['cardShadow', 'Shadow', 0, 2, 0.05],
      ['cardShadowBlur', 'Shadow blur', 0, 56, 1, 'px'],
      ['cardShadowY', 'Shadow Y', 0, 32, 1, 'px'],
      ['cardShadowX', 'Shadow X', 0, 1.5, 0.05],
      ['cardShadowOpacity', 'Opacity', 0, 0.8, 0.01],
    ],
  },
]

const CARD_TABS = [
  { count: 4, label: 'Debit cards' },
  { count: 2, label: 'Charge cards' },
]

const CARD_GROUPS = [
  [
    { id: 'debit-personal-mc-1', label: 'Personal Mastercard', name: 'Daily spending', tier: 'Personal', number: '5319 1184 7630 5805', expires: '12/30', holder: 'Z. Sichinava', cvv: '298', card: personalMcFront, foil: personalMcFoil, back: personalMcBack, backFoil: personalMcBackFoil },
    { id: 'debit-personal-mc-2', label: 'Personal Mastercard', name: 'Travel', tier: 'Personal', number: '5319 2746 1093 8821', expires: '04/31', holder: 'Z. Sichinava', cvv: '412', card: personalMcFront, foil: personalMcFoil, back: personalMcBack, backFoil: personalMcBackFoil },
    { id: 'debit-personal-mc-3', label: 'Personal Mastercard', name: 'Online shopping', tier: 'Personal', number: '5319 8054 3327 6190', expires: '09/31', holder: 'Z. Sichinava', cvv: '857', card: personalMcFront, foil: personalMcFoil, back: personalMcBack, backFoil: personalMcBackFoil },
  ],
  [
    { id: 'charge-personal-visa-1', label: 'Personal Visa charge', name: 'Business', tier: 'Personal Charge', number: '4929 1108 8402 7316', expires: '08/30', holder: 'Z. Sichinava', cvv: '734', card: personalVisaFront, foil: personalVisaFoil, back: personalVisaBack, backFoil: personalVisaBackFoil },
    { id: 'charge-personal-visa-2', label: 'Personal Visa charge', name: 'Family', tier: 'Personal Charge', number: '4929 5572 0918 4463', expires: '02/31', holder: 'Z. Sichinava', cvv: '519', card: personalVisaFront, foil: personalVisaFoil, back: personalVisaBack, backFoil: personalVisaBackFoil },
  ],
]

const CARD_ACTIONS = [
  {
    label: 'Card details',
    icon: iconEyeOpen,
  },
  {
    label: 'Freeze',
    icon: iconSnowFlakes,
  },
  {
    label: 'Settings',
    icon: iconSettingsGear,
  },
]

const CARD_TRANSACTIONS = [
  { name: 'Palais de Lumière', account: 'Account 2', amount: '-€23,750.', cents: '49', color: '#d9ad9c' },
  { name: 'Apple Store', account: 'Account 1', amount: '-€450.', cents: '00', color: '#beb3cd' },
  { name: "Château de l'Étoile", account: 'Account 2', amount: '-€15,600.', cents: '67', color: '#d9ad9c' },
  { name: 'Auberge du Vent', account: 'Account 1', amount: '-€2,300.', cents: '00', color: '#beb3cd' },
]

function CardsSegmentedTabs({ activeIndex, onChange }) {
  return (
    <div
      className="home-tabs cards-tabs"
      role="tablist"
      style={{ '--active': activeIndex, '--count': CARD_TABS.length }}
    >
      <span className="home-tabs__indicator" aria-hidden />
      {CARD_TABS.map((tab, i) => {
        const active = activeIndex === i
        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={active}
            className={`home-tabs__item${active ? ' home-tabs__item--active' : ''}`}
            onClick={() => onChange(i)}
          >
            <span className="home-tabs__count">{tab.count}</span>
            <span className="home-tabs__label">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function CardAction({ action }) {
  return (
    <button className="cards-action" type="button">
      <img className="cards-action__icon" src={action.icon} alt="" aria-hidden />
      <span>{action.label}</span>
    </button>
  )
}

function AppleIcon() {
  return (
    <svg className="cards-wallet__apple" width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <path
        fill="currentColor"
        d="M14.4 10.2c0-1.4.8-2.5 2-3.2-.7-1-1.8-1.6-3.1-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.9 1.1 9.1.8 1.1 1.7 2.3 2.9 2.3 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.2-2.6-.1 0-2.3-.9-2.3-4Zm-2-6.2c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.7-1 1.6-.9 2.6 1 0 1.9-.5 2.5-1.2Z"
      />
    </svg>
  )
}

function CardBack({ card }) {
  if (card.back) {
    return (
      <div className="cards-card-back cards-card-back--image">
        <img className="cards-card-back__image" src={card.back} alt="" />
      </div>
    )
  }

  const lastFour = card.number.slice(-4)

  return (
    <div className="cards-card-back">
      <div className="cards-card-back__sheen" aria-hidden />
      <div className="cards-card-back__header">
        <span>{card.tier}</span>
        <span>Virtual card</span>
      </div>
      <div className="cards-card-back__stripe" aria-hidden />
      <div className="cards-card-back__details">
        <div className="cards-card-back__number">
          <span>Card number</span>
          <strong>{card.number}</strong>
        </div>
        <div className="cards-card-back__grid">
          <span>
            <small>Expires</small>
            <strong>{card.expires}</strong>
          </span>
          <span>
            <small>CVV</small>
            <strong>{card.cvv}</strong>
          </span>
        </div>
      </div>
      <div className="cards-card-back__footer">
        <span>{card.holder}</span>
        <span>•• {lastFour}</span>
      </div>
    </div>
  )
}

export default function CardsScreen({
  mouseX,
  mouseY,
  showControls = true,
}) {
  const [tabIndex, setTabIndex] = useState(0)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [flippedCardId, setFlippedCardId] = useState(null)
  const [tuning, setTuning] = useState(CARDS_DEFAULT_TUNING)
  const [names, setNames] = useState(() => {
    const seed = {}
    CARD_GROUPS.flat().forEach((c) => { seed[c.id] = c.name || c.label })
    return seed
  })
  const [renamingId, setRenamingId] = useState(null)
  const nameInputRef = useRef(null)
  const showcaseRef = useRef(null)
  const cards = CARD_GROUPS[tabIndex]
  const borderAngle = (Math.atan2(mouseY - 0.5, mouseX - 0.5) * 180) / Math.PI + 90
  const cardOffsetX = (mouseX - 0.5) * tuning.cardDriftX
  const cardOffsetY = (mouseY - 0.5) * tuning.cardDriftY
  const goToCard = (index) => {
    const nextIndex = ((index % cards.length) + cards.length) % cards.length
    setActiveCardIndex(nextIndex)
    setFlippedCardId(null)
  }

  const handleTabChange = (index) => {
    setTabIndex(index)
    setActiveCardIndex(0)
    setFlippedCardId(null)
  }

  const toggleActiveCard = (cardId) => {
    if (cards[activeCardIndex]?.id !== cardId) return
    setFlippedCardId((current) => (current === cardId ? null : cardId))
  }

  const slideOffsets = useMemo(() => {
    const half = cards.length / 2
    return cards.map((_, index) => {
      let offset = index - activeCardIndex
      if (offset > half) offset -= cards.length
      if (offset < -half) offset += cards.length
      return offset
    })
  }, [activeCardIndex, cards])

  return (
    <div className="cards-page">
      <section
        className="home__hero cards-hero"
        style={{
          '--hero-foil': `url(${bgPatternFoilSvg})`,
          '--hero-edges': `url(${bgPatternFoilSvg})`,
          '--pattern-size': `${tuning.patternSize}%`,
          '--shine-mult': tuning.shineMult,
          '--edge-mult': tuning.edgeMult,
          '--glare-mult': tuning.glareMult,
          '--facet-pop': tuning.facetPop,
          '--darkness': tuning.darkness,
          '--vignette-strength': tuning.vignetteStrength,
          '--parallax-px': `${tuning.parallaxPx}px`,
          '--mx': `${mouseX * 100}%`,
          '--my': `${mouseY * 100}%`,
          '--pointer-from-left': mouseX,
          '--pointer-from-top': mouseY,
          '--border-angle': `${borderAngle}deg`,
        }}
      >
        <div className="home__hero-parallax">
          <div
            className="home__hero-bg"
            style={{ backgroundImage: `url(${bgPatternSvg})` }}
            aria-hidden
          />
          <div className="home__hero-shine" aria-hidden />
          <div className="home__hero-edge-shine" aria-hidden />
          <div className="home__hero-glare" aria-hidden />
        </div>
        <div className="home__hero-vignette" aria-hidden />
        <div className="home__hero-content cards-hero__content">
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
        </div>
      </section>

      <main className="cards-body">
        <CardsSegmentedTabs activeIndex={tabIndex} onChange={handleTabChange} />

        <section
          ref={showcaseRef}
          className="cards-card-showcase"
          aria-label="Selected card"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') goToCard(activeCardIndex - 1)
            if (event.key === 'ArrowRight') goToCard(activeCardIndex + 1)
          }}
        >
          <div
            className="cards-card-showcase__lift"
            style={{
              '--card-lift-x': `${cardOffsetX.toFixed(2)}px`,
              '--card-lift-y': `${cardOffsetY.toFixed(2)}px`,
              '--card-shadow': tuning.cardShadow,
              '--card-shadow-blur': `${tuning.cardShadowBlur}px`,
              '--card-shadow-y': `${tuning.cardShadowY}px`,
              '--card-shadow-x': tuning.cardShadowX,
              '--card-shadow-opacity': tuning.cardShadowOpacity,
            }}
          >
            <div className="cards-slider" aria-live="polite">
              {cards.map((card, index) => {
                const offset = slideOffsets[index]
                const distance = Math.min(Math.abs(offset), 3)
                const focused = index === activeCardIndex
                const flipped = focused && flippedCardId === card.id

                return (
                  <button
                    key={card.id}
                    type="button"
                    className={`cards-slider__item${focused ? ' cards-slider__item--active' : ''}${flipped ? ' cards-slider__item--flipped' : ''}`}
                    style={{
                      '--slide-offset': offset.toFixed(4),
                      '--slide-distance': distance.toFixed(4),
                      '--slide-depth': (1 - distance * 0.16).toFixed(4),
                      zIndex: Math.round(100 - distance * 10),
                    }}
                    aria-label={`${card.label} details`}
                    aria-pressed={flipped}
                    onClick={() => (focused ? toggleActiveCard(card.id) : goToCard(index))}
                  >
                    <div className="cards-flip-card">
                      <div className="cards-flip-card__face cards-flip-card__face--front">
                        <Card3D
                          className={`cards-card-showcase__card${card.tier?.startsWith('Corporate') ? ' card3d--silver' : ''}${card.tier?.includes('Charge') ? ' card3d--charge' : ''}`}
                          cardSvg={card.card}
                          foilSvg={card.foil}
                          edgesSvg={card.edges}
                          mouseX={mouseX}
                          mouseY={mouseY}
                          borderWidth={2}
                        />
                        {focused && (
                          renamingId === card.id ? (
                            <input
                              ref={nameInputRef}
                              className="card-name-pill card-name-pill--input"
                              value={names[card.id] ?? ''}
                              onChange={(e) => setNames((m) => ({ ...m, [card.id]: e.target.value }))}
                              onClick={(e) => e.stopPropagation()}
                              onMouseDown={(e) => e.stopPropagation()}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === 'Escape') {
                                  e.preventDefault()
                                  setRenamingId(null)
                                }
                              }}
                              onBlur={() => setRenamingId(null)}
                              maxLength={28}
                              aria-label="Rename card"
                            />
                          ) : (
                            <span
                              role="button"
                              tabIndex={-1}
                              className="card-name-pill"
                              onClick={(e) => {
                                e.stopPropagation()
                                setRenamingId(card.id)
                                window.setTimeout(() => {
                                  nameInputRef.current?.focus()
                                  nameInputRef.current?.select()
                                }, 0)
                              }}
                              onMouseDown={(e) => e.stopPropagation()}
                              aria-label={`Rename card: ${names[card.id]}`}
                            >
                              <span className="card-name-pill__text">{names[card.id]}</span>
                              <svg
                                className="card-name-pill__icon"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden
                              >
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4z" />
                              </svg>
                            </span>
                          )
                        )}
                      </div>
                      <div className="cards-flip-card__face cards-flip-card__face--back">
                        {card.back && card.backFoil ? (
                          <Card3D
                            className={`cards-card-showcase__card${card.tier?.startsWith('Corporate') ? ' card3d--silver' : ''}${card.tier?.includes('Charge') ? ' card3d--charge' : ''}`}
                            cardSvg={card.back}
                            foilSvg={card.backFoil}
                            mouseX={mouseX}
                            mouseY={mouseY}
                            borderWidth={2}
                            showBorder={false}
                          />
                        ) : (
                          <CardBack card={card} />
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <div className="cards-thumbs" aria-label="Cards">
          {cards.map((card, i) => (
            <button
              key={card.id}
              type="button"
              className={`cards-thumb${i === activeCardIndex ? ' cards-thumb--active' : ''}`}
              aria-label={card.label}
              aria-current={i === activeCardIndex}
              onClick={() => goToCard(i)}
            >
              <img src={card.card} alt="" />
            </button>
          ))}
          <button type="button" className="cards-thumb cards-thumb--add" aria-label="Add card">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="cards-actions">
          {CARD_ACTIONS.map((action, index) => (
            <div className="cards-action-reveal" key={action.label} style={{ '--item-index': index }}>
              <CardAction action={action} />
            </div>
          ))}
        </div>

        <section className="cards-wallet">
          <div className="cards-wallet__thumb" aria-hidden>
            <img src={appleWalletCardIcon} alt="" />
          </div>
          <div className="cards-wallet__text">
            <h2>Add to Apple Wallet</h2>
            <p>Use this card with Apple Pay.</p>
          </div>
          <button className="cards-wallet__button" type="button">
            <AppleIcon />
            <span>Add</span>
          </button>
        </section>

        <section className="cards-section">
          <h2 className="cards-section__title">Recent transactions</h2>
          <div className="home-tx cards-tx">
            <ul className="home-tx__list">
              {CARD_TRANSACTIONS.map((tx) => (
                <li className="home-tx__row" key={`${tx.name}-${tx.amount}`}>
                  <span className="home-tx__dot" style={{ background: tx.color }} />
                  <span className="home-tx__text">
                    <span className="home-tx__name">{tx.name}</span>
                    <span className="home-tx__sub">{tx.account}</span>
                  </span>
                  <span className="home-tx__amount">
                    {tx.amount}
                    <span className="home-tx__cents">{tx.cents}</span>
                  </span>
                </li>
              ))}
            </ul>
            <button className="home-tx__more" type="button">
              <span>See all transactions</span>
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
                <path
                  d="m9 5 7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </section>
      </main>

      {showControls && (
        <ControlPanel
          tuning={tuning}
          setTuning={setTuning}
          onReset={() => setTuning(CARDS_DEFAULT_TUNING)}
          showContentControls={false}
          extraSections={CARD_EXTRA_CONTROL_SECTIONS}
        />
      )}
    </div>
  )
}
