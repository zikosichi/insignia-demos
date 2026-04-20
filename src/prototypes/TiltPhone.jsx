import { useRef } from 'react'
import usePointer from '../hooks/usePointer'
import './TiltPhone.css'

const MAX_PHONE_ROTATION = 12

export default function TiltPhone({ tiltEnabled = true, children }) {
  const phoneRef = useRef(null)
  const { x: mouseX, y: mouseY, isMobile } = usePointer(phoneRef)

  const phoneRX = tiltEnabled ? (0.5 - mouseY) * MAX_PHONE_ROTATION * 2 : 0
  const phoneRY = tiltEnabled ? (mouseX - 0.5) * MAX_PHONE_ROTATION * 2 : 0

  const shadowX = phoneRY * -2
  const shadowY = phoneRX * 1.4

  const borderAngle =
    Math.atan2(mouseY - 0.5, mouseX - 0.5) * (180 / Math.PI) + 90

  return (
    <div className="tilt-phone-stage">
      <div
        ref={phoneRef}
        className="tilt-phone"
        style={{
          transform:
            isMobile || !tiltEnabled
              ? 'none'
              : `rotateX(${phoneRX}deg) rotateY(${phoneRY}deg)`,
          '--tilt-shadow-x': `${shadowX}px`,
          '--tilt-shadow-y': `${shadowY}px`,
          '--mx': `${mouseX * 100}%`,
          '--my': `${mouseY * 100}%`,
          '--border-angle': `${borderAngle}deg`,
        }}
      >
        <div className="tilt-phone__screen">{children}</div>
      </div>
    </div>
  )
}
