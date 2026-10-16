import { KIDS, LESSONS } from '../content/lessons';
import { STORIES } from '../content/stories';
import type { Progress } from './db';
import { addDays, localDate } from './dates';

/* ---------------------------------------------------------------------------
   Growth engine: XP, levels, streaks with earned rest-day shields, daily goals
   and badges. Everything here is a pure function of Progress so it is easy to
   test and cannot drift out of sync with what the screens show.
   ------------------------------------------------------------------------ */

export const GOALS = [
  { xp: 20, label: 'Casual', note: 'about one lesson' },
  { xp: 30, label: 'Regular', note: 'a lesson and a bit of review' },
  { xp: 50, label: 'Serious', note: 'two lessons a day' },
  { xp: 100, label: 'Intense', note: 'a real study session' },
];

export const MAX_SHIELDS = 2;

export const defaultGrowth = {
  xp: 0,
  xpByDay: {} as Record<string, number>,
  dailyGoal: 30,
  freezes: 1,
  frozenDays: [] as string[],
  bestStreak: 0,
  badges: [] as string[],
  perfectLessons: 0,
  reviewCount: 0,
  startedAt: '',
  placed: [] as string[],
};

/** Fill in new fields on progress saved by an older version of the app. */
export function normalize(p: Partial<Progress> & Pick<Progress, 'completedLessons' | 'studyDays' | 'settings'>): Progress {
  const base: Progress = {
    ...defaultGrowth,
    ...p,
    xpByDay: p.xpByDay ?? {},
    frozenDays: p.frozenDays ?? [],
    badges: p.badges ?? [],
    placed: p.placed ?? [],
    startedAt: p.startedAt || localDate(),
  };
  // Older saves had study days but no XP: give them credit so levels do not start at zero
  if (p.xp === undefined && p.completedLessons.length) base.xp = p.completedLessons.length * 20;
  return base;
}

/* ---------------------------------- streak ------------------------------- */

export interface StreakInfo {
  current: number;
  studiedToday: boolean;
  /** Alive but nothing logged today yet */
  atRisk: boolean;
}

export function streakInfo(p: Progress, today: string = localDate()): StreakInfo {
  const study = new Set(p.studyDays);
  const frozen = new Set(p.frozenDays);
  const alive = (d: string) => study.has(d) || frozen.has(d);
  const studiedToday = study.has(today);
  let day = alive(today) ? today : addDays(today, -1);
  if (!alive(day)) return { current: 0, studiedToday, atRisk: false };
  let count = 0;
  while (alive(day)) {
    if (study.has(day)) count++;
    day = addDays(day, -1);
  }
  return { current: count, studiedToday, atRisk: !studiedToday };
}

/**
 * If days were missed and you have enough shields, spend them so the streak
 * survives. Shields are only spent to protect a real streak (3+ days), and only
 * if they cover the whole gap.
 */
export function applyShields(p: Progress, today: string = localDate()): Progress {
  if (!p.studyDays.length || p.freezes <= 0) return p;
  const last = [...p.studyDays].sort().at(-1)!;
  const missed: string[] = [];
  for (let d = addDays(last, 1); d < today; d = addDays(d, 1)) if (!p.frozenDays.includes(d)) missed.push(d);
  if (!missed.length || missed.length > p.freezes) return p;
  if (streakInfo(p, last).current < 3) return p;
  return { ...p, freezes: p.freezes - missed.length, frozenDays: [...p.frozenDays, ...missed] };
}

/* ------------------------------------ xp / level ------------------------- */

const xpAt = (level: number) => 25 * (level - 1) ** 2;

const TITLES: [number, string, string][] = [
  [1, '새싹', 'Sprout'],
  [3, '학생', 'Learner'],
  [5, '여행자', 'Traveler'],
  [8, '대화가', 'Speaker'],
  [12, '달인', 'Master'],
  [18, '박사', 'Scholar'],
];

export function levelFor(xp: number) {
  const level = Math.floor(Math.sqrt(xp / 25)) + 1;
  const into = xp - xpAt(level);
  const need = xpAt(level + 1) - xpAt(level);
  const t = [...TITLES].reverse().find(([n]) => level >= n)!;
  return { level, into, need, pct: Math.min(100, (into / need) * 100), ko: t[1], title: t[2] };
}

