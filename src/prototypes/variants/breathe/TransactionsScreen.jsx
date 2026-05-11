import { useState } from 'react'

import bgPatternSvg from '../../assets/breathe/bg-pattern.svg'
import bgPatternFoilSvg from '../../assets/breathe/bg-pattern-foil.svg'
import iconPeopleCircle from '../../assets/breathe/IconPeopleCircle.svg'
import iconMagnifyingGlass from '../../assets/breathe/IconMagnifyingGlass.svg'
import iconBubbleAnnotation from '../../assets/breathe/IconBubbleAnnotation5.svg'
import searchBarIcon from '../../assets/breathe/transactions/IconMagnifyingGlass.svg'
import filterIcon from '../../assets/breathe/transactions/IconFilter1.svg'
import fileDownloadIcon from '../../assets/breathe/transactions/IconFileDownload.svg'

const TRANSACTION_TABS = ['All', 'Accounts', 'Charge cards']

const SPENDING_CATEGORIES = [
  { label: 'Shopping', amount: '€100,000', value: 100000, color: '#480B15' },
  { label: 'Dining', amount: '€80,000', value: 80000, color: '#BC384A' },
  { label: 'Travel', amount: '€20,000', value: 20000, color: '#D87278' },
  { label: 'Other', amount: '€6,000', value: 6000, color: '#F4B0B1' },
]

const TRANSACTION_GROUPS = {
  Today: [
    { name: 'Palais de Lumière', account: 'Account 2', amount: '−€23,750.49', color: '#d9ad9c' },
    { name: 'Apple Store', account: 'Account 1', amount: '−€1,249.00', color: '#beb3cd' },
    { name: "Château de l'Étoile", account: 'Account 2', amount: '−€15,600.67', color: '#d9ad9c' },
    { name: 'Auberge du Vent', account: 'Account 1', amount: '−€2,875.30', color: '#beb3cd' },
  ],
  Yesterday: [
    { name: 'Hermès Faubourg', account: 'Account 2', amount: '−€8,940.00', color: '#d9ad9c' },
    { name: 'Four Seasons Milano', account: 'Account 1', amount: '−€3,620.75', color: '#beb3cd' },
    { name: 'Galeries Lafayette', account: 'Account 2', amount: '−€6,318.20', color: '#d9ad9c' },
    { name: 'La Petite Maison', account: 'Account 1', amount: '−€740.90', color: '#beb3cd' },
  ],
  'May 9, 2026': [
    { name: 'The Connaught Bar', account: 'Account 1', amount: '−€520.00', color: '#beb3cd' },
    { name: 'Bulgari Hotel Roma', account: 'Account 2', amount: '−€4,880.45', color: '#d9ad9c' },
    { name: 'NetJets Europe', account: 'Account 2', amount: '−€18,250.00', color: '#d9ad9c' },
    { name: 'Cartier Vendôme', account: 'Account 1', amount: '−€12,400.00', color: '#beb3cd' },
  ],
  'May 8, 2026': [
    { name: 'Hôtel du Cap-Eden-Roc', account: 'Account 2', amount: '−€7,350.80', color: '#d9ad9c' },
    { name: 'Louis Vuitton Montaigne', account: 'Account 1', amount: '−€5,280.00', color: '#beb3cd' },
    { name: 'Sketch London', account: 'Account 1', amount: '−€690.40', color: '#beb3cd' },
    { name: 'Christie’s Private Sales', account: 'Account 2', amount: '−€31,900.00', color: '#d9ad9c' },
  ],
  'May 7, 2026': [
    { name: 'Dior Avenue Montaigne', account: 'Account 1', amount: '−€3,840.00', color: '#beb3cd' },
    { name: 'Le Bristol Paris', account: 'Account 2', amount: '−€6,125.60', color: '#d9ad9c' },
    { name: 'Harrods Knightsbridge', account: 'Account 1', amount: '−€2,310.15', color: '#beb3cd' },
    { name: 'Ritz-Carlton Yacht', account: 'Account 2', amount: '−€14,760.00', color: '#d9ad9c' },
  ],
}

const TRANSACTION_GROUP_TITLES = [
  'Today',
  'Yesterday',
  'May 9, 2026',
  'May 8, 2026',
  'May 7, 2026',
]

