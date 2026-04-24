import { useState, useRef } from 'react'
import usePointer from '../../hooks/usePointer'
import Card3D from '../../components/Card3D'
import PhoneChrome from '../PhoneChrome'
import coverSvg from '../assets/breathe/Cover.svg'
import coverRedPng from '../assets/breathe/Cover-Red.png'
import amountSvg from '../assets/breathe/Amount.svg'
import amountWhiteSvg from '../assets/breathe/Amount white.svg'
import crownSvg from '../assets/breathe/crown.svg'
import bodySvg from '../assets/breathe/Body.svg'
import bodyCardsSvg from '../assets/breathe/Body cards.svg'
import coverCardsLightPng from '../assets/breathe/cover cards light.png'
import coverCardsRedPng from '../assets/breathe/cover cards red.png'
import navbarSvg from '../assets/breathe/Navbar.svg'
import navbarTabsSvg from '../assets/breathe/Navbar tabs.svg'
import cardsThumbnailsPng from '../assets/breathe/cards thumbnails.png'
import iconTransfer from '../assets/breathe/IconArrowUpRight.svg'
import iconExchange from '../assets/breathe/IconArrowsRepeatCircle.svg'
import oceanWaves from '../assets/breathe/ocean waves.mp4'
import offerTextSvg from '../assets/breathe/offer text.svg'
import defaultCardSvg from '../../assets/cards/default/Card.svg'
import defaultFoilSvg from '../../assets/cards/default/pattern-foil.svg'
import defaultEdgesSvg from '../../assets/cards/default/pattern-edges.svg'

function CtaButton({ label, icon }) {
  return (
    <button className="breathe-cta" aria-label={label}>
      <span className="breathe-cta__glow" aria-hidden />
      <img className="breathe-cta__icon" src={icon} alt="" />
    </button>
  )
}

function HomeView({ coverSrc, amountSrc, onToggleTheme }) {
  return (
    <>
      <div className="breathe__cover">
        <img className="breathe__cover-img" src={coverSrc} alt="" />
        <img className="breathe__crown" src={crownSvg} alt="" />
        <img
          className="breathe__amount"
          src={amountSrc}
          alt=""
          onClick={onToggleTheme}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onToggleTheme()
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
    </>
  )
}

function CardsView({ coverCardsSrc, mouseX, mouseY }) {
  return (
    <>
      <div className="breathe__cards-cover">
        <img className="breathe__cards-cover-img" src={coverCardsSrc} alt="" />
      </div>
      <div className="breathe__body-wrap breathe__body-wrap--cards">
        <img className="breathe__body" src={bodyCardsSvg} alt="" />
        <div className="breathe__cards-3d">
          <Card3D
            cardSvg={defaultCardSvg}
            foilSvg={defaultFoilSvg}
            edgesSvg={defaultEdgesSvg}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </div>
        <img className="breathe__cards-thumbs" src={cardsThumbnailsPng} alt="" />
      </div>
    </>
  )
}

export default function Breathe() {
  const breatheRef = useRef(null)
  const { x: mouseX, y: mouseY } = usePointer(breatheRef)

  return (
    <>
      <div
        ref={breatheRef}
        className="breathe breathe--dark breathe--screen-cards"
      >
        <div className="breathe__scroll">
          <PhoneChrome tone="light" />
          <CardsView
            coverCardsSrc={coverCardsRedPng}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </div>
        <img
          className="breathe__navbar"
          src={navbarTabsSvg}
          alt=""
        />
        <div className="breathe__nav-hit">
          <button
            type="button"
            className="breathe__nav-btn"
            aria-label="Home"
          />
          <button
            type="button"
            className="breathe__nav-btn"
            aria-label="Transactions"
          />
          <button
            type="button"
            className="breathe__nav-btn"
            aria-label="Cards"
          />
          <button
            type="button"
            className="breathe__nav-btn"
            aria-label="Services"
          />
        </div>
      </div>
    </>
  )
}
