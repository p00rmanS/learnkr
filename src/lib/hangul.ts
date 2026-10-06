const HANGUL_START = 0xac00;
const HANGUL_END = 0xd7a3;

const INITIAL_CONSONANTS = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const VOWELS = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];

const FINAL_CONSONANTS = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

export interface HangulSyllable {
  initial: string;
  vowel: string;
  final: string;
}

export function decomposeSyllable(char: string): HangulSyllable | null {
  const code = char.charCodeAt(0);
  if (code < HANGUL_START || code > HANGUL_END) {
    return null;
  }

  const syllableIndex = code - HANGUL_START;
  const finalIndex = syllableIndex % 28;
  const vowelIndex = Math.floor((syllableIndex % 588) / 28);
  const initialIndex = Math.floor(syllableIndex / 588);

  return {
    initial: INITIAL_CONSONANTS[initialIndex],
    vowel: VOWELS[vowelIndex],
    final: FINAL_CONSONANTS[finalIndex],
  };
}

export function composeSyllable(initial: string, vowel: string, final: string = ''): string {
  const initialIndex = INITIAL_CONSONANTS.indexOf(initial);
  const vowelIndex = VOWELS.indexOf(vowel);
  const finalIndex = FINAL_CONSONANTS.indexOf(final);

  if (initialIndex === -1 || vowelIndex === -1 || finalIndex === -1) {
    return '';
  }

  const code = HANGUL_START + initialIndex * 588 + vowelIndex * 28 + finalIndex;
  return String.fromCharCode(code);
}

export function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase().replace(/[.,!?;:—–\s]+/g, ' ').trim();
}

export function calculateAnswerSimilarity(answer: string, expected: string): number {
  const a = normalizeAnswer(answer);
  const e = normalizeAnswer(expected);

  if (a === e) return 1;

  const longer = Math.max(a.length, e.length);
  let distance = 0;

  for (let i = 0; i < longer; i++) {
    if (a[i] !== e[i]) distance++;
  }

  return 1 - distance / longer;
}
