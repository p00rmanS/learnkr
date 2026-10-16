import { useRef, useState } from 'react';
import { ALL_LESSONS } from '../content/lessons';
import { db } from '../lib/db';
import { usePrefs, type Prefs } from '../store/prefs';
import { useAppStore } from '../store';
import { isIos, isStandalone, useInstall } from '../lib/pwa';

const TOGGLES: { k: keyof Prefs; label: string; hint: string }[] = [
  { k: 'say', label: 'Show "say it" guide', hint: 'Respelling like an-nyuhng-ha-seh-yo under Korean text.' },
  { k: 'rom', label: 'Show romanization', hint: 'Standard Revised Romanization like annyeonghaseyo.' },
  { k: 'en', label: 'Show English in stories', hint: 'Translations under each story line.' },
  { k: 'slow', label: 'Play audio slowly', hint: 'Uses a slower speaking speed everywhere.' },
];

export function Settings() {
  const prefs = usePrefs();
  const progress = useAppStore((s) => s.progress);
  const [msg, setMsg] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const file = useRef<HTMLInputElement>(null);
  const { canInstall, install } = useInstall();

  const doExport = async () => {
    const data = {
      app: 'hangeul-gil',
      version: 1,
      exportedAt: new Date().toISOString(),
      progress: await db.progress.toArray(),
      reviewCards: await db.reviewCards.toArray(),
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `hangeul-gil-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg('Backup downloaded.');
  };

  const doImport = async (f: File) => {
    try {
      const data = JSON.parse(await f.text());
      if (data.app !== 'hangeul-gil' || !Array.isArray(data.progress) || !Array.isArray(data.reviewCards)) throw new Error('shape');
      await db.transaction('rw', db.progress, db.reviewCards, async () => {
        await db.progress.clear();
        await db.reviewCards.clear();
        await db.progress.bulkAdd(data.progress);
        await db.reviewCards.bulkAdd(data.reviewCards);
      });
      setMsg('Backup restored. Reloading...');
      setTimeout(() => window.location.reload(), 700);
    } catch {
      setMsg('That file is not a valid Hangeul-gil backup. Nothing was changed.');
    }
  };

  const doReset = async () => {
    await db.progress.clear();
    await db.reviewCards.clear();
    prefs.reset();
    setMsg('Everything was reset. Reloading...');
    setTimeout(() => window.location.reload(), 700);
  };

  return (
    <div className="page">
      <p className="eyebrow">Settings</p>
      <h1 className="h-page" style={{ marginTop: 18 }}>Make it <em>yours.</em></h1>

      <section className="set-sec">
        <h2>Display and audio</h2>
        <div className="set-list">
          {TOGGLES.map((t) => (
            <label key={t.k} className="set-row">
              <span><b>{t.label}</b><small>{t.hint}</small></span>
              <input type="checkbox" role="switch" checked={prefs[t.k]} onChange={() => prefs.toggle(t.k)} />
              <i className="switch" aria-hidden="true" />
            </label>
          ))}
        </div>
      </section>

      <section className="set-sec">
        <h2>Install and offline</h2>
        <p className="set-note">
          Hangeul-gil works offline once you have opened it online. Install it for a full-screen app on your home screen.
        </p>
        <div className="row" style={{ marginTop: 16 }}>
          {isStandalone() ? (
            <span className="lab">Installed. You are using the app.</span>
          ) : canInstall ? (
            <button type="button" className="btn sm" onClick={install}>Install this app</button>
          ) : isIos() ? (
            <span className="set-note">On iPhone or iPad: tap the Share button, then "Add to Home Screen".</span>
          ) : (
            <span className="set-note">Open the browser menu and choose "Install app" or "Add to Home Screen". It appears once the page has loaded fully.</span>
          )}
        </div>
      </section>

      <section className="set-sec">
        <h2>Your data</h2>
        <p className="set-note">
          Progress lives only on this device, in this browser. {progress.completedLessons.length} of {ALL_LESSONS.length} lessons done. Export a backup before you clear browser data or switch devices.
        </p>
        <div className="row" style={{ marginTop: 16 }}>
          <button type="button" className="btn sm" onClick={doExport}>Export backup</button>
          <button type="button" className="btn ghost sm" onClick={() => file.current?.click()}>Import backup</button>
          <input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])} />
        </div>
        {msg && <p className="set-msg" role="status">{msg}</p>}
      </section>

      <section className="set-sec danger">
        <h2>Start over</h2>
        <p className="set-note">This erases your completed lessons and review cards on this device. It cannot be undone, so export a backup first.</p>
        {!confirmReset ? (
          <button type="button" className="btn ghost sm" style={{ marginTop: 16 }} onClick={() => setConfirmReset(true)}>Reset everything</button>
        ) : (
          <div className="row" style={{ marginTop: 16 }}>
            <button type="button" className="btn sm" style={{ background: 'var(--red)', color: '#fff' }} onClick={doReset}>Yes, erase everything</button>
            <button type="button" className="btn ghost sm" onClick={() => setConfirmReset(false)}>Cancel</button>
          </div>
        )}
      </section>

      <section className="set-sec">
        <h2>Keyboard shortcuts</h2>
        <div className="keys">
          <div><kbd>←</kbd> <kbd>→</kbd> previous and next step in a lesson</div>
          <div><kbd>←</kbd> <kbd>→</kbd> previous and next line in a story</div>
          <div><kbd>←</kbd> <kbd>→</kbd> switch stage on the road, or letter in the chart</div>
          <div><kbd>Enter</kbd> continue</div>
          <div><kbd>1</kbd> to <kbd>4</kbd> pick an answer</div>
          <div><kbd>Space</kbd> flip a review card</div>
          <div><kbd>1</kbd> to <kbd>4</kbd> grade a review card</div>
        </div>
      </section>
    </div>
  );
}
