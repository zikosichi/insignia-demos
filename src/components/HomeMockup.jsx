import { useRef, useState } from 'react'
import usePointer from '../hooks/usePointer'
import './HomeMockup.css'

const accounts = [
  {
    id: 'travel',
    name: 'Travel',
    amount: '€20,000',
    breakdown: ['€14,000', '$5,000', '£1,500'],
    cards: [{ style: 'burgundy', visa: true }],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      </svg>
    ),
  },
  {
    id: 'tennis',
    name: 'Tennis club',
    amount: '€20,000',
    breakdown: ['€14,000', '$5,000', '£1,500'],
    cards: [{ style: 'artwork' }, { style: 'teal', visa: true }],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12c6 0 9-3 9-9" />
        <path d="M12 21c0-6 3-9 9-9" />
      </svg>
    ),
  },
  {
    id: 'foundation',
    name: 'Foundation',
    amount: '€20,000',
    single: true,
    cards: [],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2l1 4h10l1-4" />
        <path d="M5 6h14l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6z" />
      </svg>
    ),
  },
]

const transactions = [
  {
    id: 't1',
    name: 'Hôtel de Paris',
    category: 'Travel',
    amount: '−€18,400',
    cents: '00',
    pending: true,
  },
  {
    id: 't2',
    name: "Sotheby's London",
    category: 'Household',
    amount: '−£142,000',
    cents: '00',
  },
  {
    id: 't3',
    name: 'Dr. Müller Practice',
    category: 'Default card',
    amount: '−€4,200',
    cents: '00',
  },
]

