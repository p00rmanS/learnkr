import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Assemble } from '../components/Assemble';
import { Arrow, Bolt, Bubble, Close, Knot, Speaker } from '../components/Icons';
import { Say } from '../components/Say';
import { ALL_LESSONS, type Step } from '../content/lessons';
import { composeSyllable } from '../lib/hangul';
import { koreanVoiceAvailable, speakKorean } from '../lib/speech';
import { useAppStore } from '../store';
import { usePrefs } from '../store/prefs';

const BURST = ['var(--red)', 'var(--blue)', 'var(--gold)', 'var(--jade)'];
type Speak = (t: string) => void;
const hasHangul = (t: string) => /[가-힣]/.test(t);

function Teach({ step, onNext, speak }: { step: Extract<Step, { kind: 'teach' }>; onNext: () => void; speak: Speak }) {
  return (
    <>
      <div className="step">
        <span className="tag">Learn</span>
        <h1>{step.title}</h1>
        <div className="body">{step.body.map((p, i) => <p key={i}>{p}</p>)}</div>

        {step.glyphs && (
          <div className="specimens">
            {step.glyphs.map((g) => (
              <button key={g.ch} type="button" className="spec" onClick={() => speak(g.ch)} aria-label={`${g.ch}, ${g.sub}`}>
                <div className="cell-s">{g.ch}</div>
                <span className="cap">{g.sub}</span>
                {hasHangul(g.ch) && <Say text={g.ch} compact />}
              </button>
            ))}
          </div>
        )}

        {step.blocks && (
          <div className="specimens">
            {step.blocks.map((b) => (
              <button key={b.ch} type="button" className="spec" onClick={() => speak(b.ch)} aria-label={b.ch}>
                <div className="cell-s">{b.ch}</div>
                <div className="parts">
                  {b.parts.map((p, i) => (
                    <span key={i} style={{ color: i === 0 ? 'var(--red)' : i === 1 ? 'var(--blue)' : 'var(--gold)' }}>{p}</span>
                  ))}
                </div>
                <Say text={b.ch} compact />
              </button>
            ))}
          </div>
        )}

        {step.phrases && (
          <>
            <div className="phrases">
              {step.phrases.map((p) => (
                <button key={p.ko} type="button" className="phrase" onClick={() => speak(p.ko)} aria-label={`${p.ko}, ${p.en}`}>
                  <Speaker className="sp" width={18} height={18} />
                  <span className="phrase-ko">{p.ko}</span>
                  {hasHangul(p.ko) && <Say text={p.ko} />}
                  <span className="phrase-en">{p.en}</span>
                </button>
              ))}
            </div>
            <p className="say-legend">
              <b>say it</b> shows how to sound each part out. Read the vowels like Filipino or Spanish: a, e, i, o, u. Give every syllable the same beat.
            </p>
          </>
        )}

        {(step.tl || step.tip || step.remember) && (
          <div className="notes">
            {step.tl && (
              <aside className="note tl"><div className="ic"><Bubble /></div><div><div className="nl">Sa Taglish</div>{step.tl.map((t, i) => <p key={i}>{t}</p>)}</div></aside>
            )}
            {step.tip && (
              <aside className="note tip"><div className="ic"><Bolt /></div><div><div className="nl">Pro tip</div><p>{step.tip}</p></div></aside>
            )}
            {step.remember && (
              <aside className="note mem"><div className="ic"><Knot /></div><div><div className="nl">Paano tandaan</div><p>{step.remember}</p></div></aside>
            )}
          </div>
        )}
      </div>
      <div className="actionbar"><div className="in"><span className="kbd-hint">Press <kbd>Enter</kbd> to continue</span><button className="btn ph" type="button" onClick={onNext}>Continue <Arrow /></button></div></div>
    </>
  );
}

function Feedback({ ok, why, whyTl, onNext, extra }: { ok: boolean; why: string; whyTl?: string; onNext: () => void; extra?: string }) {
  return (
    <div className={`actionbar ${ok ? 'good' : 'bad'}`} role="status">
      <div className="in">
        <div className="verdict">
          <b>{ok ? '맞아요. Correct.' : extra || 'Not quite.'}</b>
          <p>{why}</p>
          {whyTl && <p className="tlp">{whyTl}</p>}
        </div>
        <button className="btn ph" type="button" onClick={onNext} autoFocus>Continue <Arrow /></button>
      </div>
    </div>
  );
}

