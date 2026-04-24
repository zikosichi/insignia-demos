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

  const Active = variants.find((v) => v.key === variant)?.Component ?? Breathe

  return (
    <div className="prototypes-page">
      <TiltPhone tiltEnabled={true}>
        <Active />
      </TiltPhone>
    </div>
  )
}
