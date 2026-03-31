import { useRef, useState } from 'react'
import Card3D from './Card3D'
import usePointer from '../hooks/usePointer'
import './PhoneMockup.css'

// Background themes per card — extracted from card imagery
const cardThemes = {
  default: 'linear-gradient(180deg, #3a0300 0%, #5C0500 40%, #4a0a08 100%)',
  peone: 'linear-gradient(180deg, #4a3040 0%, #6a4060 30%, #8a5575 60%, #6a4055 100%)',
  bow: 'linear-gradient(180deg, #2a2535 0%, #3a3050 30%, #4a3a5a 60%, #352840 100%)',
  billionaire: 'linear-gradient(180deg, #3a3018 0%, #4a3d1a 30%, #3d3215 60%, #2a2210 100%)',
}

export default function PhoneMockup({ cards }) {
  const phoneRef = useRef(null)
  const { x: mouseX, y: mouseY, isMobile } = usePointer(phoneRef)
  const [activeIndex, setActiveIndex] = useState(0)

  const MAX_PHONE_ROTATION = 15

  const phoneRX = (0.5 - mouseY) * MAX_PHONE_ROTATION * 2
  const phoneRY = (mouseX - 0.5) * MAX_PHONE_ROTATION * 2

  const translateX = phoneRY * 0.4
  const translateY = phoneRX * (isMobile ? 0.3 : -0.3)

  const shadowX = phoneRY * -2
  const shadowY = phoneRX * 1.4

  const activeCard = cards[activeIndex]
  const bgGradient = cardThemes[activeCard.id] || cardThemes.default

  return (
    <div
      ref={phoneRef}
      className="phone"
      style={{
        transform: isMobile ? 'none' : `rotateX(${phoneRX}deg) rotateY(${phoneRY}deg)`,
      }}
    >
      <div
        className="phone__dark-zone"
        style={{ background: bgGradient, transition: 'background 0.6s ease' }}
      >
        <div className="phone__status-bar">
          <span className="phone__time">9:41</span>
          <div className="phone__status-icons">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="0" y="4" width="3" height="8" rx="0.5" fill="#F5F0ED"/><rect x="4.5" y="2.5" width="3" height="9.5" rx="0.5" fill="#F5F0ED"/><rect x="9" y="0.5" width="3" height="11.5" rx="0.5" fill="#F5F0ED"/><rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#F5F0ED" opacity="0.3"/></svg>
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none"><path d="M7.5 3.5C9.4 3.5 11.1 4.3 12.3 5.5L13.8 4C12.2 2.4 10 1.5 7.5 1.5C5 1.5 2.8 2.4 1.2 4L2.7 5.5C3.9 4.3 5.6 3.5 7.5 3.5Z" fill="#F5F0ED"/><path d="M7.5 6.5C8.6 6.5 9.6 6.9 10.4 7.6L11.8 6.1C10.7 5.1 9.2 4.5 7.5 4.5C5.8 4.5 4.3 5.1 3.2 6.1L4.6 7.6C5.4 6.9 6.4 6.5 7.5 6.5Z" fill="#F5F0ED"/><circle cx="7.5" cy="10" r="1.5" fill="#F5F0ED"/></svg>
            <div className="phone__battery"><div className="phone__battery-fill" /></div>
          </div>
        </div>

        <div className="phone__page-title">Debit Cards</div>

        <div className="phone__card-section">
          <div
            className="phone__card-container"
            style={{ '--shadow-x': `${shadowX}px`, '--shadow-y': `${shadowY}px` }}
          >
            <div style={{ transform: `translateX(${translateX}px) translateY(${translateY}px)` }}>
              <Card3D
                cardSvg={activeCard.cardSvg}
                foilSvg={activeCard.foilSvg}
                edgesSvg={activeCard.edgesSvg}
                mouseX={mouseX}
                mouseY={mouseY}
                showBorder={activeCard.showBorder !== false}
              />
            </div>
          </div>
        </div>

        <div className="phone__card-dots">
          {cards.map((_, i) => (
            <span
              key={i}
              className={`phone__dot ${i === activeIndex ? 'phone__dot--active' : ''}`}
              onClick={() => setActiveIndex(i)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>

        <div className="phone__balance">
          <span className="phone__balance-label">Available balance</span>
          <span className="phone__balance-amount">€ 28 215<span className="phone__balance-cents">.49</span></span>
        </div>
      </div>

      <div className="phone__light-zone">
        <div className="phone__section">
          <span className="phone__section-title">Card actions</span>
          {['Freeze card', 'View pin', 'Report lost or stolen'].map(name => (
            <div key={name} className="phone__action-row">
              <div>
                <span className="phone__action-name">{name}</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b0a8a8" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>

        <div className="phone__section" style={{ marginTop: 8 }}>
          <span className="phone__section-title">Transactions</span>
          <div className="phone__transaction">
            <div className="phone__tx-dot" />
            <div className="phone__tx-info">
              <span className="phone__tx-name">Private Jet Charter</span>
              <span className="phone__tx-date">Today</span>
            </div>
            <span className="phone__tx-amount">-€84,500</span>
          </div>
          <div className="phone__transaction">
            <div className="phone__tx-dot phone__tx-dot--credit" />
            <div className="phone__tx-info">
              <span className="phone__tx-name">Wire Transfer</span>
              <span className="phone__tx-date">Yesterday</span>
            </div>
            <span className="phone__tx-amount phone__tx-amount--credit">+€320,000</span>
          </div>
        </div>
      </div>

      <div className="phone__nav">
        {['Accounts', 'Payments', 'Cards', 'Services', 'Support'].map(name => (
          <div key={name} className={`phone__nav-item ${name === 'Cards' ? 'phone__nav-item--active' : ''}`}>
            <span>{name}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
