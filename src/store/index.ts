import { create } from 'zustand';
import { db, type Progress } from '../lib/db';
import { createNewCard } from '../lib/srs';
import type { ReviewItem } from '../content/lessons';

interface AppState {
  progress: Progress;
  setProgress: (progress: Progress) => void;
  completeLesson: (lessonId: string, items: ReviewItem[]) => Promise<void>;
}

const defaultProgress: Progress = {
  completedLessons: [],
  studyDays: [],
  settings: { audioSpeed: 1, showRomanization: true, dailyNewItemLimit: 10 },
};

export const todayStr = () => new Date().toISOString().split('T')[0];

export const useAppStore = create<AppState>((set, get) => ({
  progress: defaultProgress,

  setProgress: (progress) => set({ progress }),

  completeLesson: async (lessonId, items) => {
    const p = get().progress;
    const next: Progress = {
      ...p,
      completedLessons: [...new Set([...p.completedLessons, lessonId])],
      studyDays: [...new Set([...p.studyDays, todayStr()])],
    };
    set({ progress: next });
    try {
      await db.progress.put(next);
      const existing = new Set((await db.reviewCards.toArray()).map((c) => c.itemId));
      const fresh = items.filter((i) => !existing.has(i.id)).map((i) => createNewCard(i.id, 'ko-en'));
      if (fresh.length) await db.reviewCards.bulkAdd(fresh);
    } catch (e) {
      console.error('Could not save progress', e);
    }
  },
}));
