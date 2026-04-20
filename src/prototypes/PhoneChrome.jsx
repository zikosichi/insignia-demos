// iPhone status bar + Dynamic Island overlay — floats above any variant content.

export default function PhoneChrome({ tone = 'light' }) {
  const color = tone === 'light' ? '#F5EFE8' : '#1E1615'

  return (
    <div className="phone-chrome">
      <div className="phone-chrome__island" aria-hidden />
      <div className="phone-chrome__status" style={{ color }}>
        <span className="phone-chrome__time">9:41</span>
        <div className="phone-chrome__icons">
          {/* Signal bars */}
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <rect x="0"  y="8" width="3" height="4"  rx="0.7" fill={color} />
            <rect x="5"  y="5" width="3" height="7"  rx="0.7" fill={color} />
            <rect x="10" y="2.5" width="3" height="9.5" rx="0.7" fill={color} />
            <rect x="15" y="0" width="3" height="12" rx="0.7" fill={color} />
          </svg>
          {/* Wifi */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 3.2c2 0 3.8.8 5.1 2.2l1.4-1.4A8.9 8.9 0 0 0 8 1.4 8.9 8.9 0 0 0 1.5 4l1.4 1.4A7 7 0 0 1 8 3.2Z" fill={color}/>
            <path d="M8 6.3c1.2 0 2.3.5 3.1 1.2l1.4-1.4A6.5 6.5 0 0 0 8 4.4a6.5 6.5 0 0 0-4.5 1.7l1.4 1.4A4.4 4.4 0 0 1 8 6.3Z" fill={color}/>
            <circle cx="8" cy="10" r="1.5" fill={color}/>
          </svg>
          {/* Battery */}
          <svg width="28" height="13" viewBox="0 0 28 13" fill="none">
            <rect x="0.5" y="0.5" width="24" height="12" rx="3" stroke={color} strokeOpacity="0.45" fill="none"/>
            <rect x="2"   y="2"   width="21" height="9"  rx="1.8" fill={color}/>
            <rect x="25"  y="4"   width="2"  height="5"  rx="0.6" fill={color} fillOpacity="0.45"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
