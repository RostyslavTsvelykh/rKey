# Typing Learner

A browser-based typing tutor that teaches proper finger placement and helps you build speed and accuracy. Features a visual Mac keyboard and animated hand guides that highlight the correct finger for every keystroke.

## Features

- **Visual Mac keyboard** with color-coded finger zones
- **Hand guides** — left and right hand diagrams that highlight the active finger in real time
- **9 tiers of lessons** progressing from home row basics to full paragraphs (20+ lessons)
- **Live stats** — WPM, accuracy, errors, and elapsed time as you type
- **Finger hints** — tells you which finger to use for every key, including Shift combos
- **Progress tracking** — session history, WPM chart, and best scores saved to localStorage
- **Tier unlocking** — complete all lessons in a tier to unlock the next

## Running Locally

No build tools required. The app is plain HTML/CSS/JS with ES modules, so you need a local server (browsers block ES module imports from `file://`).

```bash
cd "Typing Learner"
python3 -m http.server 8080
```

Then open **http://localhost:8080** in your browser.

## Project Structure

```
Typing Learner/
├── index.html              # Single-page app shell (all screens)
├── css/
│   ├── main.css            # Global theme, variables, typography, buttons
│   ├── keyboard.css        # Keyboard layout, key sizing, finger colors, animations
│   ├── lesson.css          # Text display, cursor, correct/error styling
│   └── stats.css           # Home, lesson select, results, and progress screens
├── js/
│   ├── app.js              # Main controller — screen routing, event wiring
│   ├── keyboard.js         # Renders the keyboard, handles key highlight/flash
│   ├── keyboard-data.js    # Mac keyboard layout data and finger assignments
│   ├── hands.js            # SVG hand diagrams with per-finger highlighting
│   ├── lesson-engine.js    # Core typing logic — keystroke handling, cursor
│   ├── lessons-data.js     # All lesson content organized by tier
│   ├── metrics.js          # WPM and accuracy calculations
│   ├── progress.js         # localStorage persistence and stats
│   └── ui.js               # DOM helpers, screen transitions, WPM chart
└── assets/
    └── favicon.svg
```

## Lesson Tiers

| Tier | Focus |
|------|-------|
| 1 | Home row basics (a s d f j k l ;) |
| 2 | Extended home row (g h) |
| 3 | Top row (q w e r t y u i o p) |
| 4 | Bottom row (z x c v b n m , . /) |
| 5 | All letters combined |
| 6 | Capital letters (Shift key) |
| 7 | Numbers and symbols |
| 8 | Common sentences |
| 9 | Paragraphs and free practice |

## Finger Color Guide

Each finger has a dedicated color shown on both the keyboard and the hand diagrams:

| Finger | Color |
|--------|-------|
| Left Pinky | Red |
| Left Ring | Amber |
| Left Middle | Blue |
| Left Index | Green |
| Right Index | Purple |
| Right Middle | Cyan |
| Right Ring | Orange |
| Right Pinky | Pink |
| Thumbs | Gray |

## Tech Stack

- Vanilla HTML, CSS, and JavaScript (no frameworks, no bundler)
- ES Modules via `<script type="module">`
- Google Fonts: Sora, Fira Code, DM Sans
- `localStorage` for all progress persistence
