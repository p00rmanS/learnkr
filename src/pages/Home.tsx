import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Assemble } from '../components/Assemble';
import { Arrow } from '../components/Icons';
import { LESSONS } from '../content/lessons';
import { db } from '../lib/db';
import { getCardsDue } from '../lib/srs';
import { useAppStore } from '../store';

const WORDS = [
  { ch: '한', rom: 'han', mean: 'one, great, Korean' },
  { ch: '글', rom: 'geul', mean: 'writing' },
  { ch: '길', rom: 'gil', mean: 'road, path' },
  { ch: '밥', rom: 'bap', mean: 'rice, a meal' },
  { ch: '물', rom: 'mul', mean: 'water' },
  { ch: '꽃', rom: 'kkot', mean: 'flower' },
  { ch: '와', rom: 'wa', mean: 'wow!' },
  { ch: '책', rom: 'chaek', mean: 'book' },
];

const PHASES = [
  { n: 0, title: 'Hangul', ko: '한글', desc: 'Read every letter and real words within days.' },
  { n: 1, title: 'Survival Korean', ko: '생존 한국어', desc: 'Greetings, numbers, ordering and asking for things.' },
  { n: 2, title: 'Building Sentences', ko: '문장 만들기', desc: 'Particles, tenses, wants, plans and abilities.' },
  { n: 3, title: 'Real Conversations', ko: '실전 대화', desc: 'Restaurants, shops, the subway, family, weather, health and fillers.' },
  { n: 4, title: 'Level Up', ko: '더 멀리', desc: 'Polite commands, reasons, conditions, question words and natural adverbs.' },
];

function lastDays(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return d.toISOString().split('T')[0];
  });
}

