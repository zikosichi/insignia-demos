import './TransferScreen.css'
import PhoneChrome from '../../PhoneChrome'
import bgPatternSvg from '../../assets/breathe/bg-pattern.svg'
import bgPatternFoilSvg from '../../assets/breathe/bg-pattern-foil.svg'
import iconBubbleAnnotation from '../../assets/breathe/IconBubbleAnnotation5.svg'
import searchBarIcon from '../../assets/breathe/transactions/IconMagnifyingGlass.svg'

const RECENTS = [
  {
    id: 'sb',
    type: 'person',
    initials: 'SB',
    from: '#e9f7f7',
    to: '#d3f0f0',
    inkColor: '#026264',
    name: 'Sophie Blake',
    detail: 'FR75200410100554948',
  },
  {
    id: 'jw',
    type: 'person',
    initials: 'JW',
    from: '#fbf0f7',
    to: '#f8e2f1',
    inkColor: '#b6529f',
    name: 'Jaxon Wilde',
    detail: 'FR38475619283746501',
  },
  {
    id: 'acc1',
    type: 'account',
    bg: '#1a385f',
    iconTint: '#89B0E7',
    name: 'Account 1',
    detail: 'VCFC Account',
  },
  {
    id: 'acc2',
    type: 'account',
    bg: '#4f3100',
    iconTint: '#E0CC9C',
    name: 'Account 2',
    detail: 'VCFC Account',
  },
]

const CONTACTS = [
  { id: 'ig', initials: 'IG', from: '#fbf0f7', to: '#f8e2f1', inkColor: '#b6529f', name: 'Isabella Garcia',  detail: 'FR89321045678901234' },
  { id: 'gm', initials: 'GM', from: '#eef6e8', to: '#dfeed4', inkColor: '#3d6a26', name: 'Gwen Montoya',     detail: 'FR10293847561029384' },
  { id: 'js', initials: 'JS', from: '#eef3fb', to: '#dde5f4', inkColor: '#2b4d86', name: 'Jordan Smith',     detail: 'FR60141022081234567' },
  { id: 'tj', initials: 'TJ', from: '#fbf3e2', to: '#f4e3c1', inkColor: '#7a591b', name: 'Taylor Johnson',   detail: 'FR21540009876543210' },
  { id: 'mh', initials: 'MH', from: '#fdeae8', to: '#f7d4d0', inkColor: '#a8442c', name: 'Marco Hernández',  detail: 'FR04201842965371108' },
  { id: 'ak', initials: 'AK', from: '#f0eef6', to: '#dcd6ea', inkColor: '#574a8a', name: 'Amara Kowalski',   detail: 'FR97316874520913650' },
  { id: 'rn', initials: 'RN', from: '#e8f4f1', to: '#cfe9e1', inkColor: '#1f6b58', name: 'Rohan Nair',       detail: 'FR12058624039571248' },
  { id: 'ed', initials: 'ED', from: '#f3eee5', to: '#e5d8c1', inkColor: '#6b5230', name: 'Élodie Dubois',    detail: 'FR83692714085036214' },
  { id: 'ko', initials: 'KO', from: '#eef0fa', to: '#d3d9f0', inkColor: '#3c4b94', name: 'Kenji Okafor',     detail: 'FR55027940186324709' },
  { id: 'sp', initials: 'SP', from: '#fcefe4', to: '#f5d8b8', inkColor: '#9b5915', name: 'Sienna Petrov',    detail: 'FR70184350629140763' },
]

function Icon({ children, size = 24, stroke = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  )
}

const ChevronLeft = (p) => <Icon {...p}><path d="m15 6-6 6 6 6" /></Icon>
const ChevronRight = (p) => <Icon {...p}><path d="m9 6 6 6-6 6" /></Icon>
const Bubble = (p) => (
  <Icon {...p}>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8A2.5 2.5 0 0 1 17.5 17H10l-4 3v-3H6.5A2.5 2.5 0 0 1 4 14.5z" />
  </Icon>
)
const Shuffle = (p) => (
  <Icon {...p}>
    <path d="M3 7h4l10 10h4" />
    <path d="M17 7h4l-3-3m3 3-3 3" />
    <path d="M3 17h4l3-3" />
    <path d="m21 17-3 3m3-3-3-3" />
  </Icon>
)
const ArrowUpRight = (p) => (
  <Icon {...p}>
    <path d="M7 17 17 7" />
    <path d="M9 7h8v8" />
  </Icon>
)
const Dots = (p) => (
  <Icon {...p}>
    <circle cx="6" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="18" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </Icon>
)
function Bank({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M20.5 7.96433C20.5 7.76223 20.3864 7.57702 20.2061 7.48582L12.5635 3.62546C12.209 3.44641 11.791 3.4464 11.4365 3.62546L3.79395 7.48582C3.61364 7.57703 3.5 7.76226 3.5 7.96433C3.50014 8.26018 3.74027 8.49949 4.03613 8.49949H19.9639C20.2598 8.49949 20.4999 8.26018 20.5 7.96433ZM22 7.96433C21.9999 9.08861 21.0882 9.99949 19.9639 9.99949H4.03613C2.91183 9.99949 2.00014 9.0886 2 7.96433C2 7.19624 2.4326 6.4933 3.11816 6.14695L10.7598 2.2866C11.5395 1.89266 12.4605 1.89268 13.2402 2.2866L20.8818 6.14695C21.5676 6.49331 22 7.19626 22 7.96433Z" />
      <path d="M18.8086 16.5C19.9921 16.5 21.0426 17.2573 21.417 18.3799L21.5225 18.6963C21.9003 19.8295 21.0567 21 19.8623 21H4.13769C2.94324 21 2.0998 19.8294 2.47754 18.6963L2.58301 18.3808C2.95744 17.2583 4.00795 16.5 5.19141 16.5H18.8086ZM5.19141 18C4.65353 18 4.17605 18.3443 4.00586 18.8545L3.90039 19.1709C3.84645 19.3327 3.96703 19.5 4.13769 19.5H19.8623C20.0331 19.5 20.1535 19.3326 20.0996 19.1709L19.9941 18.8545C19.824 18.3443 19.3466 18 18.8086 18H5.19141Z" />
      <path d="M18.5 8.5H20V18H18.5V8.5Z" />
      <path d="M14.5 8.5H16V18H14.5V8.5Z" />
      <path d="M4 8.5H5.5V18H4V8.5Z" />
      <path d="M8 8.5H9.5V18H8V8.5Z" />
    </svg>
  )
}

