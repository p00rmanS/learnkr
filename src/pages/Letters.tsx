import { useState } from 'react';
import { Gwon } from '../components/Gwon';
import { GROUP_LABEL, LETTERS, sayable, type Letter, type LetterGroup } from '../content/letters';
import { speakKorean } from '../lib/speech';

const ORDER: LetterGroup[] = ['vowel', 'consonant', 'yvowel', 'aspirated', 'tense'];

export function Letters() {
  const [sel, setSel] = useState<Letter | null>(null);

  const pick = (l: Letter) => {
    setSel(l);
    speakKorean(sayable(l), 1);
  };

  return (
    <>
      <p className="eyebrow">Reference</p>
      <h1 className="h-page">Every letter, one tap away</h1>
      <p className="lede">Tap a letter to hear it and see why it looks the way it does.</p>

      <div className="letters">
        <div>
          {ORDER.map((g) => (
            <div className="group" key={g}>
              <h3>{GROUP_LABEL[g].en}<span>{GROUP_LABEL[g].ko}</span></h3>
              <div className="tiles">
                {LETTERS.filter((l) => l.group === g).map((l) => (
                  <button key={l.char} type="button" className={`tile ${sel?.char === l.char ? 'on' : ''}`} onClick={() => pick(l)} aria-label={`${l.char}, ${l.rom}`}>
                    {l.char}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <aside className="panel detail" aria-live="polite">
          {sel ? (
            <>
              <Gwon ch={sel.char} size="xl" />
              <dl>
                <dt>Romanization</dt><dd className="mono">{sel.rom}</dd>
                <dt>Sound</dt><dd>{sel.sound}</dd>
                <dt>Why it looks like this</dt><dd>{sel.note}</dd>
              </dl>
              <button className="btn sm" style={{ marginTop: 18 }} type="button" onClick={() => speakKorean(sayable(sel), 1)}>Hear again</button>
              <button className="btn ghost sm" style={{ marginTop: 18, marginLeft: 8 }} type="button" onClick={() => speakKorean(sayable(sel), 0.7)}>Slower</button>
            </>
          ) : (
            <p className="empty">Choose a letter.</p>
          )}
        </aside>
      </div>
    </>
  );
}
