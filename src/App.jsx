import { useState, useEffect } from 'react'
import CardView from './components/CardView'
import BlankPhone from './components/BlankPhone'
import Prototypes from './prototypes/Prototypes'
import './App.css'

import cardSvg from './assets/cards/default/Card.svg'
import foilSvg from './assets/cards/default/pattern-foil.svg'
import edgesSvg from './assets/cards/default/pattern-edges.svg'

import personalMcFront from './assets/cards/personal-mastercard/front.png'
import personalMcFoil from './assets/cards/personal-mastercard/foil.png'
import corporateVisaFront from './assets/cards/corporate-visa/front.png'
import corporateVisaFoil from './assets/cards/corporate-visa/foil.png'
import corporateMcFront from './assets/cards/corporate-mastercard/front.png'
import corporateMcFoil from './assets/cards/corporate-mastercard/foil.png'

const cards = [
  { id: 'default', cardSvg, foilSvg, edgesSvg },
  { id: 'personal-mc', cardSvg: personalMcFront, foilSvg: personalMcFoil, edgesSvg: null, showBorder: false },
  { id: 'corporate-visa', cardSvg: corporateVisaFront, foilSvg: corporateVisaFoil, edgesSvg: null, showBorder: false },
  { id: 'corporate-mc', cardSvg: corporateMcFront, foilSvg: corporateMcFoil, edgesSvg: null, showBorder: false },
]

// Subtle body backgrounds per card
const bodyThemes = {
  default: [
    'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(70, 20, 18, 0.25) 0%, transparent 100%)',
  ],
  'personal-mc': [
    'radial-gradient(ellipse 60% 50% at 40% 35%, rgba(100, 50, 80, 0.2) 0%, transparent 100%)',
    'radial-gradient(ellipse 50% 40% at 70% 60%, rgba(120, 60, 90, 0.12) 0%, transparent 100%)',
  ],
  'corporate-visa': [
    'radial-gradient(ellipse 60% 50% at 45% 40%, rgba(60, 45, 80, 0.2) 0%, transparent 100%)',
    'radial-gradient(ellipse 50% 40% at 65% 55%, rgba(50, 35, 65, 0.12) 0%, transparent 100%)',
  ],
  'corporate-mc': [
    'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(120, 100, 40, 0.18) 0%, transparent 100%)',
    'radial-gradient(ellipse 50% 40% at 60% 55%, rgba(80, 65, 20, 0.12) 0%, transparent 100%)',
  ],
}

const isMobile = window.innerWidth <= 500

export default function App() {
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [page, setPage] = useState(window.location.hash)

  useEffect(() => {
    const onHash = () => setPage(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const activeId = cards[activeCardIndex]?.id || 'default'
  const prototypeScreen =
    page === '#cards' ? 'cards' : page === '#transactions' ? 'transactions' : page === '#services' ? 'services' : 'home'

  // Blank page — standalone, no nav
  if (page === '#blank') {
    return (
      <div className="app">
        <BlankPhone />
      </div>
    )
  }

  if (page === '#card') {
    return (
      <div className="app">
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
        <CardView
          cards={cards}
          activeIndex={activeCardIndex}
          onChangeIndex={setActiveCardIndex}
        />
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="app app--mobile">
        <Prototypes screen={prototypeScreen} />
      </div>
    )
  }

  return (
    <div className="app">
      <Prototypes
        screen={prototypeScreen}
        controlsEnabled={prototypeScreen === 'home' || prototypeScreen === 'cards'}
      />
    </div>
  )
}
