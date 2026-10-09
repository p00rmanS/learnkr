import { useEffect, useMemo, useState } from 'react';
import { decomposeSyllable } from '../lib/hangul';

const VERT = new Set('ㅏㅑㅓㅕㅣㅐㅒㅔㅖ'.split(''));
const HORZ = new Set('ㅗㅛㅜㅠㅡ'.split(''));

type Rect = [number, number, number, number]; // x, y, w, h (percent of the block)
type Role = 'i' | 'v' | 'f';

/** Where each jamo sits inside a syllable block. Hand-tuned, not typographically exact. */
function layout(vowel: string, hasFinal: boolean): Record<Role, Rect> {
  const f: Rect = [0, 55, 100, 42];
  if (VERT.has(vowel)) {
    return hasFinal
      ? { i: [0, 0, 52, 62], v: [48, 0, 52, 62], f }
      : { i: [0, 0, 55, 100], v: [50, 0, 50, 100], f };
  }
  if (HORZ.has(vowel)) {
    return hasFinal
      ? { i: [0, 0, 100, 34], v: [0, 30, 100, 34], f }
      : { i: [0, 0, 100, 52], v: [0, 48, 100, 52], f };
  }
  // compound vowels: consonant top-left, vowel wraps right and bottom
  return hasFinal
    ? { i: [0, 0, 48, 52], v: [30, 8, 70, 58], f }
    : { i: [0, 0, 50, 70], v: [30, 10, 70, 90], f };
}

function fontScale(role: Role, vowel: string, r: Rect): number {
  const [, , w, h] = r;
  if (role === 'v') {
    if (VERT.has(vowel)) return (h / 100) * 0.95;
    if (HORZ.has(vowel)) return (w / 100) * 0.95;
    return (Math.min(w, h) / 100) * 1.05;
  }
  return (Math.min(w, h) / 100) * 1.1;
}

const COLOR: Record<Role, string> = { i: 'var(--red)', v: 'var(--blue)', f: 'var(--gold)' };

interface Props {
  /** One syllable block, e.g. 한 */
  text: string;
  /** CSS length for the block edge */
  size?: string;
  /** Play the scatter-to-block animation on mount */
  animate?: boolean;
  /** Fade to the real typeset glyph once assembled */
  settle?: boolean;
  className?: string;
}

export function Assemble({ text, size = '320px', animate = false, settle = false, className = '' }: Props) {
  const parts = decomposeSyllable(text);
  const [gathered, setGathered] = useState(!animate);
  const [solid, setSolid] = useState(false);

  // Random launch positions, stable per syllable
  const scatter = useMemo(
    () =>
      (['i', 'v', 'f'] as Role[]).map((role, n) => ({
        role,
        tx: (Math.random() - 0.5) * 180,
        ty: (Math.random() - 0.5) * 180,
        rot: (Math.random() - 0.5) * 120,
        delay: n * 90,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text],
  );

  useEffect(() => {
    if (!animate) return;
    setGathered(false);
    setSolid(false);
    const a = setTimeout(() => setGathered(true), 60);
    const b = settle ? setTimeout(() => setSolid(true), 1500) : undefined;
    return () => {
      clearTimeout(a);
      if (b) clearTimeout(b);
    };
  }, [text, animate, settle]);

  if (!parts) return null;
  const rects = layout(parts.vowel, !!parts.final);
  const glyphs: Record<Role, string> = { i: parts.initial, v: parts.vowel, f: parts.final };

  return (
    <div className={`assemble ${className}`} style={{ fontSize: size }} role="img" aria-label={text}>
      <div className="assemble-frame" />
      {(['i', 'v', 'f'] as Role[]).map((role) => {
        if (!glyphs[role]) return null;
        const r = rects[role];
        const sc = scatter.find((s) => s.role === role)!;
        return (
          <span
            key={role}
            className={`piece ${gathered ? '' : 'scatter'} ${solid ? 'gone' : ''}`}
            style={{
              left: `${r[0]}%`,
              top: `${r[1]}%`,
              width: `${r[2]}%`,
              height: `${r[3]}%`,
              fontSize: `${fontScale(role, parts.vowel, r)}em`,
              color: COLOR[role],
              ['--tx' as string]: `${sc.tx}%`,
              ['--ty' as string]: `${sc.ty}%`,
              ['--r' as string]: `${sc.rot}deg`,
              transitionDelay: animate ? `${sc.delay}ms` : '0ms',
            }}
          >
            {glyphs[role]}
          </span>
        );
      })}
      {settle && <span className={`real ${solid ? 'on' : ''}`}>{text}</span>}
    </div>
  );
}

export const JAMO_COLOR = COLOR;
