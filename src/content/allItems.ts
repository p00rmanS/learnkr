import { ALL_LESSONS, type ReviewItem } from './lessons';
import { STORIES } from './stories';

/** Every card that can appear in Review: lesson items plus story vocabulary. */
export const ITEMS = new Map<string, ReviewItem>(ALL_LESSONS.flatMap((l) => l.items).map((i) => [i.id, i]));

export const storyItems = (id: string): ReviewItem[] => {
  const s = STORIES.find((x) => x.id === id);
  return s ? s.vocab.map((v, n) => ({ id: `story.${id}.${n}`, korean: v.ko, english: v.en })) : [];
};

for (const s of STORIES) for (const it of storyItems(s.id)) ITEMS.set(it.id, it);
