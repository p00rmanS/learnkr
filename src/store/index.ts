import { create } from 'zustand';
import type { ReviewItem } from '../content/lessons';
import { localDate } from '../lib/dates';
import { db, type Progress } from '../lib/db';
import { defaultGrowth, lessonXp, recordActivity, REVIEW_XP, type Summary } from '../lib/growth';
import { createNewCard, type Feedback } from '../lib/srs';

interface AppState {
  progress: Progress;
  setProgress: (progress: Progress) => void;
  completeLesson: (lessonId: string, items: ReviewItem[], opts?: { correct?: number; mistakes?: number; flatXp?: number }) => Promise<Summary>;
  awardReview: (f: Feedback) => Promise<Summary>;
  setGoal: (xp: number) => void;
}

const defaultProgress: Progress = {
  completedLessons: [],
  studyDays: [],
  settings: { audioSpeed: 1, showRomanization: true, dailyNewItemLimit: 10 },
  ...defaultGrowth,
  startedAt: localDate(),
};

export const todayStr = () => localDate();

async function persist(p: Progress) {
  try {
    await db.progress.put(p);
  } catch (e) {
    console.error('Could not save progress', e);
  }
}

export const useAppStore = create<AppState>((set, get) => ({
  progress: defaultProgress,

  setProgress: (progress) => set({ progress }),

  completeLesson: async (lessonId, items, opts = {}) => {
    const p = get().progress;
    const repeat = p.completedLessons.includes(lessonId);
    const { xp, perfect } = lessonXp(opts.correct ?? 0, opts.mistakes ?? 0, repeat, opts.flatXp);
    const base: Progress = {
      ...p,
      completedLessons: [...new Set([...p.completedLessons, lessonId])],
      perfectLessons: p.perfectLessons + (perfect && !repeat ? 1 : 0),
    };
    const { next, summary } = recordActivity(base, xp);
    set({ progress: next });
    await persist(next);
    try {
      const existing = new Set((await db.reviewCards.toArray()).map((c) => c.itemId));
      const fresh = items.filter((i) => !existing.has(i.id)).map((i) => createNewCard(i.id, 'ko-en'));
      if (fresh.length) await db.reviewCards.bulkAdd(fresh);
    } catch (e) {
      console.error('Could not add review cards', e);
    }
    return { ...summary, perfect, repeat };
  },

  awardReview: async (f) => {
    const base = { ...get().progress, reviewCount: get().progress.reviewCount + 1 };
    const { next, summary } = recordActivity(base, REVIEW_XP[f]);
    set({ progress: next });
    await persist(next);
    return summary;
  },

  setGoal: (xp) => {
    const next = { ...get().progress, dailyGoal: xp };
    set({ progress: next });
    void persist(next);
  },
}));
