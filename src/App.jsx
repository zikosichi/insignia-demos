import { useState, useEffect } from 'react'
import CardView from './components/CardView'
import PhoneMockup from './components/PhoneMockup'
import HomeMockup from './components/HomeMockup'
import BlankPhone from './components/BlankPhone'
import Prototypes from './prototypes/Prototypes'
import './App.css'

import cardSvg from './assets/cards/default/Card.svg'
import foilSvg from './assets/cards/default/pattern-foil.svg'
import edgesSvg from './assets/cards/default/pattern-edges.svg'

import peoneCard from './assets/cards/peone/Card.png'
import peoneFoil from './assets/cards/peone/foil.png'

import bowCard from './assets/cards/bow/Card.png'
import bowFoil from './assets/cards/bow/foil.png'

import billionaireCard from './assets/cards/billionaire/Card.png'
import billionaireFoil from './assets/cards/billionaire/foil.png'

const cards = [
  { id: 'default', cardSvg, foilSvg, edgesSvg },
  { id: 'peone', cardSvg: peoneCard, foilSvg: peoneFoil, edgesSvg: null, showBorder: false },
  { id: 'bow', cardSvg: bowCard, foilSvg: bowFoil, edgesSvg: null, showBorder: false },
  { id: 'billionaire', cardSvg: billionaireCard, foilSvg: billionaireFoil, edgesSvg: null, showBorder: false },
]

// Subtle body backgrounds per card
const bodyThemes = {
  default: [
    'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(70, 20, 18, 0.25) 0%, transparent 100%)',
  ],
  peone: [
    'radial-gradient(ellipse 60% 50% at 40% 35%, rgba(100, 50, 80, 0.2) 0%, transparent 100%)',
    'radial-gradient(ellipse 50% 40% at 70% 60%, rgba(120, 60, 90, 0.12) 0%, transparent 100%)',
  ],
  bow: [
    'radial-gradient(ellipse 60% 50% at 45% 40%, rgba(60, 45, 80, 0.2) 0%, transparent 100%)',
    'radial-gradient(ellipse 50% 40% at 65% 55%, rgba(50, 35, 65, 0.12) 0%, transparent 100%)',
  ],
  billionaire: [
    'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(120, 100, 40, 0.18) 0%, transparent 100%)',
    'radial-gradient(ellipse 50% 40% at 60% 55%, rgba(80, 65, 20, 0.12) 0%, transparent 100%)',
  ],
}

const isMobile = window.innerWidth <= 500

export default function App() {
  const [view, setView] = useState('home')
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [page, setPage] = useState(window.location.hash)

  useEffect(() => {
    const onHash = () => setPage(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const activeId = cards[activeCardIndex]?.id || 'default'

  // Blank page — standalone, no nav
  if (page === '#blank') {
    return (
      <div className="app">
        <BlankPhone />
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="app app--mobile">
        <Prototypes screen="home" />
      </div>
    )
  }

  return (
    <div className="app">
      {/* Body background layers — cross-fade per card */}
      {Object.entries(bodyThemes).map(([id, gradients]) => (
        <div
          key={id}
          className="app__bg-layer"
          style={{
            backgroundImage: gradients.join(', '),
            opacity: id === activeId ? 1 : 0,
          }}
        />
      ))}

      <nav className="view-nav">
        <button
          className={`view-nav__btn ${view === 'card' ? 'view-nav__btn--active' : ''}`}
          onClick={() => setView('card')}
        >
          Card
        </button>
        <button
          className={`view-nav__btn ${view === 'cards' ? 'view-nav__btn--active' : ''}`}
          onClick={() => setView('cards')}
        >
          Cards
        </button>
        <button
          className={`view-nav__btn ${view === 'home' ? 'view-nav__btn--active' : ''}`}
          onClick={() => setView('home')}
        >
          Home
        </button>
      </nav>

      <div style={{ display: view === 'card' ? 'block' : 'none' }}>
        <CardView cards={cards} activeIndex={activeCardIndex} onChangeIndex={setActiveCardIndex} />
      </div>
      <div style={{ display: view === 'cards' ? 'block' : 'none' }}>
        <Prototypes screen="cards" />
      </div>
      <div style={{ display: view === 'home' ? 'block' : 'none' }}>
        <Prototypes screen="home" />
      </div>
    </div>
  )
}
