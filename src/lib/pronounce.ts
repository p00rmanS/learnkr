/**
 * Turns Hangul into (a) a friendly "say it" respelling and (b) Revised Romanization,
 * after applying the main Korean sound-change rules (liaison, final-consonant
 * neutralisation, nasalisation, tensification, aspiration, palatalisation).
 * It is a learner aid, not a linguistic authority: natural speech links words too.
 */

const BASE = 0xac00;
const INIT = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const VOW = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const FIN = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

interface Syl { i: string; v: string; f: string; t?: string }

const COMPOUND: Record<string, [string, string]> = {
  ㄳ: ['ㄱ', 'ㅅ'], ㄵ: ['ㄴ', 'ㅈ'], ㄶ: ['ㄴ', 'ㅎ'], ㄺ: ['ㄹ', 'ㄱ'], ㄻ: ['ㄹ', 'ㅁ'],
  ㄼ: ['ㄹ', 'ㅂ'], ㄽ: ['ㄹ', 'ㅅ'], ㄾ: ['ㄹ', 'ㅌ'], ㄿ: ['ㄹ', 'ㅍ'], ㅀ: ['ㄹ', 'ㅎ'], ㅄ: ['ㅂ', 'ㅅ'],
};

/** Final consonant as actually pronounced when no vowel follows. */
const REP: Record<string, string> = {
  ㄱ: 'ㄱ', ㅋ: 'ㄱ', ㄲ: 'ㄱ', ㄳ: 'ㄱ', ㄺ: 'ㄱ',
  ㄴ: 'ㄴ', ㄵ: 'ㄴ', ㄶ: 'ㄴ',
  ㄷ: 'ㄷ', ㅅ: 'ㄷ', ㅆ: 'ㄷ', ㅈ: 'ㄷ', ㅊ: 'ㄷ', ㅌ: 'ㄷ', ㅎ: 'ㄷ',
  ㄹ: 'ㄹ', ㄼ: 'ㄹ', ㄽ: 'ㄹ', ㄾ: 'ㄹ', ㅀ: 'ㄹ',
  ㅁ: 'ㅁ', ㄻ: 'ㅁ',
  ㅂ: 'ㅂ', ㅍ: 'ㅂ', ㅄ: 'ㅂ', ㄿ: 'ㅂ',
  ㅇ: 'ㅇ',
};

const NASAL: Record<string, string> = { ㄱ: 'ㅇ', ㄷ: 'ㄴ', ㅂ: 'ㅁ' };
const TENSE: Record<string, string> = { ㄱ: 'ㄲ', ㄷ: 'ㄸ', ㅂ: 'ㅃ', ㅅ: 'ㅆ', ㅈ: 'ㅉ' };
const ASPIRATE: Record<string, string> = { ㄱ: 'ㅋ', ㄷ: 'ㅌ', ㅂ: 'ㅍ', ㅈ: 'ㅊ' };

function toSyl(ch: string): Syl {
  const n = ch.charCodeAt(0) - BASE;
  return { i: INIT[Math.floor(n / 588)], v: VOW[Math.floor((n % 588) / 28)], f: FIN[n % 28] };
}

/** Apply sound changes across adjacent syllables of one Hangul run. */
function soundChange(src: Syl[]): Syl[] {
  const s = src.map((x) => ({ ...x }));
  for (let k = 0; k < s.length - 1; k++) {
    const A = s[k];
    const B = s[k + 1];
    if (!A.f) continue;

    if (B.i === 'ㅇ') {
      // liaison: the final moves over to the next syllable
      if (A.f === 'ㅇ') continue;
      if (A.f === 'ㅎ') { A.f = ''; continue; }
      const cmp = COMPOUND[A.f];
      if (cmp) {
        if (cmp[1] === 'ㅎ') { B.i = cmp[0]; A.f = ''; } else { A.f = cmp[0]; B.i = cmp[1] === 'ㅅ' ? 'ㅆ' : cmp[1]; }
      } else {
        let moved = A.f;
        if (B.v === 'ㅣ' && moved === 'ㄷ') moved = 'ㅈ';
        if (B.v === 'ㅣ' && moved === 'ㅌ') moved = 'ㅊ';
        B.i = moved;
        A.f = '';
      }
      continue;
    }

    // ㅎ as a final (or inside ㄶ / ㅀ) before a consonant
    if (A.f === 'ㅎ' || A.f === 'ㄶ' || A.f === 'ㅀ') {
      const keep = COMPOUND[A.f]?.[0] ?? '';
      if (ASPIRATE[B.i] && B.i !== 'ㅂ') B.i = ASPIRATE[B.i];
      else if (B.i === 'ㅅ') B.i = 'ㅆ';
      A.f = keep;
      continue;
    }

    const r = REP[A.f] ?? A.f;

    if (B.i === 'ㅎ' && ASPIRATE[r === 'ㄷ' ? 'ㄷ' : r]) {
      B.i = r === 'ㄱ' ? 'ㅋ' : r === 'ㄷ' ? 'ㅌ' : 'ㅍ';
      A.f = '';
      continue;
    }
    if (NASAL[r] && (B.i === 'ㄴ' || B.i === 'ㅁ')) { A.f = NASAL[r]; continue; }
    if (NASAL[r] && B.i === 'ㄹ') { A.f = NASAL[r]; B.i = 'ㄴ'; continue; }
    if ((r === 'ㅁ' || r === 'ㅇ') && B.i === 'ㄹ') { A.f = r; B.i = 'ㄴ'; continue; }
    if (r === 'ㄴ' && B.i === 'ㄹ') { A.f = 'ㄹ'; continue; }
    if (r === 'ㄹ' && B.i === 'ㄴ') { B.i = 'ㄹ'; A.f = 'ㄹ'; continue; }
    if ((r === 'ㄱ' || r === 'ㄷ' || r === 'ㅂ') && TENSE[B.i]) { B.t = B.i; B.i = TENSE[B.i]; A.f = r; continue; }
    A.f = r;
  }
  // last syllable: neutralise any leftover final
  const last = s[s.length - 1];
  if (last && last.f) last.f = REP[last.f] ?? last.f;
  return s;
}

