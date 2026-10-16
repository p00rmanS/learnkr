import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Arrow } from '../components/Icons';
import { LESSONS } from '../content/lessons';
import { PLACEMENT, STAGE_NAMES } from '../content/placement';
import { useLatest } from '../lib/useLatest';
import { useAppStore } from '../store';

type Phase = 'intro' | 'quiz' | 'result';

/** Shuffle once per question so the right answer is not always in the same slot. */
function order(options: string[], seed: number) {
  const o = [...options];
  let h = seed * 2654435761;
  for (let k = o.length - 1; k > 0; k--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (k + 1);
    [o[k], o[j]] = [o[j], o[k]];
  }
  return o;
}

export function Placement() {
  const nav = useNavigate();
  const markKnown = useAppStore((s) => s.markKnown);
  const [phase, setPhase] = useState<Phase>('intro');
  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState<number[]>([0, 0, 0, 0, 0]);
  const [asked, setAsked] = useState<number[]>([0, 0, 0, 0, 0]);
  const [stopAt, setStopAt] = useState<number | null>(null);
  const [confirm, setConfirm] = useState(false);

  const question = PLACEMENT[q];
  const options = question ? order(question.options, q + 7) : [];

  const submit = (o: string) => {
    if (picked !== null) return;
    setPicked(o);
    const ok = o === question.answer;
    setScore((s) => s.map((v, i) => (i === question.level ? v + (ok ? 1 : 0) : v)));
    setAsked((s) => s.map((v, i) => (i === question.level ? v + 1 : v)));
  };

  const advance = () => {
    const level = question.level;
    const stageQs = PLACEMENT.filter((x) => x.level === level).length;
    const done = asked[level] >= stageQs; // asked already includes this answer
    if (done && score[level] < 2) {
      setStopAt(level);
      setPhase('result');
      return;
    }
    if (q + 1 >= PLACEMENT.length) {
      setPhase('result');
      return;
    }
    setQ(q + 1);
    setPicked(null);
  };

  const adv = useLatest(advance);
  const sub = useLatest(submit);
  const state = useLatest({ phase, picked, options });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { phase: ph, picked: pk, options: opts } = state.current;
      if (ph !== 'quiz' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^[1-3]$/.test(e.key) && pk === null) sub.current(opts[Number(e.key) - 1]);
      else if ((e.key === 'Enter' || e.key === 'ArrowRight') && pk !== null && (e.target as HTMLElement).tagName !== 'BUTTON') {
        e.preventDefault();
        adv.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [adv, sub, state]);

  // Recommended stage: the first one you did not pass, or the top stage if you passed them all
  const recommended = stopAt ?? 4;
  const passedAll = stopAt === null;

  if (phase === 'intro') {
    return (
      <div className="page">
        <p className="eyebrow">Placement</p>
        <h1 className="h-page" style={{ marginTop: 18 }}>Already know <em>some Korean?</em></h1>
        <p className="lede">Answer up to 15 quick questions, three per stage, easiest first. When a stage gets too hard we stop and suggest where to start. It takes about three minutes and nothing is graded.</p>
        <div className="row" style={{ marginTop: 32 }}>
          <button type="button" className="btn" onClick={() => setPhase('quiz')}>Start the quiz <Arrow /></button>
          <Link to="/learn" className="btn ghost">Skip, start from the beginning</Link>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="page">
        <p className="eyebrow">Your result</p>
        <h1 className="h-page" style={{ marginTop: 18 }}>
          {recommended === 0 ? <>Start at the <em>very beginning.</em></> : passedAll ? <>You are ready for <em>Level Up.</em></> : <>Start at stage <em>{recommended}.</em></>}
        </h1>
        <p className="lede">
          {recommended === 0
            ? 'Hangul comes first. It takes only a few days and makes everything else easier.'
            : passedAll
              ? 'You answered everything well. Level Up covers irregular verbs, reasons, must, may and speech levels. You can still open any earlier lesson.'
              : `You were solid through ${STAGE_NAMES[recommended - 1]}, and ${STAGE_NAMES[recommended]} is where new material begins.`}
        </p>

        <div className="place-scores">
          {STAGE_NAMES.map((n, i) => (
            <div key={n} className={`ps ${asked[i] ? '' : 'skip'}`}>
              <b>{asked[i] ? `${score[i]}/${asked[i]}` : '-'}</b>
              <span>{i} · {n}</span>
            </div>
          ))}
        </div>

        {recommended > 0 && !confirm && (
          <div className="row" style={{ marginTop: 32 }}>
            <button type="button" className="btn" onClick={() => setConfirm(true)}>Skip ahead to stage {recommended} <Arrow /></button>
            <Link to="/learn" className="btn ghost">Keep everything locked in order</Link>
          </div>
        )}
        {recommended > 0 && confirm && (
          <div className="panel-note">
            <p>This marks the {LESSONS.filter((l) => l.phase < recommended).length} lessons in stages 0 to {recommended - 1} as done. It adds no XP and no review cards, and you can still open any lesson later. Continue?</p>
            <div className="row" style={{ marginTop: 16 }}>
              <button
                type="button"
                className="btn sm"
                onClick={async () => {
                  await markKnown(LESSONS.filter((l) => l.phase < recommended).map((l) => l.id));
                  nav('/learn');
                }}
              >
                Yes, skip ahead
              </button>
              <button type="button" className="btn ghost sm" onClick={() => setConfirm(false)}>Cancel</button>
            </div>
          </div>
        )}
        {recommended === 0 && (
          <div className="row" style={{ marginTop: 32 }}><Link to="/learn/0.1" className="btn">Begin lesson 0.1 <Arrow /></Link></div>
        )}
        <p className="g-sub" style={{ marginTop: 28 }}>
          <button type="button" className="linklike" onClick={() => { setPhase('intro'); setQ(0); setPicked(null); setScore([0, 0, 0, 0, 0]); setAsked([0, 0, 0, 0, 0]); setStopAt(null); setConfirm(false); }}>Take it again</button>
        </p>
      </div>
    );
  }

  const ok = picked === question.answer;
  return (
    <div className="page place">
      <p className="eyebrow">Stage {question.level} · {STAGE_NAMES[question.level]} · {q + 1} of {PLACEMENT.length}</p>
      <div className="meter-top" style={{ maxWidth: 560 }}><i style={{ width: `${(q / PLACEMENT.length) * 100}%` }} /></div>
      <h1 className="h-page" style={{ marginTop: 28, fontSize: 'clamp(30px, 4.6vw, 52px)' }}>{question.prompt}</h1>
      {question.big && <div className="bigq"><div className="cell-s" style={{ width: 'auto', minWidth: 160, height: 140, padding: '0 28px', fontSize: question.big.length > 4 ? 44 : 78 }}>{question.big}</div></div>}
      <div className="options" style={{ maxWidth: 720 }}>
        {options.map((o) => {
          const st = picked === null ? '' : o === question.answer ? 'right' : o === picked ? 'wrong' : '';
          return <button key={o} type="button" className={`opt ${o.length > 3 ? 'text' : ''} ${st}`} disabled={picked !== null} onClick={() => submit(o)}>{o}</button>;
        })}
      </div>
      {picked !== null && (
        <div className={`actionbar ${ok ? 'good' : 'bad'}`} role="status">
          <div className="in">
            <div className="verdict"><b>{ok ? 'Correct.' : 'Not quite.'}</b><p>{question.why}</p></div>
            <button type="button" className="btn ph" onClick={advance} autoFocus>Next <Arrow /></button>
          </div>
        </div>
      )}
    </div>
  );
}
