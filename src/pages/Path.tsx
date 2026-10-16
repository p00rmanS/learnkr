import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, Check } from '../components/Icons';
import { LESSONS, UPCOMING } from '../content/lessons';
import { useAppStore } from '../store';

const STAGES = [
  { n: 0, name: 'Hangul', ko: '한글', blurb: 'Read every letter and your first real words.' },
  { n: 1, name: 'Survival Korean', ko: '생존 한국어', blurb: 'Greetings, numbers, ordering and asking for things.' },
  { n: 2, name: 'Building Sentences', ko: '문장 만들기', blurb: 'Particles, tenses, wants, plans and abilities.' },
  { n: 3, name: 'Real Conversations', ko: '실전 대화', blurb: 'Restaurants, shops, the subway, family, health and fillers.' },
  { n: 4, name: 'Level Up', ko: '더 멀리', blurb: 'Irregular verbs, reasons, must, may, modifiers and speech levels.' },
] as const;

const ROW = 112;

interface Node {
  id: string;
  title: string;
  ko: string;
  blurb: string;
  x: number;
  y: number;
  written: boolean;
}

function useNarrow() {
  const [n, setN] = useState(() => window.matchMedia('(max-width: 720px)').matches);
  useEffect(() => {
    const m = window.matchMedia('(max-width: 720px)');
    const f = () => setN(m.matches);
    m.addEventListener('change', f);
    return () => m.removeEventListener('change', f);
  }, []);
  return n;
}

export function Path() {
  const completed = useAppStore((s) => s.progress.completedLessons);
  const narrow = useNarrow();
  const next = LESSONS.find((l) => !completed.includes(l.id));
  const [stage, setStage] = useState<number>(next?.phase ?? 0);
  const ph = STAGES[stage];

  // Left and right arrows switch stage
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (e.key === 'ArrowRight') setStage((n) => Math.min(STAGES.length - 1, n + 1));
      else if (e.key === 'ArrowLeft') setStage((n) => Math.max(0, n - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const { nodes, height } = useMemo(() => {
    const items = [
      ...LESSONS.filter((l) => l.phase === stage).map((l) => ({ id: l.id, title: l.title, ko: l.ko, blurb: l.blurb, written: true })),
      ...UPCOMING.filter((u) => u.id.startsWith(`${stage}.`)).map((u) => ({ id: u.id, title: u.title, ko: u.ko, blurb: '', written: false })),
    ];
    const nodes: Node[] = items.map((l, k) => ({
      ...l,
      x: narrow ? 11 + 5 * Math.sin(k * 0.9) : 50 + 24 * Math.sin(k * 0.95),
      y: 50 + k * ROW,
    }));
    return { nodes, height: 50 + items.length * ROW };
  }, [stage, narrow]);

  const pathFor = (onlyWalked = false) => {
    const pts = nodes.filter((n) => !onlyWalked || completed.includes(n.id) || n.id === next?.id);
    if (pts.length < 2) return '';
    return pts.reduce((d, p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const q = pts[i - 1];
      const m = (q.y + p.y) / 2;
      return `${d} C ${q.x} ${m}, ${p.x} ${m}, ${p.x} ${p.y}`;
    }, '');
  };

  const stageStats = STAGES.map((s) => {
    const ls = LESSONS.filter((l) => l.phase === s.n);
    return { done: ls.filter((l) => completed.includes(l.id)).length, total: ls.length };
  });

  const jump = () => {
    if (next && next.phase !== stage) setStage(next.phase);
    setTimeout(() => document.getElementById(`node-${next?.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
  };

  return (
    <div className="page">
      <p className="eyebrow">The road</p>
      <h1 className="h-page" style={{ marginTop: 18 }}>Walk it <em>one stop</em> at a time.</h1>
      <p className="lede">Five stages from your first letter to natural Korean. Pick a stage; every finished stop stays open if you want to return.</p>

      <div className="stage-tabs" role="tablist" aria-label="Stages">
        {STAGES.map((s) => (
          <button key={s.n} type="button" role="tab" aria-selected={stage === s.n} data-phase={s.n} className={`stage-tab ${stage === s.n ? 'on' : ''}`} onClick={() => setStage(s.n)}>
            <span className="st-n">{s.n}</span>
            <span className="st-name">{s.name}</span>
            <span className="st-prog">{stageStats[s.n].done}/{stageStats[s.n].total}</span>
            <i className="st-bar"><b style={{ width: `${(stageStats[s.n].done / stageStats[s.n].total) * 100}%` }} /></i>
          </button>
        ))}
      </div>

      <div className="stage-head" data-phase={stage}>
        <div>
          <h2>{ph.name} <span className="kr">{ph.ko}</span></h2>
          <p>{ph.blurb}</p>
        </div>
        <div className="row">
          <Link to="/placement" className="btn ghost sm">Placement quiz</Link>
          {next && <button type="button" className="btn ph sm" onClick={jump}>Jump to my stop <Arrow width={16} height={16} /></button>}
        </div>
      </div>

      <div className="roadmap" data-phase={stage} style={{ height }}>
        <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" aria-hidden="true">
          <path className="rail" d={pathFor()} stroke="var(--ph)" strokeOpacity="0.45" />
          <path className="walked" d={pathFor(true)} />
        </svg>

        {nodes.map((n) => {
          const isDone = completed.includes(n.id);
          const isNext = n.id === next?.id;
          const left = !narrow && n.x > 50;
          const inner = (
            <>
              <div className="pin">{isDone ? <Check width={22} height={22} strokeWidth={2.6} /> : n.id}</div>
              <div className="lbl">
                <b>{n.title}</b>
                <small><span className="kr">{n.ko}</span>{n.written ? ` · ${n.blurb}` : ' · coming soon'}</small>
              </div>
            </>
          );
          const cls = `node ${left ? 'left' : ''} ${isDone ? 'done' : ''} ${isNext ? 'next' : ''}`;
          const style = { left: `${n.x}%`, top: n.y, opacity: n.written ? 1 : 0.45 };
          return n.written ? (
            <Link key={n.id} id={`node-${n.id}`} to={`/learn/${n.id}`} className={cls} style={style}>{inner}</Link>
          ) : (
            <div key={n.id} id={`node-${n.id}`} className={cls} style={style}>{inner}</div>
          );
        })}
      </div>
    </div>
  );
}
