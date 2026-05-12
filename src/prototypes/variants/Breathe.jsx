import { useEffect, useRef, useState } from 'react'
import usePointer from '../../hooks/usePointer'
import PhoneChrome from '../PhoneChrome'
import HomeScreen, { BottomNav } from './breathe/HomeScreen'
import CardsScreen from './breathe/CardsScreen'
import TransactionsScreen, { TransactionsSearchBar } from './breathe/TransactionsScreen'
import ServicesScreen from './breathe/ServicesScreen'
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
    if (next !== 'home' && next !== 'transactions' && next !== 'cards' && next !== 'services') return
    setActiveScreen(next)
    if (window.location.hash !== `#${next}`) {
      window.location.hash = next
    }
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
              isActive={activeScreen === 'home'}
              showControls={controlsEnabled && activeScreen === 'home'}
            />
          </div>
          <div className={`breathe__screen${activeScreen === 'cards' ? ' breathe__screen--active' : ''}`}>
            <CardsScreen
              mouseX={mouseX}
              mouseY={mouseY}
              showControls={controlsEnabled && activeScreen === 'cards'}
            />
          </div>
          <div className={`breathe__screen${activeScreen === 'transactions' ? ' breathe__screen--active' : ''}`}>
            <TransactionsScreen />
          </div>
          <div className={`breathe__screen${activeScreen === 'services' ? ' breathe__screen--active' : ''}`}>
            <ServicesScreen />
          </div>
        </div>
        {activeScreen === 'transactions' && <TransactionsSearchBar />}
        <BottomNav activeId={activeScreen} onChange={handleNavigate} />
      </div>
    </>
  )
}
