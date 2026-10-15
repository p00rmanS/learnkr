import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { streakInfo, xpToday } from '../lib/growth';
import { useAppStore } from '../store';

export function Flame({ size = 22, lit = true, style }: { size?: number; lit?: boolean; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={style} className={`flame ${lit ? 'lit' : ''}`}>
      <path d="M12.6 2.2c.5 3.2-1.2 4.7-2.7 6.7-1.4 1.9-.9 3.6.3 4.5.1-1.4.8-2.4 1.8-3.4 1.2 1.9 4.3 3.4 4.3 7.2A5.9 5.9 0 0112 23a5.9 5.9 0 01-5.9-5.9c0-3 1.7-4.5 3-6.4 1.2-1.8 3-3.9 3.5-8.5z" />
    </svg>
  );
}

export function Ring({ pct, size = 118, stroke = 9, color = 'var(--gold)', children }: { pct: number; size?: number; stroke?: number; color?: string; children?: React.ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, pct));
  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - clamped)}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s cubic-bezier(0.2,0.9,0.2,1)' }}
        />
      </svg>
      <div className="ring-in">{children}</div>
    </div>
  );
}

/** Floating streak counter: gold once today's goal is done, quiet while you still can. */
export function StreakChip() {
  const p = useAppStore((s) => s.progress);
  const { current, studiedToday } = streakInfo(p);
  const goalDone = xpToday(p) >= p.dailyGoal;
  const state = goalDone ? 'done' : studiedToday ? 'going' : current > 0 ? 'risk' : 'idle';
  const label =
    current === 0
      ? 'No streak yet. Finish a lesson to start one.'
      : `${current} day streak. ${studiedToday ? (goalDone ? 'Daily goal done.' : 'Studied today.') : 'Study today to keep it going.'}`;
  return (
    <Link to="/progress" className={`streak-chip ${state}`} aria-label={label} title={label}>
      <Flame size={18} lit={state !== 'idle'} />
      <b>{current}</b>
    </Link>
  );
}
