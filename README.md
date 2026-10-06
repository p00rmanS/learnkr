# 한글길 (Hangeul-gil)
## "The Korean Road" – A Calm Learning App for Absolute Beginners

[![Built with React](https://img.shields.io/badge/Built%20with-React-61dafb?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Bundled%20with-Vite-646cff?logo=vite)](https://vite.dev)
[![TypeScript](https://img.shields.io/badge/Typed%20with-TypeScript-3178c6?logo=typescript)](https://www.typescriptlang.org)

An explanation-first Korean learning app designed as the antidote to Duolingo-style pressure and gamification.

## Why Hangeul-gil?

| Problem | Solution |
|---------|----------|
| Random sentences ("the turtle drinks milk") | Every sentence is something real people say |
| Throws you in without explanation | Every concept starts with a plain-English explanation |
| Streak guilt, lives, leaderboards | No stress. No guilt. Progress shown, never punished. |
| Romanization as a crutch | Romanization fades after the first lessons |
| Grammar hidden behind trial & error | Grammar is taught explicitly, one pattern at a time |
| Forgetting what you "completed" | Spaced-repetition reviews keep knowledge alive |
| Busywork exercises | Exercises require real recall: typing, listening, speaking |

## Quick Start

```bash
npm install
npm run dev           # http://localhost:5173
npm run build         # Production build
npm run preview       # Preview production build
```

## What's Included

✅ **React 18 + Vite + TypeScript** – Fast, modern stack with strict types  
✅ **Tailwind CSS 4** – Utility-first styling  
✅ **Dexie.js (IndexedDB)** – Offline-first, local-only progress  
✅ **Zustand** – Lightweight global state  
✅ **Web Speech API** – Native Korean TTS  
✅ **SM-2 Algorithm** – Spaced-repetition scheduling  
✅ **Hangul decomposer** – Build syllables, understand structure  

## Project Structure

See [PROJECT.md](./PROJECT.md) for full architecture and development guide.

```
src/
├── components/       # React UI components
├── lib/             # Core algorithms (SRS, Hangul, DB)
├── content/         # Lesson data, grammar reference
├── pages/           # Page components
├── store/           # Zustand state
└── App.tsx          # Root
```

## Learning Path

- **Phase 0:** Hangul (Days 1–7)
- **Phase 1:** Survival Korean (Weeks 2–4)
- **Phase 2:** Sentence Building (Weeks 5–10)
- **Phase 3:** Real Conversations (Weeks 11+)

See [korean-app.md](../korean-app.md) for the full curriculum spec.

## Browser Support

✅ Chrome/Edge (full)  
✅ Safari (full)  
⚠️ Firefox (partial – Web Speech API only)
