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

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 500

export default function Prototypes({ screen = 'cards' }) {
  const [variant, setVariant] = useState('breathe')

  const Active = variants.find((v) => v.key === variant)?.Component ?? Breathe

  if (isMobile) {
    return (
      <div className="prototypes-page prototypes-page--mobile">
        <Active screen={screen} />
      </div>
    )
  }

  return (
    <div className="prototypes-page">
      <TiltPhone tiltEnabled={true}>
        <Active screen={screen} />
      </TiltPhone>
    </div>
  )
}