function Amount({ value }) {
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

function TransactionsTopBar() {
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

function TransactionsTabs({ activeIndex, onChange }) {
  return (
    <div
      className="home-tabs transactions-tabs"
      role="tablist"
      style={{ '--active': activeIndex, '--count': TRANSACTION_TABS.length }}
    >
      <span className="home-tabs__indicator" aria-hidden />
      {TRANSACTION_TABS.map((tab, index) => {
        const active = index === activeIndex
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={active}
            className={`home-tabs__item${active ? ' home-tabs__item--active' : ''}`}
            onClick={() => onChange(index)}
          >
            <span className="home-tabs__label">{tab}</span>
          </button>
        )
      })}
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M6 2.5v3M14 2.5v3M3.75 8.25h12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="3.75" y="4.5" width="12.5" height="12" rx="2.25" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SpendingRing() {
  const total = SPENDING_CATEGORIES.reduce((sum, item) => sum + item.value, 0)
  const segments = SPENDING_CATEGORIES.map((item, index) => {
    const offset = SPENDING_CATEGORIES.slice(0, index).reduce(
      (sum, previous) => sum + (previous.value / total) * 100,
      0,
    )
    const dash = (item.value / total) * 100
    return { ...item, dash, offset }
  })

  return (
    <div className="transactions-ring" aria-label="Spending overview total €200K">
      <svg className="transactions-ring__chart" viewBox="0 0 120 120" aria-hidden>
        <defs>
          <mask id="transactions-ring-mask" maskUnits="userSpaceOnUse">
            <rect width="120" height="120" fill="black" />
            <circle
              className="transactions-ring__reveal"
              cx="60"
              cy="60"
              r="48"
              pathLength="100"
            />
          </mask>
        </defs>
        <circle className="transactions-ring__track" cx="60" cy="60" r="48" />
        <g className="transactions-ring__segments" mask="url(#transactions-ring-mask)">
          {segments.map((segment) => (
            <circle
              key={segment.label}
              className="transactions-ring__segment"
              cx="60"
              cy="60"
              r="48"
              pathLength="100"
              stroke={segment.color}
              strokeDasharray={`${segment.dash} ${100 - segment.dash}`}
              strokeDashoffset={-segment.offset}
            />
          ))}
        </g>
      </svg>
      <span className="transactions-ring__value">€200K</span>
    </div>
  )
}

function SpendingOverview() {
  return (
    <section className="transactions-overview">
      <header className="transactions-overview__header">
        <h2>Spending overview</h2>
        <button className="transactions-period" type="button">
          <CalendarIcon />
          <span>May 2026</span>
          <ChevronDownIcon />
        </button>
      </header>
      <div className="transactions-overview__body">
        <SpendingRing />
        <div className="transactions-legend">
          {SPENDING_CATEGORIES.map((category, index) => (
            <div
              className="transactions-legend__row"
              key={category.label}
              style={{ '--row-index': index }}
            >
              <span className="transactions-legend__dot" style={{ background: category.color }} />
              <span className="transactions-legend__label">{category.label}</span>
              <span className="transactions-legend__amount">{category.amount}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="transactions-analytics" type="button">
        View full analytics
      </button>
    </section>
  )
}

function TransactionGroup({ title, index = 0 }) {
  const items = TRANSACTION_GROUPS[title] ?? []

  return (
    <section className="transactions-group" style={{ '--group-index': index }}>
      <h2 className="transactions-group__title">{title}</h2>
      <div className="home-tx transactions-list">
        <ul className="home-tx__list">
          {items.map((item) => (
            <li className="home-tx__row" key={`${title}-${item.name}`}>
              <span className="home-tx__dot" style={{ background: item.color }} aria-hidden />
              <span className="home-tx__text">
                <span className="home-tx__name">{item.name}</span>
                <span className="home-tx__sub">{item.account}</span>
              </span>
              <span className="home-tx__amount">
                <Amount value={item.amount} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function TransactionsSearchBar() {
  return (
    <div className="transactions-searchbar">
      <label className="transactions-searchbar__field">
        <img src={searchBarIcon} alt="" aria-hidden />
        <input type="search" placeholder="Search transactions" aria-label="Search transactions" />
      </label>
      <button className="transactions-searchbar__icon" type="button" aria-label="Filter transactions">
        <img src={filterIcon} alt="" aria-hidden />
      </button>
      <button className="transactions-searchbar__icon" type="button" aria-label="Download transactions">
        <img src={fileDownloadIcon} alt="" aria-hidden />
      </button>
    </div>
  )
}

export default function TransactionsScreen() {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <div className="transactions-page">
      <section
        className="home__hero transactions-hero"
        style={{
          '--hero-foil': `url(${bgPatternFoilSvg})`,
          '--hero-edges': `url(${bgPatternFoilSvg})`,
          '--pattern-size': '470%',
          '--shine-mult': 0,
          '--edge-mult': 0,
          '--glare-mult': 0,
          '--facet-pop': 2.2,
          '--darkness': 0.12,
          '--vignette-strength': 0,
          '--parallax-px': '34px',
        }}
      >
        <div className="home__hero-parallax">
          <div
            className="home__hero-bg"
            style={{ backgroundImage: `url(${bgPatternSvg})` }}
            aria-hidden
          />
        </div>
        <div className="home__hero-content transactions-hero__content">
          <TransactionsTopBar />
        </div>
      </section>

      <main className="transactions-body">
        <TransactionsTabs activeIndex={tabIndex} onChange={setTabIndex} />
        <SpendingOverview />
        {TRANSACTION_GROUP_TITLES.map((title, index) => (
          <TransactionGroup key={title} title={title} index={index} />
        ))}
      </main>
    </div>
  )
}
