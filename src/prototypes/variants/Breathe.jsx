import { useEffect, useRef, useState } from 'react'
import usePointer from '../../hooks/usePointer'
import PhoneChrome from '../PhoneChrome'
import HomeScreen, { BottomNav } from './breathe/HomeScreen'
import CardsScreen from './breathe/CardsScreen'
import TransactionsScreen, { TransactionsSearchBar } from './breathe/TransactionsScreen'
import ServicesScreen from './breathe/ServicesScreen'
import TransferScreen from './breathe/TransferScreen'
import ExchangeScreen from './breathe/ExchangeScreen'
import PreferencesScreen from './breathe/PreferencesScreen'
import bgPatternSvg from '../assets/breathe/bg-pattern.svg'
import bgPatternFoilSvg from '../assets/breathe/bg-pattern-foil.svg'

export default function Breathe({ screen = 'cards', controlsEnabled = true }) {
  const breatheRef = useRef(null)
  const scrollRef = useRef(null)
  const [activeScreen, setActiveScreen] = useState(screen)
  const [seen, setSeen] = useState(() => new Set())
  const [subScreen, setSubScreen] = useState(null)
  const [subScreenClosing, setSubScreenClosing] = useState(false)
  const [prefsCardDismissed, setPrefsCardDismissed] = useState(false)
  const { x: mouseX, y: mouseY } = usePointer(breatheRef)

  const openSubScreen = (id) => {
    setSubScreenClosing(false)
    setSubScreen(id)
    window.history.pushState({ breatheSubScreen: id }, '')
  }
  const animateCloseSubScreen = () => {
    setSubScreenClosing(true)
    window.setTimeout(() => {
      setSubScreen(null)
      setSubScreenClosing(false)
    }, 520)
  }
  const closeSubScreen = () => {
    if (!subScreen) return
    // Pop the history entry pushed on open; popstate handler animates the close.
    window.history.back()
  }

  useEffect(() => {
    const onPop = () => {
      if (subScreen) animateCloseSubScreen()
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [subScreen])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('subscreen-change', { detail: { subScreen } }))
  }, [subScreen])

  const visit = (next) => {
    setActiveScreen((prev) => {
      if (prev && prev !== next) {
        setSeen((s) => (s.has(prev) ? s : new Set(s).add(prev)))
      }
      return next
    })
  }

  useEffect(() => {
    visit(screen)
  }, [screen])

  const handleNavigate = (next) => {
    if (next !== 'home' && next !== 'transactions' && next !== 'cards' && next !== 'services') return
    visit(next)
    if (window.location.hash !== `#${next}`) {
      window.location.hash = next
    }
    scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }

  const screenClass = (id) =>
    [
      'breathe__screen',
      id !== 'home' ? 'breathe__screen--fixed-hero' : '',
      activeScreen === id ? 'breathe__screen--active' : '',
      seen.has(id) ? 'breathe__screen--seen' : '',
    ]
      .filter(Boolean)
      .join(' ')

  return (
    <>
      <div
        ref={breatheRef}
        className={`breathe breathe--dark breathe--screen-${activeScreen}`}
      >
        <div ref={scrollRef} className="breathe__scroll">
          <PhoneChrome tone="light" />
          <div className={screenClass('home')}>
            <HomeScreen
              leatherSrc={bgPatternSvg}
              foilSrc={bgPatternFoilSvg}
              edgesSrc={bgPatternFoilSvg}
              isActive={activeScreen === 'home'}
              showControls={controlsEnabled && activeScreen === 'home'}
              onTransfer={() => openSubScreen('transfer')}
              onExchange={() => openSubScreen('exchange')}
            />
          </div>
          <div className={screenClass('cards')}>
            <CardsScreen
              mouseX={mouseX}
              mouseY={mouseY}
              showControls={controlsEnabled && activeScreen === 'cards'}
            />
          </div>
          <div className={screenClass('transactions')}>
            <TransactionsScreen />
          </div>
          <div className={screenClass('services')}>
            <ServicesScreen
              showPreferencesCard={!prefsCardDismissed}
              onSharePreferences={() => openSubScreen('preferences')}
              onDismissPreferences={() => setPrefsCardDismissed(true)}
            />
          </div>
        </div>
        {activeScreen === 'transactions' && <TransactionsSearchBar />}
        <BottomNav activeId={activeScreen} onChange={handleNavigate} />
        {subScreen && (
          <div
            className={`breathe__subscreen${subScreenClosing ? ' breathe__subscreen--closing' : ''}`}
          >
            {subScreen === 'transfer' && <TransferScreen onClose={closeSubScreen} />}
            {subScreen === 'exchange' && <ExchangeScreen onClose={closeSubScreen} />}
            {subScreen === 'preferences' && (
              <PreferencesScreen
                onClose={closeSubScreen}
                onComplete={() => {
                  setPrefsCardDismissed(true)
                  closeSubScreen()
                }}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}
