import { useState } from 'react'
import Card3D from '../../../components/Card3D'
import { BottomNav } from './HomeScreen'
import bgPatternSvg from '../../assets/breathe/bg-pattern.svg'
import bgPatternFoilSvg from '../../assets/breathe/bg-pattern-foil.svg'
import iconPeopleCircle from '../../assets/breathe/IconPeopleCircle.svg'
import iconMagnifyingGlass from '../../assets/breathe/IconMagnifyingGlass.svg'
import iconBubbleAnnotation from '../../assets/breathe/IconBubbleAnnotation5.svg'
import defaultCardSvg from '../../../assets/cards/default/Card.svg'
import defaultFoilSvg from '../../../assets/cards/default/pattern-foil.svg'
import defaultEdgesSvg from '../../../assets/cards/default/pattern-edges.svg'
import peoneCard from '../../../assets/cards/peone/Card.png'
import bowCard from '../../../assets/cards/bow/Card.png'
import billionaireCard from '../../../assets/cards/billionaire/Card.png'

const CARD_TABS = [
  { count: 6, label: 'Debit cards' },
  { count: 2, label: 'Charge cards' },
]

const CARD_THUMBS = [
  defaultCardSvg,
  peoneCard,
  bowCard,
  billionaireCard,
  defaultCardSvg,
  peoneCard,
]

const CARD_ACTIONS = [
  {
    label: 'Card details',
    icon: (
      <>
        <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
  },
  {
    label: 'Freeze',
    icon: (
      <>
        <path d="M12 3v18M5.6 6.2l12.8 11.6M18.4 6.2 5.6 17.8" />
        <path d="m9 4 3 3 3-3M9 20l3-3 3 3M4 9l3 3-3 3M20 9l-3 3 3 3" />
      </>
    ),
  },
  {
    label: 'Settings',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2.75v2M12 19.25v2M4.25 12h-2M21.75 12h-2M6.52 6.52 5.1 5.1M18.9 18.9l-1.42-1.42M17.48 6.52 18.9 5.1M5.1 18.9l1.42-1.42" />
      </>
    ),
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

function ActionIcon({ children }) {
  return (
    <svg
      className="cards-action__icon"
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
      {children}
    </svg>
  )
}

function CardAction({ action }) {
  return (
    <button className="cards-action" type="button">
      <ActionIcon>{action.icon}</ActionIcon>
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

export default function CardsScreen({ mouseX, mouseY, onNavigate }) {
  const [tabIndex, setTabIndex] = useState(0)
  const borderAngle = (Math.atan2(mouseY - 0.5, mouseX - 0.5) * 180) / Math.PI + 90

  return (
    <div className="cards-page">
      <section
        className="home__hero cards-hero"
        style={{
          '--hero-foil': `url(${bgPatternFoilSvg})`,
          '--hero-edges': `url(${bgPatternFoilSvg})`,
          '--pattern-size': '470%',
          '--shine-mult': 0.52,
          '--edge-mult': 0.32,
          '--glare-mult': 1.29,
          '--facet-pop': 1.45,
          '--darkness': 0,
          '--vignette-strength': 0.22,
          '--parallax-px': '34px',
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
        <CardsSegmentedTabs activeIndex={tabIndex} onChange={setTabIndex} />

        <section className="cards-card-showcase" aria-label="Selected card">
          <Card3D
            className="cards-card-showcase__card"
            cardSvg={defaultCardSvg}
            foilSvg={defaultFoilSvg}
            edgesSvg={defaultEdgesSvg}
            mouseX={mouseX}
            mouseY={mouseY}
            borderWidth={2}
          />
        </section>

        <div className="cards-thumbs" aria-label="Cards">
          {CARD_THUMBS.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              className={`cards-thumb${i === 0 ? ' cards-thumb--active' : ''}`}
              aria-label={`Card ${i + 1}`}
            >
              <img src={src} alt="" />
            </button>
          ))}
          <button type="button" className="cards-thumb cards-thumb--add" aria-label="Add card">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="cards-actions">
          {CARD_ACTIONS.map((action) => (
            <CardAction key={action.label} action={action} />
          ))}
        </div>

        <section className="cards-wallet">
          <div className="cards-wallet__thumb" aria-hidden>
            <img src={defaultCardSvg} alt="" />
            <span />
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

      <BottomNav activeId="cards" onChange={onNavigate} />
    </div>
  )
}
