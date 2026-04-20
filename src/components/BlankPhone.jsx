import { useRef } from 'react'
import usePointer from '../hooks/usePointer'
import './PhoneMockup.css'
import './BlankPhone.css'

export default function BlankPhone() {
  const phoneRef = useRef(null)
  const { x: mouseX, y: mouseY, isMobile } = usePointer(phoneRef)

  const tiltEnabled = false

  const MAX_PHONE_ROTATION = 15
  const phoneRX = tiltEnabled ? (0.5 - mouseY) * MAX_PHONE_ROTATION * 2 : 0
  const phoneRY = tiltEnabled ? (mouseX - 0.5) * MAX_PHONE_ROTATION * 2 : 0

  return (
    <div className="blank-page">
      <div
        ref={phoneRef}
        className="phone"
        style={{
          transform: isMobile || !tiltEnabled
            ? 'none'
            : `rotateX(${phoneRX}deg) rotateY(${phoneRY}deg)`,
        }}
      >
        {/* Dark zone — empty */}
        <div className="phone__dark-zone blank-phone__dark-zone">
          <div
            className="phone__dark-zone-bg"
            style={{ background: '#1a0a08', opacity: 1 }}
          />
          <div className="phone__status-bar">
            <span className="phone__time">9:41</span>
            <div className="phone__status-icons">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="0" y="4" width="3" height="8" rx="0.5" fill="#F5F0ED"/><rect x="4.5" y="2.5" width="3" height="9.5" rx="0.5" fill="#F5F0ED"/><rect x="9" y="0.5" width="3" height="11.5" rx="0.5" fill="#F5F0ED"/><rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#F5F0ED" opacity="0.3"/></svg>
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none"><path d="M7.5 3.5C9.4 3.5 11.1 4.3 12.3 5.5L13.8 4C12.2 2.4 10 1.5 7.5 1.5C5 1.5 2.8 2.4 1.2 4L2.7 5.5C3.9 4.3 5.6 3.5 7.5 3.5Z" fill="#F5F0ED"/><path d="M7.5 6.5C8.6 6.5 9.6 6.9 10.4 7.6L11.8 6.1C10.7 5.1 9.2 4.5 7.5 4.5C5.8 4.5 4.3 5.1 3.2 6.1L4.6 7.6C5.4 6.9 6.4 6.5 7.5 6.5Z" fill="#F5F0ED"/><circle cx="7.5" cy="10" r="1.5" fill="#F5F0ED"/></svg>
              <div className="phone__battery"><div className="phone__battery-fill" /></div>
            </div>
          </div>

          {/* Empty content area */}
          <div className="blank-phone__content" />
        </div>

        {/* Light zone — empty */}
        <div className="phone__light-zone blank-phone__light-zone" />

        {/* Bottom nav */}
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
    </div>
  )
}
