import type { CSSProperties } from 'react';

type Size = 'sm' | 'md' | 'lg' | 'xl';

/** A single 원고지 (Korean manuscript paper) cell: one syllable block. */
export function Gwon({ ch, size = 'md', plain = false, style }: { ch: string; size?: Size; plain?: boolean; style?: CSSProperties }) {
  const cls = ['gwon', size === 'md' ? '' : size, plain ? 'plain' : ''].filter(Boolean).join(' ');
  return (
    <div className={cls} style={style} aria-hidden="true">
      {ch}
    </div>
  );
}