export function Home() {
  const progress = useAppStore((s) => s.progress);
  const [due, setDue] = useState(0);
  const [wi, setWi] = useState(0);

  useEffect(() => {
    db.reviewCards.toArray().then((c) => setDue(getCardsDue(c).length)).catch(() => setDue(0));
  }, [progress.completedLessons.length]);

  useEffect(() => {
    const t = setInterval(() => setWi((i) => (i + 1) % WORDS.length), 4200);
    return () => clearInterval(t);
  }, []);

  const phrases = useMemo(
    () => LESSONS.filter((l) => l.phase >= 1).flatMap((l) => l.items).filter((i) => i.korean.length > 2 && i.english.length < 34).filter((_, n) => n % 3 === 0).slice(0, 26),
    [],
  );

  const done = progress.completedLessons.length;
  const total = LESSONS.length;
  const next = LESSONS.find((l) => !progress.completedLessons.includes(l.id));
  const days = lastDays(14);
  const today = days[days.length - 1];
  const C = 2 * Math.PI * 49;
  const w = WORDS[wi];

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Korean for absolute beginners</p>
          <h1 className="display" style={{ marginTop: 22 }}>
            Korean,<br /><em>stroke</em> by stroke.
          </h1>
          <p className="lede">
            Hangul was designed on purpose. See how the letters lock together, understand why, then speak it. Explained in plain English and Taglish, with no streaks and no guilt.
          </p>
          <div className="row" style={{ marginTop: 34 }}>
            <Link to={next ? `/learn/${next.id}` : '/learn'} className="btn">
              {done === 0 ? 'Start lesson 1' : 'Continue learning'} <Arrow />
            </Link>
            <Link to="/hangul" className="btn ghost">Explore the letters</Link>
          </div>
        </div>

        <div className="hero-stage">
          <Assemble key={wi} text={w.ch} size="clamp(230px, 30vw, 390px)" animate settle />
          <div className="hero-cap">
            <div className="rom">{w.rom}</div>
            <div className="mean">{w.mean}</div>
          </div>
          <div className="legend">
            <span><i style={{ background: 'var(--red)' }} />consonant</span>
            <span><i style={{ background: 'var(--blue)' }} />vowel</span>
            <span><i style={{ background: 'var(--gold)' }} />final</span>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...phrases, ...phrases].map((p, i) => (
            <div className="ticker-item" key={i}><b>{p.korean}</b><span>{p.english}</span></div>
          ))}
        </div>
      </div>

      <section className="sec">
        <p className="eyebrow">Your day</p>
        <div className="bento">
          <div className="cell c-next" data-phase={next?.phase ?? 3}>
            <div>
              <div className="lab">{next ? `Up next, lesson ${next.id}` : 'All lessons complete'}</div>
              <div className="next-title">{next ? next.title : 'You finished the road.'}</div>
              {next && <div className="next-ko">{next.ko}</div>}
            </div>
            <div className="row" style={{ position: 'relative', zIndex: 1 }}>
              <Link to={next ? `/learn/${next.id}` : '/learn'} className="btn ph">{next ? 'Begin' : 'Revisit the road'} <Arrow /></Link>
              <span className="lab">{next ? next.blurb : ''}</span>
            </div>
          </div>

          <div className="cell c-due">
            <div className="lab">Cards ready to review</div>
            <div className="big-n" style={{ marginTop: 14 }}>{due}</div>
            <p style={{ color: 'var(--muted)', marginTop: 12, maxWidth: '22em' }}>
              Spaced repetition brings back what you are about to forget, so you never decide what to review.
            </p>
            <Link to="/review" className="btn ghost sm" style={{ marginTop: 20 }}>{due ? 'Start review' : 'Open review'}</Link>
          </div>

          <div className="cell c-ring">
            <svg className="ring" viewBox="0 0 118 118" role="img" aria-label={`${done} of ${total} lessons`}>
              <circle className="bg" cx="59" cy="59" r="49" />
              <circle className="fg" cx="59" cy="59" r="49" strokeDasharray={C} strokeDashoffset={C * (1 - done / total)} />
            </svg>
            <div>
              <div className="big-n" style={{ fontSize: 56 }}>{done}<span style={{ color: 'var(--dim)', fontSize: 28 }}>/{total}</span></div>
              <div className="lab" style={{ marginTop: 8 }}>Lessons done</div>
            </div>
          </div>

          <div className="cell c-days">
            <div className="lab">Last 14 days</div>
            <div className="days" role="img" aria-label={`${progress.studyDays.length} days studied`}>
              {days.map((d) => <div key={d} title={d} className={`day ${progress.studyDays.includes(d) ? 'on' : ''} ${d === today ? 'today' : ''}`} />)}
            </div>
            <p style={{ color: 'var(--muted)', marginTop: 16, fontSize: 15 }}>Lit squares are days you studied. Dark ones cost you nothing. No streak to protect.</p>
          </div>
        </div>
      </section>

      <section className="sec">
        <p className="eyebrow">The method</p>
        <h2 className="h-sec" style={{ marginTop: 16, maxWidth: '14em' }}>Built the opposite of a gamified app.</h2>
        <div className="method">
          <div className="m-card">
            <span className="m-num">01</span>
            <h3>Explain, then ask</h3>
            <p>Every idea gets a plain explanation before a single exercise. You always know why an answer is right.</p>
            <div className="m-demo"><span className="pill on">Explain</span><span className="pill">See</span><span className="pill">Do</span><span className="pill">Review</span></div>
          </div>
          <div className="m-card">
            <span className="m-num">02</span>
            <h3>Taglish, for real</h3>
            <p>Hard parts are re-explained in the way Filipino learners actually think, with comparisons to Tagalog that make grammar click.</p>
            <div className="m-demo"><span className="pill on">이 / 그 / 저 = ito / iyan / iyon</span></div>
          </div>
          <div className="m-card">
            <span className="m-num">03</span>
            <h3>A memory hook on every idea</h3>
            <p>A pro tip and a way to remember, attached to each concept, so the lesson sticks past tonight.</p>
            <div className="m-demo"><span className="pill on">Pro tip</span><span className="pill on">Paano tandaan</span></div>
          </div>
          <div className="m-card">
            <span className="m-num">04</span>
            <h3>Phrases you will really say</h3>
            <p>Restaurants, cafes, shops, the subway, small talk, and the filler words that keep a conversation alive.</p>
            <div className="m-demo"><span className="pill on">괜찮아요</span><span className="pill on">정말요?</span><span className="pill on">잠깐만요</span></div>
          </div>
        </div>
      </section>

      <section className="sec">
        <p className="eyebrow">The road</p>
        <h2 className="h-sec" style={{ marginTop: 16 }}>{total} lessons, five stages.</h2>
        <div className="bands">
          {PHASES.map((p) => {
            const ls = LESSONS.filter((l) => l.phase === p.n);
            const d = ls.filter((l) => progress.completedLessons.includes(l.id)).length;
            return (
              <Link key={p.n} to="/learn" className="band" data-phase={p.n}>
                <div className="dot">{p.n}</div>
                <div>
                  <h3>{p.title} <span className="kr" style={{ fontSize: 18, color: 'var(--ph)', marginLeft: 8 }}>{p.ko}</span></h3>
                  <p>{p.desc}</p>
                </div>
                <div className="cnt">{d} / {ls.length}</div>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="foot">
        <span className="kr" style={{ fontWeight: 900, color: 'var(--text)' }}>한글길</span>
        <span>Progress is saved on this device. Nothing leaves your browser.</span>
      </footer>
    </div>
  );
}
