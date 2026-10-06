import { composeSyllable } from '../lib/hangul';

export type LetterGroup = 'vowel' | 'yvowel' | 'consonant' | 'aspirated' | 'tense';

export interface Letter {
  char: string;
  group: LetterGroup;
  rom: string;
  sound: string;
  note: string;
}

export const GROUP_LABEL: Record<LetterGroup, { en: string; ko: string }> = {
  vowel: { en: 'Basic vowels', ko: '기본 모음' },
  yvowel: { en: 'Y-vowels', ko: '이중 모음' },
  consonant: { en: 'Core consonants', ko: '기본 자음' },
  aspirated: { en: 'Aspirated', ko: '거센소리' },
  tense: { en: 'Tense', ko: '된소리' },
};

export const LETTERS: Letter[] = [
  { char: 'ㅏ', group: 'vowel', rom: 'a', sound: 'ah, as in "father"', note: 'A person (ㅣ) with a dot (·) on the right: the sun is to the east of the person.' },
  { char: 'ㅓ', group: 'vowel', rom: 'eo', sound: 'uh, as in "cup", with rounder lips', note: 'Dot on the left. Mirror image of ㅏ.' },
  { char: 'ㅗ', group: 'vowel', rom: 'o', sound: 'oh, as in "go"', note: 'Dot above the flat earth (ㅡ).' },
  { char: 'ㅜ', group: 'vowel', rom: 'u', sound: 'oo, as in "moon"', note: 'Dot below the flat earth. Mirror image of ㅗ.' },
  { char: 'ㅡ', group: 'vowel', rom: 'eu', sound: 'like "oo" in "book", with lips spread flat', note: 'The flat earth. No English twin; smile and say "oo".' },
  { char: 'ㅣ', group: 'vowel', rom: 'i', sound: 'ee, as in "see"', note: 'A standing person.' },

  { char: 'ㅑ', group: 'yvowel', rom: 'ya', sound: 'ya, as in "yacht"', note: 'ㅏ with one extra stroke. Extra stroke means add a "y".' },
  { char: 'ㅕ', group: 'yvowel', rom: 'yeo', sound: 'yuh', note: 'ㅓ with one extra stroke.' },
  { char: 'ㅛ', group: 'yvowel', rom: 'yo', sound: 'yo, as in "yoga"', note: 'ㅗ with one extra stroke.' },
  { char: 'ㅠ', group: 'yvowel', rom: 'yu', sound: 'yoo, as in "you"', note: 'ㅜ with one extra stroke.' },

  { char: 'ㄱ', group: 'consonant', rom: 'g / k', sound: 'between g and k', note: 'The back of the tongue rising toward the soft palate.' },
  { char: 'ㄴ', group: 'consonant', rom: 'n', sound: 'n, as in "no"', note: 'The tongue tip touching behind the upper teeth.' },
  { char: 'ㄷ', group: 'consonant', rom: 'd / t', sound: 'between d and t', note: 'ㄴ plus a stroke: the tongue pressing a little harder.' },
  { char: 'ㄹ', group: 'consonant', rom: 'r / l', sound: 'a quick tap, like the "tt" in "butter"', note: 'The tongue tip flicking up and back.' },
  { char: 'ㅁ', group: 'consonant', rom: 'm', sound: 'm, as in "mom"', note: 'The outline of closed lips.' },
  { char: 'ㅂ', group: 'consonant', rom: 'b / p', sound: 'between b and p', note: 'ㅁ with a stroke: lips closed, then released.' },
  { char: 'ㅅ', group: 'consonant', rom: 's', sound: 's, as in "sun"', note: 'The outline of a tooth.' },
  { char: 'ㅇ', group: 'consonant', rom: 'silent / ng', sound: 'silent at the start; "ng" at the end', note: 'The outline of the throat. A placeholder when a block starts with a vowel.' },
  { char: 'ㅈ', group: 'consonant', rom: 'j', sound: 'j, as in "jam", softer', note: 'ㅅ with a stroke on top.' },
  { char: 'ㅎ', group: 'consonant', rom: 'h', sound: 'h, as in "hat"', note: 'ㅇ with a stroke: breath coming out of the throat.' },

  { char: 'ㅋ', group: 'aspirated', rom: 'k', sound: 'k with a puff of air', note: 'ㄱ plus a stroke: extra air.' },
  { char: 'ㅌ', group: 'aspirated', rom: 't', sound: 't with a puff of air', note: 'ㄷ plus a stroke.' },
  { char: 'ㅍ', group: 'aspirated', rom: 'p', sound: 'p with a puff of air', note: 'Related to ㅂ; the shape holds air.' },
  { char: 'ㅊ', group: 'aspirated', rom: 'ch', sound: 'ch, as in "chair"', note: 'ㅈ plus a stroke.' },

  { char: 'ㄲ', group: 'tense', rom: 'kk', sound: 'tight k, no air', note: 'ㄱ doubled. Tighten the throat.' },
  { char: 'ㄸ', group: 'tense', rom: 'tt', sound: 'tight t, no air', note: 'ㄷ doubled.' },
  { char: 'ㅃ', group: 'tense', rom: 'pp', sound: 'tight p, no air', note: 'ㅂ doubled.' },
  { char: 'ㅆ', group: 'tense', rom: 'ss', sound: 'tight s', note: 'ㅅ doubled.' },
  { char: 'ㅉ', group: 'tense', rom: 'jj', sound: 'tight j', note: 'ㅈ doubled.' },
];

const VOWEL_GROUPS: LetterGroup[] = ['vowel', 'yvowel'];

/** Text to hand to TTS: a lone jamo is unreliable, so wrap it in a syllable. */
export function sayable(l: Letter): string {
  if (VOWEL_GROUPS.includes(l.group)) return composeSyllable('ㅇ', l.char);
  return composeSyllable(l.char, 'ㅏ');
}
