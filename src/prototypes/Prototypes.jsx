import { useState, useRef } from 'react'
import TiltPhone from './TiltPhone'
import Breathe from './variants/Breathe'
import Skeuomorphism from './variants/Skeuomorphism'
import Modern from './variants/Modern'
import usePointer from '../hooks/usePointer'
import './Prototypes.css'

const variants = [
  { key: 'breathe', label: 'Breathe', Component: Breathe },
  { key: 'skeuomorphism', label: 'Skeuomorphism', Component: Skeuomorphism },
  { key: 'modern', label: 'Modern', Component: Modern },
]

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 500

/* Mobile-only host: runs usePointer (which auto-wires gyroscope on
   touch devices) and exposes the same --mx/--my/etc CSS vars that
   TiltPhone provides on desktop. No phone chrome, no transform. */
function MobilePointerHost({ children }) {
  const ref = useRef(null)
  const { x: mouseX, y: mouseY } = usePointer(ref)
  const borderAngle =
    Math.atan2(mouseY - 0.5, mouseX - 0.5) * (180 / Math.PI) + 90
  const dist = Math.sqrt((mouseX - 0.5) ** 2 + (mouseY - 0.5) ** 2)
  const shineOpacity = Math.min(1, dist * 2.5 + 0.2)
  const glareOpacity = Math.min(0.8, dist * 0.5)
  return (
    <div
      ref={ref}
      className="prototypes-mobile-host"
      style={{
        '--mx': `${mouseX * 100}%`,
        '--my': `${mouseY * 100}%`,
        '--pointer-from-left': mouseX.toFixed(4),
        '--pointer-from-top': mouseY.toFixed(4),
        '--shine-opacity': shineOpacity.toFixed(3),
        '--glare-opacity': glareOpacity.toFixed(3),
        '--border-angle': `${borderAngle}deg`,
      }}
    >
      {children}
    </div>
  )
}

export default function Prototypes({ screen = 'cards' }) {
  const [variant, setVariant] = useState('breathe')

  const Active = variants.find((v) => v.key === variant)?.Component ?? Breathe

  if (isMobile) {
    return (
      <div className="prototypes-page prototypes-page--mobile">
        <MobilePointerHost>
          <Active screen={screen} />
        </MobilePointerHost>
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
