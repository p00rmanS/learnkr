/**
 * Content and logic audit. Run with: npm run audit
 * Exits non-zero if any hard error is found; warnings are informational.
 */
import { ALL_LESSONS, KIDS, LESSONS } from '../src/content/lessons.ts';
import { STORIES } from '../src/content/stories.ts';
import { LETTERS } from '../src/content/letters.ts';
import { PLACEMENT } from '../src/content/placement.ts';
import { existsSync, readFileSync } from 'node:fs';
import { composeSyllable, decomposeSyllable } from '../src/lib/hangul.ts';
import { romanize, sayIt } from '../src/lib/pronounce.ts';
import { GLOSS_TL } from '../src/content/gloss-tl.ts';

const errors: string[] = [];
const warns: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warns.push(m);
const hangul = /[가-힣]/;
const nonEmpty = (s: unknown) => typeof s === 'string' && s.trim().length > 0;

// ---------------------------------------------------------------- lessons
const ids = new Set<string>();
const itemKorean = new Map<string, string>();
let teach = 0, choice = 0, build = 0, phrases = 0, withTl = 0, withRemember = 0;
const answerPos = [0, 0, 0, 0];

for (const l of ALL_LESSONS) {
  const at = `lesson ${l.id}`;
  if (ids.has(l.id)) err(`${at}: duplicate lesson id`);
  ids.add(l.id);
  if (![nonEmpty(l.title), nonEmpty(l.ko), nonEmpty(l.blurb)].every(Boolean)) err(`${at}: missing title, ko or blurb`);
  if (!l.steps.length) err(`${at}: no steps`);
  if (!l.items.length) err(`${at}: no review items`);
  if (!l.steps.some((s) => s.kind === 'teach')) err(`${at}: no teach step`);
  if (!l.steps.some((s) => s.kind !== 'teach')) err(`${at}: no exercise`);
  if (l.steps[0]?.kind !== 'teach') warn(`${at}: does not open with a teach step`);
  if (l.steps.at(-1)?.kind === 'teach') warn(`${at}: ends on a teach step (no final check)`);

  for (const it of l.items) {
    if (!nonEmpty(it.id) || !nonEmpty(it.korean) || !nonEmpty(it.english)) err(`${at}: bad item ${JSON.stringify(it)}`);
    const prev = itemKorean.get(it.id);
    if (prev !== undefined && prev !== it.korean) err(`${at}: item id ${it.id} reused for "${it.korean}" and "${prev}"`);
    itemKorean.set(it.id, it.korean);
    if (hangul.test(it.korean) && !/^[a-z]{1,3}$/.test(it.english) && !GLOSS_TL[it.english]) err(`${at}: no Taglish gloss for "${it.english}"`);
  }

  l.steps.forEach((s, n) => {
    const w = `${at} step ${n + 1}`;
    if (s.kind === 'teach') {
      teach++;
      if (!nonEmpty(s.title)) err(`${w}: empty title`);
      if (!s.body.length || !s.body.every(nonEmpty)) err(`${w}: empty body`);
      if (!nonEmpty(s.tip)) err(`${w}: missing pro tip`);
      if (s.tl?.length && s.tl.every(nonEmpty)) withTl++;
      else err(`${w}: no Taglish`);
      if (nonEmpty(s.remember)) withRemember++;
      else err(`${w}: no memory hook`);
      if (!s.phrases && !s.glyphs && !s.blocks) warn(`${w}: teach step shows no examples`);
      for (const p of s.phrases ?? []) {
        phrases++;
        if (!nonEmpty(p.ko) || !nonEmpty(p.en)) err(`${w}: empty phrase`);
      }
      for (const b of s.blocks ?? []) {
        const d = decomposeSyllable(b.ch);
        if (!d) err(`${w}: block "${b.ch}" is not a syllable`);
        else if ([d.initial, d.vowel, d.final].filter(Boolean).join('') !== b.parts.join('')) err(`${w}: block "${b.ch}" parts ${b.parts.join('+')} do not match ${d.initial}+${d.vowel}+${d.final}`);
      }
    } else if (s.kind === 'choice') {
      choice++;
      if (!nonEmpty(s.prompt)) err(`${w}: empty prompt`);
      if (s.options.length < 2 || s.options.length > 4) warn(`${w}: ${s.options.length} options`);
      if (!s.options.includes(s.answer)) err(`${w}: answer "${s.answer}" not in options`);
      if (new Set(s.options).size !== s.options.length) err(`${w}: duplicate options`);
      if (s.options.some((o) => !nonEmpty(o))) err(`${w}: empty option`);
      if (!nonEmpty(s.why)) err(`${w}: missing explanation`);
      if (!nonEmpty(s.whyTl)) err(`${w}: no Taglish explanation`);
      if (s.speak !== undefined && !nonEmpty(s.speak)) err(`${w}: empty speak text`);
      const pos = s.options.indexOf(s.answer);
      if (pos >= 0 && pos < 4) answerPos[pos]++;
      // an option that is a different spelling of the answer would be ambiguous
      const norm = (x: string) => x.replace(/\s+/g, '').toLowerCase();
      if (new Set(s.options.map(norm)).size !== s.options.length) err(`${w}: options identical after normalising`);
    } else {
      build++;
      const d = decomposeSyllable(s.target);
      if (!d) { err(`${w}: build target "${s.target}" is not a syllable`); return; }
      if (composeSyllable(d.initial, d.vowel, d.final) !== s.target) err(`${w}: target does not recompose`);
      if (!s.initials.includes(d.initial)) err(`${w}: needed consonant ${d.initial} missing from choices`);
      if (!s.vowels.includes(d.vowel)) err(`${w}: needed vowel ${d.vowel} missing from choices`);
      if (d.final && !(s.finals ?? []).includes(d.final)) err(`${w}: needed final ${d.final} missing from choices`);
      if (!d.final && s.finals && s.finals.length === 0) warn(`${w}: empty finals list`);
      for (const c of s.initials) if (composeSyllable(c, s.vowels[0], '') === '') err(`${w}: consonant ${c} cannot be composed`);
      for (const c of s.vowels) if (composeSyllable(s.initials[0], c, '') === '') err(`${w}: vowel ${c} cannot be composed`);
      for (const c of s.finals ?? []) if (composeSyllable(s.initials[0], s.vowels[0], c) === '') err(`${w}: final ${c} cannot be composed`);
      if (!nonEmpty(s.why)) err(`${w}: missing explanation`);
      if (!nonEmpty(s.whyTl)) err(`${w}: no Taglish explanation`);
    }
  });
}

