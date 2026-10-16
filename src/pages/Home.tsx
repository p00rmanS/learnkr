import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Assemble } from '../components/Assemble';
import { Flame, Ring } from '../components/Growth';
import { Arrow, Check } from '../components/Icons';
import { KIDS, LESSONS } from '../content/lessons';
import { STORIES } from '../content/stories';
import { addDays, localDate, parseDate } from '../lib/dates';
import { db } from '../lib/db';
import { levelFor, streakInfo, xpToday } from '../lib/growth';
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
  { n: 3, title: 'Real Conversations', ko: '실전 대화', desc: 'Restaurants, shops, the subway, family, health and fillers.' },
  { n: 4, title: 'Level Up', ko: '더 멀리', desc: 'Irregular verbs, reasons, must, may, modifiers and speech levels.' },
];

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function Home() {
  const progress = useAppStore((s) => s.progress);
  const [due, setDue] = useState(0);
  const [wi, setWi] = useState(0);

  useEffect(() => {
    db.reviewCards.toArray().then((c) => setDue(getCardsDue(c).length)).catch(() => setDue(0));
  }, [progress.completedLessons.length, progress.reviewCount]);

  useEffect(() => {
    const t = setInterval(() => setWi((i) => (i + 1) % WORDS.length), 4200);
    return () => clearInterval(t);
  }, []);

  const phrases = useMemo(
    () => LESSONS.filter((l) => l.phase >= 1).flatMap((l) => l.items).filter((i) => i.korean.length > 2 && i.english.length < 34).filter((_, n) => n % 4 === 0).slice(0, 26),
    [],
  );

  const done = progress.completedLessons.filter((id) => LESSONS.some((l) => l.id === id)).length;
  const total = LESSONS.length;
  const next = LESSONS.find((l) => !progress.completedLessons.includes(l.id));
  const today = localDate();
  const week = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
  const streak = streakInfo(progress);
  const lvl = levelFor(progress.xp);
  const todayXp = xpToday(progress);
  const goalPct = todayXp / progress.dailyGoal;
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
            Hangul was designed on purpose. See how the letters lock together, understand why, then speak it. Explained in plain English and Taglish, with streaks that forgive you.
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
              Each card you review earns XP and keeps your streak going.
            </p>
            <Link to="/review" className="btn ghost sm" style={{ marginTop: 20 }}>{due ? 'Start review' : 'Open review'}</Link>
          </div>

          <Link to="/progress" className="cell c-goal">
            <div className="lab">Daily goal</div>
            <div className="goal-mini">
              <Ring pct={goalPct} size={104} stroke={9} color={goalPct >= 1 ? 'var(--jade)' : 'var(--gold)'}>
                {goalPct >= 1 ? <Check width={34} height={34} strokeWidth={2.6} style={{ color: 'var(--jade)' }} /> : <><b>{todayXp}</b><span>/ {progress.dailyGoal}</span></>}
              </Ring>
              <p className="g-sub">{goalPct >= 1 ? 'Goal reached. Anything more is a bonus.' : `${progress.dailyGoal - todayXp} XP to go. One lesson is about 25.`}</p>
            </div>
          </Link>

          <Link to="/progress" className={`cell c-streak ${streak.current ? 'on' : ''}`}>
            <div className="lab">Streak</div>
            <div className="streak-row">
              <Flame size={52} lit={streak.current > 0} />
              <div><div className="big-n" style={{ fontSize: 64 }}>{streak.current}</div><div className="lab">{streak.current === 1 ? 'day' : 'days'}</div></div>
            </div>
            <div className="week-dots small">
              {week.map((d) => (
                <div key={d} className={`wd ${progress.studyDays.includes(d) ? 'on' : ''} ${progress.frozenDays.includes(d) ? 'ice' : ''} ${d === today ? 'today' : ''}`}>
                  <span>{DOW[parseDate(d).getDay()]}</span><i />
                </div>
              ))}
            </div>
            <p className="g-sub">{streak.current === 0 ? 'Finish a lesson to light your first day.' : streak.atRisk ? 'Study today to keep it going.' : 'Nice. Today is logged.'}</p>
          </Link>

          <Link to="/progress" className="cell c-level">
            <div className="lab">Level</div>
            <div className="lvl-row">
              <div className="big-n" style={{ fontSize: 64 }}>{lvl.level}</div>
              <div><div className="lvl-ko kr">{lvl.ko}</div><div className="lab">{lvl.title}</div></div>
            </div>
            <div className="xpbar"><i style={{ width: `${lvl.pct}%` }} /></div>
            <p className="g-sub">{lvl.into} / {lvl.need} XP · {done}/{total} lessons</p>
          </Link>
        </div>
      </section>

      <section className="sec">
        <Link to="/placement" className="place-banner">
          <div>
            <span className="lab">Placement quiz</span>
            <h3>Already know some Korean?</h3>
            <p>Take a three-minute quiz and skip straight to the right stage.</p>
          </div>
          <Arrow width={22} height={22} />
        </Link>
      </section>

      <section className="sec" style={{ marginTop: 56 }}>
        <p className="eyebrow">Read and play</p>
        <div className="duo">
          <Link to="/stories" className="duo-card">
            <span className="lab">{STORIES.length} stories</span>
            <h3>Read along</h3>
            <p>Short dialogues, diaries and fables. Every line has sound, a say-it guide, romanization and English.</p>
            <span className="duo-go">Open stories <Arrow width={18} height={18} /></span>
          </Link>
          <Link to="/kids" className="duo-card kid" data-phase="5">
            <span className="lab">{KIDS.length} lessons</span>
            <h3>Kids track</h3>
            <p>Taught like kindergarten: picture alphabet, animal sounds, counting rhymes, colors and body parts.</p>
            <span className="duo-go">Start playing <Arrow width={18} height={18} /></span>
          </Link>
        </div>
      </section>

      <section className="sec">
        <p className="eyebrow">The method</p>
        <h2 className="h-sec" style={{ marginTop: 16, maxWidth: '14em' }}>Habit tools without the guilt.</h2>
        <div className="method">
          <div className="m-card">
            <span className="m-num">01</span>
            <h3>Explain, then ask</h3>
            <p>Every idea gets a plain explanation before a single exercise. You always know why an answer is right.</p>
            <div className="m-demo"><span className="pill on">Explain</span><span className="pill">See</span><span className="pill">Do</span><span className="pill">Review</span></div>
          </div>
          <div className="m-card">
            <span className="m-num">02</span>
            <h3>Streaks that forgive</h3>
            <p>No hearts and no lost progress. Earn rest-day shields every week and your streak survives a missed day.</p>
            <div className="m-demo"><span className="pill on">XP</span><span className="pill on">Daily goal</span><span className="pill on">Shields</span><span className="pill on">Badges</span></div>
          </div>
          <div className="m-card">
            <span className="m-num">03</span>
            <h3>Taglish, for real</h3>
            <p>Hard parts are re-explained the way Filipino learners think, with comparisons to Tagalog that make grammar click.</p>
            <div className="m-demo"><span className="pill on">이 / 그 / 저 = ito / iyan / iyon</span></div>
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
        <span className="foot-links">
          <Link to="/hangul">Letters</Link>
          <Link to="/syllables">Build a syllable</Link>
          <Link to="/phrases">Phrasebook</Link>
          <Link to="/progress">Progress</Link>
          <Link to="/settings">Settings and backup</Link>
        </span>
        <span>Progress is saved on this device. Nothing leaves your browser.</span>
      </footer>
    </div>
  );
}
