import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, Speaker } from '../components/Icons';
import { GROUP_LABEL, LETTERS, sayable, type Letter, type LetterGroup } from '../content/letters';
import { speakKorean } from '../lib/speech';
import { useLatest } from '../lib/useLatest';

const ORDER: LetterGroup[] = ['vowel', 'consonant', 'yvowel', 'aspirated', 'tense'];
const isVowel = (g: LetterGroup) => g === 'vowel' || g === 'yvowel';

export function Letters() {
  const [sel, setSel] = useState<Letter | null>(null);

  // Display order is group by group, so arrows follow what you see on screen
  const flat = useLatest(ORDER.flatMap((g) => LETTERS.filter((l) => l.group === g)));
  const selRef = useLatest<Letter | null>(sel);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const list = flat.current;
      const at = selRef.current ? list.findIndex((l) => l.char === selRef.current!.char) : -1;
      const n = e.key === 'ArrowRight' ? Math.min(list.length - 1, at + 1) : Math.max(0, at <= 0 ? 0 : at - 1);
      setSel(list[n]);
      speakKorean(sayable(list[n]), 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [flat, selRef]);

  const pick = (l: Letter) => {
    setSel(l);
    speakKorean(sayable(l), 1);
  };

  return (
    <div className="page">
      <p className="eyebrow">Reference</p>
      <h1 className="h-page" style={{ marginTop: 18 }}>Every letter, <em>one tap</em> away.</h1>
      <p className="lede">Tap a letter to hear it and see why it looks the way it does. Vowels are blue, consonants are red.</p>
      <div style={{ marginTop: 24 }}><Link to="/syllables" className="btn ghost sm">Build your own syllable <Arrow width={16} height={16} /></Link></div>

      <div className="letters">
        <div>
          {ORDER.map((g) => (
            <div className="group" key={g}>
              <h3>{GROUP_LABEL[g].en}<span>{GROUP_LABEL[g].ko}</span></h3>
              <div className="tiles">
                {LETTERS.filter((l) => l.group === g).map((l) => (
                  <button key={l.char} type="button" className={`tile ${isVowel(g) ? 'v' : 'c'} ${sel?.char === l.char ? 'on' : ''}`} onClick={() => pick(l)} aria-label={`${l.char}, ${l.rom}`}>
                    {l.char}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <aside className="detail" aria-live="polite">
          {sel ? (
            <>
              <div className="glyph" key={sel.char} style={{ color: isVowel(sel.group) ? 'var(--blue)' : 'var(--red)' }}>{sel.char}</div>
              <dl>
                <dt>Romanization</dt><dd className="mono">{sel.rom}</dd>
                <dt>Sound</dt><dd>{sel.sound}</dd>
                <dt>Why it looks like this</dt><dd>{sel.note}</dd>
                {sel.tl && <><dt>Sa Taglish</dt><dd className="tl-dd">{sel.tl}</dd></>}
              </dl>
              <div className="row" style={{ marginTop: 22, justifyContent: 'center' }}>
                <button className="btn sm" type="button" onClick={() => speakKorean(sayable(sel), 1)}><Speaker width={16} height={16} /> Hear it</button>
                <button className="btn ghost sm" type="button" onClick={() => speakKorean(sayable(sel), 0.7)}>Slower</button>
              </div>
            </>
          ) : (
            <p className="empty">Choose a letter.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
