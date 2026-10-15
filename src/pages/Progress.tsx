import { useEffect, useMemo, useState } from 'react';
import { Flame, Ring } from '../components/Growth';
import { Check } from '../components/Icons';
import { KIDS, LESSONS } from '../content/lessons';
import { STORIES } from '../content/stories';
import { addDays, localDate, parseDate } from '../lib/dates';
import { db, type ReviewCard } from '../lib/db';
import { BADGES, GOALS, MAX_SHIELDS, levelFor, streakInfo, xpToday } from '../lib/growth';
import { useAppStore } from '../store';

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const TONE = { red: 'var(--red)', blue: 'var(--blue)', gold: 'var(--gold)', jade: 'var(--jade)', pink: 'var(--pink)' };

export function Progress() {
  const p = useAppStore((s) => s.progress);
  const setGoal = useAppStore((s) => s.setGoal);
  const [cards, setCards] = useState<ReviewCard[]>([]);

  useEffect(() => {
    db.reviewCards.toArray().then(setCards).catch(() => setCards([]));
  }, []);

  const today = localDate();
  const streak = streakInfo(p);
  const lvl = levelFor(p.xp);
  const todayXp = xpToday(p);
  const goalPct = todayXp / p.dailyGoal;

  const week = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(today, i - 6)), [today]);
  const weekMax = Math.max(p.dailyGoal, ...week.map((d) => p.xpByDay[d] ?? 0));

  // 16-week heat map, columns are weeks ending this week
  const heat = useMemo(() => {
    const end = parseDate(today);
    const startOffset = end.getDay(); // days since Sunday
    const first = addDays(today, -(15 * 7 + startOffset));
    return Array.from({ length: 16 * 7 }, (_, i) => addDays(first, i));
  }, [today]);

  const lessonsDone = p.completedLessons.filter((id) => !id.startsWith('story.')).length;
  const storiesDone = STORIES.filter((s) => p.completedLessons.includes(`story.${s.id}`)).length;
  const kidsDone = KIDS.filter((l) => p.completedLessons.includes(l.id)).length;
  const mastered = cards.filter((c) => c.intervalDays >= 21).length;
  const earned = new Set(p.badges);
  const heatLevel = (xp: number) => (xp === 0 ? 0 : xp < p.dailyGoal / 2 ? 1 : xp < p.dailyGoal ? 2 : xp < p.dailyGoal * 2 ? 3 : 4);

  const stats = [
    { n: lessonsDone, of: LESSONS.length + KIDS.length, label: 'Lessons done' },
    { n: cards.length, label: 'Words and phrases met' },
    { n: mastered, label: 'Mastered (21+ day gap)' },
    { n: p.reviewCount, label: 'Cards reviewed' },
    { n: storiesDone, of: STORIES.length, label: 'Stories read' },
    { n: kidsDone, of: KIDS.length, label: 'Kids lessons' },
    { n: p.perfectLessons, label: 'Flawless lessons' },
    { n: p.studyDays.length, label: 'Days studied' },
  ];

  return (
    <div className="page">
      <p className="eyebrow">Progress</p>
      <h1 className="h-page" style={{ marginTop: 18 }}>Your <em>growth.</em></h1>
      <p className="lede">Streaks, XP and badges that reward showing up, without punishing a missed day. Earn rest-day shields and your streak survives life.</p>

      <div className="grow-grid">
        <section className="cell g-level">
          <div className="lab">Level</div>
          <div className="lvl-row">
            <div className="big-n">{lvl.level}</div>
            <div><div className="lvl-ko kr">{lvl.ko}</div><div className="lab">{lvl.title}</div></div>
          </div>
          <div className="xpbar" role="progressbar" aria-valuemin={0} aria-valuemax={lvl.need} aria-valuenow={lvl.into}><i style={{ width: `${lvl.pct}%` }} /></div>
          <p className="g-sub">{lvl.into} / {lvl.need} XP to level {lvl.level + 1} · {p.xp} XP total</p>
        </section>

        <section className={`cell g-streak ${streak.current ? 'on' : ''}`}>
          <div className="lab">Streak</div>
          <div className="streak-row">
            <Flame size={64} lit={streak.current > 0} />
            <div><div className="big-n">{streak.current}</div><div className="lab">{streak.current === 1 ? 'day' : 'days'}</div></div>
          </div>
          <div className="week-dots" aria-label="Last 7 days">
            {week.map((d) => {
              const studied = p.studyDays.includes(d);
              const frozen = p.frozenDays.includes(d);
              return (
                <div key={d} className={`wd ${studied ? 'on' : ''} ${frozen ? 'ice' : ''} ${d === today ? 'today' : ''}`} title={d}>
                  <span>{DOW[parseDate(d).getDay()]}</span>
                  <i>{studied ? <Check width={14} height={14} strokeWidth={3} /> : frozen ? '-' : ''}</i>
                </div>
              );
            })}
          </div>
          <p className="g-sub">
            Best streak {p.bestStreak} · {p.freezes} of {MAX_SHIELDS} rest-day shields. Miss a day and a shield covers it. You earn one every 7 days.
          </p>
        </section>

        <section className="cell g-goal">
          <div className="lab">Today's goal</div>
          <div className="goal-row">
            <Ring pct={goalPct} size={124} color={goalPct >= 1 ? 'var(--jade)' : 'var(--gold)'}>
              <b>{todayXp}</b><span>/ {p.dailyGoal} XP</span>
            </Ring>
            <div className="goal-opts" role="radiogroup" aria-label="Daily goal">
              {GOALS.map((g) => (
                <button key={g.xp} type="button" role="radio" aria-checked={p.dailyGoal === g.xp} className={`goal-opt ${p.dailyGoal === g.xp ? 'on' : ''}`} onClick={() => setGoal(g.xp)}>
                  <b>{g.label}</b><span>{g.xp} XP · {g.note}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="sec" style={{ marginTop: 64 }}>
        <p className="eyebrow">This week</p>
        <div className="bars" role="img" aria-label="XP over the last 7 days">
          {week.map((d) => {
            const xp = p.xpByDay[d] ?? 0;
            return (
              <div key={d} className="bar-col">
                <span className="bar-n">{xp || ''}</span>
                <div className="bar-track"><i className={xp >= p.dailyGoal ? 'hit' : ''} style={{ height: `${(xp / weekMax) * 100}%` }} /><u style={{ bottom: `${(p.dailyGoal / weekMax) * 100}%` }} /></div>
                <span className="bar-d">{DOW[parseDate(d).getDay()]}</span>
              </div>
            );
          })}
        </div>
        <p className="g-sub" style={{ marginTop: 10 }}>The dashed line is your daily goal.</p>
      </section>

      <section className="sec" style={{ marginTop: 56 }}>
        <p className="eyebrow">Last 16 weeks</p>
        <div className="heat" role="img" aria-label="Study activity heat map">
          {heat.map((d) => (
            <i key={d} className={`h${d > today ? 'x' : heatLevel(p.xpByDay[d] ?? 0)}`} title={`${d}: ${p.xpByDay[d] ?? 0} XP`} />
          ))}
        </div>
      </section>

      <section className="sec" style={{ marginTop: 56 }}>
        <p className="eyebrow">By the numbers</p>
        <div className="stat-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <div className="big-n" style={{ fontSize: 44 }}>{s.n}{s.of ? <span className="of">/{s.of}</span> : null}</div>
              <div className="lab" style={{ marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec" style={{ marginTop: 64 }}>
        <p className="eyebrow">Badges · {earned.size} of {BADGES.length}</p>
        <div className="badge-grid">
          {BADGES.map((b) => {
            const got = earned.has(b.id);
            return (
              <div key={b.id} className={`bdg ${got ? 'got' : ''}`} style={{ ['--tone' as string]: TONE[b.tone] }} title={b.desc}>
                <div className="bdg-medal kr">{b.glyph}</div>
                <b>{b.name}</b>
                <small>{b.desc}</small>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
