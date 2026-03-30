/**
 * VCFC Unified Demo
 * - Desktop: tab switcher between Card view and Phone view
 * - Mobile: auto-loads phone view with real gyroscope
 */
(function () {
  const isMobile = window.innerWidth <= 500;

  // ---- View Switching (desktop only) ----
  const nav = document.getElementById('viewNav');
  const buttons = nav.querySelectorAll('.view-nav__btn');
  const views = document.querySelectorAll('.view');
  let activeView = 'phone';

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.view;
      if (target === activeView) return;
      activeView = target;
      buttons.forEach(b => b.classList.remove('view-nav__btn--active'));
      btn.classList.add('view-nav__btn--active');
      views.forEach(v => v.classList.remove('view--active'));
      document.getElementById(`view-${target}`).classList.add('view--active');
    });
  });

  // On mobile, force phone view
  if (isMobile) {
    activeView = 'phone';
    views.forEach(v => v.classList.remove('view--active'));
    document.getElementById('view-phone').classList.add('view--active');
  }

  // ---- Shared state ----
  const MAX_CARD_ROTATION = 20;
  const MAX_PHONE_ROTATION = 15;
  const SMOOTH = 0.1;

  let mouseX = 0.5, mouseY = 0.5;
  let useGyro = false;

  // ---- Standalone card (Card view) ----
  const cardStandalone = document.getElementById('card-standalone');
  const cardContainer = cardStandalone ? cardStandalone.parentElement : null;
  let csX = 0, csY = 0, csTX = 0, csTY = 0;

  // ---- Phone view ----
  const phone = document.querySelector('.phone');
  const cardPhone = document.getElementById('card-phone');
  const phoneCardContainer = document.querySelector('.phone .card-container');
  let cpX = 0, cpY = 0, cpTX = 0, cpTY = 0;

  // ---- Mouse tracking ----
  function handleMouse(e) {
    if (useGyro) return;
    const cx = e.clientX, cy = e.clientY;
    const maxDist = Math.max(window.innerWidth, window.innerHeight) * 0.5;

    if (activeView === 'card' && cardContainer) {
      const rect = cardContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX = Math.max(0, Math.min(1, 0.5 + (cx - centerX) / (maxDist * 2)));
      mouseY = Math.max(0, Math.min(1, 0.5 + (cy - centerY) / (maxDist * 2)));
      csTX = (0.5 - mouseY) * MAX_CARD_ROTATION * 2;
      csTY = (mouseX - 0.5) * MAX_CARD_ROTATION * 2;
    }

    if (activeView === 'phone' && phone) {
      const rect = phone.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX = Math.max(0, Math.min(1, 0.5 + (cx - centerX) / (maxDist * 2)));
      mouseY = Math.max(0, Math.min(1, 0.5 + (cy - centerY) / (maxDist * 2)));
      cpTX = (0.5 - mouseY) * MAX_PHONE_ROTATION * 2;
      cpTY = (mouseX - 0.5) * MAX_PHONE_ROTATION * 2;
    }
  }

  document.addEventListener('mousemove', handleMouse);

  // ---- Gyroscope (mobile) ----
  function initGyro() {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS — needs user gesture
      document.body.addEventListener('click', function reqPerm() {
        DeviceOrientationEvent.requestPermission().then(state => {
          if (state === 'granted') {
            useGyro = true;
            window.addEventListener('deviceorientation', handleGyro);
          }
        });
        document.body.removeEventListener('click', reqPerm);
      }, { once: true });
    } else if ('DeviceOrientationEvent' in window) {
      // Android — just works
      useGyro = true;
      window.addEventListener('deviceorientation', handleGyro);
    }
  }

  function handleGyro(e) {
    const beta = e.beta || 0;   // -180 to 180 (front/back tilt)
    const gamma = e.gamma || 0; // -90 to 90 (left/right tilt)

    // Normalize to 0-1 range centered around neutral hold (~40° beta)
    // Divide by 30 instead of 60 for more sensitivity on mobile
    mouseX = Math.max(0, Math.min(1, 0.5 + gamma / 30));
    mouseY = Math.max(0, Math.min(1, 0.5 - (beta - 40) / 30));

    cpTX = (0.5 - mouseY) * MAX_PHONE_ROTATION * 2;
    cpTY = (mouseX - 0.5) * MAX_PHONE_ROTATION * 2;
  }

  if (isMobile) initGyro();

  // ---- Animation ----
  function lerp(a, b, t) { return a + (b - a) * t; }

  function updateCard(card, rx, ry, applyTransform) {
    if (!card) return;
    if (applyTransform) {
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    const mx = `${mouseX * 100}%`;
    const my = `${mouseY * 100}%`;
    card.style.setProperty('--mx', mx);
    card.style.setProperty('--my', my);
    const borderAngle = Math.atan2(mouseY - 0.5, mouseX - 0.5) * (180 / Math.PI) + 90;
    card.style.setProperty('--border-angle', `${borderAngle}deg`);
    card.style.setProperty('--pointer-from-left', mouseX.toFixed(4));
    card.style.setProperty('--pointer-from-top', mouseY.toFixed(4));
    const dist = Math.sqrt(Math.pow(mouseX - 0.5, 2) + Math.pow(mouseY - 0.5, 2));
    const shineBase = isMobile ? 0.5 : 0.2;
    const shineMult = isMobile ? 3 : 2.5;
    const glareMult = isMobile ? 1.2 : 0.5;
    card.style.setProperty('--shine-opacity', Math.min(1, dist * shineMult + shineBase));
    card.style.setProperty('--glare-opacity', Math.min(0.8, dist * glareMult));
  }

  function animate() {
    if (activeView === 'card') {
      csX = lerp(csX, csTX, SMOOTH);
      csY = lerp(csY, csTY, SMOOTH);
      updateCard(cardStandalone, csX, csY, true);
    }

    if (activeView === 'phone') {
      cpX = lerp(cpX, cpTX, SMOOTH * 0.6);
      cpY = lerp(cpY, cpTY, SMOOTH * 0.6);

      // Phone tilt
      if (phone && !isMobile) {
        phone.style.setProperty('--phone-rx', `${cpX}deg`);
        phone.style.setProperty('--phone-ry', `${cpY}deg`);
      }

      // Card shifts position with tilt (parallax float)
      const translateX = cpY * 0.4;
      const translateY = cpX * (isMobile ? 0.3 : -0.3);
      updateCard(cardPhone, 0, 0, false);
      cardPhone.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;

      // Shadow parallax
      if (phoneCardContainer) {
        phoneCardContainer.style.setProperty('--shadow-x', `${cpY * -2}px`);
        phoneCardContainer.style.setProperty('--shadow-y', `${cpX * 1.4}px`);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
})();
