import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LESSONS } from '../content/lessons';
import { db, type ReviewCard } from '../lib/db';
import { getCardsDue, scheduleCard, type Feedback } from '../lib/srs';
import { speakKorean } from '../lib/speech';

const ITEMS = new Map(LESSONS.flatMap((l) => l.items).map((i) => [i.id, i]));

export function Review() {
  const [queue, setQueue] = useState<ReviewCard[] | null>(null);
  const [shown, setShown] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    db.reviewCards.toArray().then((all) => {
      const due = getCardsDue(all).filter((c) => ITEMS.has(c.itemId));
      setQueue(due);
      setTotal(due.length);
    }).catch(() => setQueue([]));
  }, []);

  if (queue === null) return <p>Loading.</p>;

  if (queue.length === 0) {
    return (
      <div className="done-card">
        <p className="eyebrow">Review</p>
        <h1 className="h-page">{total > 0 ? '다 했어요. All done.' : 'Nothing to review yet.'}</h1>
        <p className="lede">{total > 0 ? 'Cards come back when you are about to forget them. See you later.' : 'Finish a lesson and its cards will land here.'}</p>
        <p style={{ marginTop: 24 }}><Link to="/learn" className="btn">{total > 0 ? 'Back to the road' : 'Start a lesson'}</Link></p>
      </div>
    );
  }

  const card = queue[0];
  const item = ITEMS.get(card.itemId)!;

  const grade = async (f: Feedback) => {
    const updated = scheduleCard(card, f);
    await db.reviewCards.put(updated);
    // "again" stays in this session; everything else leaves it
    setQueue(f === 'again' ? [...queue.slice(1), updated] : queue.slice(1));
    setShown(false);
  };

  return (
    <>
      <p className="eyebrow">Review &middot; {total - queue.length + 1} of {total}</p>
      <h1 className="h-page">What does this say?</h1>
      <div className="panel flash">
        <div className="ko" style={{ fontWeight: 900, fontSize: 120, lineHeight: 1.1 }}>{item.korean}</div>
        <div className="row" style={{ justifyContent: 'center', marginTop: 12 }}>
          <button className="btn ghost sm" type="button" onClick={() => speakKorean(item.korean, 1)}>Hear it</button>
        </div>
        {shown && <div className="mono" style={{ fontSize: 26, marginTop: 22 }}>{item.english}</div>}
      </div>
      {!shown ? (
        <button className="btn" type="button" onClick={() => setShown(true)}>Show answer</button>
      ) : (
        <div className="grades">
          <button className="grade" type="button" onClick={() => grade('again')}>Again<small>missed</small></button>
          <button className="grade" type="button" onClick={() => grade('hard')}>Hard<small>shaky</small></button>
          <button className="grade" type="button" onClick={() => grade('good')}>Good<small>knew it</small></button>
          <button className="grade" type="button" onClick={() => grade('easy')}>Easy<small>instant</small></button>
        </div>
      )}
    </>
  );
}
