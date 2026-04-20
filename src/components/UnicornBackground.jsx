import { useEffect, useRef } from 'react'

const SDK_URL = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.9/dist/unicornStudio.umd.js'

let sdkLoaderPromise = null
function loadSdk() {
  if (window.UnicornStudio?.addScene) return Promise.resolve(window.UnicornStudio)
  if (sdkLoaderPromise) return sdkLoaderPromise
  sdkLoaderPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SDK_URL}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(window.UnicornStudio))
      existing.addEventListener('error', reject)
      return
    }
    const s = document.createElement('script')
    s.src = SDK_URL
    s.onload = () => resolve(window.UnicornStudio)
    s.onerror = reject
    document.head.appendChild(s)
  })
  return sdkLoaderPromise
}

export default function UnicornBackground({ projectId, className }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const elementIdRef = useRef(`unicorn-${Math.random().toString(36).slice(2, 9)}`)

  useEffect(() => {
    let cancelled = false
    loadSdk().then((US) => {
      if (cancelled || !US?.addScene) return
      US.addScene({
        elementId: elementIdRef.current,
        projectId,
        scale: 1,
        dpi: 1.5,
        fps: 60,
      }).then((scene) => {
        if (cancelled) { scene?.destroy?.(); return }
        sceneRef.current = scene
      }).catch(err => console.error('[UnicornStudio] addScene failed', err))
    }).catch(err => console.error('[UnicornStudio] SDK load failed', err))

    return () => {
      cancelled = true
      if (sceneRef.current?.destroy) sceneRef.current.destroy()
      sceneRef.current = null
    }
  }, [projectId])

  return (
    <div
      ref={containerRef}
      id={elementIdRef.current}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
