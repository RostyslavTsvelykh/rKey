export function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(screenId);
  if (screen) screen.classList.add('active');
}

export function renderTextDisplay(container, text, cursor) {
  container.innerHTML = '';
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.className = 'char';

    if (text[i] === ' ') {
      span.classList.add('space-char');
      span.innerHTML = '&nbsp;';
    } else {
      span.textContent = text[i];
    }

    if (i < cursor) {
      span.classList.add('correct');
    } else if (i === cursor) {
      span.classList.add('current');
    } else {
      span.classList.add('upcoming');
    }

    container.appendChild(span);
  }
}

export function markCharError(container, index) {
  const chars = container.querySelectorAll('.char');
  if (chars[index]) {
    chars[index].classList.add('incorrect');
    setTimeout(() => chars[index].classList.remove('incorrect'), 500);
  }
}

export function updateStats(wpmEl, accEl, errEl, timeEl, metrics) {
  if (wpmEl) wpmEl.textContent = metrics.wpm;
  if (accEl) accEl.textContent = metrics.accuracy + '%';
  if (errEl) errEl.textContent = metrics.errors;
  if (timeEl) {
    const m = Math.floor(metrics.time / 60);
    const s = metrics.time % 60;
    timeEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;
  }
}

export function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function buildWPMChart(container, history) {
  if (history.length === 0) {
    container.innerHTML = '<p style="color: var(--text-dim); text-align: center; font-family: Fira Code, monospace; font-size: 13px;">No data yet</p>';
    return;
  }

  const recent = history.slice(0, 20).reverse();
  const maxWPM = Math.max(...recent.map(h => h.wpm), 10);
  const barWidth = 100 / recent.length;
  const height = 150;

  let svg = `<svg viewBox="0 0 100 ${height}" preserveAspectRatio="none">`;
  svg += `<defs><linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">`;
  svg += `<stop offset="0%" stop-color="var(--accent)" stop-opacity="0.8"/>`;
  svg += `<stop offset="100%" stop-color="var(--accent)" stop-opacity="0.3"/>`;
  svg += `</linearGradient></defs>`;

  recent.forEach((h, i) => {
    const barHeight = (h.wpm / maxWPM) * (height - 24);
    const x = i * barWidth + barWidth * 0.15;
    const w = barWidth * 0.7;
    const y = height - barHeight;

    svg += `<rect x="${x}" y="${y}" width="${w}" height="${barHeight}" rx="1.5" fill="url(#bar-grad)"/>`;
    svg += `<text x="${x + w / 2}" y="${y - 4}" text-anchor="middle" fill="var(--text-muted)" font-size="3.2" font-family="Fira Code, monospace">${h.wpm}</text>`;
  });

  svg += '</svg>';
  container.innerHTML = svg;
}
