import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from '../components/Icons';
import { LESSONS, UPCOMING } from '../content/lessons';
import { useAppStore } from '../store';

const PHASES = [
  { n: 0, name: 'Hangul', ko: '한글' },
  { n: 1, name: 'Survival Korean', ko: '생존 한국어' },
  { n: 2, name: 'Building Sentences', ko: '문장 만들기' },
  { n: 3, name: 'Real Conversations', ko: '실전 대화' },
] as const;

const ROW = 118;
const HEAD = 150;

interface Node {
  id: string;
  title: string;
  ko: string;
  blurb: string;
  phase: number;
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
  const nextId = LESSONS.find((l) => !completed.includes(l.id))?.id;

  const { nodes, heads, height } = useMemo(() => {
    const nodes: Node[] = [];
    const heads: { n: number; y: number }[] = [];
    let y = 20;
    let k = 0;
    for (const ph of PHASES) {
      heads.push({ n: ph.n, y });
      y += HEAD;
      const items = [
        ...LESSONS.filter((l) => l.phase === ph.n).map((l) => ({ ...l, written: true })),
        ...UPCOMING.filter((u) => u.id.startsWith(`${ph.n}.`)).map((u) => ({ ...u, blurb: '', written: false })),
      ];
      for (const l of items) {
        const x = narrow ? 11 + 5 * Math.sin(k * 0.9) : 50 + 24 * Math.sin(k * 0.95);
        nodes.push({ id: l.id, title: l.title, ko: l.ko, blurb: l.blurb, phase: ph.n, x, y, written: l.written });
        y += ROW;
        k++;
      }
      y += 30;
    }
    return { nodes, heads, height: y };
  }, [narrow]);

  const pathFor = (phase: number, onlyWalked = false) => {
    const pts = nodes.filter((n) => n.phase === phase && (!onlyWalked || completed.includes(n.id) || n.id === nextId));
    if (pts.length < 2) return '';
    return pts.reduce((d, p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const q = pts[i - 1];
      const m = (q.y + p.y) / 2;
      return `${d} C ${q.x} ${m}, ${p.x} ${m}, ${p.x} ${p.y}`;
    }, '');
  };

  return (
    <div className="page">
      <p className="eyebrow">The road</p>
      <h1 className="h-page" style={{ marginTop: 18 }}>Walk it <em>one stop</em> at a time.</h1>
      <p className="lede">Four stages from your first letter to real conversations. Every finished stop stays open if you want to return.</p>

      <div className="roadmap" style={{ height }}>
        <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
          {PHASES.map((p) => (
            <g key={p.n} data-phase={p.n}>
              <path className="rail" d={pathFor(p.n)} stroke="var(--ph)" strokeOpacity="0.45" />
              <path className="walked" d={pathFor(p.n, true)} />
            </g>
          ))}
        </svg>

        {heads.map((h) => {
          const p = PHASES[h.n];
          return (
            <div key={h.n} className="rm-phase" data-phase={h.n} style={{ top: h.y }}>
              <p className="eyebrow">Stage {p.n}</p>
              <h2>{p.name}<span>{p.ko}</span></h2>
            </div>
          );
        })}

        {nodes.map((n) => {
          const isDone = completed.includes(n.id);
          const isNext = n.id === nextId;
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
            <Link key={n.id} to={`/learn/${n.id}`} className={cls} style={style} data-phase={n.phase}>{inner}</Link>
          ) : (
            <div key={n.id} className={cls} style={style} data-phase={n.phase}>{inner}</div>
          );
        })}
      </div>
    </div>
  );
}