type Table = { init: Record<string, string>; vow: Record<string, string>; fin: Record<string, string>; rr?: boolean };

const SAY: Table = {
  init: { ㄱ: 'g', ㄲ: 'kk', ㄴ: 'n', ㄷ: 'd', ㄸ: 'tt', ㄹ: 'r', ㅁ: 'm', ㅂ: 'b', ㅃ: 'pp', ㅅ: 's', ㅆ: 'ss', ㅇ: '', ㅈ: 'j', ㅉ: 'jj', ㅊ: 'ch', ㅋ: 'k', ㅌ: 't', ㅍ: 'p', ㅎ: 'h' },
  vow: { ㅏ: 'a', ㅐ: 'eh', ㅑ: 'ya', ㅒ: 'yeh', ㅓ: 'uh', ㅔ: 'eh', ㅕ: 'yuh', ㅖ: 'yeh', ㅗ: 'o', ㅘ: 'wa', ㅙ: 'weh', ㅚ: 'weh', ㅛ: 'yo', ㅜ: 'oo', ㅝ: 'wuh', ㅞ: 'weh', ㅟ: 'wee', ㅠ: 'yoo', ㅡ: 'eu', ㅢ: 'eui', ㅣ: 'ee' },
  fin: { ㄱ: 'k', ㄴ: 'n', ㄷ: 't', ㄹ: 'l', ㅁ: 'm', ㅂ: 'p', ㅇ: 'ng' },
};

const RR: Table = {
  init: SAY.init,
  vow: { ㅏ: 'a', ㅐ: 'ae', ㅑ: 'ya', ㅒ: 'yae', ㅓ: 'eo', ㅔ: 'e', ㅕ: 'yeo', ㅖ: 'ye', ㅗ: 'o', ㅘ: 'wa', ㅙ: 'wae', ㅚ: 'oe', ㅛ: 'yo', ㅜ: 'u', ㅝ: 'wo', ㅞ: 'we', ㅟ: 'wi', ㅠ: 'yu', ㅡ: 'eu', ㅢ: 'ui', ㅣ: 'i' },
  fin: SAY.fin,
  rr: true,
};

function render(run: string, t: Table, sep: string): string {
  const syls = soundChange([...run].map(toSyl));
  return syls
    .map((x, n) => {
      // Revised Romanization does not mark tensification
      let init = t.init[(t.rr && x.t) || x.i] ?? '';
      // ㄹ after an ㄹ final is "ll"; elsewhere it is "r" before a vowel
      if (x.i === 'ㄹ' && n > 0 && syls[n - 1].f === 'ㄹ') init = 'l';
      // a short "i" reads better than "ee" when a final consonant follows
      const vow = !t.rr && x.v === 'ㅣ' && x.f ? 'i' : t.vow[x.v] ?? '';
      return init + vow + (x.f ? t.fin[x.f] ?? '' : '');
    })
    .join(sep);
}

function convert(text: string, t: Table, sep: string): string {
  return text
    .split(/([가-힣]+)/)
    .map((part) => (/^[가-힣]+$/.test(part) ? render(part, t, sep) : part))
    .join('');
}

/** "an-nyuhng-ha-seh-yo" style respelling for English / Filipino readers. */
export const sayIt = (text: string): string => convert(text, SAY, '-');

/** Revised Romanization of the pronounced form, e.g. "annyeonghaseyo". */
export const romanize = (text: string): string => convert(text, RR, '');
