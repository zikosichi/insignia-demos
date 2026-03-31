import { useState } from 'react'
import CardView from './components/CardView'
import PhoneMockup from './components/PhoneMockup'
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

const isMobile = window.innerWidth <= 500

export default function App() {
  const [view, setView] = useState('phone')

  // On mobile, always show phone view fullscreen
  if (isMobile) {
    return (
      <div className="app">
        <PhoneMockup cards={cards} />
      </div>
    )
  }

  return (
    <div className="app">
      <nav className="view-nav">
        <button
          className={`view-nav__btn ${view === 'card' ? 'view-nav__btn--active' : ''}`}
          onClick={() => setView('card')}
        >
          Card
        </button>
        <button
          className={`view-nav__btn ${view === 'phone' ? 'view-nav__btn--active' : ''}`}
          onClick={() => setView('phone')}
        >
          In App
        </button>
      </nav>

      <div style={{ display: view === 'card' ? 'block' : 'none' }}>
        <CardView cards={cards} />
      </div>
      <div style={{
        display: view === 'phone' ? 'flex' : 'none',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
      }}>
        <PhoneMockup cards={cards} />
      </div>
    </div>
  )
}
