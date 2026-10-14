import { romanize, sayIt } from '../lib/pronounce';
import { usePrefs } from '../store/prefs';

/** Pronunciation lines for a Korean string: "say it" respelling and standard romanization. */
export function Say({ text, compact = false }: { text: string; compact?: boolean }) {
  const say = usePrefs((s) => s.say);
  const rom = usePrefs((s) => s.rom);
  if (!/[가-힣]/.test(text) || (!say && !rom)) return null;
  return (
    <span className={`say ${compact ? 'compact' : ''}`}>
      {say && <span className="say-it" title="How to say it">{sayIt(text)}</span>}
      {rom && !compact && <span className="say-rom" title="Revised Romanization">{romanize(text)}</span>}
      {rom && compact && !say && <span className="say-it">{romanize(text)}</span>}
    </span>
  );
}
