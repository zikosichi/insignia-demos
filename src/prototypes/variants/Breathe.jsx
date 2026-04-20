import { useState } from 'react'
import PhoneChrome from '../PhoneChrome'
import coverSvg from '../assets/breathe/Cover.svg'
import coverRedPng from '../assets/breathe/Cover-Red.png'
import amountSvg from '../assets/breathe/Amount.svg'
import amountWhiteSvg from '../assets/breathe/Amount white.svg'
import crownSvg from '../assets/breathe/crown.svg'
import bodySvg from '../assets/breathe/Body.svg'
import navbarSvg from '../assets/breathe/Navbar.svg'
import iconTransfer from '../assets/breathe/IconArrowUpRight.svg'
import iconExchange from '../assets/breathe/IconArrowsRepeatCircle.svg'
import oceanWaves from '../assets/breathe/ocean waves.mp4'
import offerTextSvg from '../assets/breathe/offer text.svg'

function CtaButton({ label, icon }) {
  return (
    <button className="breathe-cta" aria-label={label}>
      <span className="breathe-cta__glow" aria-hidden />
      <img className="breathe-cta__icon" src={icon} alt="" />
    </button>
  )
}

export default function Breathe() {
  const [coverTheme, setCoverTheme] = useState('light')
  const toggleCoverTheme = () =>
    setCoverTheme((t) => (t === 'light' ? 'dark' : 'light'))
  const coverSrc = coverTheme === 'dark' ? coverRedPng : coverSvg
  const amountSrc = coverTheme === 'dark' ? amountWhiteSvg : amountSvg
  const statusTone = coverTheme === 'dark' ? 'light' : 'dark'

  return (
    <>
      <div className={`breathe breathe--${coverTheme}`}>
        <div className="breathe__scroll">
          <PhoneChrome tone={statusTone} />
          <div className="breathe__cover">
            <img className="breathe__cover-img" src={coverSrc} alt="" />
            <img className="breathe__crown" src={crownSvg} alt="" />
            <img
              className="breathe__amount"
              src={amountSrc}
              alt=""
              onClick={toggleCoverTheme}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleCoverTheme()
                }
              }}
            />
            <div className="breathe__ctas">
              <CtaButton label="Transfer" icon={iconTransfer} />
              <CtaButton label="Exchange" icon={iconExchange} />
            </div>
          </div>
          <div className="breathe__body-wrap">
            <img className="breathe__body" src={bodySvg} alt="" />
            <div className="breathe__offer">
              <video
                className="breathe__offer-video"
                src={oceanWaves}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="breathe__offer-fade" aria-hidden />
              <img className="breathe__offer-text" src={offerTextSvg} alt="" />
            </div>
          </div>
        </div>
        <img className="breathe__navbar" src={navbarSvg} alt="" />
        <div className="breathe__nav-hit">
          <button type="button" className="breathe__nav-btn" aria-label="Home" />
          <button type="button" className="breathe__nav-btn" aria-label="Transactions" />
          <button type="button" className="breathe__nav-btn" aria-label="Cards" />
          <button type="button" className="breathe__nav-btn" aria-label="Services" />
        </div>
      </div>

      <div className="breathe-theme-toggle" role="tablist" aria-label="Cover theme">
        <button
          role="tab"
          className={`breathe-theme-toggle__btn ${coverTheme === 'light' ? 'breathe-theme-toggle__btn--active' : ''}`}
          onClick={() => setCoverTheme('light')}
        >
          LIGHT
        </button>
        <button
          role="tab"
          className={`breathe-theme-toggle__btn ${coverTheme === 'dark' ? 'breathe-theme-toggle__btn--active' : ''}`}
          onClick={() => setCoverTheme('dark')}
        >
          DARK
        </button>
      </div>
    </>
  )
}
