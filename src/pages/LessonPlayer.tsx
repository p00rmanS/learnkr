import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Gwon } from '../components/Gwon';
import { LESSONS, type Step } from '../content/lessons';
import { composeSyllable } from '../lib/hangul';
import { speakKorean } from '../lib/speech';
import { useAppStore } from '../store';

function Speak({ text, label = 'Hear it' }: { text: string; label?: string }) {
  return (
    <button className="btn ghost sm" onClick={() => speakKorean(text, 1)} type="button">
      {label}
    </button>
  );
}

function Teach({ step }: { step: Extract<Step, { kind: 'teach' }> }) {
  return (
    <>
      <h1>{step.title}</h1>
      <div className="body">{step.body.map((p, i) => <p key={i}>{p}</p>)}</div>
      {step.glyphs && (
        <div className="specimens">
          {step.glyphs.map((g) => (
            <button key={g.ch} className="specimen" onClick={() => speakKorean(g.ch.length === 1 ? g.ch : g.ch)} style={{ background: 'none', border: 0, padding: 0 }} type="button" aria-label={`${g.ch}, ${g.sub}`}>
              <Gwon ch={g.ch} size="lg" />
              <div className="cap">{g.sub}</div>
            </button>
          ))}
        </div>
      )}
      {step.phrases && (
        <div className="phrases">
          {step.phrases.map((p) => (
            <button key={p.ko} className="phrase" onClick={() => speakKorean(p.ko)} type="button" aria-label={`${p.ko}, ${p.en}`}>
              <span className="ko phrase-ko">{p.ko}</span>
              <span className="phrase-en">{p.en}</span>
              {p.rom && <span className="mono phrase-rom">{p.rom}</span>}
            </button>
          ))}
        </div>
      )}
      {step.blocks && (
        <div className="specimens">
          {step.blocks.map((b) => (
            <button key={b.ch} className="specimen" onClick={() => speakKorean(b.ch)} style={{ background: 'none', border: 0, padding: 0 }} type="button" aria-label={b.ch}>
              <Gwon ch={b.ch} size="lg" />
              <div className="split">{b.parts.map((p, i) => <span key={i}>{i > 0 && '+ '}<b>{p}</b></span>)}</div>
            </button>
          ))}
        </div>
      )}
      {step.tl && (
        <aside className="callout tl"><span className="callout-label">Sa Taglish</span>{step.tl.map((t, i) => <p key={i}>{t}</p>)}</aside>
      )}
      {step.tip && <aside className="callout tip"><span className="callout-label">Pro tip</span><p>{step.tip}</p></aside>}
      {step.remember && <aside className="callout mem"><span className="callout-label">Paano tandaan</span><p>{step.remember}</p></aside>}
    </>
  );
}

