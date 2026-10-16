/** Tests for streaks, shields, XP, levels and badges. Run with: npm test */
import { addDays } from '../src/lib/dates.ts';
import { applyShields, levelFor, lessonXp, normalize, recordActivity, streakInfo } from '../src/lib/growth.ts';

const T = '2026-10-15';
const base = normalize({ completedLessons: [], studyDays: [], settings: { audioSpeed: 1, showRomanization: true, dailyNewItemLimit: 10 } });
let ok = 0;
const failures: string[] = [];
const eq = (name: string, actual: unknown, expected: unknown) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) ok++;
  else failures.push(`${name}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
};
const days = (p: typeof base, offsets: number[], xp = 30) => offsets.reduce((acc, d) => recordActivity(acc, xp, addDays(T, d)).next, p);

// a fresh user has no streak
eq('fresh streak', streakInfo(base, T).current, 0);

// first activity starts a 1-day streak, and a second activity the same day does not extend it
const r1 = recordActivity(base, 25, T);
eq('day 1 streak', r1.summary.streakAfter, 1);
eq('day 1 extended', r1.summary.streakExtended, true);
const r2 = recordActivity(r1.next, 10, T);
eq('same day not extended', r2.summary.streakExtended, false);
eq('xp accumulates per day', r2.next.xpByDay[T], 35);

// the daily goal is reported exactly once
eq('goal not yet reached at 25/30', r1.summary.goalReached, false);
eq('goal reached when crossing 30', r2.summary.goalReached, true);
eq('goal not announced twice', recordActivity(r2.next, 5, T).summary.goalReached, false);

// consecutive days
const three = days(base, [-2, -1, 0]);
eq('3 day streak', streakInfo(three, T).current, 3);
eq('best streak tracked', three.bestStreak, 3);
eq('3-day badge earned', three.badges.includes('streak3'), true);

// studied yesterday but not yet today: streak is alive and at risk
eq('alive and at risk', streakInfo(days(base, [-1]), T), { current: 1, studiedToday: false, atRisk: true });

// a missed day breaks the streak when there is no shield
const gap = { ...days(base, [-4, -3, -2]), freezes: 0 };
eq('streak breaks without a shield', streakInfo(applyShields(gap, T), T).current, 0);

// a shield saves it, and is spent
const saved = applyShields({ ...gap, freezes: 1 }, T);
eq('shield spent', saved.freezes, 0);
eq('streak survives with shield', streakInfo(saved, T).current, 3);

// shields are not wasted on a tiny streak, or on a gap they cannot cover
const tiny = days(base, [-3]);
eq('no shield for a 1-day streak', applyShields(tiny, T).freezes, tiny.freezes);
const wide = { ...days(base, [-9, -8, -7]), freezes: 1 };
eq('gap bigger than shields left alone', applyShields(wide, T).freezes, 1);

// a shield is earned every 7 days, capped at 2
const week = days(base, [-6, -5, -4, -3, -2, -1, 0]);
eq('7 day streak', streakInfo(week, T).current, 7);
eq('shield earned at 7 days', week.freezes, 2);
eq('week badge', week.badges.includes('streak7'), true);
eq('shield cap', days(week, [1, 2, 3, 4, 5, 6, 7]).freezes <= 2, true);

// levels
eq('level 1 at 0 xp', levelFor(0).level, 1);
eq('level 2 at 25 xp', levelFor(25).level, 2);
eq('level 3 at 100 xp', levelFor(100).level, 3);
eq('level up flagged', recordActivity({ ...base, xp: 20 }, 10, T).summary.levelUp, true);

// xp rules
eq('perfect lesson', lessonXp(6, 0, false).xp, 27);
eq('lesson with a mistake', lessonXp(5, 1, false).xp, 20);
eq('repeat pays half', lessonXp(6, 0, true).xp, 13);
eq('flat story xp', lessonXp(0, 0, false, 15).xp, 15);

// lessons skipped by placement never earn badges
const skipped = { ...base, completedLessons: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '0.10', '0.11'], placed: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '0.10', '0.11'] };
const afterSkip = recordActivity(skipped, 10, T).next;
eq('placement earns no lesson badges', afterSkip.badges.filter((b) => ['first', 'ten', 'hangul'].includes(b)), []);

// older saves load with sensible defaults
const old = normalize({ completedLessons: ['0.1', '0.2'], studyDays: [T], settings: base.settings });
eq('old save gets xp credit', old.xp, 40);
eq('old save gets a shield', old.freezes, 1);
eq('old save gets empty placed list', old.placed, []);

console.log(`${ok} passed, ${failures.length} failed`);
for (const f of failures) console.log('  FAIL', f);
if (failures.length) process.exit(1);
