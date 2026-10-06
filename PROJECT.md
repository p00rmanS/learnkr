# Hangeul-gil: Korean Learning App

## Project Overview

Hangeul-gil is a calm, explain-first Korean learning app designed for absolute beginners, built as an antidote to Duolingo-style pressure and gamification.

**MVP Goals:**
- Users can read and type Hangul within 1-2 weeks
- Learn 80+ survival words and essential grammar patterns
- Understand Korean sentence structure through explicit explanation
- Review learned content with spaced repetition (SM-2 algorithm)

## Architecture

### Tech Stack
- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS 4
- **State:** Zustand (lightweight global store)
- **Storage:** IndexedDB via Dexie.js (offline-first)
- **Audio:** Web Speech API (`speechSynthesis`, `ko-KR` voice)
- **Utilities:** `es-hangul` for Hangul decomposition/composition
- **Hosting:** Netlify / Vercel (static site)

### Folder Structure
```
src/
├── components/
│   ├── LessonPlayer/       # Main lesson UI
│   ├── HangulChart/        # Interactive Hangul letter chart
│   ├── SyllableBuilder/    # Consonant + vowel composer
│   ├── ReviewSession/      # Spaced-rep review UI
│   ├── ExerciseCard/       # Exercise display & validation
│   └── AudioButton.tsx     # TTS playback
├── content/
│   ├── hangul.json         # Hangul letters & metadata
│   ├── lessons/            # One JSON per lesson
│   ├── grammar/            # Markdown reference pages
│   └── items.json          # All words & sentences
├── lib/
│   ├── db.ts               # Dexie schema & types
│   ├── hangul.ts           # Decompose/compose syllables
│   ├── srs.ts              # SM-2 scheduling algorithm
│   ├── speech.ts           # TTS/speech-recognition wrappers
│   └── answerCheck.ts      # Answer normalization & diffing
├── pages/
│   ├── Home.tsx            # Today's lesson + reviews
│   ├── Learn.tsx           # Curriculum map & lesson select
│   ├── Review.tsx          # Spaced-rep review session
│   ├── Notebook.tsx        # Grammar reference index
│   └── Settings.tsx        # Audio speed, romanization, etc.
├── store/
│   └── index.ts            # Zustand global state
└── App.tsx
```

## Development Workflow

### Running Locally
```bash
cd hangeul-gil
npm install
npm run dev        # Start Vite dev server at http://localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```

### TypeScript Strict Mode
The project uses `verbatimModuleSyntax`, so all type imports must use `import type { Foo }`.

## Core Features (MVP)

### 1. Lesson Player
- **Explanation card** with plain English + visual (table/diagram)
- **Example cards** with Korean, English, and audio playback
- **Exercises** requiring recall (typing, reading aloud, dictation)
- **Lesson summary** that adds new items to the review deck

### 2. Hangul Trainer (Phase 0)
- **Interactive letter chart:** tap any letter to hear + see mouth-shape
- **Syllable builder:** select consonant + vowel (+ final) → see block form
- **Reading drills:** start with romanization, fade hints as accuracy improves
- **Exit check:** read 30 random words + type 10 dictated words correctly

### 3. Spaced-Repetition Review
- **Daily review queue** built automatically from learned content
- **Card types:** Korean → English, English → Korean (typed), audio → Korean
- **Self-grading:** Again / Hard / Good / Easy buttons
- **SM-2 algorithm:** proven, simple, upgradeable to FSRS later

### 4. Grammar Notebook
- **Permanent reference** for every grammar point
- **Searchable, always accessible** (no lesson required)
- **Examples with audio** for every rule

### 5. Progress (Calm)
- "Words known," "grammar points learned," "Hangul mastery %"
- Study calendar (no streak guilt, no penalty for missed days)

## Content Phases

### Phase 0: Hangul (Days 1–7)
- 11 units teaching syllable structure, vowels, consonants, final consonants
- Interactive drills + reading practice
- **Exit check required** before unlocking Phase 1