// cross-references such as "lesson 4.25" or "(4.25)" must point at a real lesson
for (const l of ALL_LESSONS) {
  l.steps.forEach((s, n) => {
    if (s.kind !== 'teach') return;
    const text = [...s.body, ...(s.tl ?? []), s.tip, s.remember].join(' ');
    for (const m of text.matchAll(/(?:lesson |\()(K?\d+\.\d+|K\d+)[,)]/g)) if (!ids.has(m[1])) err(`lesson ${l.id} step ${n + 1}: refers to lesson ${m[1]}, which does not exist`);
  });
}

// the stage a lesson belongs to must be contiguous for the road map
for (let p = 0; p <= 4; p++) if (!LESSONS.some((l) => l.phase === p)) err(`stage ${p} has no lessons`);
if (!KIDS.length) err('no kids lessons');

// -------------------------------------------------------------- stories
const storyIds = new Set<string>();
for (const s of STORIES) {
  const at = `story ${s.id}`;
  if (storyIds.has(s.id)) err(`${at}: duplicate id`);
  storyIds.add(s.id);
  if (!nonEmpty(s.tip) || !nonEmpty(s.tl)) err(`${at}: missing tip or Taglish`);
  if (s.lines.length < 5) warn(`${at}: only ${s.lines.length} lines`);
  s.lines.forEach((ln, n) => {
    if (!nonEmpty(ln.ko) || !nonEmpty(ln.en)) err(`${at} line ${n + 1}: empty`);
    if (!hangul.test(ln.ko)) err(`${at} line ${n + 1}: no Hangul`);
    if (!nonEmpty(ln.tl)) err(`${at} line ${n + 1}: no Taglish translation`);
  });
  if (!s.vocab.length) err(`${at}: no vocabulary`);
  const all = s.lines.map((l) => l.ko).join(' ');
  for (const v of s.vocab) if (!all.replace(/\s/g, '').includes(v.ko.replace(/\s/g, '').slice(0, 2))) warn(`${at}: vocab "${v.ko}" not obviously in the text`);
}

