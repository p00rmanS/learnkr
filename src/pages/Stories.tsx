import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Arrow, Bolt, Bubble, Check, Speaker } from '../components/Icons';
import { storyItems } from '../content/allItems';
import { STORIES, type Story } from '../content/stories';
import { romanize, sayIt } from '../lib/pronounce';
import { cancelSpeech, koreanVoiceAvailable, speakAndWait, speakKorean } from '../lib/speech';
import { useAppStore } from '../store';
import { usePrefs } from '../store/prefs';

const LEVEL_COLOR: Record<Story['level'], string> = { Starter: 'var(--jade)', Easy: 'var(--gold)', Medium: 'var(--red)' };

export function StoryList() {
  const completed = useAppStore((s) => s.progress.completedLessons);
  return (
    <div className="page">
      <p className="eyebrow">Read along</p>
      <h1 className="h-page" style={{ marginTop: 18 }}>Short <em>stories</em>, line by line.</h1>
      <p className="lede">Every line comes with sound, a "say it" guide, romanization and an English translation. Tap any line to hear it, or play the whole story.</p>

      <div className="story-grid">
        {STORIES.map((s) => {
          const done = completed.includes(`story.${s.id}`);
          return (
            <Link key={s.id} to={`/stories/${s.id}`} className="story-card">
              <div className="story-top">
                <span className="lvl" style={{ color: LEVEL_COLOR[s.level], borderColor: LEVEL_COLOR[s.level] }}>{s.level}</span>
                <span className="lab">{s.kind}</span>
                {done && <span className="done-badge"><Check width={14} height={14} strokeWidth={2.6} /> Read</span>}
              </div>
              <div className="story-ko">{s.ko}</div>
              <div className="story-title">{s.title}</div>
              <p className="story-blurb">{s.blurb}</p>
              <div className="story-foot"><span className="lab">{s.lines.length} lines</span><Arrow width={18} height={18} /></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function StoryReader() {
  const { id } = useParams();
  const story = STORIES.find((s) => s.id === id);
  const completed = useAppStore((s) => s.progress.completedLessons);
  const completeLesson = useAppStore((s) => s.completeLesson);
  const { say: showSay, rom: showRom, en: showEn, slow, toggle } = usePrefs();
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [noVoice, setNoVoice] = useState(false);
  const stop = useRef(false);

  useEffect(() => {
    koreanVoiceAvailable().then((ok) => setNoVoice(!ok));
    return () => {
      stop.current = true;
      cancelSpeech();
    };
  }, []);

  if (!story) {
    return (
      <div className="page">
        <h1 className="h-page">Story not found.</h1>
        <p style={{ marginTop: 24 }}><Link to="/stories" className="btn">All stories</Link></p>
      </div>
    );
  }

  const rate = slow ? 0.7 : 1;
  const speakers = [...new Set(story.lines.map((l) => l.who).filter(Boolean))] as string[];
  const done = completed.includes(`story.${story.id}`);

  const playAll = async () => {
    if (playing) {
      stop.current = true;
      cancelSpeech();
      setPlaying(false);
      setActive(null);
      return;
    }
    stop.current = false;
    setPlaying(true);
    for (let n = 0; n < story.lines.length; n++) {
      if (stop.current) break;
      setActive(n);
      document.getElementById(`line-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await speakAndWait(story.lines[n].ko, rate);
      if (stop.current) break;
      await new Promise((r) => setTimeout(r, 350));
    }
    setPlaying(false);
    setActive(null);
  };

  return (
    <div className="page reader">
      <Link to="/stories" className="back">All stories</Link>
      <p className="eyebrow" style={{ marginTop: 22 }}>{story.level} · {story.kind}</p>
      <h1 className="h-page" style={{ marginTop: 14 }}><span className="kr" style={{ fontWeight: 900 }}>{story.ko}</span></h1>
      <p className="lede" style={{ marginTop: 10 }}>{story.title}. {story.blurb}</p>

      {noVoice && <div className="voice-note inline" role="alert">No Korean voice found on this device, so audio may be silent. Try Chrome or Edge.</div>}

      <div className="reader-bar">
        <button type="button" className="btn sm" onClick={playAll}>{playing ? 'Stop' : 'Play whole story'}</button>
        <div className="toggles" role="group" aria-label="Show or hide">
          <button type="button" className={`tog ${showSay ? 'on' : ''}`} aria-pressed={showSay} onClick={() => toggle('say')}>Say it</button>
          <button type="button" className={`tog ${showRom ? 'on' : ''}`} aria-pressed={showRom} onClick={() => toggle('rom')}>Romanization</button>
          <button type="button" className={`tog ${showEn ? 'on' : ''}`} aria-pressed={showEn} onClick={() => toggle('en')}>English</button>
          <button type="button" className={`tog ${slow ? 'on' : ''}`} aria-pressed={slow} onClick={() => toggle('slow')}>Slow audio</button>
        </div>
      </div>

      <div className="notes" style={{ marginTop: 24 }}>
        <aside className="note tip"><div className="ic"><Bolt /></div><div><div className="nl">Pro tip</div><p>{story.tip}</p></div></aside>
        <aside className="note tl"><div className="ic"><Bubble /></div><div><div className="nl">Sa Taglish</div><p>{story.tl}</p></div></aside>
      </div>

      <div className="lines">
        {story.lines.map((l, n) => {
          const side = l.who ? (speakers.indexOf(l.who) % 2 === 0 ? 'l' : 'r') : 'n';
          return (
            <button
              key={n}
              id={`line-${n}`}
              type="button"
              className={`line ${side} ${active === n ? 'on' : ''}`}
              onClick={() => {
                stop.current = true;
                setPlaying(false);
                setActive(n);
                speakKorean(l.ko, rate);
              }}
            >
              {l.who && <span className="who">{l.who}</span>}
              <span className="l-ko">{l.ko}</span>
              {showSay && <span className="l-say">{sayIt(l.ko)}</span>}
              {showRom && <span className="l-rom">{romanize(l.ko)}</span>}
              {showEn && <span className="l-en">{l.en}</span>}
              <Speaker className="l-sp" width={16} height={16} />
            </button>
          );
        })}
      </div>

      <div className="sec" style={{ marginTop: 56 }}>
        <p className="eyebrow">Words from this story</p>
        <div className="vocab">
          {story.vocab.map((v) => (
            <button key={v.ko} type="button" className="vchip" onClick={() => speakKorean(v.ko, rate)}>
              <b>{v.ko}</b><span>{v.en}</span><em>{sayIt(v.ko)}</em>
            </button>
          ))}
        </div>

        <div className="row" style={{ marginTop: 34 }}>
          <button type="button" className="btn" disabled={done} onClick={() => completeLesson(`story.${story.id}`, storyItems(story.id))}>
            {done ? 'Added to review' : 'Add these words to review'} {done ? <Check width={18} height={18} /> : <Arrow />}
          </button>
          <Link to="/stories" className="btn ghost">More stories</Link>
        </div>
      </div>
    </div>
  );
}