function Choice({ step, onNext, speak }: { step: Extract<Step, { kind: 'choice' }>; onNext: () => void; speak: Speak }) {
  const [picked, setPicked] = useState<string | null>(null);
  const textual = step.options.some((o) => o.length > 3);
  return (
    <>
      <div className="step">
        <span className="tag">Practice</span>
        <h1 style={{ fontSize: 'clamp(30px, 4.6vw, 52px)' }}>{step.prompt}</h1>
        {step.big && (
          <div className="bigq">
            <div className="cell-s" style={{ width: 'auto', minWidth: 160, height: 160, padding: '0 28px', fontSize: step.big.length > 4 ? 52 : 84 }}>{step.big}</div>
            {hasHangul(step.big) && <div style={{ marginTop: 10 }}><Say text={step.big} /></div>}
          </div>
        )}
        {step.speak && (
          <button className="btn ghost" type="button" onClick={() => speak(step.speak!)} style={{ marginTop: 18 }}>
            <Speaker width={18} height={18} /> Play sound
          </button>
        )}
        <div className="options">
          {step.options.map((o) => {
            const state = picked === null ? '' : o === step.answer ? 'right' : o === picked ? 'wrong' : '';
            return (
              <button key={o} type="button" className={`opt ${textual ? 'text' : ''} ${state}`} disabled={picked !== null} onClick={() => setPicked(o)}>{o}</button>
            );
          })}
        </div>
      </div>
      {picked !== null && <Feedback ok={picked === step.answer} why={step.why} whyTl={step.whyTl} onNext={onNext} />}
    </>
  );
}

function Build({ step, onNext, speak }: { step: Extract<Step, { kind: 'build' }>; onNext: () => void; speak: Speak }) {
  const [ini, setIni] = useState('');
  const [vow, setVow] = useState('');
  const [fin, setFin] = useState('');
  const [checked, setChecked] = useState(false);
  const made = ini && vow ? composeSyllable(ini, vow, fin) : '';
  const ok = made === step.target;

  return (
    <>
      <div className="step">
        <span className="tag">Build</span>
        <h1 style={{ fontSize: 'clamp(30px, 4.6vw, 52px)' }}>{step.prompt}</h1>
        {step.speak && (
          <button className="btn ghost" type="button" onClick={() => speak(step.speak!)} style={{ marginTop: 18 }}>
            <Speaker width={18} height={18} /> Play sound
          </button>
        )}
        <div style={{ margin: '30px 0', display: 'flex', justifyContent: 'center' }}>
          {made ? <Assemble text={made} size="min(56vw, 240px)" /> : <div className="cell-s" style={{ width: 'min(56vw, 240px)', height: 'min(56vw, 240px)', fontSize: 80, color: 'var(--dim)' }}>?</div>}
        </div>
        <div className="builder">
          <div className="pick"><span className="lab">Consonant</span>{step.initials.map((c) => <button key={c} type="button" className={`chip i ${ini === c ? 'on' : ''}`} disabled={checked} onClick={() => setIni(c)}>{c}</button>)}</div>
          <div className="pick"><span className="lab">Vowel</span>{step.vowels.map((c) => <button key={c} type="button" className={`chip v ${vow === c ? 'on' : ''}`} disabled={checked} onClick={() => setVow(c)}>{c}</button>)}</div>
          {step.finals && <div className="pick"><span className="lab">Final</span>{['', ...step.finals].map((c) => <button key={c || 'none'} type="button" className={`chip f ${fin === c ? 'on' : ''}`} disabled={checked} onClick={() => setFin(c)}>{c || '-'}</button>)}</div>}
        </div>
      </div>
      {!checked ? (
        <div className="actionbar"><div className="in"><span /><button className="btn ph" type="button" disabled={!made} onClick={() => setChecked(true)}>Check <Arrow /></button></div></div>
      ) : (
        <Feedback ok={ok} why={step.why} whyTl={step.whyTl} onNext={onNext} extra={`Not quite. You built ${made}.`} />
      )}
    </>
  );
}

