import Dexie, { type Table } from 'dexie';

export interface Item {
  id: string;
  kind: 'letter' | 'word' | 'sentence';
  korean: string;
  english: string;
  romanization?: string;
  acceptedAnswers?: string[];
  notes?: string;
  lessonId: string;
}

export interface Lesson {
  id: string;
  phase: 0 | 1 | 2 | 3;
  title: string;
  explanation: string;
  examples: string[];
  exercises: Exercise[];
  grammarPointId?: string;
  prerequisites: string[];
}

export interface Exercise {
  type: 'recognize' | 'readAloud' | 'dictation' | 'translate' | 'particle' | 'conjugate' | 'dialogue';
  prompt: string;
  answer: string;
  acceptedAnswers?: string[];
  explanationIfWrong: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  summary: string;
  body: string;
  examples: string[];
}

export interface ReviewCard {
  id?: number;
  itemId: string;
  direction: 'ko-en' | 'en-ko' | 'audio-ko';
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  dueDate: string;
  lapses: number;
}

export interface Progress {
  id?: number;
  completedLessons: string[];
  studyDays: string[];
  settings: {
    audioSpeed: 0.7 | 1;
    showRomanization: boolean;
    dailyNewItemLimit: number;
  };
}

export class HangeulGilDB extends Dexie {
  items!: Table<Item>;
  lessons!: Table<Lesson>;
  grammarPoints!: Table<GrammarPoint>;
  reviewCards!: Table<ReviewCard>;
  progress!: Table<Progress>;

  constructor() {
    super('HangeulGilDB');
    this.version(1).stores({
      items: 'id, lessonId',
      lessons: 'id, phase',
      grammarPoints: 'id',
      reviewCards: '++id, itemId, dueDate',
      progress: '++id',
    });
  }
}

export const db = new HangeulGilDB();