// -------------------------------------------------------- pronunciation
const sample: string[] = [];
for (const l of ALL_LESSONS) {
  l.items.forEach((i) => sample.push(i.korean));
  l.steps.forEach((s) => {
    if (s.kind === 'teach') (s.phrases ?? []).forEach((p) => sample.push(p.ko));
    if (s.kind === 'choice') {
      if (s.big) sample.push(s.big);
      if (s.speak) sample.push(s.speak);
    }
  });
}
for (const s of STORIES) s.lines.forEach((l) => sample.push(l.ko));
let pron = 0;
for (const t of new Set(sample)) {
  if (!hangul.test(t)) continue;
  pron++;
  const a = sayIt(t);
  const b = romanize(t);
  if (/undefined|NaN/.test(a + b)) err(`pronounce: bad output for "${t}": ${a} / ${b}`);
  if (!a.trim() || !b.trim()) err(`pronounce: empty output for "${t}"`);
  if (hangul.test(a) || hangul.test(b)) err(`pronounce: leftover Hangul for "${t}": ${a} / ${b}`);
}

// ------------------------------------------------------------- letters
for (const l of LETTERS) {
  if (!nonEmpty(l.rom) || !nonEmpty(l.sound) || !nonEmpty(l.note)) err(`letter ${l.char}: incomplete`);
  if (!nonEmpty(l.tl)) err(`letter ${l.char}: no Taglish note`);
}

// ------------------------------------------------------------ placement
for (let lv = 0; lv <= 4; lv++) {
  const n = PLACEMENT.filter((q) => q.level === lv).length;
  if (n !== 3) err(`placement: stage ${lv} has ${n} questions, expected 3`);
}
PLACEMENT.forEach((q, n) => {
  if (!q.options.includes(q.answer)) err(`placement q${n + 1}: answer not in options`);
  if (new Set(q.options).size !== q.options.length) err(`placement q${n + 1}: duplicate options`);
  if (q.options.length > 3) warn(`placement q${n + 1}: more than 3 options (keys 1-3 only)`);
  if (!nonEmpty(q.why)) err(`placement q${n + 1}: no explanation`);
  if (!nonEmpty(q.whyTl)) err(`placement q${n + 1}: no Taglish explanation`);
});

// ------------------------------------------------------------------ PWA
for (const f of ['public/manifest.webmanifest', 'public/sw.js', 'public/icons/icon-192.png', 'public/icons/icon-512.png', 'public/icons/maskable-512.png', 'public/icons/apple-touch-icon.png']) {
  if (!existsSync(f)) err(`pwa: missing ${f}`);
}
if (existsSync('public/manifest.webmanifest')) {
  try {
    const m = JSON.parse(readFileSync('public/manifest.webmanifest', 'utf-8'));
    if (!m.name || !m.start_url || !m.icons?.length) err('pwa: manifest missing name, start_url or icons');
    for (const i of m.icons ?? []) if (!existsSync(`public/${i.src}`)) err(`pwa: manifest icon ${i.src} not found`);
  } catch {
    err('pwa: manifest is not valid JSON');
  }
}
if (existsSync('index.html') && !readFileSync('index.html', 'utf-8').includes('manifest.webmanifest')) err('pwa: index.html does not link the manifest');

// ---------------------------------------------------------------- report
const teachSteps = teach;
console.log(`Lessons:        ${ALL_LESSONS.length} (${LESSONS.length} main + ${KIDS.length} kids)`);
console.log(`Steps:          ${teach} teach, ${choice} choice, ${build} build`);
console.log(`Phrase cards:   ${phrases}`);
console.log(`Review items:   ${itemKorean.size}`);
console.log(`Stories:        ${STORIES.length}`);
console.log(`Pronounced:     ${pron} unique Korean strings, all produced output`);
console.log(`Taglish:        ${withTl}/${teachSteps} teach steps · memory hooks ${withRemember}/${teachSteps}`);
console.log(`Answer position (1st..4th): ${answerPos.join(', ')}`);
const skew = Math.max(...answerPos) / Math.max(1, answerPos.reduce((a, b) => a + b, 0));
if (skew > 0.45) warn(`correct answers cluster in one slot (${Math.round(skew * 100)}%)`);

if (warns.length) {
  console.log(`\n${warns.length} warning(s):`);
  for (const w of warns.slice(0, 40)) console.log('  warn', w);
  if (warns.length > 40) console.log(`  ... and ${warns.length - 40} more`);
}
if (errors.length) {
  console.log(`\n${errors.length} ERROR(S):`);
  for (const e of errors) console.log('  ERROR', e);
  process.exit(1);
}
console.log('\nAudit passed: no errors.');
