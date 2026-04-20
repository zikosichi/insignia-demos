import PhoneChrome from '../PhoneChrome'
import coverSvg from '../assets/breathe/Cover.svg'
import amountSvg from '../assets/breathe/Amount.svg'
import crownSvg from '../assets/breathe/crown.svg'
import bodySvg from '../assets/breathe/Body.svg'
import navbarSvg from '../assets/breathe/Navbar.svg'
import iconTransfer from '../assets/breathe/IconArrowUpRight.svg'
import iconExchange from '../assets/breathe/IconArrowsRepeatCircle.svg'

function CtaButton({ label, icon }) {
  return (
    <button className="breathe-cta" aria-label={label}>
      <span className="breathe-cta__glow" aria-hidden />
      <img className="breathe-cta__icon" src={icon} alt="" />
    </button>
  )
}

export default function Breathe() {
  return (
    <div className="breathe">
      <div className="breathe__scroll">
        <PhoneChrome tone="dark" />
        <div className="breathe__cover">
          <img className="breathe__cover-img" src={coverSvg} alt="" />
          <img className="breathe__crown" src={crownSvg} alt="" />
          <img className="breathe__amount" src={amountSvg} alt="" />
          <div className="breathe__ctas">
            <CtaButton label="Transfer" icon={iconTransfer} />
            <CtaButton label="Exchange" icon={iconExchange} />
          </div>
        </div>
        <img className="breathe__body" src={bodySvg} alt="" />
      </div>
      <img className="breathe__navbar" src={navbarSvg} alt="" />
    </div>
  )
}
