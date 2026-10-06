import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Gwon } from '../components/Gwon';
import { LESSONS } from '../content/lessons';
import { db } from '../lib/db';
import { getCardsDue } from '../lib/srs';
import { useAppStore } from '../store';

function lastDays(n: number): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push(d.toISOString().split('T')[0]);
  }
  return out;
}

export function Home() {
  const progress = useAppStore((s) => s.progress);
  const [due, setDue] = useState(0);

  useEffect(() => {
    db.reviewCards.toArray().then((c) => setDue(getCardsDue(c).length)).catch(() => setDue(0));
  }, [progress.completedLessons.length]);

  const next = LESSONS.find((l) => !progress.completedLessons.includes(l.id));
  const done = progress.completedLessons.length;
  const days = lastDays(14);

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Korean from zero</p>
          <h1 className="h-display">Read the road before you walk it.</h1>
          <p className="lede">
            Hangul was designed on purpose, and once you see the logic you can read it in days. Every lesson explains first,
            then asks. No streaks, no hearts, no owl.
          </p>
          <div className="row" style={{ marginTop: 28 }}>
            {next ? (
              <Link to={`/learn/${next.id}`} className="btn">
                {done === 0 ? 'Begin lesson 0.1' : `Continue with ${next.id}`}
              </Link>
            ) : (
              <Link to="/learn" className="btn">See the road</Link>
            )}
            <Link to="/hangul" className="btn ghost">Browse the letters</Link>
          </div>
        </div>
        <div className="gwon-row" aria-label="한글길">
          <Gwon ch="한" size="lg" />
          <Gwon ch="글" size="lg" />
          <Gwon ch="길" size="lg" />
        </div>
      </section>

      <hr className="rule" />

      <section className="grid-3">
        <div className="panel">
          <div className="stat-n">{done}<span className="ko" style={{ fontSize: 22 }}> / {LESSONS.length}</span></div>
          <div className="stat-l">Lessons finished</div>
        </div>
        <div className="panel">
          <div className="stat-n">{due}</div>
          <div className="stat-l">Cards ready to review</div>
          {due > 0 && <Link to="/review" className="btn sm" style={{ marginTop: 14 }}>Review now</Link>}
        </div>
        <div className="panel">
          <div className="stat-l" style={{ marginTop: 0 }}>Last 14 days</div>
          <div className="days" role="img" aria-label={`${progress.studyDays.length} days studied`}>
            {days.map((d) => <div key={d} className={`day ${progress.studyDays.includes(d) ? 'on' : ''}`} title={d} />)}
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 10 }}>Filled squares are days you studied. Empty ones cost you nothing.</p>
        </div>
      </section>

      <hr className="rule" />

      <section>
        <div className="section-head"><h2>How this is different</h2></div>
        <ul className="principles">
          <li><div><b>Explain, then ask.</b><span>No exercise appears before the idea behind it.</span></div></li>
          <li><div><b>Romanization fades.</b><span>It helps in the first lessons, then it goes away so you actually read Hangul.</span></div></li>
          <li><div><b>Real sentences only.</b><span>Nothing a person would never say.</span></div></li>
          <li><div><b>Review is automatic.</b><span>Spaced repetition decides what returns. You never have to choose.</span></div></li>
        </ul>
      </section>
    </>
  );
}
