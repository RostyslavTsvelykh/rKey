const STORAGE_KEY = 'typing-learner-progress';

function getDefaultData() {
  return {
    lessonsCompleted: {},
    history: [],
    stats: {
      totalTimeSeconds: 0,
      totalKeystrokes: 0,
      allTimeBestWPM: 0,
    },
  };
}

export function loadProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return getDefaultData();
    return { ...getDefaultData(), ...JSON.parse(data) };
  } catch {
    return getDefaultData();
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveResult(lessonId, lessonTitle, result) {
  const data = loadProgress();

  // Update lesson completion
  const prev = data.lessonsCompleted[lessonId];
  data.lessonsCompleted[lessonId] = {
    completedAt: new Date().toISOString(),
    bestWPM: prev ? Math.max(prev.bestWPM, result.wpm) : result.wpm,
    bestAccuracy: prev ? Math.max(prev.bestAccuracy, result.accuracy) : result.accuracy,
    attempts: prev ? prev.attempts + 1 : 1,
  };

  // Add to history (keep last 50)
  data.history.unshift({
    lessonId,
    lessonTitle,
    date: new Date().toISOString(),
    wpm: result.wpm,
    accuracy: result.accuracy,
    errors: result.errors,
    time: result.time,
  });
  if (data.history.length > 50) data.history.length = 50;

  // Update global stats
  data.stats.totalTimeSeconds += result.time;
  data.stats.totalKeystrokes += result.totalKeystrokes;
  if (result.wpm > data.stats.allTimeBestWPM) {
    data.stats.allTimeBestWPM = result.wpm;
  }

  save(data);
  return data;
}

export function getUnlockedTier() {
  const data = loadProgress();
  const { LESSONS } = window.__lessonsCache || { LESSONS: [] };

  // Tier 1 is always unlocked
  let unlockedTier = 1;

  for (let tier = 1; tier <= 9; tier++) {
    const tierLessons = LESSONS.filter(l => l.tier === tier);
    const allCompleted = tierLessons.every(l => data.lessonsCompleted[l.id]);
    if (allCompleted && tierLessons.length > 0) {
      unlockedTier = tier + 1;
    } else {
      break;
    }
  }

  return unlockedTier;
}

export function isLessonCompleted(lessonId) {
  const data = loadProgress();
  return !!data.lessonsCompleted[lessonId];
}

export function getLessonBest(lessonId) {
  const data = loadProgress();
  return data.lessonsCompleted[lessonId] || null;
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
