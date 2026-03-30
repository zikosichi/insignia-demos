/**
 * VCFC Premium 3D Card Effect
 * Handles mouse tracking, 3D rotation, parallax depth, and lighting
 */

(function () {
  const card = document.getElementById('card');
  const container = card.parentElement;

  // Config
  const MAX_ROTATION = 20;       // degrees
  const PERSPECTIVE = 800;
  const SMOOTH_FACTOR = 0.12;    // lerp factor for smooth follow
  const RETURN_SPEED = 0.05;     // speed of return to flat
  const IDLE_TIMEOUT = 3000;     // ms before card enters idle shimmer

  // State
  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;
  let mouseX = 0.5, mouseY = 0.5;
  let isHovering = false;
  let idleTimer = null;
  let rafId = null;

  // ---- Depth elements (parallax) ----
  const depthElements = card.querySelectorAll('[data-depth]');

  // ---- Mouse / Touch handlers ----

  function handlePointerMove(e) {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let clientX, clientY;

    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Map cursor position relative to card center, normalized to 0-1
    // Works from anywhere on the page — further away = more tilt
    const maxDistance = Math.max(window.innerWidth, window.innerHeight) * 0.5;
    mouseX = 0.5 + (clientX - centerX) / (maxDistance * 2);
    mouseY = 0.5 + (clientY - centerY) / (maxDistance * 2);

    // Clamp to 0-1
    mouseX = Math.max(0, Math.min(1, mouseX));
    mouseY = Math.max(0, Math.min(1, mouseY));

    // Rotation targets (centered at 0.5)
    const rot = window.__maxRotation !== undefined ? window.__maxRotation : MAX_ROTATION;
    targetX = (0.5 - mouseY) * rot * 2;
    targetY = (mouseX - 0.5) * rot * 2;

    // Reset idle timer
    card.classList.remove('card--idle');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (!isHovering) card.classList.add('card--idle');
    }, IDLE_TIMEOUT);
  }

  function handlePointerEnter() {
    isHovering = true;
    card.classList.remove('card--idle');
    card.style.transition = 'none';
    clearTimeout(idleTimer);
  }

  // ---- Animation loop ----

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function animate() {
    const factor = window.__smoothFactor !== undefined ? window.__smoothFactor : SMOOTH_FACTOR;

    currentX = lerp(currentX, targetX, factor);
    currentY = lerp(currentY, targetY, factor);

    // Apply rotation
    card.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

    // Update CSS custom properties for lighting
    const mx = `${mouseX * 100}%`;
    const my = `${mouseY * 100}%`;
    card.style.setProperty('--mx', mx);
    card.style.setProperty('--my', my);
    card.style.setProperty('--rx', `${currentX}deg`);
    card.style.setProperty('--ry', `${currentY}deg`);

    // Dynamic border angle — follows the "light source"
    const borderAngle = Math.atan2(mouseY - 0.5, mouseX - 0.5) * (180 / Math.PI) + 90;
    card.style.setProperty('--border-angle', `${borderAngle}deg`);

    // Foil effect properties (Pokemon card technique)
    card.style.setProperty('--pointer-from-left', mouseX.toFixed(4));
    card.style.setProperty('--pointer-from-top', mouseY.toFixed(4));
    const distFromCenter = Math.sqrt(
      Math.pow(mouseX - 0.5, 2) + Math.pow(mouseY - 0.5, 2)
    );
    card.style.setProperty('--pointer-from-center', distFromCenter.toFixed(4));

    // Shine/glare intensity (controllable via panel)
    const sMult = window.__shineOpacityMult !== undefined ? window.__shineOpacityMult : 2.5;
    const sBase = window.__shineOpacityBase !== undefined ? window.__shineOpacityBase : 0.2;
    const gMult = window.__glareOpacityMult !== undefined ? window.__glareOpacityMult : 1.8;
    const shineIntensity = Math.min(1, distFromCenter * sMult + sBase);
    card.style.setProperty('--shine-opacity', shineIntensity);
    card.style.setProperty('--glare-opacity', Math.min(0.8, distFromCenter * gMult));

    // Parallax depth on content elements
    depthElements.forEach(el => {
      const depth = parseFloat(el.dataset.depth) || 0;
      const moveX = (mouseX - 0.5) * depth * 0.15;
      const moveY = (mouseY - 0.5) * depth * 0.15;
      el.style.transform = `translateZ(${depth}px) translateX(${moveX}px) translateY(${moveY}px)`;
    });

    // Shadow beneath card follows tilt
    container.style.setProperty('--rx', `${currentX * 0.3}deg`);
    container.style.setProperty('--ry', `${currentY * 0.3}deg`);

    rafId = requestAnimationFrame(animate);
  }

  // ---- Event binding ----

  // Track cursor everywhere on the page
  document.addEventListener('mousemove', handlePointerMove);
  container.addEventListener('mouseenter', handlePointerEnter);

  // Touch support
  document.addEventListener('touchmove', (e) => {
    handlePointerMove(e);
  }, { passive: true });
  document.addEventListener('touchstart', (e) => {
    handlePointerEnter();
    handlePointerMove(e);
  });

  // ---- Init ----

  // Start idle shimmer after initial load
  idleTimer = setTimeout(() => {
    card.classList.add('card--idle');
  }, IDLE_TIMEOUT);

  // Start render loop
  animate();

})();
