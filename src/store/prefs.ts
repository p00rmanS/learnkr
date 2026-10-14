import { create } from 'zustand';

export interface Prefs {
  /** "say it" respelling */
  say: boolean;
  /** Revised Romanization */
  rom: boolean;
  /** English translations in stories */
  en: boolean;
  /** Play audio slowly */
  slow: boolean;
}

const KEY = 'hg.prefs';
const DEFAULTS: Prefs = { say: true, rom: true, en: true, slow: false };

function load(): Prefs {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Prefs>) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

interface State extends Prefs {
  toggle: (k: keyof Prefs) => void;
  reset: () => void;
}

const save = (p: Prefs) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable (private window): the setting just will not persist */
  }
};

export const usePrefs = create<State>((set, get) => ({
  ...load(),
  toggle: (k) => {
    set({ [k]: !get()[k] } as Partial<State>);
    const { say, rom, en, slow } = get();
    save({ say, rom, en, slow });
  },
  reset: () => {
    set({ ...DEFAULTS });
    save(DEFAULTS);
  },
}));