export default function HomeMockup() {
  const phoneRef = useRef(null)
  const { x: mouseX, y: mouseY, isMobile } = usePointer(phoneRef)
  const [rotate3d, setRotate3d] = useState(false)

  const MAX_PHONE_ROTATION = 15
  const phoneRX = rotate3d ? (0.5 - mouseY) * MAX_PHONE_ROTATION * 2 : 0
  const phoneRY = rotate3d ? (mouseX - 0.5) * MAX_PHONE_ROTATION * 2 : 0

  // Shimmer + balance glow stay reactive even when 3D tilt is off
  const highlightX = mouseX * 100
  const highlightY = mouseY * 100
  const goldAngle = (mouseX - 0.5) * 60 + (mouseY - 0.5) * 30
  // Border angle rotates 360° as cursor circles the button center — from Card3D
  const borderAngle = Math.atan2(mouseY - 0.5, mouseX - 0.5) * (180 / Math.PI) + 90
  // Card3D-style: opacity ramps with DISTANCE from center, not position
  const dist = Math.sqrt((mouseX - 0.5) ** 2 + (mouseY - 0.5) ** 2)
  const shineOpacity = Math.min(1, dist * 1.8 + 0.08)
  const glareOpacity = Math.min(0.55, dist * 0.4)
  const balanceGlowX = (mouseX - 0.5) * 40
  const balanceGlowY = (mouseY - 0.5) * 20

  const shadowX = phoneRY * -2
  const shadowY = phoneRX * 1.4

  return (
    <>
    <button
      className={`home__3d-toggle ${rotate3d ? 'is-on' : ''}`}
      onClick={() => setRotate3d(v => !v)}
      aria-label="Toggle 3D rotation"
    >
      <span className="home__3d-toggle-track">
        <span className="home__3d-toggle-thumb" />
      </span>
      <span className="home__3d-toggle-label">3D tilt</span>
    </button>
    <div
      ref={phoneRef}
      className="phone home-phone"
      style={{
        transform: isMobile || !rotate3d ? 'none' : `rotateX(${phoneRX}deg) rotateY(${phoneRY}deg)`,
        '--highlight-x': `${highlightX}%`,
        '--highlight-y': `${highlightY}%`,
        '--gold-angle': `${goldAngle}deg`,
        '--border-angle': `${borderAngle}deg`,
        '--shine-opacity': shineOpacity,
        '--glare-opacity': glareOpacity,
        '--balance-glow-x': `${balanceGlowX}px`,
        '--balance-glow-y': `${balanceGlowY}px`,
        '--shadow-x': `${shadowX}px`,
        '--shadow-y': `${shadowY}px`,
      }}
    >
      <div className="phone__dark-zone home__dark-zone">
        <div className="home__bg" />

        <div className="phone__status-bar">
          <span className="phone__time">9:41</span>
          <div className="phone__status-icons">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="0" y="4" width="3" height="8" rx="0.5" fill="#F5F0ED"/><rect x="4.5" y="2.5" width="3" height="9.5" rx="0.5" fill="#F5F0ED"/><rect x="9" y="0.5" width="3" height="11.5" rx="0.5" fill="#F5F0ED"/><rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#F5F0ED" opacity="0.3"/></svg>
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none"><path d="M7.5 3.5C9.4 3.5 11.1 4.3 12.3 5.5L13.8 4C12.2 2.4 10 1.5 7.5 1.5C5 1.5 2.8 2.4 1.2 4L2.7 5.5C3.9 4.3 5.6 3.5 7.5 3.5Z" fill="#F5F0ED"/><path d="M7.5 6.5C8.6 6.5 9.6 6.9 10.4 7.6L11.8 6.1C10.7 5.1 9.2 4.5 7.5 4.5C5.8 4.5 4.3 5.1 3.2 6.1L4.6 7.6C5.4 6.9 6.4 6.5 7.5 6.5Z" fill="#F5F0ED"/><circle cx="7.5" cy="10" r="1.5" fill="#F5F0ED"/></svg>
            <div className="phone__battery"><div className="phone__battery-fill" /></div>
          </div>
        </div>

        <div className="home__header">
          <div className="home__user">
            <div className="home__avatar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,237,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
            </div>
            <span className="home__hello">Hey George</span>
          </div>
          <div className="home__header-right">
            <button className="home__icon-btn" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5F0ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button className="home__pill-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>My banker</span>
            </button>
          </div>
        </div>

        <div className="home__balance-hero">
          <span className="home__balance-label">TOTAL BALANCE</span>
          <span className="home__balance-amount">€206,000</span>
          <button className="home__balance-toggle">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" />
            </svg>
            <span>Hide all balances</span>
          </button>
        </div>

        <div className="home__actions">
          <button className="home__btn home__btn--secondary">
            <span className="home__btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg>
            </span>
            <span>Transfer money</span>
          </button>
          <button className="home__btn home__btn--secondary">
            <span className="home__btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="m16 3 4 4-4 4" />
                <path d="M20 7H4" />
                <path d="m8 21-4-4 4-4" />
                <path d="M4 17h16" />
              </svg>
            </span>
            <span>Exchange currency</span>
          </button>
        </div>
      </div>

      <div className="phone__light-zone home__light-zone">
        <div className="phone__section">
          <div className="home__section-head">
            <span className="phone__section-title">Accounts</span>
            <button className="home__section-link">Manage accounts</button>
          </div>
          {accounts.map(acct => (
            <div className="home__account" key={acct.id}>
              <div className="home__account-top">
                <div className="home__account-icon">{acct.icon}</div>
                <span className="home__account-name">{acct.name}</span>
                {acct.cards.length > 0 && (
                  <div className="home__account-cards">
                    {acct.cards.map((card, i) => (
                      <div key={i} className={`home__account-card home__account-card--${card.style}`}>
                        {card.visa && <span className="home__account-card-visa">VISA</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="home__account-divider" />
              <div className="home__account-bottom">
                <span className="home__account-amount">{acct.amount}</span>
                {acct.single ? (
                  <span className="home__account-single">Single currency</span>
                ) : (
                  <div className="home__account-breakdown">
                    {acct.breakdown.map((amt, i) => (
                      <span key={i} className="home__account-breakdown-item">
                        {i > 0 && <span className="home__account-breakdown-sep">|</span>}
                        <span>{amt}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="phone__section home__section--spaced">
          <div className="home__section-head">
            <span className="phone__section-title">Recent transactions</span>
            <button className="home__section-link">See all</button>
          </div>
          {transactions.map(tx => (
            <div className="home__tx" key={tx.id}>
              <div className="home__tx-dot" />
              <div className="home__tx-info">
                <span className="home__tx-name">{tx.name}</span>
                <span className="home__tx-meta">
                  {tx.category}
                  {tx.pending && <span className="home__tx-pending"> · Pending</span>}
                </span>
              </div>
              <span className="home__tx-amount">
                {tx.amount}<span className="home__tx-cents">.{tx.cents}</span>
              </span>
            </div>
          ))}
        </div>

      </div>

      <div className="phone__nav">
        <div className="phone__nav-item phone__nav-item--active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          <span>Home</span>
        </div>
        <div className="phone__nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>
          <span>Transactions</span>
        </div>
        <div className="phone__nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
          <span>Cards</span>
        </div>
        <div className="phone__nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5c1 0 1.7.5 2.3 1.3L12 8h-4.5z"/><path d="M16.5 8a2.5 2.5 0 0 0 0-5c-1 0-1.7.5-2.3 1.3L12 8h4.5z"/></svg>
          <span>Offers</span>
        </div>
      </div>
    </div>
    </>
  )
}
