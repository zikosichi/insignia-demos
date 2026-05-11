import { useEffect, useRef, useState } from 'react'
import usePointer from '../../hooks/usePointer'
import PhoneChrome from '../PhoneChrome'
import HomeScreen from './breathe/HomeScreen'
import CardsScreen from './breathe/CardsScreen'
import bgPatternSvg from '../assets/breathe/bg-pattern.svg'
import bgPatternFoilSvg from '../assets/breathe/bg-pattern-foil.svg'

export default function Breathe({ screen = 'cards', controlsEnabled = true }) {
  const breatheRef = useRef(null)
  const scrollRef = useRef(null)
  const [activeScreen, setActiveScreen] = useState(screen)
  const { x: mouseX, y: mouseY } = usePointer(breatheRef)

  useEffect(() => {
    setActiveScreen(screen)
  }, [screen])

  const handleNavigate = (next) => {
    if (next !== 'home' && next !== 'cards') return
    setActiveScreen(next)
    scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <>
      <div
        ref={breatheRef}
        className={`breathe breathe--dark breathe--screen-${activeScreen}`}
      >
        <div ref={scrollRef} className="breathe__scroll">
          <PhoneChrome tone="light" />
          <div className={`breathe__screen${activeScreen === 'home' ? ' breathe__screen--active' : ''}`}>
            <HomeScreen
              leatherSrc={bgPatternSvg}
              foilSrc={bgPatternFoilSvg}
              edgesSrc={bgPatternFoilSvg}
              onNavigate={handleNavigate}
              showControls={controlsEnabled && activeScreen === 'home'}
            />
          </div>
          <div className={`breathe__screen${activeScreen === 'cards' ? ' breathe__screen--active' : ''}`}>
            <CardsScreen
              mouseX={mouseX}
              mouseY={mouseY}
              onNavigate={handleNavigate}
            />
          </div>
        </div>
      </div>
    </>
  )
}
