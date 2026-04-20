import { useState } from 'react'
import TiltPhone from './TiltPhone'
import Breathe from './variants/Breathe'
import Skeuomorphism from './variants/Skeuomorphism'
import Modern from './variants/Modern'
import './Prototypes.css'

const variants = [
  { key: 'breathe', label: 'Breathe', Component: Breathe },
  { key: 'skeuomorphism', label: 'Skeuomorphism', Component: Skeuomorphism },
  { key: 'modern', label: 'Modern', Component: Modern },
]

export default function Prototypes() {
  const [variant, setVariant] = useState('breathe')
  const [tiltOn, setTiltOn] = useState(true)

  const Active = variants.find((v) => v.key === variant)?.Component ?? Breathe

  return (
    <div className="prototypes-page">
      <button
        className={`prototypes-tilt ${tiltOn ? 'prototypes-tilt--on' : ''}`}
        onClick={() => setTiltOn((v) => !v)}
        aria-pressed={tiltOn}
        title="Toggle mobile tilt"
      >
        <span className="prototypes-tilt__track">
          <span className="prototypes-tilt__knob" />
        </span>
        TILT
      </button>

      <TiltPhone tiltEnabled={tiltOn}>
        <Active />
      </TiltPhone>

      <nav className="prototypes-switcher" role="tablist">
        {variants.map((v) => (
          <button
            key={v.key}
            role="tab"
            className={`prototypes-switcher__btn ${variant === v.key ? 'prototypes-switcher__btn--active' : ''}`}
            onClick={() => setVariant(v.key)}
          >
            {v.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
