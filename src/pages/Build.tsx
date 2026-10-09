import { useState } from 'react';
import { Assemble } from '../components/Assemble';
import { Speaker } from '../components/Icons';
import { composeSyllable } from '../lib/hangul';
import { speakKorean } from '../lib/speech';

const INITIALS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ'];
const VOWELS = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅔ', 'ㅘ', 'ㅝ', 'ㅟ', 'ㅢ'];
const FINALS = ['', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅇ'];

export function Build() {
  const [ini, setIni] = useState('ㅎ');
  const [vow, setVow] = useState('ㅏ');
  const [fin, setFin] = useState('ㄴ');
  const syl = composeSyllable(ini, vow, fin);

  return (
    <div className="page">
      <p className="eyebrow">Workshop</p>
      <h1 className="h-page" style={{ marginTop: 18 }}>Build a <em>syllable.</em></h1>
      <p className="lede">Pick the pieces and watch the block form. Add a final consonant and see it drop to the floor of the block. Try the vowel ㅗ and see it lie down.</p>

      <div className="build">
        <div className="stage">
          <Assemble text={syl} size="min(78vw, 300px)" />
          <div className="result"><b>{syl}</b><span>{ini} + {vow}{fin ? ` + ${fin}` : ''}</span></div>
          <button className="btn" type="button" onClick={() => speakKorean(syl, 1)}><Speaker width={18} height={18} /> Hear {syl}</button>
          <div className="legend">
            <span><i style={{ background: 'var(--red)' }} />consonant</span>
            <span><i style={{ background: 'var(--blue)' }} />vowel</span>
            <span><i style={{ background: 'var(--gold)' }} />final</span>
          </div>
        </div>

        <div className="builder" style={{ margin: 0 }}>
          <div>
            <div className="lab" style={{ marginBottom: 12 }}>Consonant</div>
            <div className="pick">{INITIALS.map((c) => <button key={c} type="button" className={`chip i ${ini === c ? 'on' : ''}`} onClick={() => setIni(c)}>{c}</button>)}</div>
          </div>
          <div style={{ marginTop: 18 }}>
            <div className="lab" style={{ marginBottom: 12 }}>Vowel</div>
            <div className="pick">{VOWELS.map((c) => <button key={c} type="button" className={`chip v ${vow === c ? 'on' : ''}`} onClick={() => setVow(c)}>{c}</button>)}</div>
          </div>
          <div style={{ marginTop: 18 }}>
            <div className="lab" style={{ marginBottom: 12 }}>Final consonant (optional)</div>
            <div className="pick">{FINALS.map((c) => <button key={c || 'none'} type="button" className={`chip f ${fin === c ? 'on' : ''}`} onClick={() => setFin(c)}>{c || '-'}</button>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
