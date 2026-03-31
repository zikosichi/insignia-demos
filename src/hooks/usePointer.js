import { useState, useEffect, useRef, useCallback } from 'react'

export default function usePointer(targetRef) {
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 })
  const isMobile = useRef(window.innerWidth <= 500)
  const useGyro = useRef(false)
  const raf = useRef(null)
  const current = useRef({ x: 0.5, y: 0.5 })
  const target = useRef({ x: 0.5, y: 0.5 })

  const lerp = (a, b, t) => a + (b - a) * t

  // Animation loop for smooth interpolation
  const animate = useCallback(() => {
    const smooth = isMobile.current ? 0.15 : 0.1
    current.current.x = lerp(current.current.x, target.current.x, smooth)
    current.current.y = lerp(current.current.y, target.current.y, smooth)
    setPointer({ x: current.current.x, y: current.current.y })
    raf.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const handleMouse = (e) => {
      if (useGyro.current) return
      const el = targetRef?.current || document.body
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const maxDist = Math.max(window.innerWidth, window.innerHeight) * 0.5
      target.current.x = Math.max(0, Math.min(1, 0.5 + (e.clientX - cx) / (maxDist * 2)))
      target.current.y = Math.max(0, Math.min(1, 0.5 + (e.clientY - cy) / (maxDist * 2)))
    }

    const handleGyro = (e) => {
      const beta = e.beta || 0
      const gamma = e.gamma || 0
      target.current.x = Math.max(0, Math.min(1, 0.5 + gamma / 30))
      target.current.y = Math.max(0, Math.min(1, 0.5 - (beta - 40) / 30))
    }

    const initGyro = () => {
      if (typeof DeviceOrientationEvent !== 'undefined' &&
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        document.body.addEventListener('click', function req() {
          DeviceOrientationEvent.requestPermission().then(state => {
            if (state === 'granted') {
              useGyro.current = true
              window.addEventListener('deviceorientation', handleGyro)
            }
          })
          document.body.removeEventListener('click', req)
        }, { once: true })
      } else if ('DeviceOrientationEvent' in window) {
        useGyro.current = true
        window.addEventListener('deviceorientation', handleGyro)
      }
    }

    document.addEventListener('mousemove', handleMouse)
    if (isMobile.current) initGyro()

    raf.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('deviceorientation', handleGyro)
      cancelAnimationFrame(raf.current)
    }
  }, [targetRef, animate])

  return { ...pointer, isMobile: isMobile.current }
}
