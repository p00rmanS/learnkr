import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Speaker } from '../components/Icons';
import { ALL_LESSONS } from '../content/lessons';
import { romanize, sayIt } from '../lib/pronounce';
import { speakKorean } from '../lib/speech';
import { usePrefs } from '../store/prefs';
import { glossTl } from '../content/gloss-tl';

const STAGES = [
  { v: 'all', label: 'All' },
  { v: '0', label: 'Hangul' },
  { v: '1', label: 'Survival' },
  { v: '2', label: 'Sentences' },
  { v: '3', label: 'Conversations' },
  { v: '4', label: 'Level Up' },
  { v: '5', label: 'Kids' },
];

const PAGE = 60;

export function Phrasebook() {
  const slow = usePrefs((s) => s.slow);
  const tl = usePrefs((s) => s.tl);
  const [q, setQ] = useState('');
  const [stage, setStage] = useState('all');
  const [limit, setLimit] = useState(PAGE);

  const rows = useMemo(() => {
    const seen = new Set<string>();
    return ALL_LESSONS.flatMap((l) =>
      l.items.map((i) => ({ ...i, lesson: l.id, phase: String(l.phase), say: /[가-힣]/.test(i.korean) ? sayIt(i.korean) : '', rom: /[가-힣]/.test(i.korean) ? romanize(i.korean) : '' })),
    ).filter((r) => {
      const key = `${r.korean}|${r.english}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  const needle = q.trim().toLowerCase();
  const shown = rows.filter(
    (r) =>
      (stage === 'all' || r.phase === stage) &&
      (!needle || r.korean.toLowerCase().includes(needle) || r.english.toLowerCase().includes(needle) || r.say.includes(needle) || r.rom.includes(needle)),
  );

  return (
    <div className="page">
      <p className="eyebrow">Phrasebook</p>
      <h1 className="h-page" style={{ marginTop: 18 }}>Everything you have <em>met.</em></h1>
      <p className="lede">Search any word or phrase in English, Korean or romanization. Tap to hear it.</p>

      <div className="pb-search">
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setLimit(PAGE);
          }}
          placeholder="Search: coffee, 감사, gamsa..."
          aria-label="Search phrasebook"
        />
      </div>
      <div className="pb-filters" role="group" aria-label="Filter by stage">
        {STAGES.map((s) => (
          <button key={s.v} type="button" className={`tog ${stage === s.v ? 'on' : ''}`} aria-pressed={stage === s.v} onClick={() => { setStage(s.v); setLimit(PAGE); }}>{s.label}</button>
        ))}
      </div>
      <p className="lab" style={{ marginTop: 18 }}>{shown.length} entries</p>

      <div className="pb-list">
        {shown.slice(0, limit).map((r) => (
          <div key={r.id} className="pb-row">
            <button type="button" className="pb-play" onClick={() => speakKorean(r.korean, slow ? 0.7 : 1)} aria-label={`Hear ${r.korean}`}><Speaker width={18} height={18} /></button>
            <div className="pb-main">
              <div className="pb-ko">{r.korean}</div>
              {r.say && <div className="pb-say">{r.say}<span>{r.rom}</span></div>}
            </div>
            <div className="pb-en">{r.english}{tl && glossTl(r.english) && <em className="pb-tl">{glossTl(r.english)}</em>}</div>
            <Link to={`/learn/${r.lesson}`} className="pb-tag" title="Open the lesson">{r.lesson}</Link>
          </div>
        ))}
        {shown.length === 0 && <p className="empty" style={{ padding: '60px 0' }}>Nothing found. Try another spelling.</p>}
      </div>
      {limit < shown.length && (
        <div style={{ marginTop: 24 }}><button type="button" className="btn ghost" onClick={() => setLimit((l) => l + PAGE)}>Show more</button></div>
      )}
    </div>
  );
}