function Choice({ step, onDone }: { step: Extract<Step, { kind: 'choice' }>; onDone: () => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  const correct = picked === step.answer;
  const textual = step.options.some((o) => o.length > 3);

  return (
    <>
      <h1>{step.prompt}</h1>
      {step.big && <Gwon ch={step.big} size="xl" />}
      {step.speak && <Speak text={step.speak} label="Play sound" />}
      <div className="options">
        {step.options.map((o) => {
          const state = picked === null ? '' : o === step.answer ? 'right' : o === picked ? 'wrong' : '';
          return (
            <button key={o} className={`opt ${textual ? 'text' : ''} ${state}`} disabled={picked !== null} onClick={() => setPicked(o)} type="button">
              {o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <>
          <div className={`verdict ${correct ? '' : 'bad'}`}>
            <b>{correct ? '맞아요. Correct.' : 'Not quite.'}</b>
            <p>{step.why}</p>
            {step.whyTl && <p className="tl-line">{step.whyTl}</p>}
          </div>
          <button className="btn" onClick={onDone} type="button">Continue</button>
        </>
      )}
    </>
  );
}

function Build({ step, onDone }: { step: Extract<Step, { kind: 'build' }>; onDone: () => void }) {
  const [ini, setIni] = useState('');
  const [vow, setVow] = useState('');
  const [fin, setFin] = useState('');
  const [checked, setChecked] = useState(false);
  const made = ini && vow ? composeSyllable(ini, vow, fin) : '';
  const correct = made === step.target;

  return (
    <>
      <h1>{step.prompt}</h1>
      {step.speak && <Speak text={step.speak} label="Play sound" />}
      <div className="builder">
        <Gwon ch={made || '?'} size="xl" />
        <div className="pick-row"><span className="lab">Consonant</span>{step.initials.map((c) => <button key={c} type="button" className={`chip ${ini === c ? 'on' : ''}`} disabled={checked} onClick={() => setIni(c)}>{c}</button>)}</div>
        <div className="pick-row"><span className="lab">Vowel</span>{step.vowels.map((c) => <button key={c} type="button" className={`chip ${vow === c ? 'on' : ''}`} disabled={checked} onClick={() => setVow(c)}>{c}</button>)}</div>
        {step.finals && <div className="pick-row"><span className="lab">Final</span>{['', ...step.finals].map((c) => <button key={c || 'none'} type="button" className={`chip ${fin === c ? 'on' : ''}`} disabled={checked} onClick={() => setFin(c)}>{c || '-'}</button>)}</div>}
      </div>
      {!checked ? (
        <button className="btn" disabled={!made} onClick={() => setChecked(true)} type="button">Check</button>
      ) : (
        <>
          <div className={`verdict ${correct ? '' : 'bad'}`}>
            <b>{correct ? '맞아요. Correct.' : `Not quite. You built ${made}.`}</b>
            <p>{step.why}</p>
            {step.whyTl && <p className="tl-line">{step.whyTl}</p>}
          </div>
          <button className="btn" onClick={onDone} type="button">Continue</button>
        </>
      )}
    </>
  );
}

export function LessonPlayer() {
  const { id } = useParams();
  const lesson = LESSONS.find((l) => l.id === id);
  const completeLesson = useAppStore((s) => s.completeLesson);
  const [i, setI] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!lesson) {
    return (
      <>
        <h1 className="h-page">That lesson is not written yet.</h1>
        <p style={{ marginTop: 18 }}><Link className="btn" to="/learn">Back to the road</Link></p>
      </>
    );
  }

  const step = lesson.steps[i];
  const next = () => {
    if (i + 1 >= lesson.steps.length) {
      completeLesson(lesson.id, lesson.items);
      setFinished(true);
    } else {
      setI(i + 1);
    }
  };

  if (finished) {
    const following = LESSONS[LESSONS.indexOf(lesson) + 1];
    return (
      <div className="done-card">
        <p className="eyebrow">Lesson {lesson.id} complete</p>
        <h1 className="h-page">잘했어요. Well done.</h1>
        <p className="lede">{lesson.items.length} cards were added to your review pile. They will come back when you are about to forget them.</p>
        <div className="row" style={{ marginTop: 28 }}>
          {following ? <Link className="btn" to={`/learn/${following.id}`} onClick={() => { setI(0); setFinished(false); }}>Next: {following.title}</Link> : <Link className="btn" to="/learn">Back to the road</Link>}
          <Link className="btn ghost" to="/review">Review now</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="lesson-top">
        <Link to="/learn" className="btn ghost sm">Exit</Link>
        <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={lesson.steps.length} aria-valuenow={i}>
          {lesson.steps.map((_, n) => <i key={n} className={n <= i ? 'on' : ''} />)}
        </div>
        <span className="mono" style={{ fontSize: 13, color: 'var(--ink-2)' }}>{lesson.id}</span>
      </div>
      <div className="step" key={`${lesson.id}-${i}`}>
        {step.kind === 'teach' && (
          <>
            <Teach step={step} />
            <button className="btn" style={{ marginTop: 28 }} onClick={next} type="button">Continue</button>
          </>
        )}
        {step.kind === 'choice' && <Choice step={step} onDone={next} />}
        {step.kind === 'build' && <Build step={step} onDone={next} />}
      </div>
    </>
  );
}