export const xpToday = (p: Progress, today: string = localDate()) => p.xpByDay[today] ?? 0;

/* --------------------------------- badges -------------------------------- */

export interface Badge {
  id: string;
  glyph: string;
  name: string;
  desc: string;
  tone: 'red' | 'blue' | 'gold' | 'jade' | 'pink';
  check: (c: Ctx) => boolean;
}

interface Ctx {
  p: Progress;
  streak: number;
  done: Set<string>;
  lessons: number;
  goalDays: number;
}

const stageDone = (c: Ctx, phase: number) => LESSONS.filter((l) => l.phase === phase).every((l) => c.done.has(l.id));
const countStories = (c: Ctx) => STORIES.filter((s) => c.done.has(`story.${s.id}`)).length;
const countKids = (c: Ctx) => KIDS.filter((l) => c.done.has(l.id)).length;

export const BADGES: Badge[] = [
  { id: 'first', glyph: '시', name: 'First step', desc: 'Finish your first lesson', tone: 'blue', check: (c) => c.lessons >= 1 },
  { id: 'ten', glyph: '십', name: 'Ten lessons', desc: 'Finish 10 lessons', tone: 'blue', check: (c) => c.lessons >= 10 },
  { id: 'twentyfive', glyph: '꾸', name: 'Steady walker', desc: 'Finish 25 lessons', tone: 'blue', check: (c) => c.lessons >= 25 },
  { id: 'fifty', glyph: '길', name: 'Long road', desc: 'Finish 50 lessons', tone: 'blue', check: (c) => c.lessons >= 50 },
  { id: 'hangul', glyph: '한', name: 'Hangul hero', desc: 'Finish every Hangul lesson', tone: 'red', check: (c) => stageDone(c, 0) },
  { id: 'survival', glyph: '생', name: 'Survivor', desc: 'Finish Survival Korean', tone: 'red', check: (c) => stageDone(c, 1) },
  { id: 'sentences', glyph: '문', name: 'Sentence builder', desc: 'Finish Building Sentences', tone: 'gold', check: (c) => stageDone(c, 2) },
  { id: 'talker', glyph: '대', name: 'Talker', desc: 'Finish Real Conversations', tone: 'jade', check: (c) => stageDone(c, 3) },
  { id: 'streak3', glyph: '불', name: '3-day streak', desc: 'Study 3 days in a row', tone: 'gold', check: (c) => c.streak >= 3 || c.p.bestStreak >= 3 },
  { id: 'streak7', glyph: '일', name: 'One week', desc: 'Study 7 days in a row', tone: 'gold', check: (c) => c.p.bestStreak >= 7 },
  { id: 'streak14', glyph: '이', name: 'Two weeks', desc: 'Study 14 days in a row', tone: 'gold', check: (c) => c.p.bestStreak >= 14 },
  { id: 'streak30', glyph: '달', name: 'One month', desc: 'Study 30 days in a row', tone: 'gold', check: (c) => c.p.bestStreak >= 30 },
  { id: 'streak100', glyph: '백', name: 'Hundred days', desc: 'Study 100 days in a row', tone: 'gold', check: (c) => c.p.bestStreak >= 100 },
  { id: 'xp100', glyph: '힘', name: '100 XP', desc: 'Earn 100 XP', tone: 'jade', check: (c) => c.p.xp >= 100 },
  { id: 'xp500', glyph: '별', name: '500 XP', desc: 'Earn 500 XP', tone: 'jade', check: (c) => c.p.xp >= 500 },
  { id: 'xp1000', glyph: '꽃', name: '1,000 XP', desc: 'Earn 1,000 XP', tone: 'jade', check: (c) => c.p.xp >= 1000 },
  { id: 'xp5000', glyph: '왕', name: '5,000 XP', desc: 'Earn 5,000 XP', tone: 'jade', check: (c) => c.p.xp >= 5000 },
  { id: 'perfect', glyph: '완', name: 'Flawless', desc: 'Finish a lesson with no mistakes', tone: 'pink', check: (c) => c.p.perfectLessons >= 1 },
  { id: 'perfect10', glyph: '정', name: 'Precision', desc: 'Ten flawless lessons', tone: 'pink', check: (c) => c.p.perfectLessons >= 10 },
  { id: 'goal7', glyph: '목', name: 'Goal getter', desc: 'Hit your daily goal on 7 days', tone: 'red', check: (c) => c.goalDays >= 7 },
  { id: 'reader', glyph: '책', name: 'Reader', desc: 'Finish your first story', tone: 'blue', check: (c) => countStories(c) >= 1 },
  { id: 'bookworm', glyph: '독', name: 'Bookworm', desc: 'Finish every story', tone: 'blue', check: (c) => countStories(c) >= STORIES.length },
  { id: 'kid1', glyph: '아', name: 'Little learner', desc: 'Finish a Kids lesson', tone: 'pink', check: (c) => countKids(c) >= 1 },
  { id: 'kidsall', glyph: '동', name: 'Playground pro', desc: 'Finish every Kids lesson', tone: 'pink', check: (c) => countKids(c) >= KIDS.length },
  { id: 'review50', glyph: '복', name: 'Reviewer', desc: 'Review 50 cards', tone: 'jade', check: (c) => c.p.reviewCount >= 50 },
  { id: 'review500', glyph: '습', name: 'Memory machine', desc: 'Review 500 cards', tone: 'jade', check: (c) => c.p.reviewCount >= 500 },
];

