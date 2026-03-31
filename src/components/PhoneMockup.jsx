import { useRef, useState, useCallback } from 'react'
import Card3D from './Card3D'
import usePointer from '../hooks/usePointer'
// Inline cursor SVGs with explicit white stroke (browsers can't use currentColor in cursors)
const cursorLeft = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2 -2 28 28"><defs><filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.35"/></filter></defs><g filter="url(#s)"><line x1="19" y1="12" x2="5" y2="12" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/><polyline points="12 19 5 12 12 5" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><line x1="19" y1="12" x2="5" y2="12" stroke="#000" stroke-width="1.8" stroke-linecap="round"/><polyline points="12 19 5 12 12 5" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g></svg>')}`
const cursorRight = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-2 -2 28 28"><defs><filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.35"/></filter></defs><g filter="url(#s)"><line x1="5" y1="12" x2="19" y2="12" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/><polyline points="12 5 19 12 12 19" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><line x1="5" y1="12" x2="19" y2="12" stroke="#000" stroke-width="1.8" stroke-linecap="round"/><polyline points="12 5 19 12 12 19" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g></svg>')}`
import './PhoneMockup.css'

// Background themes per card — extracted from card imagery
const cardThemes = {
  default: 'linear-gradient(180deg, #3a0300 0%, #5C0500 40%, #4a0a08 100%)',
  peone: 'linear-gradient(180deg, #4a3040 0%, #6a4060 30%, #8a5575 60%, #6a4055 100%)',
  bow: 'linear-gradient(180deg, #2a2535 0%, #3a3050 30%, #4a3a5a 60%, #352840 100%)',
  billionaire: 'linear-gradient(180deg, #3a3018 0%, #4a3d1a 30%, #3d3215 60%, #2a2210 100%)',
}

export default function PhoneMockup({ cards, activeIndex, onChangeIndex }) {
  const phoneRef = useRef(null)
  const { x: mouseX, y: mouseY, isMobile } = usePointer(phoneRef)
  const [cursorSide, setCursorSide] = useState('right')

  const setActiveIndex = onChangeIndex

  const handleSlideMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    setCursorSide(x < rect.width / 2 ? 'left' : 'right')
  }, [])

  const MAX_PHONE_ROTATION = 15

  const phoneRX = (0.5 - mouseY) * MAX_PHONE_ROTATION * 2
  const phoneRY = (mouseX - 0.5) * MAX_PHONE_ROTATION * 2

  const translateX = phoneRY * 0.6
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
      <div className="phone__dark-zone">
        {/* Stacked background layers — cross-fade via opacity */}
        {cards.map((card, i) => (
          <div
            key={card.id}
            className="phone__dark-zone-bg"
            style={{
              background: cardThemes[card.id] || cardThemes.default,
              opacity: i === activeIndex ? 1 : 0,
            }}
          />
        ))}
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
            <div className="phone__carousel" style={{ transform: `translateX(${translateX}px) translateY(${translateY}px)` }}>
              <div
                className="phone__carousel-track"
                style={{
                  transform: `translateX(calc(-${activeIndex * 100}% - ${activeIndex * 16}px))`,
                }}
              >
                {cards.map((card, i) => (
                  <div
                    className={`phone__carousel-slide ${i === activeIndex ? 'phone__carousel-slide--active' : ''}`}
                    key={card.id}
                    onMouseMove={i === activeIndex ? handleSlideMouseMove : undefined}
                    style={i === activeIndex ? { cursor: `url("${cursorSide === 'left' ? cursorLeft : cursorRight}") 10 10, pointer` } : undefined}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const clickX = e.clientX - rect.left
                      if (clickX < rect.width / 2) {
                        setActiveIndex((activeIndex - 1 + cards.length) % cards.length)
                      } else {
                        setActiveIndex((activeIndex + 1) % cards.length)
                      }
                    }}
                  >
                    <Card3D
                      cardSvg={card.cardSvg}
                      foilSvg={card.foilSvg}
                      edgesSvg={card.edgesSvg}
                      mouseX={i === activeIndex ? mouseX : 0.5}
                      mouseY={i === activeIndex ? mouseY : 0.5}
                      showBorder={card.showBorder !== false}
                    />
                  </div>
                ))}
              </div>
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
        <div className="phone__nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          <span>Accounts</span>
        </div>
        <div className="phone__nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12H3"/><path d="M16 7l5 5-5 5"/><path d="M8 17l-5-5 5-5"/></svg>
          <span>Payments</span>
        </div>
        <div className="phone__nav-item phone__nav-item--active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
          <span>Cards</span>
        </div>
        <div className="phone__nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5"/></svg>
          <span>Services</span>
        </div>
        <div className="phone__nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
          <span>Support</span>
        </div>
      </div>

    </div>
  )
}
