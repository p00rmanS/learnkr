import { useState } from 'react';
import { Gwon } from '../components/Gwon';
import { composeSyllable } from '../lib/hangul';
import { speakKorean } from '../lib/speech';

const INITIALS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const VOWELS = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];
const FINALS = ['', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅇ'];

export function Build() {
  const [ini, setIni] = useState('ㅎ');
  const [vow, setVow] = useState('ㅏ');
  const [fin, setFin] = useState('ㄴ');
  const syl = composeSyllable(ini, vow, fin);

  return (
    <>
      <p className="eyebrow">Workshop</p>
      <h1 className="h-page">Build a syllable</h1>
      <p className="lede">Pick the pieces and watch the block form. Try adding a final consonant to see it drop to the bottom.</p>

      <div className="panel stage" style={{ marginTop: 28 }}>
        <Gwon ch={syl} size="xl" />
        <div className="anatomy">
          <span><b>{ini}</b> consonant</span>+<span><b>{vow}</b> vowel</span>{fin && <>+<span><b>{fin}</b> final</span></>}
        </div>
        <button className="btn" type="button" onClick={() => speakKorean(syl, 1)}>Hear {syl}</button>
      </div>

      <div className="builder" style={{ marginTop: 28 }}>
        <div className="pick-row"><span className="lab">Consonant</span>{INITIALS.map((c) => <button key={c} type="button" className={`chip ${ini === c ? 'on' : ''}`} onClick={() => setIni(c)}>{c}</button>)}</div>
        <div className="pick-row"><span className="lab">Vowel</span>{VOWELS.map((c) => <button key={c} type="button" className={`chip ${vow === c ? 'on' : ''}`} onClick={() => setVow(c)}>{c}</button>)}</div>
        <div className="pick-row"><span className="lab">Final</span>{FINALS.map((c) => <button key={c || 'none'} type="button" className={`chip ${fin === c ? 'on' : ''}`} onClick={() => setFin(c)}>{c || '-'}</button>)}</div>
      </div>
    </>
  );
}
