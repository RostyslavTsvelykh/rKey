import { KEYBOARD_LAYOUT, FINGER_COLORS, buildCharMap } from './keyboard-data.js';

export class Keyboard {
  constructor(containerEl) {
    this.container = containerEl;
    this.keyElements = new Map(); // code -> DOM element
    this.charMap = buildCharMap();
    this.render();
    this.bindPhysicalKeys();
  }

  render() {
    const kbd = document.createElement('div');
    kbd.className = 'keyboard';

    for (const row of KEYBOARD_LAYOUT) {
      const rowEl = document.createElement('div');
      rowEl.className = 'keyboard-row';

      for (const keyData of row) {
        const keyEl = document.createElement('div');
        keyEl.className = 'key';
        if (keyData.home) keyEl.classList.add('home-key');

        keyEl.setAttribute('data-code', keyData.code);
        keyEl.setAttribute('data-finger', keyData.finger);
        keyEl.setAttribute('data-width', keyData.width.toString());

        // Build label
        const labelEl = document.createElement('span');
        labelEl.className = 'key-label';

        if (keyData.label !== undefined) {
          labelEl.textContent = keyData.label;
        } else if (keyData.shift && keyData.key.length === 1) {
          const shiftSpan = document.createElement('span');
          shiftSpan.className = 'shift-char';
          shiftSpan.textContent = keyData.shift;
          labelEl.appendChild(shiftSpan);
          labelEl.appendChild(document.createTextNode(keyData.key));
        } else {
          labelEl.textContent = keyData.key;
        }

        keyEl.appendChild(labelEl);
        rowEl.appendChild(keyEl);
        this.keyElements.set(keyData.code, keyEl);
      }

      kbd.appendChild(rowEl);
    }

    this.container.innerHTML = '';
    this.container.appendChild(kbd);
  }

  bindPhysicalKeys() {
    document.addEventListener('keydown', (e) => {
      const el = this.keyElements.get(e.code);
      if (el) el.classList.add('pressed');
    });

    document.addEventListener('keyup', (e) => {
      const el = this.keyElements.get(e.code);
      if (el) el.classList.remove('pressed');
    });
  }

  highlightForChar(char) {
    this.clearHighlight();
    const info = this.charMap[char];
    if (!info) return;

    const el = this.keyElements.get(info.code);
    if (el) el.classList.add('highlight');

    // Also highlight Shift if needed
    if (info.needsShift) {
      // Highlight opposite-hand Shift
      const finger = info.finger;
      const shiftCode = finger.startsWith('right') ? 'ShiftLeft' : 'ShiftRight';
      const shiftEl = this.keyElements.get(shiftCode);
      if (shiftEl) shiftEl.classList.add('highlight');
    }

    return info;
  }

  clearHighlight() {
    for (const el of this.keyElements.values()) {
      el.classList.remove('highlight');
    }
  }

  flashCorrect(code) {
    const el = this.keyElements.get(code);
    if (!el) return;
    el.classList.add('correct-flash');
    setTimeout(() => el.classList.remove('correct-flash'), 200);
  }

  flashError(code) {
    const el = this.keyElements.get(code);
    if (!el) return;
    el.classList.remove('error-shake');
    void el.offsetWidth; // force reflow
    el.classList.add('error-shake');
    setTimeout(() => el.classList.remove('error-shake'), 300);
  }

  getFingerName(finger) {
    if (!finger) return '';
    return finger.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  getFingerColor(finger) {
    return FINGER_COLORS[finger] || '#abb2bf';
  }
}
