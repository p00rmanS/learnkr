import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, Speaker } from '../components/Icons';
import { Say } from '../components/Say';
import { ITEMS } from '../content/allItems';
import { db, type ReviewCard } from '../lib/db';
import { getCardsDue, scheduleCard, type Feedback } from '../lib/srs';
import { speakKorean } from '../lib/speech';
import { useAppStore } from '../store';
import { Flame } from '../components/Growth';
import { REVIEW_XP } from '../lib/growth';

export function Review() {
  const [queue, setQueue] = useState<ReviewCard[] | null>(null);
  const [shown, setShown] = useState(false);
  const [total, setTotal] = useState(0);
  const awardReview = useAppStore((s) => s.awardReview);
  const streakNow = useAppStore((s) => s.progress.bestStreak);
  const [session, setSession] = useState({ xp: 0, again: 0, done: 0 });

  useEffect(() => {
    db.reviewCards.toArray().then((all) => {
      const due = getCardsDue(all).filter((c) => ITEMS.has(c.itemId));
      setQueue(due);
      setTotal(due.length);
    }).catch(() => setQueue([]));
  }, []);

  const card0 = queue?.[0];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!card0 || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      if (el.tagName === 'BUTTON' || el.tagName === 'A') return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setShown((x) => !x);
      } else if (shown && /^[1-4]$/.test(e.key)) {
        document.querySelectorAll<HTMLButtonElement>('.grade')[Number(e.key) - 1]?.click();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [card0, shown]);

  if (queue === null) return <div className="page" />;

  if (queue.length === 0) {
    return (
      <div className="page">
        <p className="eyebrow">Review</p>
        <h1 className="h-page" style={{ marginTop: 18 }}>{total > 0 ? <>다 했어요. <em>All done.</em></> : <>Nothing to <em>review</em> yet.</>}</h1>
        <p className="lede">{total > 0 ? 'Cards come back when you are about to forget them. See you later.' : 'Finish a lesson and its cards will land here.'}</p>
        {total > 0 && (
          <div className="reward-cards" style={{ marginTop: 28 }}>
            <div className="rw xp"><b>+{session.xp}</b><span>XP earned</span></div>
            <div className="rw"><b>{session.done}</b><span>cards reviewed</span></div>
            <div className="rw"><Flame size={26} /><b>{streakNow}</b><span>best streak</span></div>
          </div>
        )}
        <div style={{ marginTop: 32 }}><Link to="/learn" className="btn">{total > 0 ? 'Back to the road' : 'Start a lesson'} <Arrow /></Link></div>
      </div>
    );
  }

  const card = queue[0];
  const item = ITEMS.get(card.itemId)!;
  const doneCount = total - queue.length;

  const grade = async (f: Feedback) => {
    const updated = scheduleCard(card, f);
    await db.reviewCards.put(updated);
    awardReview(f);
    setSession((x) => ({ xp: x.xp + REVIEW_XP[f], again: x.again + (f === 'again' ? 1 : 0), done: x.done + 1 }));
    // "again" stays in this session; everything else leaves it
    setQueue(f === 'again' ? [...queue.slice(1), updated] : queue.slice(1));
    setShown(false);
  };

  return (
    <div className="page">
      <p className="eyebrow">Review · {doneCount + 1} of {total}</p>
      <h1 className="h-page" style={{ marginTop: 18 }}>What does this <em>say?</em></h1>
      <div className="meter-top"><i style={{ width: `${(doneCount / total) * 100}%` }} /></div>

      <div className="deck">
        <div role="button" tabIndex={0} className={`flip ${shown ? 'on' : ''}`} onClick={() => setShown((s) => !s)} onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && setShown((s) => !s)} aria-label="Flip card">
          <div className="face">
            <div className="ko-big">{item.korean}</div>
            <button type="button" className="btn ghost sm" onClick={(e) => { e.stopPropagation(); speakKorean(item.korean, 1); }}><Speaker width={16} height={16} /> Hear it</button>
            <span className="hint">Tap to reveal</span>
          </div>
          <div className="face back">
            <div className="ans">{item.english}</div>
            <Say text={item.korean} />
            <span className="hint">{item.korean}</span>
          </div>
        </div>
      </div>

      {!shown ? (
        <button className="btn" type="button" onClick={() => setShown(true)}>Show answer <Arrow /></button>
      ) : (
        <div className="grades">
          <button className="grade g0" type="button" onClick={() => grade('again')}>Again<small>missed</small></button>
          <button className="grade g1" type="button" onClick={() => grade('hard')}>Hard<small>shaky</small></button>
          <button className="grade g2" type="button" onClick={() => grade('good')}>Good<small>knew it</small></button>
          <button className="grade g3" type="button" onClick={() => grade('easy')}>Easy<small>instant</small></button>
        </div>
      )}
    </div>
  );
}
