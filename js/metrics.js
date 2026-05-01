export class Metrics {
  constructor() {
    this.reset();
  }

  reset() {
    this.startTime = null;
    this.totalKeystrokes = 0;
    this.correctKeystrokes = 0;
    this.errors = 0;
    this.pausedTime = 0;
    this.lastKeystrokeTime = null;
  }

  recordKeystroke(correct) {
    const now = performance.now();

    if (!this.startTime) {
      this.startTime = now;
    }

    // Pause detection: if gap > 10 seconds, don't count that time
    if (this.lastKeystrokeTime && (now - this.lastKeystrokeTime) > 10000) {
      this.pausedTime += now - this.lastKeystrokeTime;
    }
    this.lastKeystrokeTime = now;

    this.totalKeystrokes++;
    if (correct) {
      this.correctKeystrokes++;
    } else {
      this.errors++;
    }
  }

  getElapsedSeconds() {
    if (!this.startTime) return 0;
    return (performance.now() - this.startTime - this.pausedTime) / 1000;
  }

  getWPM() {
    const minutes = this.getElapsedSeconds() / 60;
    if (minutes <= 0) return 0;
    // Standard: 1 word = 5 characters
    return Math.round((this.correctKeystrokes / 5) / minutes);
  }

  getAccuracy() {
    if (this.totalKeystrokes === 0) return 100;
    return Math.round((this.correctKeystrokes / this.totalKeystrokes) * 1000) / 10;
  }

  getResults() {
    return {
      wpm: this.getWPM(),
      accuracy: this.getAccuracy(),
      errors: this.errors,
      time: Math.round(this.getElapsedSeconds()),
      totalKeystrokes: this.totalKeystrokes,
    };
  }
}
