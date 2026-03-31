import { useState } from 'react'
import CardView from './components/CardView'
import PhoneMockup from './components/PhoneMockup'
import './App.css'

import cardSvg from './assets/cards/default/Card.svg'
import foilSvg from './assets/cards/default/pattern-foil.svg'
import edgesSvg from './assets/cards/default/pattern-edges.svg'

const cards = [
  { id: 'default', cardSvg, foilSvg, edgesSvg },
  // Add more cards here — each with their own SVGs
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
