import { Link } from 'react-router-dom';
import { LESSONS, UPCOMING } from '../content/lessons';
import { useAppStore } from '../store';

const PHASES = [
  { n: 0, tag: 'Phase 0', name: '한글: Hangul' },
  { n: 1, tag: 'Phase 1', name: '생존 한국어: Survival Korean' },
  { n: 2, tag: 'Phase 2', name: '문장 만들기: Building Sentences' },
  { n: 3, tag: 'Phase 3', name: '실전 대화: Real Conversations' },
] as const;

export function Path() {
  const completed = useAppStore((s) => s.progress.completedLessons);
  const nextId = LESSONS.find((l) => !completed.includes(l.id))?.id;

  return (
    <>
      <p className="eyebrow">The road</p>
      <h1 className="h-page">Your path</h1>
      <p className="lede">Finish Hangul first, then walk into real sentences. Every finished lesson is a stop you can come back to.</p>

      {PHASES.map((ph) => {
        const lessons = LESSONS.filter((l) => l.phase === ph.n);
        const later = UPCOMING.filter((u) => u.id.startsWith(`${ph.n}.`));
        return (
          <section key={ph.n}>
            <div className="phase-head"><p className="eyebrow">{ph.tag}</p><h2 className="ko" style={{ fontSize: 24, fontWeight: 700 }}>{ph.name}</h2></div>
            <div className="road">
              {lessons.map((l) => {
                const isDone = completed.includes(l.id);
                const isNext = l.id === nextId;
                return (
                  <Link key={l.id} to={`/learn/${l.id}`} className={`stop ${isDone ? 'done' : ''} ${isNext ? 'next' : ''}`}>
                    <div className="dot">{isDone ? 'OK' : l.id}</div>
                    <div>
                      <h3>{l.title}</h3>
                      <p><span className="ko">{l.ko}</span> &middot; {l.blurb}</p>
                    </div>
                    {isNext && <span className="tag red">Up next</span>}
                    {isDone && <span className="tag">Done</span>}
                  </Link>
                );
              })}
              {later.map((l) => (
                <div key={l.id} className="stop later">
                  <div className="dot">{l.id}</div>
                  <div>
                    <h3>{l.title}</h3>
                    <p className="ko">{l.ko}</p>
                  </div>
                  <span className="tag">Not written yet</span>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
