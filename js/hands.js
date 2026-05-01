import { FINGER_COLORS } from './keyboard-data.js';

// Hands built from simple geometric shapes — rounded-rect fingers + palm.
// Much cleaner than trying to draw realistic outlines. Looks like a polished icon.

function leftHandHTML() {
  return `
  <svg viewBox="0 0 180 300" class="hand-svg hand-left" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hand-grad-l" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.06)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)"/>
      </linearGradient>
    </defs>

    <!-- Palm base -->
    <rect class="hand-palm" x="10" y="128" width="132" height="120" rx="28"
          fill="url(#hand-grad-l)" stroke="var(--hand-stroke)" stroke-width="2.5"/>

    <!-- Wrist -->
    <rect class="hand-palm" x="32" y="230" width="88" height="66" rx="16"
          fill="url(#hand-grad-l)" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    <!-- cover join -->
    <rect x="33" y="225" width="86" height="24" fill="var(--bg-base)" stroke="none"/>
    <line x1="32" y1="226" x2="32" y2="248" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    <line x1="120" y1="226" x2="120" y2="248" stroke="var(--hand-stroke)" stroke-width="2.5"/>

    <!-- Pinky -->
    <g class="hand-finger" data-finger="left-pinky">
      <rect class="finger-shape" x="12" y="62" width="26" height="100" rx="13"
            fill="url(#hand-grad-l)" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    </g>

    <!-- Ring -->
    <g class="hand-finger" data-finger="left-ring">
      <rect class="finger-shape" x="42" y="24" width="28" height="138" rx="14"
            fill="url(#hand-grad-l)" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    </g>

    <!-- Middle -->
    <g class="hand-finger" data-finger="left-middle">
      <rect class="finger-shape" x="74" y="4" width="28" height="158" rx="14"
            fill="url(#hand-grad-l)" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    </g>

    <!-- Index -->
    <g class="hand-finger" data-finger="left-index">
      <rect class="finger-shape" x="106" y="28" width="28" height="134" rx="14"
            fill="url(#hand-grad-l)" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    </g>

    <!-- Thumb -->
    <g class="hand-finger" data-finger="left-thumb">
      <rect class="finger-shape" x="118" y="140" width="52" height="28" rx="14"
            fill="url(#hand-grad-l)" stroke="var(--hand-stroke)" stroke-width="2.5"
            transform="rotate(-35 144 154)"/>
    </g>

    <!-- Palm cover (hides finger-base strokes where they overlap palm) -->
    <rect x="13" y="132" width="126" height="50" rx="4" fill="var(--bg-base)" stroke="none"/>
    <!-- Re-draw palm top edge cleanly -->
    <path d="M 38,128 Q 10,128 10,156" fill="none" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    <path d="M 114,128 Q 142,128 142,156" fill="none" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    <line x1="10" y1="156" x2="10" y2="220" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    <line x1="142" y1="156" x2="142" y2="186" stroke="var(--hand-stroke)" stroke-width="2.5"/>
  </svg>`;
}

function rightHandHTML() {
  return `
  <svg viewBox="0 0 180 300" class="hand-svg hand-right" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hand-grad-r" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.06)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)"/>
      </linearGradient>
    </defs>

    <!-- Palm base -->
    <rect class="hand-palm" x="38" y="128" width="132" height="120" rx="28"
          fill="url(#hand-grad-r)" stroke="var(--hand-stroke)" stroke-width="2.5"/>

    <!-- Wrist -->
    <rect class="hand-palm" x="60" y="230" width="88" height="66" rx="16"
          fill="url(#hand-grad-r)" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    <rect x="61" y="225" width="86" height="24" fill="var(--bg-base)" stroke="none"/>
    <line x1="60" y1="226" x2="60" y2="248" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    <line x1="148" y1="226" x2="148" y2="248" stroke="var(--hand-stroke)" stroke-width="2.5"/>

    <!-- Index -->
    <g class="hand-finger" data-finger="right-index">
      <rect class="finger-shape" x="46" y="28" width="28" height="134" rx="14"
            fill="url(#hand-grad-r)" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    </g>

    <!-- Middle -->
    <g class="hand-finger" data-finger="right-middle">
      <rect class="finger-shape" x="78" y="4" width="28" height="158" rx="14"
            fill="url(#hand-grad-r)" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    </g>

    <!-- Ring -->
    <g class="hand-finger" data-finger="right-ring">
      <rect class="finger-shape" x="110" y="24" width="28" height="138" rx="14"
            fill="url(#hand-grad-r)" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    </g>

    <!-- Pinky -->
    <g class="hand-finger" data-finger="right-pinky">
      <rect class="finger-shape" x="142" y="62" width="26" height="100" rx="13"
            fill="url(#hand-grad-r)" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    </g>

    <!-- Thumb -->
    <g class="hand-finger" data-finger="right-thumb">
      <rect class="finger-shape" x="10" y="140" width="52" height="28" rx="14"
            fill="url(#hand-grad-r)" stroke="var(--hand-stroke)" stroke-width="2.5"
            transform="rotate(35 36 154)"/>
    </g>

    <!-- Palm cover -->
    <rect x="41" y="132" width="126" height="50" rx="4" fill="var(--bg-base)" stroke="none"/>
    <path d="M 66,128 Q 38,128 38,156" fill="none" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    <path d="M 142,128 Q 170,128 170,156" fill="none" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    <line x1="38" y1="156" x2="38" y2="186" stroke="var(--hand-stroke)" stroke-width="2.5"/>
    <line x1="170" y1="156" x2="170" y2="220" stroke="var(--hand-stroke)" stroke-width="2.5"/>
  </svg>`;
}

export class Hands {
  constructor(containerEl) {
    this.container = containerEl;
    this.container.className = 'hands-container';
    this.fingerElements = new Map();
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="hand-wrapper hand-wrapper-left">${leftHandHTML()}</div>
      <div class="hand-wrapper hand-wrapper-right">${rightHandHTML()}</div>
    `;
    this.container.querySelectorAll('.hand-finger').forEach(el => {
      this.fingerElements.set(el.getAttribute('data-finger'), el);
    });
  }

  highlightFinger(finger) {
    this.clearHighlight();
    if (!finger) return;
    if (finger === 'thumb') {
      this._activate('left-thumb');
      this._activate('right-thumb');
      return;
    }
    this._activate(finger);
  }

  _activate(finger) {
    const el = this.fingerElements.get(finger);
    if (!el) return;
    const color = FINGER_COLORS[finger] || '#8b9cc7';
    el.classList.add('active');
    const shape = el.querySelector('.finger-shape');
    if (shape) {
      shape.style.fill = color;
      shape.style.fillOpacity = '0.35';
      shape.style.stroke = color;
      shape.style.filter = `drop-shadow(0 0 8px ${color}50)`;
    }
  }

  highlightShift(finger) {
    const shiftFinger = finger.startsWith('right') ? 'left-pinky' : 'right-pinky';
    this._activate(shiftFinger);
  }

  clearHighlight() {
    this.fingerElements.forEach(el => {
      el.classList.remove('active');
      const shape = el.querySelector('.finger-shape');
      if (shape) {
        shape.style.fill = '';
        shape.style.fillOpacity = '';
        shape.style.stroke = '';
        shape.style.filter = '';
      }
    });
  }
}
