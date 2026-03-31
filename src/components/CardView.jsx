import { useRef } from 'react'
import Card3D from './Card3D'
import usePointer from '../hooks/usePointer'
import './CardView.css'

export default function CardView({ cards, activeIndex, onChangeIndex }) {
  const containerRef = useRef(null)
  const { x: mouseX, y: mouseY } = usePointer(containerRef)

  const MAX_ROTATION = 20
  const rx = (0.5 - mouseY) * MAX_ROTATION * 2
  const ry = (mouseX - 0.5) * MAX_ROTATION * 2

  const activeCard = cards[activeIndex]

  return (
    <div className="card-view">
      <div className="card-view__container" ref={containerRef} style={{ perspective: '800px' }}>
        <div style={{
          width: 480,
          transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}>
          <Card3D
            cardSvg={activeCard.cardSvg}
            foilSvg={activeCard.foilSvg}
            edgesSvg={activeCard.edgesSvg}
            mouseX={mouseX}
            mouseY={mouseY}
            borderWidth={3}
            showBorder={activeCard.showBorder !== false}
          />
        </div>
      </div>

      {cards.length > 1 && (
        <div className="card-view__dots">
          {cards.map((_, i) => (
            <button
              key={i}
              className={`card-view__dot ${i === activeIndex ? 'card-view__dot--active' : ''}`}
              onClick={() => onChangeIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
