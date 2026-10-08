export interface ReviewItem {
  id: string;
  korean: string;
  english: string; // sound, or meaning for words
}

export type Step =
  | {
      kind: 'teach';
      title: string;
      body: string[];
      tl?: string[]; // Taglish explanation
      tip?: string; // pro tip
      remember?: string; // memory hook
      glyphs?: { ch: string; sub: string }[];
      blocks?: { ch: string; parts: string[] }[];
      phrases?: { ko: string; en: string; rom?: string }[];
    }
  | { kind: 'choice'; prompt: string; big?: string; speak?: string; options: string[]; answer: string; why: string; whyTl?: string }
  | { kind: 'build'; prompt: string; speak?: string; initials: string[]; vowels: string[]; finals?: string[]; target: string; why: string; whyTl?: string };

export interface Lesson {
  id: string;
  phase: 0 | 1 | 2 | 3;
  title: string;
  ko: string;
  blurb: string;
  steps: Step[];
  items: ReviewItem[];
}

const BASE: Omit<Lesson, 'phase'>[] = [
  {
    id: '0.1',
    title: 'Letters live in blocks',
    ko: '글자는 블록이에요',
    blurb: 'How a Korean syllable is assembled.',
    items: [
      { id: 'syl.가', korean: '가', english: 'ga' },
      { id: 'syl.나', korean: '나', english: 'na' },
    ],
    steps: [
      {
        kind: 'teach',
        title: 'One syllable, one square',
        body: [
          'English strings letters in a line. Korean packs them into square blocks, one block per syllable.',
          'Every block has a consonant and a vowel. Some have a second consonant tucked underneath.',
        ],
        blocks: [
          { ch: '가', parts: ['ㄱ', 'ㅏ'] },
          { ch: '나', parts: ['ㄴ', 'ㅏ'] },
          { ch: '곰', parts: ['ㄱ', 'ㅗ', 'ㅁ'] },
        ],
      },
      {
        kind: 'teach',
        title: 'Where things go',
        body: [
          'Read inside a block from the top-left. A vertical vowel (ㅏ ㅣ ㅓ) sits to the right of the consonant. A horizontal vowel (ㅗ ㅜ ㅡ) sits underneath it.',
          'A final consonant, if there is one, goes at the very bottom.',
        ],
        blocks: [
          { ch: '고', parts: ['ㄱ', 'ㅗ'] },
          { ch: '기', parts: ['ㄱ', 'ㅣ'] },
          { ch: '굼', parts: ['ㄱ', 'ㅜ', 'ㅁ'] },
        ],
      },
      {
        kind: 'choice',
        prompt: 'In 나, which piece is the vowel?',
        big: '나',
        options: ['ㄴ', 'ㅏ'],
        answer: 'ㅏ',
        why: 'ㅏ is the vertical stroke on the right. ㄴ is the consonant on the left.',
      },
      {
        kind: 'choice',
        prompt: 'Where does the vowel sit in 고?',
        big: '고',
        options: ['To the right of the consonant', 'Underneath the consonant'],
        answer: 'Underneath the consonant',
        why: 'ㅗ is a horizontal vowel, so it sits below the consonant.',
      },
    ],
  },
  {
    id: '0.2',
    title: 'The six basic vowels',
    ko: '기본 모음',
    blurb: 'Heaven, earth, person.',
    items: [
      { id: 'v.ㅏ', korean: '아', english: 'a' },
      { id: 'v.ㅓ', korean: '어', english: 'eo' },
      { id: 'v.ㅗ', korean: '오', english: 'o' },
      { id: 'v.ㅜ', korean: '우', english: 'u' },
      { id: 'v.ㅡ', korean: '으', english: 'eu' },
      { id: 'v.ㅣ', korean: '이', english: 'i' },
    ],
    steps: [
      {
        kind: 'teach',
        title: 'Three shapes build every vowel',
        body: [
          'Hangul vowels come from three ideas: a dot for the sky, a flat line for the earth, a standing line for a person.',
          'Put a dot beside or above or below the line, and you get a new vowel. Direction of the dot tells you which.',
        ],
        glyphs: [
          { ch: '·', sub: 'sky' },
          { ch: 'ㅡ', sub: 'earth' },
          { ch: 'ㅣ', sub: 'person' },
        ],
      },
      {
        kind: 'teach',
        title: 'Vertical vowels',
        body: ['The dot sits to the side of the person.'],
        glyphs: [
          { ch: 'ㅏ', sub: 'a' },
          { ch: 'ㅓ', sub: 'eo' },
          { ch: 'ㅣ', sub: 'i' },
        ],
      },
      {
        kind: 'teach',
        title: 'Horizontal vowels',
        body: ['The dot sits above or below the earth line.'],
        glyphs: [
          { ch: 'ㅗ', sub: 'o' },
          { ch: 'ㅜ', sub: 'u' },
          { ch: 'ㅡ', sub: 'eu' },
        ],
      },
      {
        kind: 'choice',
        prompt: 'Listen, then pick the vowel.',
        speak: '오',
        options: ['ㅏ', 'ㅗ', 'ㅜ'],
        answer: 'ㅗ',
        why: 'ㅗ is "o". The dot points up.',
      },
      {
        kind: 'choice',
        prompt: 'Which vowel is "u"?',
        options: ['ㅓ', 'ㅡ', 'ㅜ'],
        answer: 'ㅜ',
        why: 'ㅜ has its dot below the line. ㅗ is its mirror.',
      },
      {
        kind: 'choice',
        prompt: 'Which vowel is "i" (ee)?',
        options: ['ㅣ', 'ㅡ', 'ㅏ'],
        answer: 'ㅣ',
        why: 'ㅣ is the standing person.',
      },
    ],
  },
  {
    id: '0.3',
    title: 'First consonants',
    ko: '기본 자음',
    blurb: 'Shapes borrowed from the mouth.',
    items: [
      { id: 'c.ㄱ', korean: 'ㄱ', english: 'g / k' },
      { id: 'c.ㄴ', korean: 'ㄴ', english: 'n' },
      { id: 'c.ㄷ', korean: 'ㄷ', english: 'd / t' },
      { id: 'c.ㄹ', korean: 'ㄹ', english: 'r / l' },
      { id: 'c.ㅁ', korean: 'ㅁ', english: 'm' },
      { id: 'c.ㅂ', korean: 'ㅂ', english: 'b / p' },
      { id: 'c.ㅅ', korean: 'ㅅ', english: 's' },
      { id: 'c.ㅈ', korean: 'ㅈ', english: 'j' },
      { id: 'c.ㅎ', korean: 'ㅎ', english: 'h' },
    ],
    steps: [
      {
        kind: 'teach',
        title: 'Five shapes, then extra strokes',
        body: [
          'Five consonants copy the mouth: ㄱ the back of the tongue, ㄴ the tongue tip, ㅁ the lips, ㅅ a tooth, ㅇ the throat.',
          'The rest are those five with a stroke added. ㄷ comes from ㄴ, ㅂ from ㅁ, ㅈ from ㅅ, ㅎ from ㅇ.',
        ],
        glyphs: [
          { ch: 'ㄱ', sub: 'g' },
          { ch: 'ㄴ', sub: 'n' },
          { ch: 'ㅁ', sub: 'm' },
          { ch: 'ㅅ', sub: 's' },
          { ch: 'ㅇ', sub: 'silent' },
        ],
      },
      {
        kind: 'teach',
        title: 'The ones with a stroke',
        body: [
          'ㄹ is a quick tongue tap, between an "r" and an "l".',
          'ㄱ ㄷ ㅂ ㅈ sit between English pairs (g/k, d/t, b/p, j/ch). You will hear them shift with their neighbours.',
        ],
        glyphs: [
          { ch: 'ㄷ', sub: 'd / t' },
          { ch: 'ㄹ', sub: 'r / l' },
          { ch: 'ㅂ', sub: 'b / p' },
          { ch: 'ㅈ', sub: 'j' },
          { ch: 'ㅎ', sub: 'h' },
        ],
      },
      {
        kind: 'teach',
        title: 'The silent ㅇ',
        body: [
          'At the start of a block, ㅇ makes no sound. It only holds the place so a vowel can stand alone: 아 is just "a".',
          'At the bottom of a block, ㅇ is the "ng" in "sing".',
        ],
        blocks: [{ ch: '아', parts: ['ㅇ', 'ㅏ'] }, { ch: '이', parts: ['ㅇ', 'ㅣ'] }],
      },
      {
        kind: 'choice',
        prompt: 'Which consonant looks like closed lips?',
        options: ['ㅁ', 'ㅅ', 'ㄱ'],
        answer: 'ㅁ',
        why: 'ㅁ is the outline of closed lips, and it says "m".',
      },
      {
        kind: 'choice',
        prompt: 'Which consonant is made by adding a stroke to ㅁ?',
        options: ['ㅂ', 'ㅈ', 'ㄷ'],
        answer: 'ㅂ',
        why: 'ㅁ becomes ㅂ. ㄷ comes from ㄴ, and ㅈ from ㅅ.',
      },
      {
        kind: 'choice',
        prompt: 'Which one says "n"?',
        options: ['ㄴ', 'ㄹ', 'ㅁ'],
        answer: 'ㄴ',
        why: 'ㄴ is the tongue tip behind the teeth.',
      },
    ],
  },
  {
    id: '0.4',
    title: 'Reading your first syllables',
    ko: '첫 음절 읽기',
    blurb: 'Consonant plus vowel.',
    items: [
      { id: 'syl.가', korean: '가', english: 'ga' },
      { id: 'syl.나', korean: '나', english: 'na' },
      { id: 'syl.다', korean: '다', english: 'da' },
      { id: 'syl.마', korean: '마', english: 'ma' },
      { id: 'syl.바', korean: '바', english: 'ba' },
      { id: 'syl.사', korean: '사', english: 'sa' },
      { id: 'syl.아', korean: '아', english: 'a' },
      { id: 'syl.자', korean: '자', english: 'ja' },
      { id: 'syl.하', korean: '하', english: 'ha' },
    ],
    steps: [
      {
        kind: 'teach',
        title: 'Consonant + ㅏ',
        body: ['Put any consonant next to ㅏ and say the consonant, then "ah". That is the whole trick.'],
        blocks: [
          { ch: '가', parts: ['ㄱ', 'ㅏ'] },
          { ch: '나', parts: ['ㄴ', 'ㅏ'] },
          { ch: '다', parts: ['ㄷ', 'ㅏ'] },
          { ch: '마', parts: ['ㅁ', 'ㅏ'] },
          { ch: '바', parts: ['ㅂ', 'ㅏ'] },
          { ch: '사', parts: ['ㅅ', 'ㅏ'] },
        ],
      },
      {
        kind: 'choice',
        prompt: 'Listen. Which syllable?',
        speak: '마',
        options: ['마', '바', '나'],
        answer: '마',
        why: '마 is ㅁ + ㅏ = "ma".',
      },
      {
        kind: 'choice',
        prompt: 'How do you read 사?',
        big: '사',
        options: ['sa', 'ja', 'ha'],
        answer: 'sa',
        why: 'ㅅ is "s", ㅏ is "a".',
      },
      {
        kind: 'build',
        prompt: 'Build the syllable "da".',
        speak: '다',
        initials: ['ㄱ', 'ㄴ', 'ㄷ', 'ㅁ'],
        vowels: ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ'],
        target: '다',
        why: 'ㄷ + ㅏ = 다.',
      },
      {
        kind: 'build',
        prompt: 'Build "ba".',
        speak: '바',
        initials: ['ㅂ', 'ㅅ', 'ㅈ', 'ㅎ'],
        vowels: ['ㅏ', 'ㅓ', 'ㅗ', 'ㅣ'],
        target: '바',
        why: 'ㅂ + ㅏ = 바.',
      },
      {
        kind: 'choice',
        prompt: 'Listen. Which syllable?',
        speak: '하',
        options: ['아', '하', '자'],
        answer: '하',
        why: '하 is ㅎ + ㅏ = "ha".',
      },
    ],
  },
  {
    id: '0.5',
    title: 'Y-vowels',
    ko: '야 여 요 유',
    blurb: 'One extra stroke adds a "y".',
    items: [
      { id: 'v.ㅑ', korean: '야', english: 'ya' },
      { id: 'v.ㅕ', korean: '여', english: 'yeo' },
      { id: 'v.ㅛ', korean: '요', english: 'yo' },
      { id: 'v.ㅠ', korean: '유', english: 'yu' },
    ],
    steps: [
      {
        kind: 'teach',
        title: 'Double the dot',
        body: ['Take ㅏ ㅓ ㅗ ㅜ and give each one more stroke. That extra stroke means the sound starts with "y".'],
        glyphs: [
          { ch: 'ㅑ', sub: 'ya' },
          { ch: 'ㅕ', sub: 'yeo' },
          { ch: 'ㅛ', sub: 'yo' },
          { ch: 'ㅠ', sub: 'yu' },
        ],
      },
      {
        kind: 'choice',
        prompt: 'Listen. Which vowel?',
        speak: '요',
        options: ['ㅗ', 'ㅛ', 'ㅠ'],
        answer: 'ㅛ',
        why: 'ㅛ is "yo": ㅗ with two strokes.',
      },
      {
        kind: 'choice',
        prompt: 'Which is "yu"?',
        options: ['ㅜ', 'ㅠ', 'ㅕ'],
        answer: 'ㅠ',
        why: 'ㅠ is ㅜ with an extra stroke.',
      },
      {
        kind: 'build',
        prompt: 'Build "yeo" with the silent ㅇ.',
        speak: '여',
        initials: ['ㅇ', 'ㄴ', 'ㅁ'],
        vowels: ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ'],
        target: '여',
        why: 'ㅇ + ㅕ = 여.',
      },
    ],
  },
  {
    id: '0.6',
    title: 'Aspirated consonants',
    ko: '거센소리',
    blurb: 'Add a stroke, add a puff of air.',
    items: [
      { id: 'c.ㅋ', korean: 'ㅋ', english: 'k (puff)' },
      { id: 'c.ㅌ', korean: 'ㅌ', english: 't (puff)' },
      { id: 'c.ㅍ', korean: 'ㅍ', english: 'p (puff)' },
      { id: 'c.ㅊ', korean: 'ㅊ', english: 'ch' },
    ],
    steps: [
      {
        kind: 'teach',
        title: 'A puff of air',
        body: [
          'Hold your hand in front of your mouth and say "pie". You feel air. Now say "spy": much less. Korean writes that difference as separate letters.',
          'ㅋ ㅌ ㅍ ㅊ are the breathy versions of ㄱ ㄷ ㅂ ㅈ.',
        ],
        glyphs: [
          { ch: 'ㅋ', sub: 'k' },
          { ch: 'ㅌ', sub: 't' },
          { ch: 'ㅍ', sub: 'p' },
          { ch: 'ㅊ', sub: 'ch' },
        ],
      },
      {
        kind: 'choice',
        prompt: 'Which letter is the breathy partner of ㅈ?',
        options: ['ㅊ', 'ㅋ', 'ㅌ'],
        answer: 'ㅊ',
        why: 'ㅈ gains a stroke and becomes ㅊ ("ch").',
      },
      {
        kind: 'choice',
        prompt: 'Listen. Which syllable?',
        speak: '카',
        options: ['가', '카', '타'],
        answer: '카',
        why: '카 is ㅋ + ㅏ, a puffy "ka".',
      },
      {
        kind: 'build',
        prompt: 'Build "pa" (with a puff).',
        speak: '파',
        initials: ['ㅂ', 'ㅍ', 'ㅌ', 'ㅋ'],
        vowels: ['ㅏ', 'ㅓ', 'ㅗ'],
        target: '파',
        why: 'ㅍ + ㅏ = 파.',
      },
    ],
  },
];

import { ENRICH, MORE, UPCOMING as UP1 } from './lessons-extra';
import { MORE2, UPCOMING2 } from './lessons-more';
import { MORE3, UPCOMING3 } from './lessons-phase2';

export const UPCOMING = [...UP1, ...UPCOMING2, ...UPCOMING3];

export const LESSONS: Lesson[] = [
  ...BASE.map((l): Lesson => ({
    ...l,
    phase: 0,
    steps: l.steps.map((st, n) => {
      const extra = ENRICH[`${l.id}.${n}`];
      return extra && st.kind === 'teach' ? { ...st, ...extra } : st;
    }),
  })),
  ...MORE,
  ...MORE2,
  ...MORE3,
];