function ActionRow({ icon, title, sub, last }) {
  return (
    <button type="button" className={`transfer-action${last ? ' transfer-action--last' : ''}`}>
      <span className="transfer-action__icon" aria-hidden>
        {icon}
      </span>
      <span className="transfer-action__copy">
        <span className="transfer-action__title">{title}</span>
        <span className="transfer-action__sub">{sub}</span>
      </span>
      <span className="transfer-action__chevron" aria-hidden>
        <ChevronRight size={20} stroke="#5C4A3A" strokeWidth={1.4} />
      </span>
    </button>
  )
}

function ContactRow({ item, last }) {
  const isAccount = item.type === 'account'
  const avatarStyle = isAccount
    ? { background: item.bg, color: '#FFFFFF' }
    : {
        background: `linear-gradient(180deg, ${item.from} 0%, ${item.to} 100%)`,
        color: item.inkColor,
      }
  return (
    <button type="button" className={`transfer-row${last ? ' transfer-row--last' : ''}`}>
      <span
        className={`transfer-row__avatar${isAccount ? ' transfer-row__avatar--account' : ''}`}
        style={avatarStyle}
        aria-hidden
      >
        {isAccount ? <Bank size={24} color={item.iconTint} /> : item.initials}
      </span>
      <span className="transfer-row__copy">
        <span className="transfer-row__name">{item.name}</span>
        <span className="transfer-row__detail">{item.detail}</span>
      </span>
      <span className="transfer-row__more" aria-hidden>
        <Dots size={24} stroke="#7f6868" strokeWidth={1.4} />
      </span>
    </button>
  )
}

export default function TransferScreen({ onClose }) {
  return (
    <div className="transfer">
      <PhoneChrome tone="light" />
      <section
        className="home__hero transfer-hero"
        style={{
          '--hero-foil': `url(${bgPatternFoilSvg})`,
          '--hero-edges': `url(${bgPatternFoilSvg})`,
          '--pattern-size': '450%',
          '--shine-mult': 0.13,
          '--edge-mult': 0,
          '--glare-mult': 0,
          '--facet-pop': 1.45,
          '--darkness': 0,
          '--vignette-strength': 0.22,
          '--parallax-px': '4px',
        }}
      >
        <div className="home__hero-parallax">
          <div
            className="home__hero-bg"
            style={{ backgroundImage: `url(${bgPatternSvg})` }}
            aria-hidden
          />
        </div>
        <div className="home__hero-content transfer-hero__content">
          <div className="home__top-row">
            <button
              type="button"
              className="transfer-hero__lead"
              onClick={onClose}
              aria-label="Back"
            >
              <span className="home__top-circle" aria-hidden>
                <ChevronLeft size={20} stroke="#F5F0ED" strokeWidth={1.6} />
              </span>
              <span className="transfer-hero__title">Transfer money</span>
            </button>
            <div className="home__top-actions">
              <button className="home__pill" type="button" aria-label="Help">
                <img className="home__top-icon" src={iconBubbleAnnotation} alt="" />
                <span>Help</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="transfer__body">
        <label className="transfer__search">
          <img src={searchBarIcon} alt="" aria-hidden />
          <input
            type="search"
            placeholder="Search by name or IBAN"
            aria-label="Search by name or IBAN"
          />
        </label>

        <div className="transfer__actions">
          <ActionRow
            icon={<Shuffle size={20} stroke="#8B6914" />}
            title="Between my accounts"
            sub="Transfers across your accounts"
          />
          <ActionRow
            icon={<ArrowUpRight size={20} stroke="#8B6914" />}
            title="To another account"
            sub="Send to any IBAN, worldwide"
            last
          />
        </div>

        <h2 className="transfer__section">Recents</h2>
        <div className="transfer__list">
          {RECENTS.map((item, i) => (
            <ContactRow key={item.id} item={item} last={i === RECENTS.length - 1} />
          ))}
        </div>

        <h2 className="transfer__section">My contacts</h2>
        <div className="transfer__list">
          {CONTACTS.map((item, i) => (
            <ContactRow key={item.id} item={item} last={i === CONTACTS.length - 1} />
          ))}
        </div>
      </div>
    </div>
  )
}