### Phase 1: Survival Korean (Weeks 2–4)
- Greetings, introductions, politeness particles
- "I am," "I have," possession, numbers, requests
- 8 core lessons with real phrases

### Phase 2: Sentence Building (Weeks 5–10)
- Subject/object markers, verb conjugation, negation
- Location distinctions (에 vs 에서), tense, intention
- 10 lessons on core grammar patterns

### Phase 3: Real Conversations (Weeks 11+)
- Scenario-based: café ordering, subway, shopping, making plans
- Dialogue practice: read aloud, then rebuild from memory

## Data Models

### Item
```typescript
type Item = {
  id: string;              // "word.coffee"
  kind: "letter" | "word" | "sentence";
  korean: string;          // "커피"
  english: string;         // "coffee"
  romanization?: string;   // Phase 0 only
  acceptedAnswers?: string[];
  notes?: string;
  lessonId: string;
};
```

### ReviewCard (SM-2 State)
```typescript
type ReviewCard = {
  id?: number;
  itemId: string;
  direction: "ko-en" | "en-ko" | "audio-ko";
  easeFactor: number;      // Starts at 2.5
  intervalDays: number;
  repetitions: number;
  dueDate: string;         // ISO date
  lapses: number;
};
```

## Milestones

| # | Milestone | Status | Notes |
|---|-----------|--------|-------|
| 1 | Project setup | ✅ | Vite + React + TS + Tailwind + Dexie |
| 2 | Hangul engine | ⏳ | Syllable compose/decompose, TTS wrapper |
| 3 | Phase 0 content | ⏳ | 11 Hangul units with drills |
| 4 | Lesson player | ⏳ | Explanation → examples → exercises → summary |
| 5 | SRS | ⏳ | SM-2 scheduler, review UI, daily queue |
| 6 | Phase 1 content | ⏳ | 8 survival lessons + grammar notebook |
| 7 | Phase 2 content | ⏳ | 10 sentence-building lessons |
| 8 | PWA + polish | ⏳ | Offline install, mobile layout, settings |
| 9 | Version 2 | ⏳ | Speech checking, handwriting, AI partner |

## Next Steps

1. **Implement Hangul engine** (`src/lib/hangul.ts`):
   - Test syllable decomposition with Hangul test strings
   - Implement syllable composition UI in `HangulChart`

2. **Create Phase 0 content** (`src/content/`):
   - `hangul.json`: All letters with mouth-shape explanations
   - `lessons/`: JSON for each of 11 Hangul units
   - `items.json`: Bootstrap with Phase 0 vocabulary

3. **Build lesson player** (`src/components/LessonPlayer/`):
   - Explanation renderer (Markdown support)
   - Example cards with audio buttons
   - Exercise router (dispatch by type)

4. **Implement review session** (`src/components/ReviewSession/`):
   - Fetch due cards from DB
   - SM-2 scheduling on feedback
   - Daily limit enforcement

5. **Database setup** (`src/lib/db.ts`):
   - Seed initial lessons & items
   - Verify IndexedDB persistence

## Browser Support

- **Chrome/Edge:** Full support (Web Speech API + SpeechRecognition)
- **Safari:** Full support (Web Speech API + SpeechRecognition in iOS 14.5+)
- **Firefox:** Partial (no SpeechRecognition; TTS via Web Speech API)

## Performance Notes

- **Bundle size target:** < 150 KB gzipped (CSS + JS)
- **Lazy-load lessons:** Load lesson content on-demand, not at startup
- **IndexedDB strategy:** Store all content in DB once, cache in memory
- **PWA:** vite-plugin-pwa for offline-first app shell

## Audit Findings

**Risks addressed:**
- ✅ Web Speech API quality varies; fallback strategy TBD
- ✅ Answer checking complexity documented (see `lib/answerCheck.ts`)
- ✅ No migration strategy for IndexedDB yet; version carefully
- ✅ i18n not in MVP scope; design for it later
- ⚠️ Consider performance of 1K+ items in review queue

## License

MIT (TBD)
