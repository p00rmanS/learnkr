import { useState } from 'react';
import { Speaker } from '../components/Icons';
import { GROUP_LABEL, LETTERS, sayable, type Letter, type LetterGroup } from '../content/letters';
import { speakKorean } from '../lib/speech';

const ORDER: LetterGroup[] = ['vowel', 'consonant', 'yvowel', 'aspirated', 'tense'];
const isVowel = (g: LetterGroup) => g === 'vowel' || g === 'yvowel';

export function Letters() {
  const [sel, setSel] = useState<Letter | null>(null);

  const pick = (l: Letter) => {
    setSel(l);
    speakKorean(sayable(l), 1);
  };

  return (
    <div className="page">
      <p className="eyebrow">Reference</p>
      <h1 className="h-page" style={{ marginTop: 18 }}>Every letter, <em>one tap</em> away.</h1>
      <p className="lede">Tap a letter to hear it and see why it looks the way it does. Vowels are blue, consonants are red.</p>

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
