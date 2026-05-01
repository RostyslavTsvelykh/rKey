export const FINGER_COLORS = {
  'left-pinky':   '#e06c75',
  'left-ring':    '#e5c07b',
  'left-middle':  '#61afef',
  'left-index':   '#98c379',
  'right-index':  '#c678dd',
  'right-middle': '#56b6c2',
  'right-ring':   '#d19a66',
  'right-pinky':  '#be5046',
  'left-thumb':   '#abb2bf',
  'right-thumb':  '#abb2bf',
  'thumb':        '#abb2bf',
};

export const KEYBOARD_LAYOUT = [
  // Row 1: Number row
  [
    { key: '`', shift: '~', code: 'Backquote', width: 1, finger: 'left-pinky' },
    { key: '1', shift: '!', code: 'Digit1', width: 1, finger: 'left-pinky' },
    { key: '2', shift: '@', code: 'Digit2', width: 1, finger: 'left-ring' },
    { key: '3', shift: '#', code: 'Digit3', width: 1, finger: 'left-middle' },
    { key: '4', shift: '$', code: 'Digit4', width: 1, finger: 'left-index' },
    { key: '5', shift: '%', code: 'Digit5', width: 1, finger: 'left-index' },
    { key: '6', shift: '^', code: 'Digit6', width: 1, finger: 'right-index' },
    { key: '7', shift: '&', code: 'Digit7', width: 1, finger: 'right-index' },
    { key: '8', shift: '*', code: 'Digit8', width: 1, finger: 'right-middle' },
    { key: '9', shift: '(', code: 'Digit9', width: 1, finger: 'right-ring' },
    { key: '0', shift: ')', code: 'Digit0', width: 1, finger: 'right-ring' },
    { key: '-', shift: '_', code: 'Minus', width: 1, finger: 'right-pinky' },
    { key: '=', shift: '+', code: 'Equal', width: 1, finger: 'right-pinky' },
    { key: 'Backspace', label: 'delete', code: 'Backspace', width: 1.5, finger: 'right-pinky' },
  ],
  // Row 2: QWERTY row
  [
    { key: 'Tab', label: 'tab', code: 'Tab', width: 1.5, finger: 'left-pinky' },
    { key: 'q', code: 'KeyQ', width: 1, finger: 'left-pinky' },
    { key: 'w', code: 'KeyW', width: 1, finger: 'left-ring' },
    { key: 'e', code: 'KeyE', width: 1, finger: 'left-middle' },
    { key: 'r', code: 'KeyR', width: 1, finger: 'left-index' },
    { key: 't', code: 'KeyT', width: 1, finger: 'left-index' },
    { key: 'y', code: 'KeyY', width: 1, finger: 'right-index' },
    { key: 'u', code: 'KeyU', width: 1, finger: 'right-index' },
    { key: 'i', code: 'KeyI', width: 1, finger: 'right-middle' },
    { key: 'o', code: 'KeyO', width: 1, finger: 'right-ring' },
    { key: 'p', code: 'KeyP', width: 1, finger: 'right-pinky' },
    { key: '[', shift: '{', code: 'BracketLeft', width: 1, finger: 'right-pinky' },
    { key: ']', shift: '}', code: 'BracketRight', width: 1, finger: 'right-pinky' },
    { key: '\\', shift: '|', code: 'Backslash', width: 1, finger: 'right-pinky' },
  ],
  // Row 3: Home row
  [
    { key: 'CapsLock', label: 'caps lock', code: 'CapsLock', width: 1.75, finger: 'left-pinky' },
    { key: 'a', code: 'KeyA', width: 1, finger: 'left-pinky', home: true },
    { key: 's', code: 'KeyS', width: 1, finger: 'left-ring', home: true },
    { key: 'd', code: 'KeyD', width: 1, finger: 'left-middle', home: true },
    { key: 'f', code: 'KeyF', width: 1, finger: 'left-index', home: true },
    { key: 'g', code: 'KeyG', width: 1, finger: 'left-index' },
    { key: 'h', code: 'KeyH', width: 1, finger: 'right-index' },
    { key: 'j', code: 'KeyJ', width: 1, finger: 'right-index', home: true },
    { key: 'k', code: 'KeyK', width: 1, finger: 'right-middle', home: true },
    { key: 'l', code: 'KeyL', width: 1, finger: 'right-ring', home: true },
    { key: ';', shift: ':', code: 'Semicolon', width: 1, finger: 'right-pinky', home: true },
    { key: "'", shift: '"', code: 'Quote', width: 1, finger: 'right-pinky' },
    { key: 'Enter', label: 'return', code: 'Enter', width: 2.25, finger: 'right-pinky' },
  ],
  // Row 4: Bottom row
  [
    { key: 'Shift', label: 'shift', code: 'ShiftLeft', width: 2.25, finger: 'left-pinky' },
    { key: 'z', code: 'KeyZ', width: 1, finger: 'left-pinky' },
    { key: 'x', code: 'KeyX', width: 1, finger: 'left-ring' },
    { key: 'c', code: 'KeyC', width: 1, finger: 'left-middle' },
    { key: 'v', code: 'KeyV', width: 1, finger: 'left-index' },
    { key: 'b', code: 'KeyB', width: 1, finger: 'left-index' },
    { key: 'n', code: 'KeyN', width: 1, finger: 'right-index' },
    { key: 'm', code: 'KeyM', width: 1, finger: 'right-index' },
    { key: ',', shift: '<', code: 'Comma', width: 1, finger: 'right-middle' },
    { key: '.', shift: '>', code: 'Period', width: 1, finger: 'right-ring' },
    { key: '/', shift: '?', code: 'Slash', width: 1, finger: 'right-pinky' },
    { key: 'Shift', label: 'shift', code: 'ShiftRight', width: 2.75, finger: 'right-pinky' },
  ],
  // Row 5: Space bar row
  [
    { key: 'fn', label: 'fn', code: 'Fn', width: 1, finger: 'left-pinky' },
    { key: 'Control', label: '⌃', code: 'ControlLeft', width: 1, finger: 'left-pinky' },
    { key: 'Alt', label: '⌥', code: 'AltLeft', width: 1, finger: 'left-pinky' },
    { key: 'Meta', label: '⌘', code: 'MetaLeft', width: 1.25, finger: 'left-thumb' },
    { key: ' ', label: '', code: 'Space', width: 5.5, finger: 'thumb' },
    { key: 'Meta', label: '⌘', code: 'MetaRight', width: 1.25, finger: 'right-thumb' },
    { key: 'Alt', label: '⌥', code: 'AltRight', width: 1, finger: 'right-pinky' },
  ],
];

// Build a lookup: character -> { code, finger, needsShift }
export function buildCharMap() {
  const map = {};
  for (const row of KEYBOARD_LAYOUT) {
    for (const k of row) {
      if (k.key.length === 1) {
        map[k.key] = { code: k.code, finger: k.finger, needsShift: false };
      }
      if (k.shift && k.shift.length === 1) {
        map[k.shift] = { code: k.code, finger: k.finger, needsShift: true };
      }
      // Uppercase letters
      if (k.key.length === 1 && k.key >= 'a' && k.key <= 'z') {
        map[k.key.toUpperCase()] = { code: k.code, finger: k.finger, needsShift: true };
      }
    }
  }
  map[' '] = { code: 'Space', finger: 'thumb', needsShift: false };
  return map;
}
