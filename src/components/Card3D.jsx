import { useRef, useEffect, useCallback } from 'react'
import './Card3D.css'

export default function Card3D({
  cardSvg,
  foilSvg,
  edgesSvg,
  mouseX = 0.5,
  mouseY = 0.5,
  borderWidth = 2,
  className = '',
  style = {},
}) {
  const cardRef = useRef(null)

  const update = useCallback(() => {
    const card = cardRef.current
    if (!card) return

    const mx = `${mouseX * 100}%`
    const my = `${mouseY * 100}%`

    card.style.setProperty('--mx', mx)
    card.style.setProperty('--my', my)
    card.style.setProperty('--pointer-from-left', mouseX.toFixed(4))
    card.style.setProperty('--pointer-from-top', mouseY.toFixed(4))

    const borderAngle = Math.atan2(mouseY - 0.5, mouseX - 0.5) * (180 / Math.PI) + 90
    card.style.setProperty('--border-angle', `${borderAngle}deg`)

    const dist = Math.sqrt((mouseX - 0.5) ** 2 + (mouseY - 0.5) ** 2)
    const isMobile = window.innerWidth <= 500
    const shineBase = isMobile ? 0.5 : 0.2
    const shineMult = isMobile ? 3 : 2.5
    const glareMult = isMobile ? 1.2 : 0.5

    card.style.setProperty('--shine-opacity', Math.min(1, dist * shineMult + shineBase))
    card.style.setProperty('--glare-opacity', Math.min(0.8, dist * glareMult))
  }, [mouseX, mouseY])

  useEffect(() => { update() }, [update])

  const bw = `${borderWidth}px`

  return (
    <div
      ref={cardRef}
      className={`card3d ${className}`}
      style={{
        '--border-width': bw,
        '--foil': `url(${foilSvg})`,
        ...style,
      }}
    >
      <div className="card3d__body">
        <div
          className="card3d__pattern"
          style={{ backgroundImage: `url(${cardSvg})` }}
        />
      </div>
      <div className="card3d__border" />
      <div className="card3d__shine" />
      {edgesSvg && (
        <div
          className="card3d__edge-shine"
          style={{
            backgroundImage: `
              radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 30%, rgba(0,0,0,1) 70%),
              url(${edgesSvg})
            `,
          }}
        />
      )}
      <div className="card3d__glare" />
    </div>
  )
}
