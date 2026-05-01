import { useState, useRef } from 'react'
import usePointer from '../../hooks/usePointer'
import Card3D from '../../components/Card3D'
import PhoneChrome from '../PhoneChrome'
import HomeScreen from './breathe/HomeScreen'
import coverSvg from '../assets/breathe/Cover.svg'
import coverRedPng from '../assets/breathe/Cover-Red.png'
import amountSvg from '../assets/breathe/Amount.svg'
import amountWhiteSvg from '../assets/breathe/Amount white.svg'
import crownSvg from '../assets/breathe/crown.svg'
import bodySvg from '../assets/breathe/Body.svg'
import bodyCardsSvg from '../assets/breathe/Body cards.svg'
import coverCardsLightPng from '../assets/breathe/cover cards light.png'
import coverCardsRedPng from '../assets/breathe/cover cards red.png'
import cardsThumbnailsPng from '../assets/breathe/cards thumbnails.png'
import iconTransfer from '../assets/breathe/IconArrowUpRight.svg'
import iconExchange from '../assets/breathe/IconArrowsRepeatCircle.svg'
import oceanWaves from '../assets/breathe/ocean waves.mp4'
import offerTextSvg from '../assets/breathe/offer text.svg'
import bgPatternSvg from '../assets/breathe/bg-pattern.svg'
import bgPatternFoilSvg from '../assets/breathe/bg-pattern-foil.svg'
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

function CardsScreen({ coverCardsSrc, mouseX, mouseY }) {
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

export default function Breathe({ screen = 'cards' }) {
  const breatheRef = useRef(null)
  const { x: mouseX, y: mouseY } = usePointer(breatheRef)

  return (
    <>
      <div
        ref={breatheRef}
        className={`breathe breathe--dark breathe--screen-${screen}`}
      >
        <div className="breathe__scroll">
          <PhoneChrome tone="light" />
          {screen === 'home' ? (
            <HomeScreen
              leatherSrc={bgPatternSvg}
              foilSrc={bgPatternFoilSvg}
              edgesSrc={bgPatternFoilSvg}
            />
          ) : (
            <CardsScreen
              coverCardsSrc={coverCardsRedPng}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          )}
        </div>
      </div>
    </>
  )
}
