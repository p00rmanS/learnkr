import { romanize, sayIt } from '../lib/pronounce';

/** Pronunciation lines for a Korean string: "say it" respelling and standard romanization. */
export function Say({ text, compact = false, showRoman = true }: { text: string; compact?: boolean; showRoman?: boolean }) {
  if (!/[가-힣]/.test(text)) return null;
  return (
    <span className={`say ${compact ? 'compact' : ''}`}>
      <span className="say-it" title="How to say it">{sayIt(text)}</span>
      {showRoman && !compact && <span className="say-rom" title="Revised Romanization">{romanize(text)}</span>}
    </span>
  );
}
