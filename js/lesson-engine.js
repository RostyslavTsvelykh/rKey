import { Metrics } from './metrics.js';

export class LessonEngine {
  constructor(text, callbacks) {
    this.text = text;
    this.cursor = 0;
    this.metrics = new Metrics();
    this.onUpdate = callbacks.onUpdate || (() => {});
    this.onComplete = callbacks.onComplete || (() => {});
    this.active = false;
    this.handleKey = this.handleKey.bind(this);
  }

  start() {
    this.active = true;
    document.addEventListener('keydown', this.handleKey);
  }

  stop() {
    this.active = false;
    document.removeEventListener('keydown', this.handleKey);
  }

  handleKey(e) {
    if (!this.active) return;

    // Ignore modifier-only keys
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape', 'Fn'].includes(e.key)) {
      if (e.key === 'Escape') {
        this.onUpdate({ type: 'pause' });
      }
      return;
    }

    // Prevent default for keys that would interfere
    e.preventDefault();

    const expected = this.text[this.cursor];

    if (e.key === expected) {
      this.metrics.recordKeystroke(true);
      this.cursor++;
      this.onUpdate({
        type: 'correct',
        cursor: this.cursor,
        char: expected,
        code: e.code,
        metrics: this.metrics.getResults(),
      });

      if (this.cursor >= this.text.length) {
        this.stop();
        this.onComplete(this.metrics.getResults());
      }
    } else {
      this.metrics.recordKeystroke(false);
      this.onUpdate({
        type: 'incorrect',
        cursor: this.cursor,
        expected,
        got: e.key,
        code: e.code,
        metrics: this.metrics.getResults(),
      });
    }
  }
}
