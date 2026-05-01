import { Keyboard } from './keyboard.js';
import { Hands } from './hands.js';
import { LessonEngine } from './lesson-engine.js';
import { LESSONS, getLessonById, getLessonsByTier } from './lessons-data.js';
import { loadProgress, saveResult, getUnlockedTier, getLessonBest, resetProgress } from './progress.js';
import { showScreen, renderTextDisplay, markCharError, updateStats, formatDate, buildWPMChart } from './ui.js';

// Make lessons accessible to progress module
window.__lessonsCache = { LESSONS };

class App {
  constructor() {
    this.keyboard = null;
    this.hands = null;
    this.engine = null;
    this.currentLesson = null;
    this.currentExerciseIndex = 0;
    this.statsInterval = null;
    this.init();
  }

  init() {
    // Initialize keyboard and hands
    this.keyboard = new Keyboard(document.getElementById('keyboard-container'));
    this.hands = new Hands(document.getElementById('hands-container'));

    // Bind navigation
    document.getElementById('btn-start').addEventListener('click', () => this.showLessonSelect());
    document.getElementById('btn-progress').addEventListener('click', () => this.showProgress());
    document.getElementById('btn-back-lessons').addEventListener('click', () => this.showHome());
    document.getElementById('btn-back-typing').addEventListener('click', () => this.confirmQuit());
    document.getElementById('btn-back-progress').addEventListener('click', () => this.showHome());
    document.getElementById('btn-back-results').addEventListener('click', () => this.showLessonSelect());
    document.getElementById('btn-next-lesson').addEventListener('click', () => this.nextExercise());
    document.getElementById('btn-retry').addEventListener('click', () => this.startExercise());
    document.getElementById('btn-reset').addEventListener('click', () => this.handleReset());

    // Pause overlay
    document.getElementById('btn-resume').addEventListener('click', () => this.resumeLesson());
    document.getElementById('btn-quit').addEventListener('click', () => this.quitLesson());

    this.showHome();
  }

  showHome() {
    this.cleanup();
    showScreen('home-screen');
  }

  showLessonSelect() {
    this.cleanup();
    const container = document.getElementById('lesson-list');
    const tiers = getLessonsByTier();
    const unlockedTier = getUnlockedTier();
    let html = '';

    for (const [tierNum, tierData] of Object.entries(tiers)) {
      const tier = parseInt(tierNum);
      const locked = tier > unlockedTier;
      html += `<div class="tier-section">`;
      html += `<div class="tier-title">Tier ${tier}: ${tierData.name}</div>`;
      html += `<div class="tier-lessons">`;

      for (const lesson of tierData.lessons) {
        const best = getLessonBest(lesson.id);
        const completed = !!best;
        const classes = ['lesson-card'];
        if (locked) classes.push('locked');
        if (completed) classes.push('completed');

        html += `<div class="${classes.join(' ')}" data-lesson-id="${lesson.id}" ${locked ? '' : 'tabindex="0"'}>`;
        html += `<div class="lesson-title">${lesson.title}</div>`;
        html += `<div class="lesson-desc">${lesson.description}</div>`;
        if (completed) {
          html += `<div class="lesson-stats"><span>${best.bestWPM} WPM</span><span>${best.bestAccuracy}%</span></div>`;
          html += `<span class="checkmark">&#10003;</span>`;
        }
        html += `</div>`;
      }

      html += `</div></div>`;
    }

    container.innerHTML = html;

    // Bind lesson clicks
    container.querySelectorAll('.lesson-card:not(.locked)').forEach(card => {
      card.addEventListener('click', () => {
        const lessonId = card.getAttribute('data-lesson-id');
        this.startLesson(lessonId);
      });
    });

    showScreen('lesson-screen');
  }

  startLesson(lessonId) {
    this.currentLesson = getLessonById(lessonId);
    if (!this.currentLesson) return;
    this.currentExerciseIndex = 0;
    this.startExercise();
  }

  startExercise() {
    const text = this.currentLesson.exercises[this.currentExerciseIndex];
    if (!text) return;

    document.getElementById('typing-lesson-title').textContent =
      `${this.currentLesson.title} (${this.currentExerciseIndex + 1}/${this.currentLesson.exercises.length})`;

    const textDisplay = document.getElementById('text-display');
    renderTextDisplay(textDisplay, text, 0);

    // Highlight first key
    const info = this.keyboard.highlightForChar(text[0]);
    this.updateFingerHint(info);

    // Reset stats display
    updateStats(
      document.getElementById('wpm-value'),
      document.getElementById('acc-value'),
      document.getElementById('err-value'),
      document.getElementById('time-value'),
      { wpm: 0, accuracy: 100, errors: 0, time: 0 }
    );

    // Create and start engine
    if (this.engine) this.engine.stop();

    this.engine = new LessonEngine(text, {
      onUpdate: (event) => this.handleTypingEvent(event, text),
      onComplete: (results) => this.handleComplete(results),
    });

    showScreen('typing-screen');

    // Small delay before starting to let user see the text
    setTimeout(() => {
      this.engine.start();
      // Live timer update
      this.statsInterval = setInterval(() => {
        if (this.engine && this.engine.active) {
          const m = this.engine.metrics.getResults();
          updateStats(
            document.getElementById('wpm-value'),
            document.getElementById('acc-value'),
            document.getElementById('err-value'),
            document.getElementById('time-value'),
            m
          );
        }
      }, 200);
    }, 300);
  }

