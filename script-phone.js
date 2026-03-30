/**
 * VCFC Phone Mockup — 3D Card + Phone Gyro Effect
 */
(function () {
  const card = document.getElementById('card');
  const container = card.parentElement;
  const phone = document.querySelector('.phone');

  const CARD_MAX_ROTATION = 8;
  const PHONE_MAX_ROTATION = 15;
  const SMOOTH_FACTOR = 0.1;

  let currentCardX = 0, currentCardY = 0;
  let targetCardX = 0, targetCardY = 0;
  let currentPhoneX = 0, currentPhoneY = 0;
  let targetPhoneX = 0, targetPhoneY = 0;
  let mouseX = 0.5, mouseY = 0.5;

  function handlePointerMove(e) {
    const phoneRect = phone.getBoundingClientRect();
    const phoneCenterX = phoneRect.left + phoneRect.width / 2;
    const phoneCenterY = phoneRect.top + phoneRect.height / 2;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // Normalized position relative to phone center
    const maxDist = Math.max(window.innerWidth, window.innerHeight) * 0.5;
    mouseX = Math.max(0, Math.min(1, 0.5 + (clientX - phoneCenterX) / (maxDist * 2)));
    mouseY = Math.max(0, Math.min(1, 0.5 + (clientY - phoneCenterY) / (maxDist * 2)));

    // Card rotation (stronger)
    targetCardX = (0.5 - mouseY) * CARD_MAX_ROTATION * 2;
    targetCardY = (mouseX - 0.5) * CARD_MAX_ROTATION * 2;

    // Phone rotation (subtle, simulates holding the phone and tilting)
    targetPhoneX = (0.5 - mouseY) * PHONE_MAX_ROTATION * 2;
    targetPhoneY = (mouseX - 0.5) * PHONE_MAX_ROTATION * 2;
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    // Smooth interpolation
    currentCardX = lerp(currentCardX, targetCardX, SMOOTH_FACTOR);
    currentCardY = lerp(currentCardY, targetCardY, SMOOTH_FACTOR);
    currentPhoneX = lerp(currentPhoneX, targetPhoneX, SMOOTH_FACTOR * 0.6);
    currentPhoneY = lerp(currentPhoneY, targetPhoneY, SMOOTH_FACTOR * 0.6);

    // Apply phone rotation
    phone.style.setProperty('--phone-rx', `${currentPhoneX}deg`);
    phone.style.setProperty('--phone-ry', `${currentPhoneY}deg`);

    // Card shadow follows tilt (opposite direction for natural feel)
    const cardSection = document.querySelector('.card-section');
    if (cardSection) {
      cardSection.style.setProperty('--shadow-x', `${currentPhoneY * -2}px`);
      cardSection.style.setProperty('--shadow-y', `${currentPhoneX * 1.4}px`);
    }

    // Card stays flat — only the shine/foil effects react to cursor
    card.style.transform = 'none';

    // Card lighting properties
    card.style.setProperty('--mx', `${mouseX * 100}%`);
    card.style.setProperty('--my', `${mouseY * 100}%`);

    const borderAngle = Math.atan2(mouseY - 0.5, mouseX - 0.5) * (180 / Math.PI) + 90;
    card.style.setProperty('--border-angle', `${borderAngle}deg`);

    card.style.setProperty('--pointer-from-left', mouseX.toFixed(4));
    card.style.setProperty('--pointer-from-top', mouseY.toFixed(4));

    const distFromCenter = Math.sqrt(
      Math.pow(mouseX - 0.5, 2) + Math.pow(mouseY - 0.5, 2)
    );
    card.style.setProperty('--shine-opacity', Math.min(1, distFromCenter * 2.5 + 0.2));
    card.style.setProperty('--glare-opacity', Math.min(0.8, distFromCenter * 0.5));

    requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', handlePointerMove);
  document.addEventListener('touchmove', handlePointerMove, { passive: true });
  document.addEventListener('touchstart', handlePointerMove);

  animate();
})();
