import type { ReviewCard } from './db';

const MIN_EASE = 1.3;
const INITIAL_EASE = 2.5;

export type Feedback = 'again' | 'hard' | 'good' | 'easy';

export function scheduleCard(card: ReviewCard, feedback: Feedback): ReviewCard {
  let { easeFactor, intervalDays, repetitions, lapses } = card;

  let qualityScore = 0;
  switch (feedback) {
    case 'again':
      qualityScore = 0;
      break;
    case 'hard':
      qualityScore = 2;
      break;
    case 'good':
      qualityScore = 3;
      break;
    case 'easy':
      qualityScore = 4;
      break;
  }

  if (qualityScore < 3) {
    lapses++;
    repetitions = 0;
    intervalDays = 1;
  } else {
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 3;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
    repetitions++;
  }

  easeFactor = Math.max(MIN_EASE, easeFactor + 0.1 * (5 - qualityScore));

  const nextDue = new Date();
  nextDue.setDate(nextDue.getDate() + intervalDays);
  const dueDateStr = nextDue.toISOString().split('T')[0];

  return {
    ...card,
    easeFactor: Math.round(easeFactor * 100) / 100,
    intervalDays,
    repetitions,
    lapses,
    dueDate: dueDateStr,
  };
}

export function getCardsDue(cards: ReviewCard[]): ReviewCard[] {
  const today = new Date().toISOString().split('T')[0];
  return cards.filter((card) => card.dueDate <= today);
}

export function createNewCard(itemId: string, direction: 'ko-en' | 'en-ko' | 'audio-ko'): ReviewCard {
  const today = new Date().toISOString().split('T')[0];
  return {
    itemId,
    direction,
    easeFactor: INITIAL_EASE,
    intervalDays: 0,
    repetitions: 0,
    lapses: 0,
    dueDate: today,
  };
}