  handleTypingEvent(event, text) {
    const textDisplay = document.getElementById('text-display');

    if (event.type === 'correct') {
      renderTextDisplay(textDisplay, text, event.cursor);
      this.keyboard.flashCorrect(event.code);

      // Highlight next key
      if (event.cursor < text.length) {
        const info = this.keyboard.highlightForChar(text[event.cursor]);
        this.updateFingerHint(info);
      } else {
        this.keyboard.clearHighlight();
        this.updateFingerHint(null);
      }

      updateStats(
        document.getElementById('wpm-value'),
        document.getElementById('acc-value'),
        document.getElementById('err-value'),
        document.getElementById('time-value'),
        event.metrics
      );
    } else if (event.type === 'incorrect') {
      markCharError(textDisplay, event.cursor);
      this.keyboard.flashError(event.code);
      updateStats(
        document.getElementById('wpm-value'),
        document.getElementById('acc-value'),
        document.getElementById('err-value'),
        document.getElementById('time-value'),
        event.metrics
      );
    } else if (event.type === 'pause') {
      this.pauseLesson();
    }
  }

  handleComplete(results) {
    this.cleanup();

    // Save results
    const updated = saveResult(this.currentLesson.id, this.currentLesson.title, results);
    const best = updated.lessonsCompleted[this.currentLesson.id];

    // Show results
    document.getElementById('result-wpm').textContent = results.wpm;
    document.getElementById('result-accuracy').textContent = results.accuracy + '%';
    document.getElementById('result-errors').textContent = results.errors;
    const m = Math.floor(results.time / 60);
    const s = results.time % 60;
    document.getElementById('result-time').textContent = `${m}:${s.toString().padStart(2, '0')}`;

    // Best indicators
    const wpmBest = document.getElementById('result-wpm-best');
    const accBest = document.getElementById('result-acc-best');

    if (results.wpm >= best.bestWPM) {
      wpmBest.textContent = 'New best!';
      wpmBest.className = 'result-best new-best';
    } else {
      wpmBest.textContent = `Best: ${best.bestWPM}`;
      wpmBest.className = 'result-best';
    }

    if (results.accuracy >= best.bestAccuracy) {
      accBest.textContent = 'New best!';
      accBest.className = 'result-best new-best';
    } else {
      accBest.textContent = `Best: ${best.bestAccuracy}%`;
      accBest.className = 'result-best';
    }

    // Update next button text
    const nextBtn = document.getElementById('btn-next-lesson');
    if (this.currentExerciseIndex < this.currentLesson.exercises.length - 1) {
      nextBtn.textContent = 'Next Exercise';
    } else {
      nextBtn.textContent = 'Back to Lessons';
    }

    showScreen('results-screen');
  }

  nextExercise() {
    if (this.currentExerciseIndex < this.currentLesson.exercises.length - 1) {
      this.currentExerciseIndex++;
      this.startExercise();
    } else {
      this.showLessonSelect();
    }
  }

  pauseLesson() {
    if (this.engine) this.engine.active = false;
    document.getElementById('pause-overlay').classList.add('active');
  }

  resumeLesson() {
    document.getElementById('pause-overlay').classList.remove('active');
    if (this.engine) {
      this.engine.active = true;
    }
  }

  confirmQuit() {
    this.pauseLesson();
  }

  quitLesson() {
    document.getElementById('pause-overlay').classList.remove('active');
    this.cleanup();
    this.showLessonSelect();
  }

  showProgress() {
    const data = loadProgress();

    // Overview stats
    const completedCount = Object.keys(data.lessonsCompleted).length;
    document.getElementById('progress-completed').textContent = completedCount;
    document.getElementById('progress-best-wpm').textContent = data.stats.allTimeBestWPM || '-';

    const totalMin = Math.round(data.stats.totalTimeSeconds / 60);
    document.getElementById('progress-time').textContent = totalMin > 0 ? `${totalMin}m` : '0m';

    // WPM chart
    buildWPMChart(document.getElementById('wpm-chart'), data.history);

    // History list
    const historyContainer = document.getElementById('history-list');
    if (data.history.length === 0) {
      historyContainer.innerHTML = '<p style="color: var(--text-dim); text-align: center; padding: 20px;">Complete some lessons to see your history</p>';
    } else {
      historyContainer.innerHTML = data.history.slice(0, 20).map(h => `
        <div class="history-item">
          <div>
            <div class="history-lesson">${h.lessonTitle}</div>
            <div class="history-date">${formatDate(h.date)}</div>
          </div>
          <div class="history-stats">
            <span>${h.wpm} WPM</span>
            <span>${h.accuracy}%</span>
          </div>
        </div>
      `).join('');
    }

    showScreen('progress-screen');
  }

  handleReset() {
    if (confirm('Reset all progress? This cannot be undone.')) {
      resetProgress();
      this.showProgress();
    }
  }

  cleanup() {
    if (this.engine) {
      this.engine.stop();
      this.engine = null;
    }
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
      this.statsInterval = null;
    }
    this.keyboard.clearHighlight();
    this.hands.clearHighlight();
  }

  updateFingerHint(info) {
    const hint = document.getElementById('finger-hint');
    if (!info) {
      hint.innerHTML = '';
      this.hands.clearHighlight();
      return;
    }
    const name = this.keyboard.getFingerName(info.finger);
    const color = this.keyboard.getFingerColor(info.finger);
    hint.innerHTML = `Use your <span class="finger-name" style="color: ${color}">${name}</span>${info.needsShift ? ' + Shift' : ''}`;

    // Highlight the correct finger on the hand visualization
    this.hands.highlightFinger(info.finger);
    if (info.needsShift) {
      this.hands.highlightShift(info.finger);
    }
  }
}

// Boot
new App();
