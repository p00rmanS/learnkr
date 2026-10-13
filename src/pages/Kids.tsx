import { Link } from 'react-router-dom';
import { Arrow, Check } from '../components/Icons';
import { KIDS } from '../content/lessons';
import { useAppStore } from '../store';

const TINTS = ['var(--red)', 'var(--blue)', 'var(--gold)', 'var(--jade)', 'var(--pink)'];

export function Kids() {
  const completed = useAppStore((s) => s.progress.completedLessons);
  const doneCount = KIDS.filter((l) => completed.includes(l.id)).length;
  const next = KIDS.find((l) => !completed.includes(l.id));

  return (
    <div className="page kids" data-phase="5">
      <p className="eyebrow">Kids track</p>
      <h1 className="h-page" style={{ marginTop: 18 }}>Hangul for <em>little learners.</em></h1>
      <p className="lede">Short, playful lessons taught the way you would teach a kindergartener: one idea at a time, big words, chants, animal sounds and counting rhymes. Every lesson has a pro tip and a "say it" guide. Grown-ups are welcome too.</p>

      <div className="row" style={{ marginTop: 28 }}>
        {next ? <Link to={`/learn/${next.id}`} className="btn ph">{doneCount === 0 ? 'Start with the picture alphabet' : `Continue: ${next.title}`} <Arrow /></Link> : <span className="lab">All kids lessons done. Well done!</span>}
        <span className="lab">{doneCount} / {KIDS.length} done</span>
      </div>

      <div className="howto">
        <div><b>10 minutes a day</b><p>Short beats long. One lesson is plenty.</p></div>
        <div><b>Say it together</b><p>Tap a card, listen, then say it out loud. Repeat three times.</p></div>
        <div><b>Move your body</b><p>Touch, point, clap. Actions make words stick.</p></div>
      </div>

      <div className="kid-grid">
        {KIDS.map((l, n) => {
          const done = completed.includes(l.id);
          const tint = TINTS[n % TINTS.length];
          return (
            <Link key={l.id} to={`/learn/${l.id}`} className="kid-card" style={{ ['--tint' as string]: tint }}>
              <span className="kid-big">{l.items[0].korean.replace(/[!.?]/g, '').slice(0, 4)}</span>
              <div className="kid-meta">
                <span className="lab">{l.id}</span>
                {done && <span className="done-badge"><Check width={14} height={14} strokeWidth={2.6} /> Done</span>}
              </div>
              <div className="kid-title">{l.title}</div>
              <div className="kid-ko">{l.ko}</div>
              <p className="kid-blurb">{l.blurb}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