export function LessonPlayer() {
  const { id } = useParams();
  const nav = useNavigate();
  const lesson = ALL_LESSONS.find((l) => l.id === id);
  const completeLesson = useAppStore((s) => s.completeLesson);
  const [i, setI] = useState(0);
  const [finished, setFinished] = useState(false);
  const slow = usePrefs((s) => s.slow);
  const togglePref = usePrefs((s) => s.toggle);
  const [noVoice, setNoVoice] = useState(false);

  useEffect(() => {
    koreanVoiceAvailable().then((ok) => setNoVoice(!ok));
  }, []);

  // Keyboard: Enter continues, 1-9 picks an answer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (e.key === 'Enter' && el.tagName !== 'BUTTON' && el.tagName !== 'A') {
        const go = document.querySelector<HTMLButtonElement>('.actionbar .btn:not([disabled])');
        if (go) {
          e.preventDefault();
          go.click();
        }
      } else if (/^[1-9]$/.test(e.key)) {
        const opt = document.querySelectorAll<HTMLButtonElement>('.opt')[Number(e.key) - 1];
        if (opt && !opt.disabled) opt.click();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const speak: Speak = (t) => {
    speakKorean(t, slow ? 0.7 : 1);
  };

  if (!lesson) {
    return (
      <div className="lesson" data-phase="3">
        <div className="complete"><div><h1 className="h-page">That lesson is not written yet.</h1><p style={{ marginTop: 24 }}><Link className="btn" to="/learn">Back to the road</Link></p></div></div>
      </div>
    );
  }

  const isKids = lesson.phase === 5;
  const home = isKids ? '/kids' : '/learn';
  const step = lesson.steps[i];
  const next = () => {
    if (i + 1 >= lesson.steps.length) {
      completeLesson(lesson.id, lesson.items);
      setFinished(true);
    } else {
      setI(i + 1);
    }
  };
  const candidate = ALL_LESSONS[ALL_LESSONS.indexOf(lesson) + 1];
  const following = candidate && candidate.phase === lesson.phase ? candidate : undefined;

  return (
    <div className="lesson" data-phase={lesson.phase}>
      <div className="lesson-top">
        <button className="x" type="button" onClick={() => nav(home)} aria-label="Exit lesson"><Close /></button>
        <div className="segs" role="progressbar" aria-valuemin={0} aria-valuemax={lesson.steps.length} aria-valuenow={finished ? lesson.steps.length : i}>
          {lesson.steps.map((_, n) => <i key={n} className={finished || n <= i ? 'on' : ''} />)}
        </div>
        <button type="button" className={`speed ${slow ? 'on' : ''}`} aria-pressed={slow} onClick={() => togglePref('slow')} title="Play audio more slowly">
          {slow ? 'Slow' : '1×'}
        </button>
        <span className="lesson-id">{lesson.id}</span>
      </div>

      {noVoice && (
        <div className="voice-note" role="alert">
          No Korean voice found on this device, so audio may be silent. Try Chrome or Edge, or add a Korean voice in your system settings.
          <button type="button" onClick={() => setNoVoice(false)} aria-label="Dismiss"><Close width={16} height={16} /></button>
        </div>
      )}

      <div className="lesson-body">
        {finished ? (
          <div className="complete">
            <div>
              <div className="burst" aria-hidden="true">
                {Array.from({ length: 12 }, (_, n) => <i key={n} style={{ ['--n' as string]: n, ['--c' as string]: BURST[n % 4] }} />)}
                <span className="kr">잘</span>
              </div>
              <span className="tag" style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ph)' }}>Lesson {lesson.id} complete</span>
              <h1 className="h-page" style={{ marginTop: 14 }}>잘했어요. <em>Well done.</em></h1>
              <p className="lede" style={{ margin: '18px auto 0' }}>{lesson.items.length} cards joined your review pile. They return when you are about to forget them.</p>
              <div className="row" style={{ marginTop: 34, justifyContent: 'center' }}>
                {following ? (
                  <button className="btn ph" type="button" onClick={() => { setI(0); setFinished(false); nav(`/learn/${following.id}`); }}>Next: {following.title} <Arrow /></button>
                ) : (
                  <Link className="btn ph" to={home}>{isKids ? 'Back to Kids' : 'Back to the road'}</Link>
                )}
                <Link className="btn ghost" to="/review">Review now</Link>
              </div>
            </div>
          </div>
        ) : (
          <div key={`${lesson.id}-${i}`}>
            {step.kind === 'teach' && <Teach step={step} onNext={next} speak={speak} />}
            {step.kind === 'choice' && <Choice step={step} onNext={next} speak={speak} />}
            {step.kind === 'build' && <Build step={step} onNext={next} speak={speak} />}
          </div>
        )}
      </div>
    </div>
  );
}
