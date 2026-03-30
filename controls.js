/**
 * Control Panel for VCFC 3D Card
 * Live-tweaks all effect parameters
 */
(function () {
  const card = document.getElementById('card');
  const container = card.parentElement;
  const shine = card.querySelector('.card__shine');
  const glare = card.querySelector('.card__glare');
  const panel = document.getElementById('panel');
  const panelToggle = document.getElementById('panelToggle');

  // Toggle panel
  panelToggle.addEventListener('click', () => {
    panel.classList.toggle('panel--open');
  });

  // ---- Helper: bind a slider to a value display and a callback ----
  function bind(sliderId, valueId, callback) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(valueId);
    if (!slider || !display) return;

    slider.addEventListener('input', () => {
      display.textContent = slider.value;
      callback(parseFloat(slider.value));
    });

    // Return reset function
    return () => {
      slider.value = slider.defaultValue;
      display.textContent = slider.defaultValue;
      callback(parseFloat(slider.defaultValue));
    };
  }

  function bindSelect(selectId, callback) {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.addEventListener('change', () => callback(select.value));
    return () => {
      select.value = select.options[0].value;
      callback(select.value);
    };
  }

  const resets = [];

  // ---- 3D Rotation ----
  resets.push(bind('c-rotation', 'v-rotation', (v) => {
    window.__maxRotation = v;
  }));

  resets.push(bind('c-smooth', 'v-smooth', (v) => {
    window.__smoothFactor = v;
  }));

  resets.push(bind('c-perspective', 'v-perspective', (v) => {
    container.style.perspective = v + 'px';
  }));

  // ---- Shine ----
  function updateShineFilter() {
    const b = document.getElementById('c-shine-bright').value;
    const c = document.getElementById('c-shine-contrast').value;
    const s = document.getElementById('c-shine-saturate').value;
    shine.style.filter = `brightness(${b}) contrast(${c}) saturate(${s})`;
  }

  resets.push(bind('c-shine-bright', 'v-shine-bright', updateShineFilter));
  resets.push(bind('c-shine-contrast', 'v-shine-contrast', updateShineFilter));
  resets.push(bind('c-shine-saturate', 'v-shine-saturate', updateShineFilter));

  resets.push(bind('c-shine-opacity', 'v-shine-opacity', (v) => {
    window.__shineOpacityMult = v;
  }));

  resets.push(bind('c-shine-base', 'v-shine-base', (v) => {
    window.__shineOpacityBase = v;
  }));

  // Shine layers
  function updateShineSizes() {
    const spotlight = document.getElementById('c-spotlight-size').value;
    const sweep = document.getElementById('c-sweep-size').value;
    shine.style.backgroundSize = `${spotlight}% ${spotlight}%, ${sweep}% ${sweep}%, 100% 100%`;
  }

  resets.push(bind('c-spotlight-size', 'v-spotlight-size', updateShineSizes));
  resets.push(bind('c-sweep-size', 'v-sweep-size', updateShineSizes));

  resets.push(bindSelect('c-shine-blend', (v) => {
    shine.style.mixBlendMode = v;
  }));

  // ---- Glare ----
  function updateGlareFilter() {
    const b = document.getElementById('c-glare-bright').value;
    const c = document.getElementById('c-glare-contrast').value;
    glare.style.filter = `brightness(${b}) contrast(${c})`;
  }

  resets.push(bind('c-glare-bright', 'v-glare-bright', updateGlareFilter));
  resets.push(bind('c-glare-contrast', 'v-glare-contrast', updateGlareFilter));

  resets.push(bind('c-glare-opacity', 'v-glare-opacity', (v) => {
    window.__glareOpacityMult = v;
  }));

  resets.push(bindSelect('c-glare-blend', (v) => {
    glare.style.mixBlendMode = v;
  }));

  // ---- Parallax Depth ----
  const depthMap = {
    'c-depth-logo': '.card__logo-group',
    'c-depth-chip': '.card__chip',
    'c-depth-contactless': '.card__contactless',
    'c-depth-mc': '.card__mastercard',
    'c-depth-wd': '.card__world-debit',
  };

  Object.entries(depthMap).forEach(([sliderId, selector]) => {
    const valueId = 'v-' + sliderId.slice(2);
    resets.push(bind(sliderId, valueId, (v) => {
      const el = card.querySelector(selector);
      if (el) el.dataset.depth = v;
    }));
  });

  // ---- Border ----
  resets.push(bind('c-border-width', 'v-border-width', (v) => {
    card.style.setProperty('--border-width', v + 'px');
  }));

  // ---- Reset ----
  document.getElementById('btn-reset').addEventListener('click', () => {
    resets.forEach(fn => fn && fn());
    // Reset inline styles
    shine.style.filter = '';
    shine.style.mixBlendMode = '';
    shine.style.backgroundSize = '';
    glare.style.filter = '';
    glare.style.mixBlendMode = '';
    container.style.perspective = '';
    card.style.removeProperty('--border-width');
    window.__maxRotation = undefined;
    window.__smoothFactor = undefined;
    window.__shineOpacityMult = undefined;
    window.__shineOpacityBase = undefined;
    window.__glareOpacityMult = undefined;
  });

  // ---- Export ----
  document.getElementById('btn-export').addEventListener('click', () => {
    const values = {
      rotation: document.getElementById('c-rotation').value,
      smoothing: document.getElementById('c-smooth').value,
      perspective: document.getElementById('c-perspective').value,
      shine: {
        brightness: document.getElementById('c-shine-bright').value,
        contrast: document.getElementById('c-shine-contrast').value,
        saturate: document.getElementById('c-shine-saturate').value,
        opacityMult: document.getElementById('c-shine-opacity').value,
        opacityBase: document.getElementById('c-shine-base').value,
        spotlightSize: document.getElementById('c-spotlight-size').value,
        sweepSize: document.getElementById('c-sweep-size').value,
        blendMode: document.getElementById('c-shine-blend').value,
      },
      glare: {
        brightness: document.getElementById('c-glare-bright').value,
        contrast: document.getElementById('c-glare-contrast').value,
        opacityMult: document.getElementById('c-glare-opacity').value,
        blendMode: document.getElementById('c-glare-blend').value,
      },
      depths: {
        logo: document.getElementById('c-depth-logo').value,
        chip: document.getElementById('c-depth-chip').value,
        contactless: document.getElementById('c-depth-contactless').value,
        mastercard: document.getElementById('c-depth-mc').value,
        worldDebit: document.getElementById('c-depth-wd').value,
      },
      borderWidth: document.getElementById('c-border-width').value,
    };

    const text = JSON.stringify(values, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('btn-export');
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy CSS Values', 1500);
    });
  });

})();