function ctxFor(p: Progress): Ctx {
  // lessons skipped through placement do not count toward badges
  const earnedIds = p.completedLessons.filter((id) => !p.placed.includes(id));
  const done = new Set(earnedIds);
  const lessons = earnedIds.filter((id) => !id.startsWith('story.')).length;
  const goalDays = Object.values(p.xpByDay).filter((x) => x >= p.dailyGoal).length;
  return { p, streak: streakInfo(p).current, done, lessons, goalDays };
}

export const earnedBadges = (p: Progress): string[] => {
  const c = ctxFor(p);
  return BADGES.filter((b) => b.check(c)).map((b) => b.id);
};

/* ----------------------------- recording activity ------------------------ */

export interface Summary {
  xp: number;
  streakBefore: number;
  streakAfter: number;
  streakExtended: boolean;
  goalReached: boolean;
  levelUp: boolean;
  level: number;
  newBadges: string[];
  shieldEarned: boolean;
  perfect?: boolean;
  repeat?: boolean;
}

/** Add XP for today and work out everything that changed because of it. */
export function recordActivity(p: Progress, xp: number, today: string = localDate()): { next: Progress; summary: Summary } {
  const before = streakInfo(p, today).current;
  const goalWas = xpToday(p, today) >= p.dailyGoal;
  const levelWas = levelFor(p.xp).level;

  let next: Progress = {
    ...p,
    xp: p.xp + xp,
    xpByDay: { ...p.xpByDay, [today]: xpToday(p, today) + xp },
    studyDays: p.studyDays.includes(today) ? p.studyDays : [...p.studyDays, today],
  };

  const after = streakInfo(next, today).current;
  const extended = after > before;
  const shieldEarned = extended && after % 7 === 0 && next.freezes < MAX_SHIELDS;
  next = { ...next, bestStreak: Math.max(next.bestStreak, after), freezes: shieldEarned ? next.freezes + 1 : next.freezes };

  const badgesNow = earnedBadges(next);
  const newBadges = badgesNow.filter((id) => !next.badges.includes(id));
  next = { ...next, badges: [...next.badges, ...newBadges] };

  const levelNow = levelFor(next.xp).level;
  return {
    next,
    summary: {
      xp,
      streakBefore: before,
      streakAfter: after,
      streakExtended: extended,
      goalReached: !goalWas && xpToday(next, today) >= next.dailyGoal,
      levelUp: levelNow > levelWas,
      level: levelNow,
      newBadges,
      shieldEarned,
    },
  };
}

/** XP for a finished lesson. Repeats pay half so lessons cannot be farmed. */
export function lessonXp(correct: number, mistakes: number, repeat: boolean, flat?: number) {
  const perfect = mistakes === 0 && flat === undefined;
  let xp = flat ?? 10 + correct * 2 + (perfect ? 5 : 0);
  if (repeat) xp = Math.max(1, Math.floor(xp / 2));
  return { xp, perfect };
}

export const REVIEW_XP = { again: 0, hard: 1, good: 3, easy: 4 } as const;
